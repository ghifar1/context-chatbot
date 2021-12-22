import { default as context } from "./index.js";

context.setMiddleware((id, payload, next)=>{
    
    if(id == "6285101010101")
    {
        console.log("benar")
        context.setState('6285101010101', 'welcome')
    }
    next()
})

context.setDefaultState('base')

context.registerContext('base', (id, payload)=>{
    console.log('hello ' + id)
    console.log(payload)
    return "wow"
})



context.registerArrayContext([
    {
        state: 'welcome',
        callback: (id, payload) =>{
            console.log('welcome ' +  id)
            console.log(payload)
            return "wow"
        }
    }
])

// context.setState('6285101010101', 'base')

context.Context('6285101010101', 'aowieeoeoe')

context.setState('6285101010101', 'welcome')

context.Context('6285101010101', 'aowieeoeoe')