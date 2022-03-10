interface ContextObject {
	state: string
	callback: (id: string, payload: any, timeOut?: Function) => {}
}

interface middleware {
	(id: string, payload: any, next: any): void
}

interface StateObject {
	id: string
	state: string
	timeOut?: any
}

class Context {
	private contextArray: Array<ContextObject>
	private stateArray: Array<StateObject>
	private middleware: middleware
	private defaultState: string

	constructor() {
		this.contextArray = []
		this.stateArray = []
		this.middleware = (id: string, payload: any, next: any) => {
			return next()
		}
		this.defaultState = 'base'
	}

	setDefaultState(state: string) {
		this.defaultState = state
	}

	registerArrayContext(arr: Array<ContextObject>) {
		this.contextArray = [...this.contextArray, ...arr]
	}

	registerContext(state: string, callback: (id: string, payload: any, timeOut?: Function) => {}) {
		this.contextArray.push({ state: state, callback: callback })
	}

	setState(id: string, state: string, timer?: number, backTo?: string) {
		let index = this.stateArray.findIndex(state => state.id == id)
		if (index < 0) {
			this.stateArray.push({ id: id, state: state })
			return this.setState(id, state, timer, backTo)
		}
		this.stateArray[index].state = state
		if (timer) {
			this.stateArray[index].timeOut = setTimeout(() => {
				this.setState(id, backTo)
			}, timer)
		}
		return
	}

	setMiddleware(midFunc: middleware) {
		this.middleware = midFunc
	}

	Context(id: string, payload: any) {

		try {
			return this.middleware(id, payload, () => {

				let found = this.stateArray.find(state => state.id == id)
				if (typeof found === "undefined") {
					this.setState(id, this.defaultState)
					found = this.stateArray.find(state => state.id == id)
				}
				let context = this.contextArray.find(context => context.state == found.state)

				if (typeof found.timeOut !== "undefined") {
					return context.callback(found.id, payload, found.timeOut)
				}
				return context.callback(found.id, payload)
			})
		} catch (e) {
			// console.error(e)
			throw new Error("Context not found");
			
			// throw new Error("Context not found")
		}
	}
}

const Ctx = new Context()
export {
	Ctx
}