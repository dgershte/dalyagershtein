

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
                    var pos = (width-diameter)/2 + "px";
                    var bg ='rgb('+renderR+','+renderG+','+renderB+')';
                    $(div).css({"width":diameter+"px",
                                "height":diameter+"px", 
                                "left":pos,
                                "top":pos,
                                "border-radius":diameter/2 + "px",
                                "background-color":bg});
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

$( document ).ready(function() {
	element = document.getElementById('gradient');
	gradient = new Gradient(element, [ new Color(254, 255, 87), new Color(98, 255, 87)]);
});
