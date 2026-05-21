function Solver(){

	
	
	

	this.logic = function( cube ){ return false }
}

Solver.prototype.consider = function( cube ){

	
	

	if( cube === undefined ){

		console.warn( 'A cube [Cube] argument must be specified for Solver.consider().' )
		return false
	}
	else if( cube instanceof Cube === false ){

		console.warn( 'The cube argument provided is not a valid Cube.' )
		return false
	}

	
	
	

	cube.isShuffling = false

	
	

	if( cube.isSolved() ){

		if( erno.verbosity >= 0.5 ) Solver.prototype.explain( 'I’ve found that the cube is already solved.' )
		return false
	}
	else return this.logic( cube )
}

Solver.prototype.hint = function( text ){

	console.log(

		'%c'+ text +'%c\n',
		'background-color: #EEE; color: #333', ''
	)
}

Solver.prototype.explain = function( text ){

	console.log(

		'Solver says: %c '+ text +' %c\n',
		'color: #080', ''
	)
}