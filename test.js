import { Ctx } from "./index.js";

Ctx.setMiddleware((id, payload, next) => {
	// if(id == "6285101010101")
	// {
	//     console.log("benar")
	//     Ctx.setState('6285101010101', 'welcome')
	// }
	
	next();
});

Ctx.setDefaultState("base");

Ctx.registerContext("base", (id, payload) => {
	console.log("hello " + id);
	console.log(payload);

	Ctx.setState(id, "welcome", 2000, "base");
	// Ctx.Context(id, payload)
});

Ctx.registerArrayContext([
	{
		state: "welcome",
		callback: (id, payload, timeOut) => {
			console.log("welcome " + id + " (5 seconds)");
			clearTimeout(timeOut);
			return "wow";
		},
	},
]);

Ctx.Context("6285101010101", "aowieeoeoe");
