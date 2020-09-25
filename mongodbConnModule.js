const mongoose = require('mongoose')

module.exports.connect = function () {
	mongoose.connect('mongodb://localhost:27017/startup', {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false
		// useCreateIndex: true
	})
	const db = mongoose.connection
	db.on("error", console.error.bind(console, "[DB] Connection error!"))
	db.on('connected', () => {
		console.log('[DB] Connection established')
	})
	db.on('disconnected', () => {
		console.log('[DB] Connection disconnected!')
	})
	return db
}