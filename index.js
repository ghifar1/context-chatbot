class Context {
    contextArray;
    stateArray;
    constructor() {
        this.contextArray = [];
        this.stateArray = [];
    }
    registerArrayContext(arr) {
        this.contextArray = [...this.contextArray, ...arr];
    }
    registerContext(state, callback) {
        this.contextArray.push({ state: state, callback: callback });
    }
    setState(id, state) {
        let index = this.stateArray.findIndex(state => state.id == id);
        if (index < 0) {
            this.stateArray.push({ id: id, state: state });
            return;
        }
        this.stateArray[index].state = state;
        return;
    }
    Context(id) {
        let found = this.stateArray.find(state => state.id == id);
        let context = this.contextArray.find(context => context.state == found.state);
        try {
            return context.callback();
        }
        catch (e) {
            throw new Error("Context not found");
        }
    }
}
let context = new Context();
export default context;
