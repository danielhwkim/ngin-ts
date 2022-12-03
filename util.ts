var fs = require('fs');
const { runInThisContext } = require('vm');
var {EventHandler, mainInternal} = require("./ngin");
var {NginX} = require("./nginx");
const EventEmitter = require('events');
//var {Pos, Size, BodyType, BodyShape, TilesInfo, Pobj, Stage, JoystickDirectionals} = require("./pobj");
import {Pos, Size, BodyType, BodyShape, TilesInfo, Pobj, Pbody, Stage, JoystickDirectionals, Image} from "./pobj";

export class Gngin extends NginX {
    constructor(root){
        super(root);
        //this.init(root);
    }

    async sendObj(obj:Pobj) {
        if (obj instanceof Pbody) {
            await this.addBody(obj.build());
        } else if (obj instanceof Stage) {
            await this.initScreen(obj.build());
        } else if (obj instanceof Image) {
            await this.command(obj.build());
        }
    }

    async sendObjWait(obj:Pobj) {
        this.ackEmitter = new EventEmitter();         
        await this.sendObj(obj);
        return await EventEmitter.once(this.ackEmitter, 'ack');
    }
    
    async forward(id:number, pos:Pos) {
        await this.command({
            strings: ['forward'],
            ints:[id],
            floats:[pos.x, pos.y],
        });
    }

    async follow(id:number) {
        await this.command({
            strings: ['follow'],
            ints:[id],
        });
    } 

    async remove(id:number) {
        await this.opRemove(id,0,0);
    } 

    async getBodyinfo(id:number) {
        this.cmdEmitter = new EventEmitter();    
        await this.command({
          strings:['bodyinfo'], 
          ints:[id], 
        });
        var value = await EventEmitter.once(this.cmdEmitter, 'cmd');
        return value[0].floats;
    }
    
    async angularVelocity(id:number, value:number) {
        await this.setBodyOp(id, 'angularVelocity', value, 0);
    }
}

export function main(type, port, body) {

    mainInternal(type, port, async function (host, root) {
        let ngin = new Gngin(root);
        await ngin.connect(host, port);
        //ngin.eventHandler = eventHandler; //new InputHandler(ngin);
    
        await body(ngin);
    })
}

