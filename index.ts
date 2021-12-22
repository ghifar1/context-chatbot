interface ContextObject {
	state: string
	callback: any
}

interface StateObject {
	id: string
	state: string
}

class Context {
	private contextArray: Array<ContextObject>
	private stateArray: Array<StateObject>

	constructor() {
		this.contextArray = []
		this.stateArray = []
	}

	registerArrayContext(arr: Array<ContextObject>) {
		this.contextArray = [...this.contextArray, ...arr]
	}

	registerContext(state: string, callback: any) {
		this.contextArray.push({ state: state, callback: callback })
	}

	setState(id: string, state: string) {
		let index = this.stateArray.findIndex(state => state.id == id)
		if (index < 0) {
			this.stateArray.push({ id: id, state: state })
			return
		}
		this.stateArray[index].state = state
		return
	}

	Context(id: string) {
		let found = this.stateArray.find(state => state.id == id)
		let context = this.contextArray.find(context => context.state == found.state)
		try {
			return context.callback()
		} catch (e) {
			throw new Error("Context not found")
		}
	}
}

let context = new Context()
export default context