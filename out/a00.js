var run = require("./testutil.js").run;
function aaa(cmd) {
    for (var i = 0; i < 12; i++) {
        for (var j = 0; j < 12; j++) {
            if (i <= j) {
                cmd.add(i, j);
            }
        }
    }
    cmd.submit();
}
run(aaa);
//# sourceMappingURL=a00.js.map