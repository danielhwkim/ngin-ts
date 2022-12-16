var fs = require('fs');
var {EventHandler} = require("./ngin");
import {main, NginEx} from "./util";
import {CObject, CAction, CAnimation, CPhysical, CVisible, CTileObject, Stage, Pos, Size, BodyType, BodyShape, JoystickDirectionals} from "./cobj";
var {run} = require("./testutil.js");

async function aaa(cmd) {
    var x = new NginEx(cmd.ngin);

    for (let i=0; i<12; i++) {
        for (let j=0; j<12; j++) {
            if (i<=j) {
                x.add(i, j);
            }
        }
    }
    cmd.submit();
}

run(aaa);