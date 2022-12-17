var protobuf = require("protobufjs");
//var fs = require('fs');
const net = require('net');
const client = new net.Socket();
const EventEmitter = require('events');
client.setNoDelay(true);
var bonjour = require('bonjour')()


var ngin;
//exports.__esModule = true;

function mainInternal(type, port, body) {
  // browse for all http services
  if (type[3] == '.') {
    setTimeout(async () => {
      const root = await protobuf.load("command.proto");  
      await body(type, root);
    }, 0);
  } else {
    bonjour.find({ type: type }, async function (service) {
      console.log(service.addresses);
      let host;
      for (let addr in service.addresses) {
        addr = service.addresses[addr];
        console.log('addr:', addr);
        if (addr[3] == '.') {
          host = addr;
        }
      }
      //const host = service.addresses[2];
      //const port = 4040;  
      console.log('host:', host);
      const root = await protobuf.load("command.proto");  
      await body(host, root);
  
    });
  }
}

export function main(type, port, body) {

  mainInternal(type, port, async function (host, root) {
      let x = new Ngin(root);
      await ngin.connect(host, port);
      //ngin.eventHandler = eventHandler; //new InputHandler(ngin);
  
      await body(ngin);
  })
}

class EventHandler {
  ngin;
  actorBid = 0;
  //directionMap = {};
  constructor(ngin) {
    this.ngin = ngin;

    //for (const i in this.ngin.JoystickMoveDirectional.values) {
      //console.log(i, typeof i, this.ngin.JoystickMoveDirectional.values[i]);
      //this.directionMap[i] = 
    //}

  }

  async handle(cmdinfo) {
    switch(cmdinfo.head) {
      case this.ngin.Head.values.contact:
        /*
        if (cmdinfo.contact.type == this.ngin.ContactType.values.begin) {
          cmdinfo.contact.type = 'begin';
        } else {
          cmdinfo.contact.type = 'end';
        }
        */
        await this.handleContact(cmdinfo.contact);
        break;
      case this.ngin.Head.values.event:
        /*
        if (cmdinfo.event.type == this.ngin.EventType.values.complete) {
          cmdinfo.event.type = 'complete';
        } else {
          cmdinfo.event.type = 'ready';
        } */       
        await this.handleEvent(cmdinfo.event);        
        break;
      case this.ngin.Head.values.key:
        /*
        if (cmdinfo.key.type == this.ngin.KeyType.values.down) {
          cmdinfo.key.type = 'down';
        } else {
          cmdinfo.key.type = 'up';
        } */         
        await this.handleKey(cmdinfo.key);        
        break;        
      case this.ngin.Head.values.directional:
        cmdinfo.directional.direction = this.ngin.JoystickMoveDirectional.values[cmdinfo.directional.direction];
        cmdinfo.directional.iid = this.ngin.TouchInputId.values[cmdinfo.directional.iid];
        /*
        if (cmdinfo.directional.type == this.ngin.KeyType.values.down) {
          cmdinfo.directional.type = 'down';
        } else {
          cmdinfo.directional.type = 'up';
        } */            
        await this.handleDirectional(cmdinfo.directional);        
        break;
      case this.ngin.Head.values.button:
        cmdinfo.button.event = this.ngin.ActionEvent.values[cmdinfo.button.event];
        cmdinfo.button.iid = this.ngin.TouchInputId.values[cmdinfo.button.iid];        
        await this.handleButton(cmdinfo.button);        
        break;
      case this.ngin.Head.values.cmd:
        await this.handleCmd(cmdinfo.cmd);
        break;
        /*
      case this.ngin.Head.values.queryresult:
        await this.handleQueryResult(cmdinfo.queryresult);        
        break;
      case this.ngin.Head.values.bodyinfoqueryresult:
        await this.handleBodyInfoQueryResult(cmdinfo.bodyinfoqueryresult);        
        break;   */   
    }
  }

  async handleContact(contact) {
    console.log(contact);
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
  /*
  async handleQueryResult(result:any) {
    console.log(result);
  }
  
  async handleBodyInfoQueryResult(result:any) {
    console.log(result);
  }  */
}

class Ngin {
  CObject;
  //BodyInfo;
  InitInfo;
  BodyShape;
  BodyType;
  //BodyOpInfo;
  BodyOp;
  //CActionInfo;
  CAction;
  //CActionType;
  //CActionExtra;
 // ContactType;
  //EventType;
  //KeyType;
  CmdType;
  Cmd;
  CmdInfo;
  Head;
  root;
  cmdEmitter;
  ackEmitter;
  resultEmitter;
  bodyinfoEmitter;
  JoystickDirectionals;
  JoystickMoveDirectional;
  TouchInputId;
  ActionEvent;
  BodyInfoQuery;
  BodyInfoQueryResult;
  QueryInfo;
  //omap;
  walls;
  precision = 3;
  eventHandler;

  constructor(root) {
    this.root = root;
    this.CObject = root.lookupType("commander.CObject");
    this.BodyShape = root.lookupEnum("commander.BodyShape");
    this.BodyType = root.lookupEnum("commander.BodyType");
    //this.BodyOpInfo = root.lookupType("commander.BodyOpInfo");    
    this.BodyOp = root.lookupEnum("commander.BodyOp");    
    //this.CActionInfo = root.lookupType("commander.CActionInfo");
    this.CActionType = root.lookupEnum("commander.CActionType");
    //this.CActionType = root.lookupEnum("commander.CActionType");
    //this.CActionExtra = root.lookupEnum("commander.CActionExtra");         
    //this.ContactType = root.lookupEnum("commander.ContactType");  
    //this.EventType = root.lookupEnum("commander.EventType");    
    //this.KeyType = root.lookupEnum("commander.KeyType"); 
    //this.BodyInfo = root.lookupType("commander.BodyInfo");
    this.Head = root.lookupEnum("commander.Head");
    this.InitInfo = root.lookupType("commander.InitInfo");
    this.CmdType = root.lookupEnum("commander.CmdType");
    this.Cmd = root.lookupType("commander.Cmd");    
    //console.log(this.InitInfo);
    this.CmdInfo = root.lookupType("commander.CmdInfo");   
    this.JoystickDirectionals = root.lookupEnum("commander.JoystickDirectionals");
    this.JoystickMoveDirectional = root.lookupEnum("commander.JoystickMoveDirectional");
    this.TouchInputId = root.lookupEnum("commander.TouchInputId");
    this.ActionEvent = root.lookupEnum("commander.ActionEvent");
    this.BodyInfoQuery = root.lookupType("commander.BodyInfoQuery");
    this.BodyInfoQueryResult = root.lookupType("commander.BodyInfoQueryResult");
    this.QueryInfo = root.lookupType("commander.QueryInfo");
    //this.eventEmitter = new EventEmitter();

    this.walls = new Set();
    ngin = this;
  }

  async connect(host, port) {
    console.log(host, port);
    client.on('data',  function(chunk) {
      ngin.onCmd(chunk);
    });
    
    client.on('end', function() {
      console.log('Requested an end to the TCP connection');
    });

    await client.connect({ port: port, host: host });
  }


  async addCObjectInternal(cobj) {
    if ('visible' in cobj) {
      cobj.visible.current = this.CActionType.values[cobj.visible.current];
      for (var i = 0; i < cobj.visible.actions.length; i++) {
        var a = cobj.visible.actions[i];
        a.type = this.CActionType.values[a.type];
      }
    }

    if ('physical' in cobj) {
      cobj.physical.shape = this.BodyShape.values[cobj.physical.shape];
      cobj.physical.type = this.BodyType.values[cobj.physical.type];
    }
    const buf_cobj = this.CObject.encode(cobj).finish();

    //console.log(info.bid, info);  
    await this.send(buf_cobj, this.Head.values.cobject);
  }
  
  async initScreen(info) {
    if (info.joystickPrecision) {
      this.precision = info.joystickPrecision;
    }

    if ('joystickDirectionals' in info) {
      info.joystickDirectionals = this.JoystickDirectionals.values[info.joystickDirectionals];
    }
    if ('button1' in info) {
      info.button1 = this.ActionEvent.values[info.button1];
    }
    if ('button2' in info) {
      info.button2 = this.ActionEvent.values[info.button2];
    }        
    const buf_body = await this.InitInfo.encode(info).finish();
    await this.send(buf_body, this.Head.values.init);
  }

  async onCmd(chunk) {
    let index = 0;

    while (index < chunk.length) {
      const size_info = chunk.slice(index, index+4);
      const size = size_info.readUint32LE(0);
      //console.log('index:', index, 'chunk size:', chunk.length, 'cmd size:', size);
      const data = chunk.slice(index+4, index+4+size);

      const cmd = this.CmdInfo.decode(data); 
      const head = this.Head.valuesById[cmd.head];
      //console.log('onCmd:', size, head, chunk.length, index, data.length);        
      if (cmd.head == this.Head.values.cmd) {
        this.cmdEmitter.emit('cmd', cmd.cmd);
      } else if (cmd.head == this.Head.values.ack) {
        console.log('ack:', cmd.ack.code);
        this.ackEmitter.emit('ack', cmd.ack.code);
      } else if  (cmd.head == this.Head.values.bodyinfoqueryresult) {
        this.bodyinfoEmitter.emit('bodyinfo', cmd.bodyinfo);
      } else if  (cmd.head == this.Head.values.queryresult) {
        this.resultEmitter.emit('result', cmd.result);
      } else {
        if (this.eventHandler) {
          await this.eventHandler.handle(cmd);
        }
      }

      index = index+4+size;
    }
  }

  async setCActionInternal(bid, skin, facingLeft, skinType) {
    let extra = 0;
    if (facingLeft != undefined) {
      if (facingLeft) {
        extra = this.CActionExtra.values.left;
      } else {
        extra = this.CActionExtra.values.right;        
      }
    }
    const info = {
      bid:bid,
      skin:this.CActionType.values[skin],
      type:skinType? this.CActionType.values[skinType]:0,
      extra:extra,
    };
    //console.log(info);
    const buf_body = this.CActionInfo.encode(info).finish();
    await this.send(buf_body, this.Head.values.bodystatus);
  }
  /*
  async setBodyOp(bid, op, x, y) {
    const buf_body = this.BodyOpInfo.encode({
      bid:bid,
      op:this.BodyOp.values[op],
      x:x,
      y:y,
    }).finish();
    await this.send(buf_body, this.Head.values.bodyop);
  } */

  async send(buf_body, head)
  {
    const buf_head = Buffer.alloc(4);
    buf_head.writeUInt32LE(head);
    const buf_len = Buffer.alloc(4);
    buf_len.writeUInt32LE(buf_body.length);
    const buf = Buffer.concat([buf_head, buf_len, buf_body]);
    //console.log(head, buf_body.length);
    //console.log(buf);
    await client.write(buf);
  }

  async queryBodyinfo(bid) {
    const buf_body = this.BodyInfoQuery.encode({qid:bid}).finish();
    this.bodyinfoEmitter = new EventEmitter();
    await this.send(buf_body, this.Head.values.bodyinfoquery);
    const [value] = await EventEmitter.once(this.bodyinfoEmitter, 'bodyinfo');
    //console.log('bodyinfo', value);
    return value;
  }

  prepareAck(bid) {
    this.ackEmitter = new EventEmitter();
  }

  async waitAckValue(bid) {
    const [value] = await EventEmitter.once(this.ackEmitter, 'ack');
    return value;
  }

  async command(info) {
    const cmd = this.Cmd.encode(info).finish();
    await this.send(cmd, this.Head.values.cmd);    
  }
}

module.exports = { mainInternal, EventHandler, Ngin, main};

