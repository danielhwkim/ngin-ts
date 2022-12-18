var fs = require('fs');
//const { runInThisContext } = require('vm');
const {Ngin, EventHandler, mainInternal} = require("./ngin");
//var {ngin} = require("./ngin");
const EventEmitter = require('events');
const {l1, l2} = require("./gen");//

class NginX extends Ngin {
    constructor(root){
        super(root);
    }

    async forward(id, pos) {
        await this.command({
            strings: ['forward'],
            ints:[id],
            floats:[pos.x, pos.y],
        });
    }

    async follow(id) {
        await this.command({
            strings: ['follow'],
            ints:[id],
        });
    } 

    async remove(id) {
        await this.command({
            strings: ['remove'],
            ints:[id],
        });        
    } 



    async getObjinfo(id) {
        this.cmdEmitter = new EventEmitter();    
        await this.command({
          strings:['objinfo'], 
          ints:[id], 
        });
        var value = await EventEmitter.once(this.cmdEmitter, 'cmd');
        return value[0].floats;
    }
    
    async angularVelocity(id, value) {
        await this.command({
            strings:['angular'], 
            ints:[id],
            floats:[value]
        });        
    }

    async linearTo(id, x, y) {
        this.cmdEmitter = new EventEmitter();        
        await this.ngin.command({
            strings:['linearTo'], 
            ints:[id], 
            floats:[x, y],
        });
        var value = await EventEmitter.once(this.cmdEmitter, 'cmd');
        return value[0].floats;        
    }




    async submit() {
        await this.command({strings:['submit'], ints:[4041]});
    }    
}

module.exports = {NginX};