function Queue( validation ){

	
	
	

	if( validation !== undefined && validation instanceof Function ) this.validate = validation

	

	this.history = []
	this.future  = []
	this.isReady = true
	this.isLooping = false
}

Queue.prototype.add = function(){

	var 
	elements = Array.prototype.slice.call( arguments ),
	_this = this

	if( this.validate !== undefined && this.validate instanceof Function ) elements = this.validate( elements )

	if( elements instanceof Array ){
	
		elements.forEach( function( element ){

			_this.future.push( element )
		})
	}
}
Queue.prototype.empty = function(){

	this.future = []
}
Queue.prototype.do = function(){

	if( this.future.length ){

		var element = this.future.shift()
		this.history.push( element )
		return element
	}
	else if( this.isLooping ){

		this.future  = this.history.slice()
		this.history = []
	}
}
Queue.prototype.undo = function(){

	if( this.history.length ){
		
		var element = this.history.pop()
		this.future.unshift( element )
		return element
	}
}
Queue.prototype.redo = function(){

	this.do()
}