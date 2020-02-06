const mongoose = require('mongoose')


const drawingSchema = new mongoose.Schema({
	story: String,
	historyUpload: String,
})

const Drawing = mongoose.model('Drawing',drawingSchema)

module.exports = Drawing