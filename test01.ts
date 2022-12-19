import { CAction, CActionType, CObject, CVisible, CVector2, CSize } from "./cobj.js";
import {run, TestUtil, Stopwatch} from "./testutil.js";

export async function test01(ngin, width, height, margin, func, stopwatch) {
    var util = new TestUtil(ngin);
    const set = new Set();
    let nothing_to_delete = 0;

    for (let i=0; i<width; i++) {
        for (let j=0; j<height; j++) {
            if (func(i,j)) {
                set.add(i*100+j);
            }
        }
    }
    ngin.eventHandler.handleEvent = (event) => {
        console.log(event);
        const x = event.x;
        const y = event.y;
        if (set.has(x*100+y)) {
            set.delete(x*100+y);
        } else {
            nothing_to_delete++;
            console.log('wrong:', x, y);
        }        
    };

    await ngin.command({strings:['enable'], ints:[4041, 0]});    

    var obj = new CObject(100);
    obj.visible = new CVisible([new CAction(util.drawSvgGrid(width, height, func), new CSize(width, height), [], CActionType.svg)]);
    obj.visible.current = CActionType.svg;
    obj.visible.size = new CSize(width, height);
    obj.visible.anchor = new CVector2(0,0);    
    await ngin.addCObjectInternal(obj.build());

    await util.countDown(width, height, 3, 1);
    stopwatch.run();

    await ngin.command({strings:['enable'], ints:[4041, 1]});
    ngin.prepareAck();    
    await ngin.command({strings:['wait'], ints:[4040]});   
    const value = await ngin.waitAckValue(4040);
    console.log('ack:', value);  

    let message;
    let size;    
    let fill;
    let fillopacity;
    let result = true;
    if(set.size == 0 && nothing_to_delete == 0) {
        //console.log("SUCCESS!");
        message = "SUCCESS!";
        size = 2;
        fill = "blue";
        fillopacity = 1;
    } else {
        //console.log("FAILURE!");
        message = "FAILURE!";
        size = 2;
        fill = "red";
        fillopacity = 1;
        result = false;
    }



    obj = new CObject(10000);
    obj.visible = new CVisible([new CAction(util.drawSvgTextFullScreen(width+margin, height, message, size, fill, fillopacity), new CSize(width, height), [], CActionType.svg)]);
    obj.visible.current = CActionType.svg;
    obj.visible.size = new CSize(width+margin, height);
    obj.visible.anchor = new CVector2(0,0);
    await ngin.addCObjectInternal(obj.build());


    stopwatch.stop();

    await util.countDown(width, height, 3, 1);

    await ngin.command({strings:['removeAll']});
    return [result, set.size + nothing_to_delete];
}

module.exports = {test01};