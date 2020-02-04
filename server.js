const express = require('express')
const bodyParser = require('body-parser');
const app = express()
const History = require('./models/history')
const historyController = require('./controllers/historyController')


const db = require('./db/db')
app.use(bodyParser.urlencoded({extended: false}));



// put all the css, js, p5 stuff in the public folder
app.use(express.static('public'))
	

app.use("/", historyController)

// serving the static demo page
// app.get("/",(req,res)=>{
// 	res.redirect("/tool")
// })


app.listen(9000, () => {
	console.log('listening on 3000');
})	