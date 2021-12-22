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
context.registerContext('welcome', (id, payload)=>{
    console.log('hello ' + id)
    console.log(payload)
})
```
or register from array.
```javascript
context.registerArrayContext([
    {
        state: 'welcome',
        callback: (id, payload)=>{
            console.log('welcome' + id)
            console.log(payload)
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
context.Context('6281955551111', 'this is payload')
// output:
// 'welcome 6281955551111'
// 'this is payload'
```

## API
----------
### **`context.registerContext(state, callback)`**
----------
Create a context with named state

- `state: string`
- `callback: Function`
  - `id: string`
  - `payload: any`
----------
### **`context.registerArrayContext(arr)`**
----------
Create a context from array of object

- `arr: Array of object`
  - `state: string`
  - `callback: Function`
    - `id: string`
    - `payload: any`

----------
### **`context.setState(id, state)`**
----------
change the state of an id

- `id: string`
- `state: string`

----------
### **`context.Context(id, payload)`**
----------
determine context of an id (if state id not found, 'base' status will be added automatically. Make sure to add 'base' context first, but you can change the default state, check API below)

- `id: string`
- `state: any`

----------
### **`context.setDefaultState(state)`**
----------
set default state if state of id not found
- `state: string`

----------
### **`context.setMiddleware(midFunc)`**
----------
set middleware before enter the context
- `midFunc: Function`
  - `id: string`
  - `payload: any`
  - `next: Function`





