//"use strict";
exports.__esModule = true;
exports.l2 = exports.l1 = exports.l1p2 = exports.l12 = void 0;
var deco_x = 1;
var deco_y = 2;
var offset = 1;
// L2
var wall_LT = 224;
var wall_L = 256;
var wall_LB = 288;
var wall_RT = 225;
var wall_R = 257;
var wall_RB = 289;
// L1
var wall_ML = 33;
var wall_M = 34;
var wall_MR = 35;
// L2
var wall_MTL = 1;
var wall_MT = 2;
var wall_MTR = 3;
// L1
var floors = [129, 130, 131, 161, 162, 163, 193, 194];
// L1 wall decoration
var wall_deco_top = 4;
var wall_deco_red = 38;
var wall_deco_bottom_red = 68;
var wall_deco_blue = 100;
var wall_deco_bottom_blue = 132;
// L3
var brick_up = 805;
var brick_mid = 837;
var brick_down = 869;
function l12(w, h, tiles) {
    tiles.push(wall_LT + 1);
    tiles.push(wall_MTL + 1);
    for (var i = 0; i < w - 4; i++) {
        tiles.push(wall_MT + 1);
    }
    tiles.push(wall_MTR + 1);
    tiles.push(wall_RT + 1);
    tiles.push(wall_L + 1);
    tiles.push(wall_ML + 1);
    for (var i = 0; i < w - 4; i++) {
        tiles.push(wall_M + 1);
    }
    tiles.push(wall_MR + 1);
    tiles.push(wall_R + 1);
    for (var i = 0; i < h - 3; i++) {
        tiles.push(wall_L + 1);
        for (var j = 0; j < w - 2; j++) {
            tiles.push(floors[1] + 1);
        }
        tiles.push(wall_R + 1);
    }
    tiles.push(wall_LB + 1);
    tiles.push(wall_ML + 1);
    for (var i = 0; i < w - 4; i++) {
        tiles.push(wall_M + 1);
    }
    tiles.push(wall_MR + 1);
    tiles.push(wall_RB + 1);
}
exports.l12 = l12;
function l1p2(w, h, tiles) {
    // L1
    for (var i = 0; i < w; i++) {
        tiles.push(0);
    }
    tiles.push(0);
    tiles.push(wall_ML + 1);
    for (var i = 0; i < w - 4; i++) {
        tiles.push(wall_M + 1);
    }
    tiles.push(wall_MR + 1);
    tiles.push(0);
    for (var i = 0; i < h - 3; i++) {
        tiles.push(0);
        for (var i = 0; i < w - 2; i++) {
            tiles.push(floors[1] + 1);
        }
        tiles.push(0);
    }
    for (var i = 0; i < w; i++) {
        tiles.push(0);
    }
    //L2
    tiles.push(wall_LT + 1);
    tiles.push(wall_MTL + 1);
    for (var i = 0; i < w - 4; i++) {
        tiles.push(wall_MT + 1);
    }
    tiles.push(wall_MTR + 1);
    tiles.push(wall_RT + 1);
    tiles.push(wall_L + 1);
    for (var i = 0; i < w - 2; i++) {
        tiles.push(0);
    }
    tiles.push(wall_R + 1);
    for (var i = 0; i < h - 4; i++) {
        tiles.push(wall_L + 1);
        for (var j = 0; j < w - 2; j++) {
            tiles.push(0);
        }
        tiles.push(wall_R + 1);
    }
    tiles.push(wall_L + 1);
    tiles.push(wall_MTL + 1);
    for (var i = 0; i < w - 4; i++) {
        tiles.push(wall_MT + 1);
    }
    tiles.push(wall_MTR + 1);
    tiles.push(wall_R + 1);
    tiles.push(wall_LB + 1);
    tiles.push(wall_ML + 1);
    for (var i = 0; i < w - 4; i++) {
        tiles.push(wall_M + 1);
    }
    tiles.push(wall_MR + 1);
    tiles.push(wall_RB + 1);
}
exports.l1p2 = l1p2;
function l1(w, h, tiles) {
    // L1
    for (var i = 0; i < w; i++) {
        tiles.push(0);
    }
    tiles.push(0);
    tiles.push(wall_ML + 1);
    for (var i = 0; i < w - 4; i++) {
        tiles.push(wall_M + 1);
    }
    tiles.push(wall_MR + 1);
    tiles.push(0);
    for (var i = 0; i < h - 3; i++) {
        tiles.push(0);
        for (var j = 0; j < w - 2; j++) {
            tiles.push(floors[1] + 1);
        }
        tiles.push(0);
    }
    //for _ in range(w):
    //  tiles.push(0)
    tiles.push(wall_LB + 1);
    tiles.push(wall_ML + 1);
    for (var i = 0; i < w - 4; i++) {
        tiles.push(wall_M + 1);
    }
    tiles.push(wall_MR + 1);
    tiles.push(wall_RB + 1);
}
exports.l1 = l1;
function l2(w, h, tiles) {
    // L2
    tiles.push(wall_LT + 1);
    tiles.push(wall_MTL + 1);
    for (var i = 0; i < w - 4; i++) {
        tiles.push(wall_MT + 1);
    }
    tiles.push(wall_MTR + 1);
    tiles.push(wall_RT + 1);
    tiles.push(wall_L + 1);
    for (var i = 0; i < w - 2; i++) {
        tiles.push(0);
    }
    tiles.push(wall_R + 1);
    for (var i = 0; i < h - 4; i++) {
        tiles.push(wall_L + 1);
        for (var j = 0; j < w - 2; j++) {
            tiles.push(0);
        }
        tiles.push(wall_R + 1);
    }
    tiles.push(wall_L + 1);
    tiles.push(wall_MTL + 1);
    for (var i = 0; i < w - 4; i++) {
        tiles.push(wall_MT + 1);
    }
    tiles.push(wall_MTR + 1);
    tiles.push(wall_R + 1);
}
exports.l2 = l2;
