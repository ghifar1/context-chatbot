# Context For Chat Bot
Simplify your code for chatbot without headache.

## Installation
Copy this code to your command line.
```console
npm i context-chatbot
```
and add this code to your project.
```javascript
import { default as context } from "context-chatbot";
```
## Quick Start
- first, register context to module.
```javascript
context.registerContext('welcome', ()=>{
    console.log('hello')
})
```
or register from array.
```javascript
context.registerArrayContext([
    {
        state: 'welcome',
        callback: ()=>{
            console.log('welcome')
        }
    }
])

```
- then, set state for id (person/number/etc).
```javascript
context.setState('6281955551111', 'welcome')
```
- finally, put this line code to your bot file.
```javascript
context.Context('6281955551111')
//output 'welcome'
```


