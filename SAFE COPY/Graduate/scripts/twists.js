function Twist( command, degrees ){


	var group = {

		X: 'Cube on X',
		L: 'Left face',
		M: 'Middle slice',
		R: 'Right face',

		Y: 'Cube on Y',
		U: 'Up face',
		E: 'Equator slice',
		D: 'Down face',

		Z: 'Cube on Z',
		F: 'Front face',
		S: 'Standing slice',
		B: 'Back face'

	}[ command.toUpperCase() ]

	
	

	if( group !== undefined ){


		if( degrees != undefined && degrees < 0 ){

			command = command.invert()
			degrees = degrees.absolute()
		}

		var
		vector =  0,
		wise   = 'unwise'

		if( command === command.toUpperCase() ){

			vector =  1
			wise   = 'clockwise'
		}
		else if( command === command.toUpperCase() + "'" ){

			vector = -1
			wise   = 'anticlockwise'
		}

		this.command = command 
		this.group   = group   
		this.degrees = degrees 
		this.vector  = vector  
		this.wise    = wise    
		this.created = Date.now()

		this.getInverse = function(){

			return new Twist( command.invert(), degrees )
		}
	}
	else return false
}

Twist.validate = function(){

	var 
	elements = Array.prototype.slice.call( arguments ),
	element, i,
	pattern, matches, match, m, head, foot

	for( i = 0; i < elements.length; i ++ ){

		element = elements[ i ]
		if( i + 1 < elements.length ) lookAhead = elements[ i + 1 ]
		else lookAhead = undefined

		if( element instanceof Twist ){

			
		}
		else if( typeof element === 'string' ){

			if( element.length === 1 ){

				if( typeof lookAhead === 'number' ){

					 elements[ i ] = new Twist( element, lookAhead )
				}
				else elements[ i ] = new Twist( element )

			}
			else if( element.length > 1 ){

				pattern = /(-?\d+|[XLMRYUEDZFSB])/gi
				matches = element.match( pattern )
				for( m = 0; m < matches.length; m ++ ){

					match = matches[ m ]
					if( isNumeric( match )) matches[ m ] = +match
					else {

						head    = matches.slice( 0, m )
						foot    = matches.slice( m + 1 )
						match   = match.split( '' )
						matches = head.concat( match, foot )
					}
				}
				head = elements.slice( 0, i )
				foot = elements.slice( i + 1 )				
				elements = head.concat( matches, foot )
				i --
			}
		}
		else if( element instanceof Direction ){

			elements[ i ] = element.initial
			i --
		}
		else if( element instanceof Array ){

			head = elements.slice( 0, i )
			foot = elements.slice( i + 1 )				
			elements = head.concat( element, foot )
			i --
		}
		else {

			elements.splice( i, 1 )
			i --
		}
	}
	return elements
}