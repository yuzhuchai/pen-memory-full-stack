const express = require('express')
const router = express.Router()
const History = require('../models/history')


router.get('/', (req,res,next)=>{
	res.render('new.ejs')
})


module.exports = router