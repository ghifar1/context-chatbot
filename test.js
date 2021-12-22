import { default as context } from "./index.js";


context.registerContext('base', (param)=>{
    console.log('hello')
    console.log(param)
})

context.registerArrayContext([
    {
        state: 'welcome',
        callback: (param) =>{
            console.log('welcome')
            console.log(param)
        }
    }
])

context.setState('6285101010101', 'base')

context.Context('6285101010101')