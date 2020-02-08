console.log('linked');
let wordAttr = {
	// word: '',
	word: 'pen, memory',
	color: '',
	size: 40,
// edit code when new function is created here!
	fallSelect: false,
	floatSelect: false,
	danceSelect: false,
	bombSelect: false,
	blinkSelect: false,
	fr: 30,
	style: null,
	alpha: 255
}

let drawn = []
let cnvBottom 
let dontDraw = true 
let history = []
let i = 0
let hexColor 


function setup() {

 	const cnv = createCanvas(windowWidth, windowHeight)
  	cnv.position(0,0)
  	background(0)
  	cnvBottom = cnv.position().y+cnv.height
}



function draw() {
	background(0)
	textFont('Helvetica');
	textAlign(CENTER, CENTER);
	// textStyle(ITALIC)
	 // edit code when new function is created here!

	if (wordAttr.fallSelect && !dontDraw){
		if(mouseIsPressed){
			drawn.push(new fallingWord());
		}
	} else if (wordAttr.floatSelect && !dontDraw){
		if(mouseIsPressed){
			drawn.push(new floatingWord());
		}
	} else if (wordAttr.danceSelect && !dontDraw){
		if(mouseIsPressed){
			drawn.push(new dancingWord())
		}
	} else if (wordAttr.bombSelect && !dontDraw){
		if(mouseIsPressed){
			drawn.push(new bomb())
		}
	} else if (wordAttr.blinkSelect && !dontDraw){
		if(mouseIsPressed){
			drawn.push(new blink())
		}
	}

	else{
		if(mouseIsPressed && !dontDraw){
			drawn.push(new simpleWord())
		}
	}


	for (let word of drawn){
		word.update()
		word.display()
	}
	textSize(wordAttr.size)
	textStyle(wordAttr.style)
	fill(wordAttr.color)
	text(wordAttr.word, mouseX, mouseY)
}


function submit(){
	// turn the falg back to false 
	// edit code when new function is created here!
	wordAttr.floatSelect = false;
	wordAttr.fallSelect = false;
	wordAttr.danceSelect = false;
	wordAttr.blinkSelect = false;
	dontDraw = false;

	wordAttr.word = $('#pen').val()
	wordAttr.size = Number($('#size').val())
	wordAttr.color = color(hexToRgb($('#color').val()).r, hexToRgb($('#color').val()).g, hexToRgb($('#color').val()).b)
	wordAttr.fr = Number($('#rate').val())
	// selecting the style of the word
	if($('#style1').is(':checked')){
		wordAttr.style= NORMAL
	}else if ($('#style2').is(':checked')){
		wordAttr.style = BOLD
	} else if ($('#style3').is(':checked')){
		wordAttr.style = ITALIC
	} else if ($('#style3').is(':checked')){
		wordAttr.style = BOLDITALIC
	}

// edit code when new function is created here!
	if($('#fallSelect').is(':checked')){
		wordAttr.fallSelect = true;
	} else if($('#floatSelect').is(':checked')){
		wordAttr.floatSelect = true 
	} else if($('#danceSelect').is(':checked')){
		wordAttr.danceSelect = true
	} else if($('#bombSelect').is(':checked')){
		wordAttr.bombSelect = true 
	} else if($('#blinkSelect').is(':checked')){
		wordAttr.blinkSelect = true
	}


	$('.sectionContainer').css({'display':'none'})


	// this is getting the value of the select tab.
	$('#history').append(`<option value=${i}>${wordAttr.word}</option>`)

	let newHistory = {
		// edit code when new function is created here!
		color:wordAttr.color,
		word: wordAttr.word,
		size: wordAttr.size,
		style: wordAttr.style,
		fr: wordAttr.fr,
		alpha: wordAttr.alpha,
		fallSelect: wordAttr.fallSelect,
		floatSelect: wordAttr.floatSelect,
		danceSelect: wordAttr.danceSelect,
		bombSelect: wordAttr.bombSelect,
		blinkSelect: wordAttr.blinkSelect
	}
	history.push(newHistory)
	i++

	createHistoryObj(wordAttr, i)

}


function hexToRgb(hex) {
	let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	return result ? {
	    r: parseInt(result[1], 16),
	    g: parseInt(result[2], 16),
	    b: parseInt(result[3], 16)
	} : null;
}


// this function draws the simple word
function simpleWord (){
	this.color = wordAttr.color 
	this.alpha = wordAttr.alpha
	this.word = wordAttr.word
	this.size = wordAttr.size 
	this.style = wordAttr.style
	this.x = mouseX
	this.y = mouseY
	this.i = i
	this.update = function(){
		// do nothing 
	}
	this.display = function(){
		this.color.setAlpha(this.alpha)

		fill(this.color)
		textSize(this.size)
		textStyle(this.style)
		text(this.word, this.x, this.y)
	}
}



// this function makes the words fall 
function fallingWord (){
	this.color = wordAttr.color 
	this.word = wordAttr.word
	this.size = wordAttr.size 
	this.style = wordAttr.style
	this.alpha = wordAttr.alpha

	this.fr = wordAttr.fr
	this.x = mouseX
	this.y = mouseY
	this.i = i
	this.update = function(){
		this.y +=random(10,30)
		if (this.y > (cnvBottom-30)){
			this.y = cnvBottom-30
		}
	}
	
	this.display = function(){
		this.color.setAlpha(this.alpha)

		fill(this.color)
		frameRate(this.fr)
		textStyle(this.style)
		textSize(this.size)
		text(this.word, this.x, this.y)
	}
}



// this function makes the words float
function floatingWord (){
	this.color = wordAttr.color 
	this.word = wordAttr.word
	this.size = wordAttr.size 
	this.style = wordAttr.style
	this.alpha = wordAttr.alpha
	this.fr = wordAttr.fr
	this.x = mouseX
	this.y = mouseY
	this.i = -1
	this.update = function(){
		this.y -= random(10,40)
	}
	this.display = function(){
		frameRate(this.fr)
		this.color.setAlpha(this.alpha)

		fill(this.color)
		textStyle(this.style)
		textSize(this.size)
		text(this.word, this.x, this.y)
	}
}



// this function makes the words dance
function dancingWord(){
	this.color = wordAttr.color 
	this.word = wordAttr.word
	this.size = wordAttr.size 
	this.style = wordAttr.style
	this.alpha = wordAttr.alpha

	this.fr = wordAttr.fr
	this.x = mouseX
	this.y = mouseY 
	this.i = i
	this.update = function(){
		this.x += random(-2,2)
		this.y += random(-2,2)
	}

	this.display = function(){
		this.color.setAlpha(this.alpha)
		frameRate(this.fr)
		fill(this.color)
		textStyle(this.style)
		textSize(this.size)
		text(this.word, this.x, this.y)
	}
}


// this function makes the text grow larger and disappear from the screen?
function bomb(){
	this.color = wordAttr.color 
	this.word = wordAttr.word
	this.size = wordAttr.size 
	this.style = wordAttr.style
	this.fr = wordAttr.fr

	this.alpha = wordAttr.alpha

	this.x = mouseX
	this.y = mouseY
	this.i = -1
	this.update = function(){
		if (this.size > 0){
			this.size += 5	
		}
		if(this.size >= 1000){
			this.word = ''
		}
	}
	this.display = function(){
		this.color.setAlpha(this.alpha)
		frameRate(this.fr)
		fill(this.color)
		textStyle(this.style)
		textSize(this.size)
		text(this.word, this.x, this.y)
	}
}


function blink(){
	this.color = wordAttr.color
	this.word = wordAttr.word
	this.size = wordAttr.size 
	this.style = wordAttr.style
	this.fr = wordAttr.fr
	this.alpha = wordAttr.alpha

	this.x = mouseX
	this.y = mouseY
	this.i = i

	this.newRange = map(this.fr, 10,50,2000,50)
	this.color.setAlpha(this.alpha)
	
	this.update = function(){

		this.alpha = 128 + 128 * sin(millis() / this.newRange)

	}

	this.display = function(){
		// console.log(this.color);
		this.color.setAlpha(this.alpha)
		fill(this.color)
		textStyle(this.style)
		textSize(this.size)
		text(this.word, this.x, this.y)
	}

}



// this function changes all the words into the smame word:
function changeWord (){
	let changeword = $('#word').val()
	drawn.map(i=>i.word = changeword)
}


// this function changes all the color into the same:
function changeColor(){

	let changeColor = color(hexToRgb($('#color1').val()).r, hexToRgb($('#color1').val()).g, hexToRgb($('#color1').val()).b)
	// this.color = $('#color').val()
	drawn.map(i=>i.color = changeColor)
}


// this is history function, this function logs the history of the brush, and you can reuse them. 
function selectHistroy(){
	console.log('clicked');
	let i = $('#history').val()
	// console.log(selected);
	wordAttr = history[i]
	i++

	console.log(history);
	$('.sectionContainer').css({'display':'none'})
}


// this function undo the last brush function
function undo(){

	let displayedDrawn = drawn.filter(i=>i.i !== -1)
	let last = displayedDrawn[displayedDrawn.length-1]
	let newDisplayedDrawn = displayedDrawn.filter(i=>i.i !== last.i)
	drawn = newDisplayedDrawn

}


// this function takes a screenshot of the canvas
// this function will be call everytime a brush is selected, creating a json object for each object
function createHistoryObj(wordAttr, i){
	const historyJSON = JSON.stringify(wordAttr)
	console.log(historyJSON);
	// $('#uploadForm_form').prepend(`<input name='history${i}' value=${historyJSON} type='text'></input>`)
	// $('#historyBrushes').val(historyJSON)
}




// bug: doesn't seem to work
function upload(){
	if(history.length && drawn.length){
		const upAsJsonString = JSON.stringify(history)
		// console.log(upAsJsonString);
		$('#uploadForm_form').prepend(`<input name='historyUpload' id='uploadInput' value=${upAsJsonString} type='text' readonly></input>`)
		$('#mainContainer').css({'display':'none'})
		$('canvas').css({'display':'none'})
		$('#uploadForm').css({'display':'block'})
	} else {
		alert('please upload a drawing')
	}
}

