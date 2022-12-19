var fs = require('fs');
var {EventHandler} = require("./ngin");
import {main, Nx} from "./nx";
import {CObject, CAction, CActionType, CPhysical, CVisible, CTileObject, CStage, CVector2, CSize, CBodyType, CBodyShape, CJoystickDirectionals} from "./cobj";
var {run} = require("./testutil.js");

async function aaa(nx) {
    for (let i=0; i<12; i++) {
        for (let j=0; j<12; j++) {
            if (i<=j) {
                nx.add(i, j);
            }
        }
    }
    nx.submit();
}

run(aaa);