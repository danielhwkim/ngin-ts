const {Ngin, mainInternal} = require("./ngin");//
const {l1, l2} = require("./gen");//

//exports.__esModule = true;
//exports.NginX = exports.main = void 0;

function main(type, port, body) {

    mainInternal(type, port, async function (host, root) {
        let ngin = new NginX(root);
        await ngin.connect(host, port);
        //ngin.eventHandler = eventHandler; //new InputHandler(ngin);
    
        await body(ngin);
    })
  }

class NginX extends Ngin {
  //omap;
  constructor(root){
      super();
      console.log("NginX constructor");
      this.init(root);
      //this.omap = new Map();
      this.facingLeft = false;
  }

  //getObj(bid) {
  //    return this.omap.get(bid);
  //}

  async addBody(info) { 
    console.log("addBody");
  if (!('fixedRotaton' in info)) {
      info.fixedRotation = true;
      }
  
      if (!('categoryBits' in info)) {
      info.categoryBits = 0x0001;
      }
  
      if (!('maskBits' in info)) {
      info.maskBits = 0xFFFF;
      }
  
      if (!('trackable' in info)) {
      info.trackable = true;
      }  
      /*
      if ('shape' in info) {
      info.shape = this.BodyShape.values[info.shape];
      } else {
      info.shape = this.BodyShape.values.rectangle;
      }
  
      if ('type' in info) {
      info.type = this.BodyType.values[info.type];
      } else {
      info.type = this.BodyType.values.staticBody;
      }*/
      //this.omap.set(info.bid, info);  
      await this.addBodyInternal(info);
  }

  async setCAction(bid, skin, skinType, facingLeft) {
      //const obj = this.getObj(bid);
      await this.setCActionInternal(bid, skin, facingLeft, skinType);
  }


  async addStage(bid, x, y, width, height) {
      let data = [];
  
  
      let obj = {
          name:'tiles',
          skin:'tiles',
          x:x,
          y:y,
          width:width,
          height:height,
          tilesInfo: {
              path:'tiled/tileset/0x72_DungeonTilesetII_v1.3.png',
              tileSizeX:16,
              tileSizeY:16,
              tileColumns:32,
              data:data,
          }
      };
  
      l1(width, height, data);
      await this.addBody(obj);    
      //obj['priority'] = 1;
      data = [];
      l2(width, height, data);
      obj.tilesInfo.data = data;
      await this.addBody(obj);     
      
      await this.addVoid(bid++, x+1,y+1+0.2,width-2,0.6);
      await this.addVoid(bid++, x+1,y+height-1+0.2,width-2,0.6);
      await this.addVoid(bid++, x+0.8,y+0.8,0.2,height-2+0.2);
      await this.addVoid(bid++, x+width-1,y+0.8,0.2,height-2+0.2);
      return bid;
  }    

  async addVoid(bid, x, y, width, height) {
      const x1 = Math.floor(x);
      const y1 = Math.floor(y);
      const x2 = Math.ceil(x + width);
      const y2 = Math.ceil(y + height);
      //console.log(x1,y1,x2,y2);
      for (let i=x1; i<x2; i++) {
        for (let j=y1; j<y2; j++) {
          this.walls.add(this.xyToNumber(i,j));
          //console.log(i,j, this.xyToNumber(i,j));
        }
      }

      await this.addBody({
          bid:bid,
          name:'void',
          skin:'wall',
          x:x,
          y:y,
          width:width,
          height:height,
          // priority:2,
        });
  }



  async playNoChange(bid, facingLeft) {
      await this.setCAction(bid, 'noChange', 'loop', facingLeft);
    }
  
    async playRun(bid, facingLeft) {
      await this.setCAction(bid, 'run', 'loop', facingLeft);
    }
  
    async playJump(bid, facingLeft) {
      await this.setCAction(bid, 'jump', 'loop', facingLeft);
    }  
  
    async playDoubleJumpNotify(bid, facingLeft) {
      await this.setCAction(bid, 'doubleJump', 'notify', facingLeft);
    }  
    
    async playIdle(bid, facingLeft) {
      await this.setCAction(bid, 'idle', 'loop', facingLeft);
    }  
  
    async playHitNotify(bid, facingLeft) {
      await this.setCAction(bid, 'hit', 'notify', facingLeft);
    }
    async playHitOnce(bid, facingLeft) {
      await this.setCAction(bid, 'hit', 'once', facingLeft);
    }  
  
    async opVel(bid, x, y) {
      await this.setBodyOp(bid, 'linearVelocity', x, y);
    }  
  
    async opVelY(bid, y) {
      await this.setBodyOp(bid, 'yLinearVelocity', 0, y);
    }  
  
    async opVelXright(bid, x) {
      await this.setBodyOp(bid, 'xConstantVelocity', 1, x);
    }  
  
    async opVelXleft(bid, x) {
      await this.setBodyOp(bid, 'xConstantVelocity', -1, x);
    }    
  
    async opAction(bid, x, y) {
      await this.setBodyOp(bid, 'action', x, y);
    }   
  
    async opRemove(bid, x, y) {
      await this.setBodyOp(bid, 'remove', x, y);
    } 
  
    async addFruit(bid, fruit, x, y) {
      await this.addBody({
        bid:bid,
        name:'fruit',
        skin:fruit,
        x:x,
        y:y,
        width:1,
        height:1,
        isSensor:true,
        // priority:2,
      });
    }  
  
    async addAnimatedObj(bid, x, y, tilesInfo) {
      await this.addBody({
        bid:bid,
        name:'animated_obj',
        x:x,
        y:y,
        width:1,
        height:1,
        tilesInfo:tilesInfo
      });
    } 
  
    async addAnimation(x, y, tilesInfo) {
      await this.addBody({
        name:'tiles',
        skin:'animation',
        x:x,
        y:y,
        width:1,
        height:1,
        tilesInfo:tilesInfo
      });
    }
  
    async addDisappearingAnimation(x, y, tilesInfo) {
      await this.addAnimation(x, y, {
        path:'Main Characters/Desappearing (96x96).png', 
        tileSizeX:96, 
        tileSizeY:96,
        tileColumns:7,
        data:[0, 1, 2, 3, 4, 5, 6]      
      });
    }  
    
    async addSpike(bid, x, y) {
      await this.addBody({
        bid:bid,
        name:'animated_obj',
        skin:'spike',
        x:x,
        y:y,
        width:1,
        height:1,
        tilesInfo: {
          path:'tiled/tileset/0x72_DungeonTilesetII_v1.3.png', 
          tileSizeX:16, 
          tileSizeY:16,
          tileColumns:32,
          data:[929,930,931,932, 931, 930]
        }
      });
    }
  
    async addCoin(bid, x, y) {
      await this.addBody({
        bid:bid,
        name:'animated_obj',
        skin:'coin',
        x:x,
        y:y,
        width:1,
        height:1,
        tilesInfo: {
          path:'tiled/tileset/0x72_DungeonTilesetII_v1.3.png', 
          tileSizeX:16, 
          tileSizeY:16,
          tileColumns:32,
          data:[403,404,405,406]
        }
      });
  }    
  

  async addActor(bid, name, x, y) {
    //console.log('wait - addActor');    
    this.prepareAck(bid);
    const hx = 0.25/2;
        const hy = 0.25/2;
    await this.addBody({
      bid:bid,
      name:'actor',
      skin:name,
      shape:'polygon',
      x:x,
      y:y-0.2,
      width:1,
      height:1,
      type:'dynamic',
      facingLeft:true,
      floats:[-hx, -hy/2, hx, hy/2, hx, hy*2, -hx, hy*2]
    });  
    const value = await this.waitAckValue(bid);
  }
  
  async moveActor(bid, cmdname, facingLeft) {
    await this.playRun(bid, facingLeft);
    console.log('wait - moveActor', cmdname);
    this.prepareAck();    
    await this.command({
        ints:[bid],
        strings:[cmdname],
        floats:[0, -0.2],
      });
    const value = await this.waitAckValue(bid);
    console.log('act - moveActor', cmdname, value);
    await this.playIdle(bid, facingLeft);
  }  

  async moveBack(bid) {
    await this.playRun(bid);
    await this.command({
        ints:[bid],
        strings:['moveBack'],
        floats:[0, -0.2],
      });
  }

  async moveLeft(bid) {
    this.facingLeft = true;
    await this.moveActor(bid, 'moveLeft', this.facingLeft);
  }

  async moveRight(bid) {
    this.facingLeft = false;
    await this.moveActor(bid, 'moveRight', this.facingLeft);
  }  

  async moveUp(bid) {
    await this.moveActor(bid, 'moveUp');
  }

  async moveDown(bid) {
    await this.moveActor(bid, 'moveDown');
  }
      
    
  async isLeftWall(bid)
  {
    const info = await this.queryBodyinfo(bid);
    const x = Math.floor(info.x);
    const y = Math.floor(info.y);
    //console.log(x-1, y, this.xyToNumber(x-1, y));
    //console.log(this.walls);
    return this.walls.has(this.xyToNumber(x-1, y));
  }

  xyToNumber(x, y) {
    return (x<<16) + y;
  }

  async isRightWall(bid)
  {
    const info = await this.queryBodyinfo(bid);
    const x = Math.floor(info.x);
    const y = Math.floor(info.y);
    return this.walls.has(this.xyToNumber(x+1, y));
  }
    
  async isUpWall(bid)
  {
    const info = await this.queryBodyinfo(bid);
    const x = Math.floor(info.x);
    const y = Math.floor(info.y);
    return this.walls.has(this.xyToNumber(x, y-1));
  }
  
  async isDownWall(bid)
  {
    const info = await this.queryBodyinfo(bid);
    const x = Math.floor(info.x);
    const y = Math.floor(info.y);
    return this.walls.has(this.xyToNumber(x, y+1));
  }  

}


//exports.main = main;
//exports.NginX = NginX;

//export { main, NginX};
module.exports = { main, NginX};//
