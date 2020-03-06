const {MongoClient, ObjectID} = require("mongodb");
const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "task-manager";

MongoClient.connect(connectionURL, {useNewUrlParser: true}, (error, client) => {
	if (error) {
		return console.log("Cannot connect to the database.");
	} else {
		const db = client.db(databaseName);
//		db.collection("tasks").findOne({_id: new ObjectID("5c8810180808f820e0561533")}, (error, task) => {
//			if (error) {
//				console.log("Unable to retrieve user");
//			}
//			console.log("Found id:", task);
//		});
//
//		db.collection("tasks").find({definition: true}).toArray((error, tasksComplete) => {
//			console.log();
//			console.log(tasksComplete);
//		});
//
//		db.collection("tasks").find({definition: false}).toArray((error, tasksIncomplete) => {
//			console.log();
//			console.log(tasksIncomplete);
//		});

		db.collection("users").find({age: 23}).count((error, count) => {
			if (count > 0) {
				console.log(count);
			} else {
				console.log("No users found");
			}
		});

		const updatePromise = db.collection("tasks").updateMany({definition: false}, {
			$set: {
				definition: true
			}
		}).then((result) => {
			console.log("Success");
		}).catch((error) => {
			console.log(error);
		});
	}
});