const mongoose = require("mongoose");
const validator = require("validator");
mongoose.connect("mongodb://127.0.0.1:27017/task-manager-api", {
	useNewUrlParser: true,
	useCreateIndex: true
});
const User = mongoose.model("User", {
	name: {
		type: String,
		required: true,
		trim: true
	},
	age: {
		type: Number,
		default: 0,
		required: true,
		validate(value) {
			if (value < 0) {
				throw new Error("Age must be a positive number");
			}
		}
	},
	email: {
		type: String,
		required: true,
		trim: true,
		lowercase: true,
		validate(value) {
			if (!validator.isEmail(value)) {
				throw new Error("Email is required");
			}
		}
	},
	password: {
		type: String,
		required: true,
		trim: true,
		validate(value) {
			if (value.length < 6) {
				throw new Error("Password must be a minimum of 6 characters.");
				process.exit(1);
			}
			if (value.toLowerCase().includes("password")) {
				throw new Error("Password may not include the text \"password\"")
				return;
			}
		}
	}
});
const Task = mongoose.model("Task", {
	name: {
		type: String,
		trim: true,
		validate(value) {
			if (value.length === 0) {
				throw new Error("Task name must be provided.");
			}
		}
	},
	description: {
		type: String,
		trim: true,
		validate(value) {
			if (value.length === 0) {
				throw new Error("Task description must be provided.");
			}
		}
	},
	completed: {
		type: Boolean,
		required: false,
		default: false
	}
});