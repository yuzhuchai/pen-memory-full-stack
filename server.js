const express = require('express')
const app = express()
const History = require('./models/history')



const db = require('./db/db')



// put all the css, js, p5 stuff in the public folder
app.use(express.static('public'))



app.get("/",(req,res)=>{
	res.redirect("/demo")
})


app.listen(3000, () => {
	console.log('listening on 3000');
})	