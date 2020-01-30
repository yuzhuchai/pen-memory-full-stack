const mongoose = require('mongoose')

const connectionString = 'mongodb://localhost/toolhistory'



mongoose.connect(connectionString, {
	useNewUrlParser: true, 
	useUnifiedTopology: true
})



mongoose.connection.on('connected', () =>{
	console.log('mongoose connected to ', connectionString);
})

mongoose.connection.on('disconnected', () =>{
	console.log('mongoose disconnected', connectionString)
})


mongoose.connection.on('error', (err) => {
	console.log('mongoose error', err);
})