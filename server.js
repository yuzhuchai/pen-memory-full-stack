require ('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser');
const app = express()
const Drawing = require('./models/drawing')
const drawingController = require('./controllers/drawingController')
const PORT = process.env.PORT || 9000

const db = require('./db/db')
app.use(bodyParser.urlencoded({extended: false}));



// put all the css, js, p5 stuff in the public folder
app.use(express.static('public'))
	

app.use("/", drawingController)

// serving the static demo page
// app.get("/",(req,res)=>{
// 	res.redirect("/tool")
// })


app.listen(PORT, () => {
	console.log('listening on 3000');
})	