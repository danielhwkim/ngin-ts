var {runq, Util, Stopwatch} = require("./testutil.js");
var {test01} = require("./test01.js");

const hint = "\
### Python\n\
\n\
```python\n\
run((cmd) =>  {\n\
    for (let i=0; i<12; i++) {\n\
        for (let j=0; j<12; j++) {\n\
            if (😄) {\n\
                cmd.add(i, j);\n\
            }\n\
        }\n\
    }\n\
    cmd.submit();\n\
});\n\
```\n\
\n\
### Comparison Operators\n\
\n\
| Operator | Meaning                  |\n\
| -------- | ------------------------ |\n\
| `==`     | Equal to                 |\n\
| `!=`     | Not equal to             |\n\
| `<`      | Less than                |\n\
| `>`      | Greater Than             |\n\
| `<=`     | Less than or Equal to    |\n\
| `>=`     | Greater than or Equal to |\n\
\n\
### Math Operators\n\
\n\
From **Highest** to **Lowest** precedence:\n\
\n\
| Operators | Operation        | Example         |\n\
| --------- | ---------------- | --------------- |\n\
| **        | Exponent         | `2 ** 3 = 8`    |\n\
| %         | Modulus/Remainder | `22 % 8 = 6`    |\n\
| //        | Integer division | `22 // 8 = 2`   |\n\
| /         | Division         | `22 / 8 = 2.75` |\n\
| *         | Multiplication   | `3 * 3 = 9`     |\n\
| -         | Subtraction      | `5 - 2 = 3`     |\n\
| +         | Addition         | `2 + 2 = 4`     |\n\
\n\
";

runq(async (ngin) =>{
    const x = 0;
    const y = 0;
    const width = 12;
    const height = 12;
    const margin = 3;
    let gid = 100;

    await ngin.initScreen({
        background: 'Blue',
        gravityX: 0.0,
        gravityY: 0.0,    
        width: width+margin,
        height: height,
        debug: false,
    });

    await ngin.command({
        strings:['hint', hint], 
        ints:[0], 
    }); 
    /*
    let funcsAll = [[(i,j)=>i<j, (i,j)=>i<=j, (i,j)=>i>j, (i,j)=>i>=j],
        [(i,j)=>i==j, (i,j)=>i!=j],
        [(i,j)=>i < j+2, (i,j)=>i > j+2, (i,j)=>i <= j-2, (i,j)=>i >= j-2],
        [(i,j)=>j%2, (i,j)=>i%2, (i,j)=> j<=6, (i,j)=>i<=6, (i,j)=>i>6, (i,j)=>j>6],
        [(i,j)=>j%2 != i%2, (i,j)=>j%2 == i%2]];
*/
    
    let funcsAll = [[(i,j)=>i<j, (i,j)=>i<=j, (i,j)=>i>j, (i,j)=>i>=j],
        [(i,j)=>i==j, (i,j)=>i!=j, (i,j)=>i == j+2, (i,j)=>i != j-2],
        [(i,j)=>i < j*2, (i,j)=>i > j*2, (i,j)=>i <= j/2, (i,j)=>i >= j/2, (i,j)=>i+j<15, (i,j)=>i*j<50],
        [(i,j)=>j%2, (i,j)=>i%2, (i,j)=> j<=6, (i,j)=>i<=6, (i,j)=>i>6, (i,j)=>j>6],
        [(i,j)=>j%2 != i%2, (i,j)=>j%2 == i%2, (i,j)=>j%3 == i%3, (i,j)=>j%3 != i%3]];
    console.log(Math.floor(Math.random()*10));
    console.log(Math.floor(Math.random()*10));
    console.log(Math.floor(Math.random()*10));
    console.log(Math.floor(Math.random()*10));
    console.log(Math.floor(Math.random()*10));                
    ngin.eventHandler.ready = true;
    let stopwatch = new Stopwatch(ngin, 200, [12,0,2,1]);
    c = 0;
    let func = undefined;
    while (c < funcsAll.length) {
        if (func == undefined) {
            let funcs = funcsAll[c];
            let v = Math.random()*funcs.length;
            let r = Math.floor(v);
            console.log(c, funcs.length, v, r);
            func = funcs[r];
        }
        let result = await test01(ngin, width, height, margin, func, stopwatch);
        console.log(result);
        if (result[0]) {
            c += 1;
            func = undefined;
        } else {
            stopwatch.num += 10;
        }
    }
});