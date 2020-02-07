const express = require('express')
const router = express.Router()
const Drawing = require('../models/drawing')
// const hi = require('../tool/sketch')


// router.use('/tool/sketch.js')


// this is displaying the new page, when the user is making thier own drawings and can upload their brush history 
router.get('/', (req,res,next)=>{
	res.render('new.ejs')
})




// this is the upload route
router.post('/upload', async (req,res)=>{
	console.log(req.body,'<---req.body');

// this creates the drawing in the database 
	Drawing.create(req.body, (err, drawing)=>{
		if(err){
			res.send(err)
		} else {
			console.log(drawing,'<----this drawing');
			res.redirect('/index')
		}
	})
})



// this route gets all the individual drawings, and display them on the page
router.get('/index', (req,res)=>{
	Drawing.find({}, (err, drawings) => {
		// let newDrawings = []
		console.log(drawings,'<----this is drawings in the find');
		if(err){
			res.send(err)
		} else {
			res.render('index.ejs',{
				drawings: drawings
			})
		}
	})
})


// this is displaying every individual drawings that are uploaded 
router.get('/:id', (req,res)=>{
	console.log(req.params,'<-----each drawing');
	Drawing.findById(req.params.id, async (err,drawing)=>{
		console.log(drawing);
		const brushes = await JSON.parse(drawing.historyUpload)
		console.log(brushes);
		if(err){
			res.send(err)
		} else {
			res.render('show.ejs',{
				brushes: brushes,
				story: drawing.story
			})
		}
	})
	
})



// need a delete route for admin
router.delete('/:id', (req,res)=>{
	Drawing.findByIdAndDelete(req.params.id, (err, drawing) => {
		if(err){
			res.send(err)
		} else {
			console.log(drawing.user + ' deleted');
		}
	})
})


module.exports = router