function Direction( id, name ){

	this.id        = id
	this.name      = name.toLowerCase()
	this.initial   = name.substr( 0, 1 ).toUpperCase()
	this.neighbors = []
	this.opposite  = null
}
Direction.prototype.setRelationships = function( up, right, down, left, opposite ){

	this.neighbors = [ up, right, down, left ]
	this.opposite  = opposite
}

Direction.getNameById = function( id ){

	return [

		'front',
		'up',
		'right',
		'down',
		'left',
		'back'

	][ id ]
}
Direction.getIdByName = function( name ){

	return {

		front: 0,
		up   : 1,
		right: 2,
		down : 3,
		left : 4,
		back : 5

	}[ name ]
}
Direction.getDirectionById = function( id ){

	return [

		FRONT,
		UP,
		RIGHT,
		DOWN,
		LEFT,
		BACK

	][ id ]
}
Direction.getDirectionByInitial = function( initial ){

	return {

		F: FRONT,
		U: UP,
		R: RIGHT,
		D: DOWN,
		L: LEFT,
		B: BACK

	}[ initial.toUpperCase() ]
}
Direction.getDirectionByName = function( name ){

	return {

		front: FRONT,
		up   : UP,
		right: RIGHT,
		down : DOWN,
		left : LEFT,
		back : BACK

	}[ name.toLowerCase() ]
}

Direction.prototype.getRotation = function( vector, from, steps ){

	if( from === undefined ) from = this.neighbors[ 0 ]
	if( from === this || from === this.opposite ) return null
	steps = steps === undefined ? 1 : steps.modulo( 4 )
	for( var i = 0; i < 5; i ++ ){

		if( this.neighbors[ i ] === from ) break
	}
	return this.neighbors[ i.add( steps * vector ).modulo( 4 )]
}
Direction.prototype.getClockwise = function( from, steps ){

	return this.getRotation( +1, from, steps )
}
Direction.prototype.getAnticlockwise = function( from, steps ){

	return this.getRotation( -1, from, steps )
}

Direction.prototype.getDirection = function( direction, up ){

	return this.getRotation( 1, up, direction.id - 1 )
}
Direction.prototype.getUp = function( up ){

	return this.getDirection( UP, up )
}
Direction.prototype.getRight = function( up ){

	return this.getDirection( RIGHT, up )
}
Direction.prototype.getDown = function( up ){

	return this.getDirection( DOWN, up )
}
Direction.prototype.getLeft = function( up ){

	return this.getDirection( LEFT, up )
}

Direction.prototype.getOpposite = function(){

	return this.opposite
}

var 
FRONT = new Direction( 0, 'front' ),
UP    = new Direction( 1, 'up'    ),
RIGHT = new Direction( 2, 'right' ),
DOWN  = new Direction( 3, 'down'  ),
LEFT  = new Direction( 4, 'left'  ),
BACK  = new Direction( 5, 'back'  )

FRONT.setRelationships( UP,    RIGHT, DOWN,  LEFT,  BACK  )
UP.setRelationships(    BACK,  RIGHT, FRONT, LEFT,  DOWN  )
RIGHT.setRelationships( UP,    BACK,  DOWN,  FRONT, LEFT  )
DOWN.setRelationships(  FRONT, RIGHT, BACK,  LEFT,  UP    )
LEFT.setRelationships(  UP,    FRONT, DOWN,  BACK,  RIGHT )
BACK.setRelationships(  UP,    LEFT,  DOWN,  RIGHT, FRONT )