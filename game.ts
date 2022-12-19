var fs = require('fs');
var {EventHandler} = require("./ngin");
import {main, Nx} from "./nx";
import {CObject, CActionType, CAction, CPhysical, CVisible, CTileObject, CStage, CPos, CSize, CBodyType, CBodyShape, CJoystickDirectionals} from "./cobj";


function conv(v, tileSize) {
    return Math.round(v*2.0/tileSize)/2.0;
}

function convInfo(info, tileSize) {
    info.x = conv(info.x, tileSize);
    info.y = conv(info.y, tileSize);
    info.width = conv(info.width, tileSize);
    info.height = conv(info.height, tileSize);
    return info;
}  

function getGameData() {
  return '{ "compressionlevel":-1,\
"height":17,\
"infinite":false,\
"layers":[\
       {\
        "data":[200, 180, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 5, 200, 201, 101, 102, 103, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 23, 200, 201, 123, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 23, 200, 201, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 23, 200, 201, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 123, 23, 200, 201, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 123, 124, 125, 183, 184, 184, 184, 184, 185, 23, 200, 201, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 146, 147, 205, 206, 206, 206, 206, 207, 23, 200, 201, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 205, 206, 228, 228, 206, 207, 23, 200, 201, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 205, 207, 0, 0, 205, 207, 23, 200, 201, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 205, 207, 0, 123, 205, 207, 23, 200, 201, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 205, 208, 184, 184, 209, 207, 23, 180, 223, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 205, 206, 206, 206, 206, 207, 23, 201, 183, 184, 184, 185, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 205, 206, 206, 206, 206, 207, 23, 201, 205, 206, 206, 207, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 183, 184, 184, 184, 184, 184, 184, 184, 184, 184, 209, 206, 123, 206, 104, 23, 201, 227, 123, 205, 208, 184, 185, 0, 0, 0, 0, 0, 0, 0, 183, 184, 184, 209, 206, 206, 206, 206, 206, 206, 206, 206, 206, 124, 125, 206, 126, 23, 202, 178, 178, 178, 178, 178, 178, 178, 178, 178, 178, 178, 178, 178, 178, 179, 206, 206, 206, 206, 206, 206, 206, 123, 206, 206, 206, 146, 147, 123, 148, 23, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 202, 178, 178, 178, 178, 178, 178, 178, 178, 178, 178, 178, 178, 178, 178, 178, 203],\
        "height":17,\
        "id":1,\
        "name":"Tile Layer 1",\
        "opacity":1,\
        "type":"tilelayer",\
        "visible":true,\
        "width":32,\
        "x":0,\
        "y":0\
       }, \
       {\
        "draworder":"topdown",\
        "id":2,\
        "name":"Object Layer 1",\
        "objects":[\
               {\
                "height":16,\
                "id":1,\
                "name":"floor",\
                "rotation":0,\
                "type":"",\
                "visible":true,\
                "width":32,\
                "x":80,\
                "y":224\
               }, \
               {\
                "height":16,\
                "id":32,\
                "name":"floor",\
                "rotation":0,\
                "type":"",\
                "visible":true,\
                "width":32,\
                "x":48,\
                "y":16\
               }, \
               {\
                "height":16,\
                "id":33,\
                "name":"floor",\
                "rotation":0,\
                "type":"",\
                "visible":true,\
                "width":16,\
                "x":32,\
                "y":32\
               }, \
               {\
                "height":16,\
                "id":16,\
                "name":"Bananas",\
                "rotation":0,\
                "type":"",\
                "visible":true,\
                "width":16,\
                "x":160,\
                "y":192\
               }, \
               {\
                "height":16,\
                "id":21,\
                "name":"Bananas",\
                "rotation":0,\
                "type":"",\
                "visible":true,\
                "width":16,\
                "x":144,\
                "y":128\
               }, \
               {\
                "height":16,\
                "id":23,\
                "name":"Apple",\
                "rotation":0,\
                "type":"",\
                "visible":true,\
                "width":16,\
                "x":384,\
                "y":48\
               }, \
               {\
                "height":16,\
                "id":27,\
                "name":"Bananas",\
                "rotation":0,\
                "type":"",\
                "visible":true,\
                "width":16,\
                "x":208,\
                "y":128\
               }, \
               {\
                "height":16,\
                "id":24,\
                "name":"Apple",\
                "rotation":0,\
                "type":"",\
                "visible":true,\
                "width":16,\
                "x":432,\
                "y":32\
               }, \
               {\
                "height":16,\
                "id":29,\
                "name":"Apple",\
                "rotation":0,\
                "type":"",\
                "visible":true,\
                "width":16,\
                "x":320,\
                "y":144\
               }, \
               {\
                "height":16,\
                "id":26,\
                "name":"Trampoline",\
                "rotation":0,\
                "type":"",\
                "visible":true,\
                "width":16,\
                "x":160,\
                "y":224\
               }, \
               {\
                "height":16,\
                "id":17,\
                "name":"Bananas",\
                "rotation":0,\
                "type":"",\
                "visible":true,\
                "width":16,\
                "x":176,\
                "y":128\
               }, \
               {\
                "height":16,\
                "id":20,\
                "name":"Apple",\
                "rotation":0,\
                "type":"",\
                "visible":true,\
                "width":16,\
                "x":400,\
                "y":32\
               }, \
               {\
                "height":16,\
                "id":28,\
                "name":"Trampoline",\
                "rotation":0,\
                "type":"",\
                "visible":true,\
                "width":16,\
                "x":320,\
                "y":192\
               }, \
               {\
                "height":16,\
                "id":30,\
                "name":"Apple",\
                "rotation":0,\
                "type":"",\
                "visible":true,\
                "width":16,\
                "x":320,\
                "y":80\
               }, \
               {\
                "height":16,\
                "id":22,\
                "name":"Apple",\
                "rotation":0,\
                "type":"",\
                "visible":true,\
                "width":16,\
                "x":416,\
                "y":48\
               }, \
               {\
                "height":16,\
                "id":25,\
                "name":"Apple",\
                "rotation":0,\
                "type":"",\
                "visible":true,\
                "width":16,\
                "x":320,\
                "y":112\
               }, \
               {\
                "height":16,\
                "id":18,\
                "name":"Bananas",\
                "rotation":0,\
                "type":"",\
                "visible":true,\
                "width":16,\
                "x":160,\
                "y":160\
               }, \
               {\
                "height":16,\
                "id":19,\
                "name":"Apple",\
                "rotation":0,\
                "type":"",\
                "visible":true,\
                "width":16,\
                "x":448,\
                "y":48\
               }, \
               {\
                "height":16,\
                "id":13,\
                "name":"floor",\
                "rotation":0,\
                "type":"",\
                "visible":true,\
                "width":128,\
                "x":352,\
                "y":80\
               }, \
               {\
                "height":16,\
                "id":34,\
                "name":"floor",\
                "rotation":0,\
                "type":"",\
                "visible":true,\
                "width":32,\
                "x":368,\
                "y":96\
               }, \
               {\
                "height":31.4545454545455,\
                "id":9,\
                "name":"floor",\
                "rotation":0,\
                "type":"",\
                "visible":true,\
                "width":48,\
                "x":32,\
                "y":192\
               }, \
               {\
                "height":16.3636363636364,\
                "id":10,\
                "name":"Bananas",\
                "rotation":0,\
                "type":"",\
                "visible":true,\
                "width":15.8181818181818,\
                "x":112,\
                "y":128\
               }, \
               {\
                "height":16,\
                "id":2,\
                "name":"floor",\
                "rotation":0,\
                "type":"",\
                "visible":true,\
                "width":32,\
                "x":224,\
                "y":224\
               }, \
               {\
                "height":16,\
                "id":6,\
                "name":"floor",\
                "rotation":0,\
                "type":"",\
                "visible":true,\
                "width":416,\
                "x":80,\
                "y":-0.181818181818184\
               }, \
               {\
                "height":16,\
                "id":3,\
                "name":"floor",\
                "rotation":0,\
                "type":"",\
                "visible":true,\
                "width":112,\
                "x":112,\
                "y":240\
               }, \
               {\
                "height":48,\
                "id":4,\
                "name":"floor",\
                "rotation":0,\
                "type":"",\
                "visible":true,\
                "width":144,\
                "x":256,\
                "y":208\
               }, \
               {\
                "height":64,\
                "id":5,\
                "name":"floor",\
                "rotation":0,\
                "type":"",\
                "visible":true,\
                "width":15.636363636364,\
                "x":496,\
                "y":0\
               }, \
               {\
                "height":96,\
                "id":7,\
                "name":"floor",\
                "rotation":0,\
                "type":"",\
                "visible":true,\
                "width":16,\
                "x":400,\
                "y":112\
               }, \
               {\
                "height":144,\
                "id":8,\
                "name":"floor",\
                "rotation":0,\
                "type":"",\
                "visible":true,\
                "width":16.1818181818182,\
                "x":16,\
                "y":48\
               }, \
               {\
                "height":15.6364,\
                "id":31,\
                "name":"floor",\
                "rotation":0,\
                "type":"",\
                "visible":true,\
                "width":31.6364,\
                "x":480,\
                "y":64\
               }, \
               {\
                "height":16,\
                "id":35,\
                "name":"Bananas",\
                "rotation":0,\
                "type":"",\
                "visible":true,\
                "width":16,\
                "x":160,\
                "y":96\
               }, \
               {\
                "height":16,\
                "id":36,\
                "name":"Bananas",\
                "rotation":0,\
                "type":"",\
                "visible":true,\
                "width":16,\
                "x":144,\
                "y":64\
               }, \
               {\
                "height":16,\
                "id":37,\
                "name":"Bananas",\
                "rotation":0,\
                "type":"",\
                "visible":true,\
                "width":16,\
                "x":192,\
                "y":96\
               }, \
               {\
                "height":16.3636,\
                "id":38,\
                "name":"Bananas",\
                "rotation":0,\
                "type":"",\
                "visible":true,\
                "width":15.8182,\
                "x":128,\
                "y":96\
               }, \
               {\
                "height":16,\
                "id":39,\
                "name":"Bananas",\
                "rotation":0,\
                "type":"",\
                "visible":true,\
                "width":16,\
                "x":176,\
                "y":64\
               }, \
               {\
                "height":16,\
                "id":40,\
                "name":"Bananas",\
                "rotation":0,\
                "type":"",\
                "visible":true,\
                "width":16,\
                "x":160,\
                "y":32\
               }, \
               {\
                "height":16,\
                "id":41,\
                "name":"hero",\
                "rotation":0,\
                "type":"",\
                "visible":true,\
                "width":16,\
                "x":48,\
                "y":176\
               }],\
        "opacity":1,\
        "type":"objectgroup",\
        "visible":true,\
        "x":0,\
        "y":0\
       }],\
"nextlayerid":3,\
"nextobjectid":42,\
"orientation":"orthogonal",\
"renderorder":"right-down",\
"tiledversion":"1.7.2",\
"tileheight":16,\
"tilesets":[\
       {\
        "firstgid":1,\
        "source":"Terrain (16x16).json"\
       }],\
"tilewidth":16,\
"type":"map",\
"version":"1.6",\
"width":32\
}';
}


main('127.0.0.1', 4040, async (nx:Nx) =>  {
    nx.eventHandler = new InputHandler(nx);
    //const d = fs.readFileSync('/Users/dkim/development/dengine/assets/images/Terrain/level03.json', 'utf8');
    const j = JSON.parse(getGameData());
  
    const tiles = j.layers[0];
    const objlayer = j.layers[1];
    const data = tiles['data'];
    const tileSize = j['tilewidth'];
    const precision = 3;
    const size = new CSize(tiles.width, tiles.height);
  

    var stage = new CStage(size);
    //stage.debug = true;
    stage.background = 'Blue';
    stage.gravity = new CPos(0, 60);
    stage.joystickDirectionals = CJoystickDirectionals.horizontal;
    await nx.sendObjWait(stage);


    await nx.sendObj(CTileObject('Terrain/Terrain (16x16).png', new CSize(tileSize, tileSize), data, new CPos(0,0), size));
    nx.eventHandler.ready = true;
    const objs = objlayer.objects;


    for (let key in objs) {
      let obj = objs[key];
      console.log(obj.name, obj.id);
      obj.id += 100;
      convInfo(obj, tileSize);
      switch(obj.name) {
        case 'Apple':
        case 'Bananas':
        case 'Cherries':
        case 'Kiwi':
        case 'Orange':
        case 'Pineapple':
        case 'Strawberry':    
          nx.addFruit(obj.id, new CPos(obj.x, obj.y), obj.name);
          break;

        case 'hero':
          obj.id = 1;
          var hero = nx.hero(obj.id, 'Mask Dude', new CPos(obj.x - 0.5, obj.y - 2));
          hero.physical.shape = CBodyShape.actor;
          hero.physical.size = new CSize(2, 2);
          hero.physical.maskBits = 0x00FF;
          hero.visible.scale = new CPos(2,2);
          hero.visible.pos = new CPos(0, 0);
          await nx.sendObjWait(hero);
          if (nx.eventHandler) {
            nx.eventHandler.actorBid = hero.id;
          }
          break;

          case 'floor':
            var cobj = new CObject(obj.id);
            cobj.info = obj.name;
            cobj.physical = new CPhysical(CBodyShape.rectangle, new CPos(obj.x, obj.y), CBodyType.static);
            cobj.physical.size = new CSize(obj.width,obj.height);
            //cobj.physical.anchor = new CPos(0, 0);
            await nx.sendObj(cobj);

            break;

          case 'bar':
            var cobj = new CObject(obj.id);
            cobj.info = obj.name;
            cobj.physical = new CPhysical(CBodyShape.rectangle, new CPos(obj.x, obj.y), CBodyType.static);
            cobj.physical.size = new CSize(obj.width,obj.height);
            //cobj.physical.anchor = new CPos(0, 0);
            await nx.sendObj(cobj);            
            break;
          case 'Box1':
          case 'Box2':
          case 'Box3':
            var cobj = new CObject(obj.id);
            cobj.info = obj.name;
            cobj.physical = new CPhysical(CBodyShape.rectangle, new CPos(obj.x, obj.y), CBodyType.static);
            cobj.physical.size = new CSize(obj.width,obj.height);
            //cobj.physical.anchor = new CPos(0, 0);
            await nx.sendObj(cobj); 
            break;

          case 'Trampoline':
            var cobj = new CObject(obj.id);
            cobj.info = obj.name;
            cobj.physical = new CPhysical(CBodyShape.rectangle, new CPos(obj.x, obj.y), CBodyType.static);
            cobj.physical.size = new CSize(obj.width,obj.height);
            cobj.visible = new CVisible([
              new CAction('Traps/Trampoline/Idle.png', new CSize(28, 28), [], CActionType.idle),
              new CAction('Traps/Trampoline/Jump (28x28).png', new CSize(28, 28), [], CActionType.hit),
            ]);
            for (var i=0; i<cobj.visible.actions.length; i++) {
              cobj.visible.actions[i].stepTime = 50/1000;
            }
            cobj.visible.scale = new CPos(1.7, 1.7);
            cobj.visible.pos = new CPos(0, -0.4);
            //cobj.visible.current = CActionType.hit;
            await nx.sendObj(cobj); 
            break;

        default:
          break;
      }
    }
});

class InputHandler extends EventHandler {

    //nginx;
    constructor(ngin) {
        super(ngin);
        this.nginx = ngin;
        this.key_down_left = false;
        this.key_down_right = false;
        //actor_contact_count = 0;
        this.actor_contacts = new Set();
        this.actor_jump_count = 0;
        this.dynamic_id = 1000;
        this.facingLeft = false;  
        this.ready = false;      
    }


  
    async handleContact(contact) {
      if (!this.ready) return;
      console.log(contact);
      /*
      if (contact.name1 == 'actor') {
        switch(contact.name2) {
          case 'void':
            if (contact.type == 'begin') {
              if (contact.y < 0) {
                if (this.actor_contacts.size == 0) {
                  if (this.key_down_left || this.key_down_right) {
                    await this.nginx.playRun(contact.bid1, this.facingLeft);
                  } else {
                    await this.nginx.playIdle(contact.bid1, this.facingLeft);              
                  }
                  this.actor_jump_count = 0;                
                }
                this.actor_contacts.add(contact.bid2);
              }
            } else {
              if (this.actor_contacts.has(contact.bid2)) {
                this.actor_contacts.delete(contact.bid2);
              }
            }
            break;
          case 'fruit':
            if (contact.type == 'begin') {
              await this.nginx.playHitNotify(contact.bid2, this.facingLeft);
            }
            break;
          case 'box':
            if (contact.type == 'begin') {
              //print(contact.x, contact.y)
              if (Math.abs(contact.y) > Math.abs(contact.x)) {
                const obj = this.nginx.omap.get(contact.bid2);
                if (obj.count) {
                  obj.count += 1
                } else {
                  obj.count = 1
                }
                await this.nginx.playHitOnce(contact.bid2, this.facingLeft);
              }
              if (contact.y < 0) {
                this.actor_jump_count = 0;
                await this.nginx.opVel(this.actorBid, 0, -20);
              }
            }
            break;
          case 'trampoline':
            if (contact.type == 'begin') {
              await this.nginx.playHitOnce(contact.bid2, this.facingLeft);
              await this.nginx.opVelY(this.actorBid, -30);
              this.actor_jump_count = 0;
            }
            break;
          case 'Blocks':
            if (contact.type == 'begin') {
              await this.nginx.cmdIF2('action', contact.bid2, contact.x, contact.y);
            }
            break;         
        }
      }*/
    }
  
    async handleEvent(event) {
      console.log(event);
      /*
      const c = event;
      if (c.type == 'ready')
        return;
  
      //const obj = this.nginx.getObj(c.bid)
      //const name = obj['name'];
  
      switch(event.name) {
        case 'box':
          //print(f"box - {omap[c.bid]['count']}")
          if (obj.count == 2) {
            //print(obj)
            await this.nginx.opAction(c.bid, c.x, c.y);
            await this.nginx.addBody({
              bid:this.dynamic_id, 
              name:'fruit', 
              skin:'Bananas', 
              type:'dynamic', 
              x:c.x-0.5, 
              y:c.y-0.5, 
              width:1, 
              height:1});
            this.dynamic_id += 1
            } else {
              await this.nginx.playIdle(c.bid, this.facingLeft);
            }
  
          break;
        case 'fruit':
            await this.nginx.opRemove(c.bid, c.x, c.y);
            break;
        case 'actor':
            await this.nginx.playJump(this.actorBid, this.facingLeft);
            break; 
      }*/
    }
  
    async handleKey(key) {
      console.log(key);
      /*
      const c = key;
      if (c.type == 'up') {
        switch (c.name) {
          case 'Arrow Left':
            this.key_down_left = false;
            if (this.key_down_right) {
                //this.nginx.facingRight(this.actorBid);
                this.facingLeft = false;
                //this.nginx.facingRight = true;
                await this.nginx.opVelXright(this.actorBid, 7.0);
                if (this.actor_contacts.size != 0) {
                    await this.nginx.playRun(this.actorBid, this.facingLeft);
                }
            } else {
              await this.nginx.opVelXleft(this.actorBid, 0.0);
              if (this.actor_contacts.size != 0) {
                  await this.nginx.playIdle(this.actorBid, this.facingLeft);            	
              } else {
                  await this.nginx.playNoChange(this.actorBid, this.facingLeft);
              }			
            }
          break;					
          case 'Arrow Right':
            this.key_down_right = false;
            if (this.key_down_left) {
                //this.nginx.facingLeft(this.actorBid);
                //this.nginx.facingRight = false;
                this.facingLeft = true;
                await this.nginx.opVelXleft(this.actorBid, 7.0);
                if (this.actor_contacts.size != 0) { 
                    await this.nginx.playRun(this.actorBid, this.facingLeft);            
                }
            } else {
                await this.nginx.opVelXright(this.actorBid, 0.0)
                if (this.actor_contacts.size != 0) {					
                    await this.nginx.playIdle(this.actorBid, this.facingLeft);             
                } else {
                    await this.nginx.playNoChange(this.actorBid, this.facingLeft);        					
                }
            }
          break;
        }
      } else {
        switch (c.name) {
          case 'Arrow Left':
            if (! this.key_down_left) {
                this.key_down_left = true;
                //this.nginx.facingRight = false;
                this.facingLeft = true;
                //this.nginx.facingLeft(this.actorBid);
                await this.nginx.opVelXleft(this.actorBid, 7);				
                if (this.actor_contacts.size != 0) { 
                    await this.nginx.playRun(this.actorBid, this.facingLeft);
                }
            } else {
                await this.nginx.playNoChange(this.actorBid);   
            }
            break;
          case 'Arrow Right':
            if (! this.key_down_right) {
                this.key_down_right = true;
                //this.nginx.facingRight(this.actorBid);
                this.facingLeft = false;
                //this.nginx.facingRight = true;
                await this.nginx.opVelXright(this.actorBid, 7);
                if (this.actor_contacts.size != 0) { 		
                    await this.nginx.playRun(this.actorBid, this.facingLeft);          				
                }
            } else {
                await this.nginx.playNoChange(this.actorBid, this.facingLeft);
            }
            break;				
          case 'Arrow Up':	
            if (this.actor_contacts.size != 0) { 
                await this.nginx.opVelY(this.actorBid, -20)	
                await this.nginx.playJump(this.actorBid, this.facingLeft);         
                this.actor_jump_count = 0
            }
            else if (this.actor_jump_count < 1) {
                await this.nginx.opVelY(this.actorBid,  -20)
                await this.nginx.playDoubleJumpNotify(this.actorBid, this.facingLeft);
                this.actor_jump_count = 1   
            }
            break;
          }
      }*/
    }  
  
    
    async handleDirectional(directional) {
      console.log(directional);
      /*
      const c = directional;
      switch(c.direction) {
        case 'IDLE':
            await this.nginx.playIdle(this.actorBid, this.facingLeft);     
            await this.nginx.opVelXright(this.actorBid, 0)
            this.key_down_right = false;
            this.key_down_left = false;
            break;
        case 'MOVE_RIGHT':
            //this.nginx.facingRight(this.actorBid);
            this.facingLeft = false;
            //this.nginx.facingRight = true;
            await this.nginx.playRun(this.actorBid, this.facingLeft);     
            await this.nginx.opVelXright(this.actorBid, 7*c.intensity/this.nginx.precision)
            this.key_down_right = true;
            this.key_down_left = true;					
            break;
        case 'MOVE_LEFT':
            //this.nginx.facingLeft(this.actorBid);
            this.facingLeft = true;
            //this.nginx.facingRight = false;
            await this.nginx.playRun(this.actorBid, this.facingLeft);
            await this.nginx.opVelXleft(this.actorBid, 7*c.intensity/this.nginx.precision)
            this.key_down_right = true;
            this.key_down_left = true;	  
            break;
      }
      console.log(c.direction);*/
    }
  
    async handleButton(button) {
      console.log(button);
      /*
      if (this.actor_contacts.size != 0) { 
        await this.nginx.opVelY(this.actorBid, -20);
        await this.nginx.playJump(this.actorBid, this.facingLeft);    
        this.actor_jump_count = 0;
      } else if (this.actor_jump_count < 1) {
        await this.nginx.opVelY(this.actorBid, -20);
        await this.nginx.playDoubleJumpNotify(this.actorBid, this.facingLeft);     			
        this.actor_jump_count = 1;
      }  */
    }  
}
  
  