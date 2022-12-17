
var {EventHandler, Ngin} = require("./ngin");
var fs = require('fs');
import {main, NginEx} from "./util";
import {CObject, CActionType, CAction, CPhysical, CVisible, CTileObject, Stage, Pos, Size, BodyType, BodyShape, JoystickDirectionals} from "./cobj";

main('127.0.0.1', 4040, async (x:NginEx) =>  {
    x.ngin.eventHandler = new GameInputHandler(x.ngin);

    const size = new Size(12, 12);

    var stage = new Stage(size);
    stage.debug = true;
    stage.joystickDirectionals = JoystickDirectionals.horizontal;
    await x.sendObjWait(stage);
    

    await x.addStage(0, 0, 0, size.w, size.h);
    var gid = 300;
    for (var i = 2; i<10; i++) {
        await x.addFruit(gid++, i, 3, 'Bananas');
    }

    await x.addSpike(gid++, 3, 4);
    await x.addCoin(gid++, 4, 4);
    await x.addActor(1, 'Mask Dude', 5, 4);
    
    //await x.moveLeft(1);
    /*
    //console.log('mid');
    await ngin.moveUp(1);
    //console.log('end');  
    //await ngin.queryBodyinfo(1);
    */

    /*
    while (true) {
        await ngin.moveRight(1);
    } */   
    /*
    while (! await ngin.isRightWall(1)) {
        await ngin.moveRight(1);
    }

    while (! await ngin.isLeftWall(1)) {
        await ngin.moveLeft(1);
    } */
});

class GameInputHandler extends EventHandler {
    ngin;
    constructor(ngin:typeof Ngin) {
        super(ngin);
        this.ngin = ngin;
    }

    async handleContact(contact:any) {
        console.log(contact);
        /*
        if (this.ngin.omap.size == 0) return;
        const obj1 = this.ngin.getObj(contact.bid1);
        const obj2 = this.ngin.getObj(contact.bid2);
        console.log(obj1.name, obj2.name);
        if (obj1.name == 'actor') {
            switch(obj2.name) {
            case 'fruit':
                if (contact.type == this.ngin.ContactType.values.begin) {
                    this.ngin.playHitNotify(obj2.bid);
                }
                break;
            case 'void':
                if (contact.type == this.ngin.ContactType.values.begin) {
                    this.ngin.moveBack(obj1.bid);
                }                
                break;
            case 'animated_obj':
                switch(obj2.skin) {
                case 'spike':

                    break;
                case 'coin':
                    this.ngin.opRemove(obj2.bid);
                    break;
                }
                break;                                    
            }
        }*/
    }
  
    async handleEvent(event:any) {
        console.log(event);        
        /*
        var obj = this.ngin.getObj(event.bid);
        console.log(obj.name, obj.skin, event);
        switch (obj.name) {
            case 'fruit':
                if (event.type == this.ngin.EventType.values.complete) {
                    await this.ngin.setBodyOp(event.bid, 'remove', event.x, event.y);
                }
                break;
            case 'actor':
                if (event.type == this.ngin.EventType.values.ready) {
                    //
                }                
                break;
        }*/
    }
  
    async handleKey(key:any) {
      console.log(key);
    }  
    
    async handleDirectional(directional:any) {
      console.log(directional);
    }
  
    async handleButton(button:any) {
      console.log(button);
    }  

    /*
    async handleQueryResult(result:any) {
        console.log(result);
    }
    
    async handleBodyInfoQueryResult(result:any) {
        console.log(result);
    } */   
}