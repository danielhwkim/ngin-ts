var {EventHandler} = require("./ngin");
var {NginX, main} = require("./nginx");

class Util {
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

        await this.ngin.command({
            strings:['svg', this.drawSvgTextFullScreen(width, height, `${num}`, textsize, fillopacity)], 
            ints:[100+num], 
            floats:[0, 0, width, height],
        }); 

        while (num > 0) {
            await this.ngin.command({
                strings:['moveTo', "ease"], 
                ints:[100+num], 
                floats:[width, 0, time],
            });   

            num--;

            await this.ngin.command({
                strings:['svg', this.drawSvgTextFullScreen(width, height, `${num}`, textsize, fillopacity)], 
                ints:[100+num], 
                floats:[-width, 0, width, height],
            });
        
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

class Stopwatch {
    constructor(ngin, oid, rect) {
        this.thisNgin = ngin;
        this.rect = rect;
        this.w = rect[2];
        this.h = rect[3];
        this.oid = oid;
        this.num = 0;
        this.running = false;      
        this.util = new Util(ngin);  
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

        await this.thisNgin.command({
            strings:['svg', this.util.drawSvgText(this.w, this.h, `${this.num}`)], 
            ints:[this.oid], 
            floats:this.rect,
        }); 
    
        setTimeout(() => {
            this.timeOut.call(this);
        }, 1000);    
    }
    
    async run() {
        this.running = true;
        await this.thisNgin.command({
            strings:['svg', this.util.drawSvgText(this.w, this.h, `${this.num}`)], 
            ints:[this.oid], 
            floats:this.rect,
        }); 
    
        setTimeout(() => {
            this.timeOut.call(this);
        }, 1000);
    }

    stop() {
        this.running = false;
        return this.num;
    }
}




/*
main('daniel', 4040, async (ngin) =>  {
    ngin.eventHandler = new GameInputHandler(ngin);

    const x = 0;
    const y = 0;
    const width = 12;
    const height = 12;
    const margin = 3;
    let gid = 100;

    if (true) {
        await ngin.initScreen({
            background: 'Blue',
            gravityX: 0.0,
            gravityY: 0.0,    
            width: width+margin,
            height: height,
            debug: false,
        });
    } else {
        await ngin.command({strings:['removeAll']});
    }
    ngin.eventHandler.ready = true;

    await test(ngin, width, height, margin, (i,j)=>i<j);
    await test(ngin, width, height, margin, (i,j)=>j%2);
    await test(ngin, width, height, margin, (i,j)=>j%2 != i%2);    
});
*/

function runq(func) {
    main('127.0.0.1', 4040, async (ngin) =>  {
        ngin.eventHandler = new GameInputHandler(ngin);
        await func(ngin);
    });
}

class Cmd {
    constructor(ngin) {
        this.ngin = ngin;
    }

    async add(i, j) {
        await this.ngin.addFruit(0, 'Bananas', i, j);
    }

    async submit() {
        await this.ngin.command({strings:['submit'], ints:[4041]});
    }
}

function run(func) {
    main('127.0.0.1', 4041, async (ngin) =>  {
        ngin.eventHandler = new GameInputHandler(ngin);
        await func(new Cmd(ngin));
    });
}


class GameInputHandler extends EventHandler {
    constructor(ngin) {
        super(ngin);
        this.nginx = ngin;
        this.ready = false;
        this.handleLog = (cmd) => {};
    }

    async handleContact(contact) {
        console.log(contact);
        if (!this.ready) return;
        //const obj1 = this.nginx.getObj(contact.bid1);
        //const obj2 = this.nginx.getObj(contact.bid2);
        //console.log(obj1.name, obj2.name);
        console.log(contact.name1, contact.name2);
        if (contact.name1 == 'actor') {
            switch(contact.name2) {
            case 'fruit':
                if (contact.type == 'begin') {
                    this.nginx.playHitNotify(obj2.bid);
                }
                break;
            case 'void':
                if (contact.type == 'begin') {
                    this.nginx.moveBack(obj1.bid);
                }                
                break;
            case 'animated_obj':
                switch(obj2.skin) {
                case 'spike':

                    break;
                case 'coin':
                    this.nginx.opRemove(obj2.bid);
                    break;
                }
                break;                                    
            }
        }
    }
  
    async handleEvent(event) {
        //var obj = this.ngin.getObj(event.bid);
        //console.log(obj.name, obj.skin, event);
        switch (event.name) {
            case 'fruit':
                if (event.type == 'complete') {
                    await this.ngin.setBodyOp(event.bid, 'remove', event.x, event.y);
                }
                break;
            case 'actor':
                if (event.type == 'ready') {
                    //
                }                
                break;
        }
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
        //console.log(cmd);
        this.handleLog(cmd);
    }        
}

module.exports = {run, runq, Util, Stopwatch};