console.log('histoy page linked');

let wordAttr = {
	word: '',
	// word: 'pen, memory',
	// color: '',
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

let cnvBottom
let dontDraw = true 
let drawn = []


function setup(){
	const cnv = createCanvas(windowWidth, windowHeight)
  	cnv.position(0,0)
  	background(0)
  	cnvBottom = cnv.position().y+cnv.height
}




function draw(){
	background(0)
	textFont('Helvetica');
	textAlign(CENTER, CENTER);


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
	// fill(wordAttr.color)
	text(wordAttr.word, mouseX, mouseY)
}







function selectHistory(){
	wordAttr.floatSelect = false;
	wordAttr.fallSelect = false;
	wordAttr.danceSelect = false;
	wordAttr.blinkSelect = false;
	dontDraw = false;


	// console.log('this is working, clicked');
	let val = $('#selectBrush').val()
	let parsedVal = JSON.parse(val)
	console.log(parsedVal,'<-----parsed val');
	wordAttr = parsedVal
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
	// this.i = i
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
	// this.i = i
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
	// this.i = -1
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
	// this.i = i
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
	// this.i = -1
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
	// this.i = i

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

