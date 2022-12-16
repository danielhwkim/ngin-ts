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


    await ngin.command({
        strings:['svg', util.drawSvgGrid(width, height, func)], 
        ints:[100,100], 
        floats:[0, 0, width, height],
    });

    await util.countDown(width, height, 3, 1);
    //await ngin.addCoin(1000, 3, 4);

    //let stopwatch = new Stopwatch(ngin, 200, [12,0,2,1]);
    stopwatch.run();


    await ngin.command({strings:['enable'], ints:[4041, 1]});
    ngin.prepareAck();    
    await ngin.command({strings:['wait'], ints:[4040]});   
    const value = await ngin.waitAckValue(4040);
    console.log('ack:', value);  

    //console.log(set);
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

    await ngin.command({
        strings:['svg', util.drawSvgTextFullScreen(width+margin, height, message, size, fill, fillopacity)], 
        ints:[10000], 
        floats:[0, 0, width+margin, height],
    }); 

    stopwatch.stop();

    await util.countDown(width, height, 3, 1);

    await ngin.command({strings:['removeAll']});
    return [result, set.size + nothing_to_delete];
}

module.exports = {test01};