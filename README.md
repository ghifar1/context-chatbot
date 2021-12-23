# Context For Chat Bot
Simplify your code for chatbot without headache.

## ⚠️**Breaking change**⚠️
----------
version 0.1.7 and above no longer use `context` variable, if you want update version from 0.1.6 and below, please check variable naming

## Installation
----------
Copy this code to your command line.
```console
npm i context-chatbot
```
and add this code to your project.
```javascript
import { Ctx }  from "context-chatbot";
```
## Quick Start
----------
- first, register context to module.
```javascript
Ctx.registerContext('welcome', (id, payload)=>{
    console.log('hello ' + id)
    console.log(payload)
})
```
or register from array.
```javascript
Ctx.registerArrayContext([
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
Ctx.setState('6281955551111', 'welcome')
```
- finally, put this line code to your bot file.
```javascript
Ctx.Context('6281955551111', 'this is payload')
// output:
// 'welcome 6281955551111'
// 'this is payload'
```

## Context with timer
----------
This function allow you to restricted response from user (time out), if the time is up, then the state will change to the desired state
```javascript
Ctx.registerArrayContext([
    {
        state: 'welcome',
        callback: (id, payload, timeOut)=>{
            console.log('welcome' + id)
            console.log(payload)
            //Dont forget to clear timeout
            clearTimeOut(timeOut)
        }
    }
])

```

```javascript
//if there is no input for 5 seconds, state will change from 'welcome' to 'base'
Ctx.setState(id, "welcome", 5000, "base");
```

## Using middleware
----------
if you dont know where to place setState function to change state, maybe this can help you

```javascript
Ctx.setMiddleware((id, payload, next) => {
	if (payload.message.includes("!login")) {
		Ctx.setState(id, "login_ask_username");
	}
	next();
});
```


## API
----------
----------
### **`context.registerContext(state, callback)`**
----------
Create a context with named state

- `state: string`
- `callback: Function`
  - `id: string`
  - `payload: any`
  - `timeOut: optional ` setTimeOut function for context with timer
----------
### **`context.registerArrayContext(arr)`**
----------
Create a context from array of object

- `arr: Array of object`
  - `state: string`
  - `callback: Function`
    - `id: string`
    - `payload: any`
    - `timeOut: optional ` setTimeOut function for context with timer

----------
### **`context.setState(id, state)`**
----------
change the state of an id

- `id: string`
- `state: string`
- `timer: miliseconds number (Optional)` set time out context response 
- `backTo: string (Optional)` go to target state if timer is timeout

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

## @adiwajshing/baileys implementation
----------
coming soon~


