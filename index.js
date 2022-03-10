class Context {
    contextArray;
    stateArray;
    middleware;
    defaultState;
    constructor() {
        this.contextArray = [];
        this.stateArray = [];
        this.middleware = (id, payload, next) => {
            return next();
        };
        this.defaultState = 'base';
    }
    setDefaultState(state) {
        this.defaultState = state;
    }
    registerArrayContext(arr) {
        this.contextArray = [...this.contextArray, ...arr];
    }
    registerContext(state, callback) {
        this.contextArray.push({ state: state, callback: callback });
    }
    setState(id, state, timer, backTo) {
        let index = this.stateArray.findIndex(state => state.id == id);
        if (index < 0) {
            this.stateArray.push({ id: id, state: state });
            return this.setState(id, state, timer, backTo);
        }
        this.stateArray[index].state = state;
        if (timer) {
            this.stateArray[index].timeOut = setTimeout(() => {
                this.setState(id, backTo);
            }, timer);
        }
        return;
    }
    setMiddleware(midFunc) {
        this.middleware = midFunc;
    }
    Context(id, payload) {
        try {
            return this.middleware(id, payload, () => {
                let found = this.stateArray.find(state => state.id == id);
                if (typeof found === "undefined") {
                    this.setState(id, this.defaultState);
                    found = this.stateArray.find(state => state.id == id);
                }
                let context = this.contextArray.find(context => context.state == found.state);
                if (typeof found.timeOut !== "undefined") {
                    return context.callback(found.id, payload, found.timeOut);
                }
                return context.callback(found.id, payload);
            });
        }
        catch (e) {
            // console.error(e)
            throw new Error("Context not found");
            // throw new Error("Context not found")
        }
    }
}
const Ctx = new Context();
export { Ctx };
