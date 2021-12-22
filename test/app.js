#!/usr/bin/env ts-node-script
"use strict";
exports.__esModule = true;
var index_1 = require("../index");
index_1["default"].registerArrayContext([
    {
        state: 'welcome',
        callback: function () {
            console.log("welcome!");
        }
    }
]);
