var protobuf = require("protobufjs");
//var fs = require('fs');
const net = require('net');
const client = new net.Socket();
const EventEmitter = require('events');
client.setNoDelay(true);
var bonjour = require('bonjour')()


var ngin;

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
  constructor(ngin) {
  }

  async handle(cmdinfo) {
    switch(cmdinfo.head) {
      case ngin.Head.values.contact:
        await this.handleContact(cmdinfo.contact);
        break;
      case ngin.Head.values.event: 
        await this.handleEvent(cmdinfo.event);        
        break;
      case ngin.Head.values.key:     
        await this.handleKey(cmdinfo.key);        
        break;        
      case ngin.Head.values.directional:
        cmdinfo.directional.direction = ngin.JoystickMoveDirectional.values[cmdinfo.directional.direction];
        cmdinfo.directional.iid = ngin.TouchInputId.values[cmdinfo.directional.iid];
        await this.handleDirectional(cmdinfo.directional);        
        break;
      case ngin.Head.values.button:
        cmdinfo.button.event = ngin.ActionEvent.values[cmdinfo.button.event];
        cmdinfo.button.iid = ngin.TouchInputId.values[cmdinfo.button.iid];        
        await this.handleButton(cmdinfo.button);        
        break;
      case ngin.Head.values.cmd:
        await this.handleCmd(cmdinfo.cmd);
        break;
        /*
      case ngin.Head.values.queryresult:
        await this.handleQueryResult(cmdinfo.queryresult);        
        break;
      case ngin.Head.values.bodyinfoqueryresult:
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
  CStageInfo;
  BodyShape;
  BodyType;
  CAction;
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
  walls;
  precision = 3;
  eventHandler;

  constructor(root) {
    this.root = root;
    this.CObject = root.lookupType("commander.CObject");
    this.BodyShape = root.lookupEnum("commander.BodyShape");
    this.BodyType = root.lookupEnum("commander.BodyType");
    this.CActionType = root.lookupEnum("commander.CActionType");
    this.Head = root.lookupEnum("commander.Head");
    this.CStageInfo = root.lookupType("commander.CStageInfo");
    this.Cmd = root.lookupType("commander.Cmd");    
    this.CmdInfo = root.lookupType("commander.CmdInfo");   
    this.JoystickDirectionals = root.lookupEnum("commander.JoystickDirectionals");
    this.JoystickMoveDirectional = root.lookupEnum("commander.JoystickMoveDirectional");
    this.TouchInputId = root.lookupEnum("commander.TouchInputId");
    this.ActionEvent = root.lookupEnum("commander.ActionEvent");
    this.BodyInfoQuery = root.lookupType("commander.BodyInfoQuery");
    this.BodyInfoQueryResult = root.lookupType("commander.BodyInfoQueryResult");
    this.QueryInfo = root.lookupType("commander.QueryInfo");

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
    const buf_body = await this.CStageInfo.encode(info).finish();
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
    const buf_body = this.CActionInfo.encode(info).finish();
    await this.send(buf_body, this.Head.values.bodystatus);
  }

  async send(buf_body, head)
  {
    const buf_head = Buffer.alloc(4);
    buf_head.writeUInt32LE(head);
    const buf_len = Buffer.alloc(4);
    buf_len.writeUInt32LE(buf_body.length);
    const buf = Buffer.concat([buf_head, buf_len, buf_body]);
    await client.write(buf);
  }

  async queryBodyinfo(bid) {
    const buf_body = this.BodyInfoQuery.encode({qid:bid}).finish();
    this.bodyinfoEmitter = new EventEmitter();
    await this.send(buf_body, this.Head.values.bodyinfoquery);
    const [value] = await EventEmitter.once(this.bodyinfoEmitter, 'bodyinfo');
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

