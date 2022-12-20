var {EventHandler, Ngin, mainInternal} = require("./ngin");
import {main} from "./nx";
import {CObject, CActionType, CAction, CPhysical, CVisible, CTileObject, CStage, CVec2, CSize, CBodyType, CBodyShape, CJoystickDirectionals} from "./cobj";

export class TestUtil {
    ngin;
    constructor(ngin) {
        this.ngin = ngin;
    }

    drawSvgGrid(x, y, func) {
        let unit = 100;
        var ori = `<svg viewBox="0 0 ${unit*x} ${unit*y}">\n`;
        let padding = 5;
        for (let i=0; i<x; i++) {
            for (let j=0; j<y; j++) {
                if (func(i,j)) {
                    ori += `<rect x="${padding + unit*i}" y="${padding + unit*j}" width="${unit - padding*2}" height="${unit - padding*2}" stroke="#777" fill="none" stroke-width="4" />\n`;
                    ori += `<text fill="#777" x="${unit/2 + unit*i}" y="${unit*0.6 + unit*j}" font-size="${unit/3}" font-family="Roboto" text-anchor="middle" >${i}:${j}</text>\n`;                
                } else {
                    ori += `<rect x="${padding + unit*i}" y="${padding + unit*j}" width="${unit - padding*2}" height="${unit - padding*2}" stroke="#777" fill="#777" stroke-width="4" />\n`;
                }

            }
        }

        ori += '</svg>';
        return ori;
    }

    drawSvgTextFullScreen(x, y, text, size=1, fill="#111", fillopacity=1) {
        let unit = 100;    
        var ori = `<svg viewBox="0 0 ${x*unit} ${y*unit}">\n`;
        ori += `<text fill="${fill}" fill-opacity="${fillopacity}" x="${x*unit/2}" y="${y*unit/2 + unit*size*0.35}" font-size="${unit*size}" font-family="Roboto" text-anchor="middle" >${text}</text>\n`;                
        ori += '</svg>';
        return ori;
    }

    async countDown(width, height, num, time) {
        console.log(width, height, num, time);

        const fillopacity = 0.5;
        const textsize = 5;

        var obj = new CObject(100+num);
        obj.visible = new CVisible([new CAction(this.drawSvgTextFullScreen(width, height, `${num}`, textsize, "#111", fillopacity), new CSize(width, height), [], CActionType.svg)]);
        obj.visible.current = CActionType.svg;
        obj.visible.size = new CSize(width, height);
        obj.visible.anchor = new CVec2(0,0);
        await this.ngin.sendCObjectInternal(obj.build());

        await this.ngin.command({
            strings:['moveTo', "ease"], 
            ints:[100+num], 
            floats:[width, 0, time],
        });   

        while (num > 0) {
            await this.ngin.command({
                strings:['moveTo', "ease"], 
                ints:[100+num], 
                floats:[width, 0, time],
            });   

            num--;

            obj = new CObject(100+num);
            obj.visible = new CVisible([new CAction(this.drawSvgTextFullScreen(width, height, `${num}`, textsize, "#111", fillopacity), new CSize(width, height), [], CActionType.svg)]);
            obj.visible.current = CActionType.svg;
            obj.visible.size = new CSize(width, height);
            obj.visible.anchor = new CVec2(0,0);
            await this.ngin.sendCObjectInternal(obj.build());

        
            this.ngin.prepareAck();

            await this.ngin.command({
                strings:['moveTo', "ease"], 
                ints:[100+num, 1], 
                floats:[0, 0, time],
            }); 
            
            const value = await this.ngin.waitAckValue(100+num);

            console.log('ack:', value);
        
            await this.ngin.command({
                strings:['remove'], 
                ints:[100+num+1], 
            });  
            
            
        }

        this.ngin.prepareAck();
        await this.ngin.command({
            strings:['moveTo', "ease"], 
            ints:[100 + num, 1], 
            floats:[width, 0, time],
        }); 

        const value = await this.ngin.waitAckValue(100+num);

        console.log('ack:', value);

        await this.ngin.command({
            strings:['remove'], 
            ints:[100+num], 
        });

        console.log('end');
    }

    drawSvgText(x, y, text) {
        let unit = 100;    
        var ori = `<svg viewBox="0 0 ${x*unit} ${y*100}">\n`;
        ori += `<text fill="#111" x="${x*unit/2}" y="${y*unit/2 + unit*0.35}" font-size="${unit}" font-family="Roboto" text-anchor="middle" >${text}</text>\n`;                
        ori += '</svg>';
        return ori;
    }
}

export class Stopwatch {
    thisNgin;
    rect;
    w;
    h;
    oid;
    num;
    running;
    util;
    constructor(ngin, oid, rect) {
        this.thisNgin = ngin;
        this.rect = rect;
        this.w = rect[2];
        this.h = rect[3];
        this.oid = oid;
        this.num = 0;
        this.running = false;      
        this.util = new TestUtil(ngin);  
    }
    
    async timeOut() {
        if (!this.running) {
            return;
        }

        await this.thisNgin.command({
            strings:['remove'], 
            ints:[this.oid], 
        });
    
        this.num += 1;

        var obj = new CObject(this.oid);
        obj.visible = new CVisible([new CAction(this.util.drawSvgText(this.w, this.h, `${this.num}`), new CSize(this.w, this.h), [], CActionType.svg)]);
        obj.visible.current = CActionType.svg;
        obj.visible.size = new CSize(this.w, this.h);
        obj.visible.pos = new CVec2(this.rect[0],this.rect[1]);
        obj.visible.anchor = new CVec2(0,0);        
        await this.thisNgin.sendCObjectInternal(obj.build());

    
        setTimeout(() => {
            this.timeOut.call(this);
        }, 1000);    
    }
    
    async run() {
        this.running = true;

        var obj = new CObject(this.oid);
        obj.visible = new CVisible([new CAction(this.util.drawSvgText(this.w, this.h, `${this.num}`), new CSize(this.w, this.h), [], CActionType.svg)]);
        obj.visible.current = CActionType.svg;
        obj.visible.size = new CSize(this.w, this.h);
        obj.visible.pos = new CVec2(this.rect[0],this.rect[1]);        
        obj.visible.anchor = new CVec2(0,0);
        await this.thisNgin.sendCObjectInternal(obj.build());

    
        setTimeout(() => {
            this.timeOut.call(this);
        }, 1000);
    }

    stop() {
        this.running = false;
        return this.num;
    }
}


export function runq(func) {
    main('127.0.0.1', 4040, async (nx) =>  {
        nx.eventHandler = new GameInputHandler(nx);
        await func(nx);
    });
}

export function run(func) {
    main('127.0.0.1', 4041, async (nx) =>  {
        nx.eventHandler = new GameInputHandler(nx);
        await func(nx);
    });
}


class GameInputHandler extends EventHandler {
    constructor(ngin) {
        super(ngin);
        this.nginx = ngin;
        this.ready = false;
    }

    async handleContact(contact) {
        console.log(contact);
        if (!this.ready) return;
    }
  
    async handleEvent(event) {
        console.log(event);
    }
  
    async handleKey(key) {
      console.log(key);
    }  
    
    async handleDirectional(directional) {
      console.log(directional);
    }
  
    async handleButton(button) {
      console.log(button);
    }

    async handleCmd(cmd) {
        console.log(cmd);
    }        
}