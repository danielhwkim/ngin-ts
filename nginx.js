/*
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
  }*/
/*
  async setCAction(bid, skin, skinType, facingLeft) {
      //const obj = this.getObj(bid);
      await this.setCActionInternal(bid, skin, facingLeft, skinType);
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
  
  
    async addDisappearingAnimation(x, y, tilesInfo) {
      await this.addAnimation(x, y, {
        path:'Main Characters/Desappearing (96x96).png', 
        tileSizeX:96, 
        tileSizeY:96,
        tileColumns:7,
        data:[0, 1, 2, 3, 4, 5, 6]      
      });
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
*/
//}

//module.exports = { main, NginX};//
