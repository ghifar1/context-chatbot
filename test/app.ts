#!/usr/bin/env ts-node-script
import context from "../index"

context.registerArrayContext([
    {
        state: 'welcome',
        callback: ()=>{
            console.log("welcome!")
        }
    }
])