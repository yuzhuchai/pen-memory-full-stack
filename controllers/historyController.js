const express = require('express')
const router = express.Router()
const History = require('../models/history')
// const hi = require('../tool/sketch')


// router.use('/tool/sketch.js')

router.get('/', (req,res,next)=>{
	res.render('new.ejs')
})



router.post('/upload',(req,res,next)=>{
	console.log(req.body);
	// console.log(req.body.historys);

	const historyArray = JSON.parse(req.body.historyUpload)
	console.log(historyArray);
	console.log(historyArray[0].color);
})

// router.post('/upload', (req,res,next)=>{
// 	// res.redirect('/')
// 	console.log(req.body,'<-----should create these objs')
// 	// console.log(history);


// })


module.exports = router