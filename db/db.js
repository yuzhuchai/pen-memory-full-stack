const mongoose = require('mongoose')

let connectionString
if(process.env.NODE_ENV === 'production'){
	connectionString = process.env.DB_URL
} else {
	connectionString = 'mongodb://localhost/drawings'
}


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