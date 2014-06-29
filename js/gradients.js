

function Color(r,g,b) {
	this.r = r;
	this.g = g;
	this.b = b;
}

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? new Color(parseInt(result[1], 16),parseInt(result[2], 16),parseInt(result[3], 16)) : null;
}

function Gradient(element,  arr){
	
	this.arr = arr;
	this.element = element;
	
	// draws/redraws the gradient
	this.draw = function() {
		
		this.clearDivs();
		
		var diameter = this.element.clientHeight;
		var numStops = this.arr.length;
		
		if(numStops == 0){
			this.clear();
		} else {
			var sectionLength = numStops>1 ? (diameter/2)/(numStops-1) : 1;
			
			var width = diameter;
			
			for(var i = 0; i < numStops-1; i++){
				
				var rIncrement = (this.arr[i+1].r - this.arr[i].r)/(2*sectionLength);
				var gIncrement = (this.arr[i+1].g - this.arr[i].g)/(2*sectionLength);
				var bIncrement = (this.arr[i+1].b - this.arr[i].b)/(2*sectionLength);
				 
				var r = this.arr[i].r;
				var g = this.arr[i].g;
				var b = this.arr[i].b;
				 
				var renderR = r;
				var renderG = g;
				var renderB = b;
				
				//draw divs, decreasing height/width by 1px every time
				for(var j = 0; j < sectionLength*2; ++j){
					var div = document.createElement('div');
					div.style.width = diameter + "px";
					div.style.height = diameter + "px";
					div.style.top = (width-diameter)/2;
					div.style.left = (width-diameter)/2;
					div.style.borderRadius = diameter/2;
					div.style.position = "absolute";
					div.style.backgroundColor = 'rgb('+renderR+','+renderG+','+renderB+')';
					r += rIncrement;
					g += gIncrement;
					b += bIncrement;
					renderR = Math.floor(r);
					renderG = Math.floor(g);
					renderB = Math.floor(b);
					diameter-=1;
					this.element.appendChild(div);
				}
			}
		}    
	}    
	
	//clear divs
	this.clearDivs = function () {
		while( this.element.hasChildNodes() ){
			this.element.removeChild(this.element.lastChild);
		}
	}
	
	//clears the gradient
	this.clear = function () {
		this.clearDivs();
		this.arr = [];
	}
	
	//removes and returns the last stop
	this.pop = function () {
		var temp = this.arr.pop();
		this.draw();
		return temp;
	}
	
	//removes and returns the first stop
	this.shift = function() {
		var temp = this.arr.shift();
		this.draw();
		return temp;
	}
	
	//appends given stops to the beginning of the gradient
	this.unshift = function(){
		for(var i = 0; i < arguments.length; ++i){
			this.arr.unshift(arguments[i]);
		}
		this.draw();
	}
	
	//appends given stops to the end of the gradient
	this.push = function () {
		for(var i = 0; i < arguments.length; ++i){
            this.arr.push(arguments[i]);
		}
		this.draw();
	}
	
	//reverse the order of all stops
	this.reverse = function() {
		this.arr.reverse();
		this.draw();
	}
	
	//modifies the gradient by calling the callback for every stop
	this.map = function(callback) {
		for(var i = 0; i < this.arr.length; ++i){
			this.arr[i] = callback(this.arr[i]);
		}
		this.draw();
	}
	
	//sorts the stops (via an optional comparison callback)
	this.sort = function(callback) {
		this.arr.sort(callback);
		this.draw();
	}
	
	return this.draw();
	
}

colorArray = [
	new Color(121, 0, 0),
	new Color(158, 11, 15),
	new Color(237, 28, 36),
	new Color(242, 108, 79),
	new Color(246, 150, 121),
	new Color(123, 46, 0),
	new Color(160, 65, 13),
	new Color(242, 101, 34),
	new Color(246, 142, 86),
	new Color(249, 173, 129),
	new Color(125, 73, 0),
	new Color(163, 98, 10),
	new Color(247, 148, 29),
	new Color(251, 175, 93),
	new Color(253, 198, 137),
	new Color(130, 123, 0),
	new Color(171, 160, 0),
	new Color(255, 242, 0),
	new Color(255, 245, 104),
	new Color(255, 247, 153),
	new Color(64, 102, 24),
	new Color(89, 133, 39),
	new Color(141, 198, 63),
	new Color(172, 211, 115),
	new Color(196, 223, 155),
	new Color(0, 94, 32),
	new Color(25, 123, 48),
	new Color(57, 181, 74),
	new Color(124, 197, 118),
	new Color(163, 211, 156),
	new Color(0, 88, 38),
	new Color(0, 114, 54),
	new Color(0, 166, 81),
	new Color(60, 184, 120),
	new Color(130, 202, 156),
	new Color(0, 89, 82),
	new Color(0, 116, 107),
	new Color(0, 169, 157),
	new Color(28, 187, 180),
	new Color(122, 204, 200),
	new Color(0, 91, 127),
	new Color(0, 118, 163),
	new Color(0, 174, 239),
	new Color(0, 191, 243),
	new Color(109, 207, 246),
	new Color(0, 54, 99),
	new Color(0, 74, 128),
	new Color(0, 114, 188),
	new Color(68, 140, 203),
	new Color(125, 167, 217),
	new Color(0, 33, 87),
	new Color(0, 52, 113),
	new Color(0, 84, 166),
	new Color(86, 116, 185),
	new Color(131, 147, 202),
	new Color(13, 0, 76),
	new Color(27, 20, 100),
	new Color(46, 49, 146),
	new Color(96, 92, 168),
	new Color(135, 129, 189),
	new Color(60, 0, 75),
	new Color(68, 14, 98),
	new Color(102, 45, 145),
	new Color(133, 96, 168),
	new Color(161, 134, 190),
	new Color(75, 0, 73),
	new Color(99, 4, 96),
	new Color(146, 39, 143),
	new Color(168, 100, 168),
	new Color(189, 140, 191),
	new Color(123, 0, 70),
	new Color(158, 0, 93),
	new Color(236, 0, 140),
	new Color(240, 110, 170),
	new Color(244, 154, 193),
	new Color(122, 0, 38),
	new Color(158, 0, 57),
	new Color(237, 20, 91),
	new Color(242, 109, 125),
	new Color(245, 152, 157),
]

function createColors() { 
	for(var i = 0; i < 80; i++) {
		var r = colorArray[i].r; var g = colorArray[i].g; var b = colorArray[i].b;
		var colorDiv = document.createElement("div");
		colorDiv.className = "color";
		colorDiv.style.background = "rgb(" + r + "," + g + "," + b + ")";
		colorDiv.color = colorArray[i];
		$(colorDiv).click(function() {
			gradient.push(this.color);
		});
		$("#colors").append(colorDiv);
	}
}

$( document ).ready(function() {
	createColors();
	element = document.getElementById('gradient');
	gradient = new Gradient(element, [colorArray[55], colorArray[78]]);
	gradient.push(new Color(255,255,255));
});
