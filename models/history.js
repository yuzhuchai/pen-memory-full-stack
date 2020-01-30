const mongoose = require('mongoose')


const historySchema = new mongoose.Schema({
	word: String,
	color: String,
	size: Number,
	fallSelect: Boolean,
	floatSelect: Boolean,
	danceSelect: Boolean,
	bombSelect: Boolean,
	blinkSelect: Boolean,
	fr: Number,
	style: String,
	alpha: Number
})

const History = mongoose.model('History',historySchema)

module.exports = History