function Cube( preset ){

	var cube = this
	this.isReady     = true
	this.isShuffling = false
	this.isRotating  = false
	this.isSolving   = false
	this.isSolvingLL = false	
	this.isSolvingBeginner = false
	this.isSecondLayerRotated = false
	this.taskQueue = new Queue()
	this.twistQueue = new Queue( Twist.validate )
	this.twistDuration = 160
	this.shuffleMethod = 'RrLlUuDdSsBb'
	this.size = 420
	this.cubeletSize = 140


	if( erno.renderMode === 'css' ){
	
		this.domElement = document.createElement( 'div' )
		this.domElement.classList.add( 'cube' )
		this.threeObject = new THREE.CSS3DObject( this.domElement )
	}
	else if( erno.renderMode === 'svg' ){

		this.threeObject = new THREE.Object3D()
	}
	this.threeObject.rotation.set(

		( 35 ).degreesToRadians(),
		( -35 ).degreesToRadians(), 
		0
	)
	scene.add( this.threeObject )

	
	

	this.rotationDeltaX = 0.1
	this.rotationDeltaY = 0.15
	this.rotationDeltaZ = 0


	this.cubelets = []
	;([

		[ G, W,  ,  , O,   ],    [ G, W,  ,  ,  ,   ],    [ G, W, R,  ,  ,   ],
		[ G,  ,  ,  , O,   ],    [ G,  ,  ,  ,  ,   ],    [ G,  , R,  ,  ,   ],
		[ G,  ,  , Y, O,   ],    [ G,  ,  , Y,  ,   ],    [ G,  , R, Y,  ,   ],


		[  , W,  ,  , O,   ],    [  , W,  ,  ,  ,   ],    [  , W, R,  ,  ,   ],
		[  ,  ,  ,  , O,   ],    [  ,  ,  ,  ,  ,   ],    [  ,  , R,  ,  ,   ],
		[  ,  ,  , Y, O,   ],    [  ,  ,  , Y,  ,   ],    [  ,  , R, Y,  ,   ],

		
		[  , W,  ,  , O, B ],    [  , W,  ,  ,  , B ],    [  , W, R,  ,  , B ],
		[  ,  ,  ,  , O, B ],    [  ,  ,  ,  ,  , B ],    [  ,  , R,  ,  , B ],
		[  ,  ,  , Y, O, B ],    [  ,  ,  , Y,  , B ],    [  ,  , R, Y,  , B ] 

	]).forEach( function( cubeletColorMap, cubeletId ){

		cube.cubelets.push( new Cubelet( cube, cubeletId, cubeletColorMap ))
	})

	this.map()

	if( erno.renderMode === 'css' ){

		this.faces.forEach( function( face, i ){

			var labelElement = document.createElement( 'div' )
			labelElement.classList.add( 'faceLabel' )
			labelElement.classList.add( 'face'+ face.face.capitalize() )
			labelElement.innerHTML = face.face.toUpperCase()
			cube.domElement.appendChild( labelElement )
		})
	}

	this.folds = [

		new Fold( this.front, this.right ),
		new Fold( this.left,  this.up    ),
		new Fold( this.down,  this.back  )
	]

	if( erno.renderMode === 'css' ){

		this.setText( 'BEYONDRUBIKs  CUBE', 0 )
		this.setText( 'BEYONDRUBIKs  CUBE', 1 )
		this.setText( 'BEYONDRUBIKs  CUBE', 2 )
	}

	$( 'body' ).css( 'background-color', '#000' )
	$( 'body' ).addClass( 'graydient' )
	this.show()
	this.showIntroverts()
	this.showPlastics()
	this.showStickers()
	this.hideTexts()
	this.hideWireframes()
	this.hideIds()
	this.setOpacity()
	this.setRadius()
	
	setInterval( cube.loop, 16 )

	$( document ).keypress( function( event ){

		if( $( 'input:focus, textarea:focus' ).length === 0 ){
			
			var key = String.fromCharCode( event.which )
			if( 'XxRrMmLlYyUuEeDdZzFfSsBb'.indexOf( key ) >= 0 ) cube.twistQueue.add( key )
		}
	})
}

setupTasks = window.setupTasks || []
setupTasks.push( function(){

	Cube.prototype = Object.create( Group.prototype )
	Cube.prototype.constructor = Cube

	forceAugment( Cube, {
	
		map: function(){
				
			var that = this, i

			
			

			this.core    = new Group()
			this.centers = new Group()
			this.edges   = new Group()
			this.corners = new Group()
			this.crosses = new Group()
			this.cubelets.forEach( function( cubelet, index ){

				if( cubelet.type === 'core'   ) that.core.add( cubelet )
				if( cubelet.type === 'center' ) that.centers.add( cubelet )
				if( cubelet.type === 'edge'   ) that.edges.add( cubelet )
				if( cubelet.type === 'corner' ) that.corners.add( cubelet )
				if( cubelet.type === 'center' || cubelet.type === 'edge' ) that.crosses.add( cubelet )
			})

			

			this.left = new Slice(

				this.cubelets[ 24 ], this.cubelets[ 21 ], this.cubelets[ 18 ],
				this.cubelets[ 15 ], this.cubelets[ 12 ], this.cubelets[  9 ],
				this.cubelets[  6 ], this.cubelets[  3 ], this.cubelets[  0 ]
			)
			this.left.name = 'left'
			this.middle = new Slice(

				this.cubelets[ 25 ], this.cubelets[ 22 ], this.cubelets[ 19 ],
				this.cubelets[ 16 ], this.cubelets[ 13 ], this.cubelets[ 10 ],
				this.cubelets[  7 ], this.cubelets[  4 ], this.cubelets[  1 ]
			)
			this.middle.name = 'middle'
			this.right = new Slice(

				this.cubelets[  2 ], this.cubelets[ 11 ], this.cubelets[ 20 ],
				this.cubelets[  5 ], this.cubelets[ 14 ], this.cubelets[ 23 ],
				this.cubelets[  8 ], this.cubelets[ 17 ], this.cubelets[ 26 ]
			)
			this.right.name = 'right'

			

			this.up = new Slice(

				this.cubelets[ 18 ], this.cubelets[ 19 ], this.cubelets[ 20 ],
				this.cubelets[  9 ], this.cubelets[ 10 ], this.cubelets[ 11 ],
				this.cubelets[  0 ], this.cubelets[  1 ], this.cubelets[  2 ]
			)
			this.up.name = 'up'
			this.equator = new Slice(

				this.cubelets[ 21 ], this.cubelets[ 22 ], this.cubelets[ 23 ],
				this.cubelets[ 12 ], this.cubelets[ 13 ], this.cubelets[ 14 ],
				this.cubelets[  3 ], this.cubelets[  4 ], this.cubelets[  5 ]
			)
			this.equator.name = 'equator'
			this.down = new Slice(

				this.cubelets[  8 ], this.cubelets[ 17 ], this.cubelets[ 26 ],
				this.cubelets[  7 ], this.cubelets[ 16 ], this.cubelets[ 25 ],
				this.cubelets[  6 ], this.cubelets[ 15 ], this.cubelets[ 24 ]
			)
			this.down.name = 'down'

			
			

			this.front = new Slice(

				this.cubelets[  0 ], this.cubelets[  1 ], this.cubelets[  2 ],
				this.cubelets[  3 ], this.cubelets[  4 ], this.cubelets[  5 ],
				this.cubelets[  6 ], this.cubelets[  7 ], this.cubelets[  8 ]
			)
			this.front.name = 'front'
			this.standing = new Slice(

				this.cubelets[  9 ], this.cubelets[ 10 ], this.cubelets[ 11 ],
				this.cubelets[ 12 ], this.cubelets[ 13 ], this.cubelets[ 14 ],
				this.cubelets[ 15 ], this.cubelets[ 16 ], this.cubelets[ 17 ]
			)
			this.standing.name = 'standing'
			this.back = new Slice(

				this.cubelets[ 26 ], this.cubelets[ 23 ], this.cubelets[ 20 ],
				this.cubelets[ 25 ], this.cubelets[ 22 ], this.cubelets[ 19 ],
				this.cubelets[ 24 ], this.cubelets[ 21 ], this.cubelets[ 18 ]
			)
			this.back.name = 'back'

			

			this.faces = [ this.front, this.up, this.right, this.down, this.left, this.back ]

			
			

			for( i = 0; i < this.cubelets.length; i ++ ){

				this.cubelets[ i ].setAddress( i )
			}
		},

		
		

		getText: function( fold ){

			if( fold === undefined ){

				return [

					this.folds[ 0 ].getText(),
					this.folds[ 1 ].getText(),
					this.folds[ 2 ].getText()
				]
			}
			else if( isNumeric( fold ) && fold >= 0 && fold <= 2 ){

				return this.folds[ fold ].getText()
			}
		},
		setText: function( text, fold ){

			if( fold === undefined ){

				this.folds[ 0 ].setText( text )
				this.folds[ 1 ].setText( text )
				this.folds[ 2 ].setText( text )
			}
			else if( isNumeric( fold ) && fold >= 0 && fold <= 2 ){

				this.folds[ fold ].setText( text )
			}
		},
		setTwistDuration: function( duration ){

			if( isNumeric( duration ) === false ){

				console.warn( 'A numeric duration must be specified for Cube.setTwistDuration().' )
				return this
			}

			this.twistDuration =  duration
			return this
		},
	
		inspect: function( compact, side ){

			compact = !compact

			this.front.inspect( compact, side )
			this.up.inspect(    compact, side )
			this.right.inspect( compact, side )
			this.down.inspect(  compact, side )
			this.left.inspect(  compact, side )
			this.back.inspect(  compact, side )
		},

		solve: function(){

			this.isSecondLayerRotated = false
			this.isSolving = true
		},

		solveLL: function(){
			
			this.isSolvingLL = true
		},

		solveBeginner: function(){
			
			this.isSolvingBeginner = true
		},
		
		isSolved: function(){

			return (

				this.front.isSolved( FRONT ) &&
				this.up.isSolved(    UP    ) &&
				this.right.isSolved( RIGHT ) &&
				this.down.isSolved(  DOWN  ) &&
				this.left.isSolved(  LEFT  ) &&
				this.back.isSolved(  BACK  )
			)
		},

		twist: function( twist ){

			var onTwistComplete
			
			if( twist instanceof Twist && !cube.isTweening() ){

				command = twist.command
				degrees = twist.degrees
				if( erno.verbosity >= 0.8 ){
	
					console.log( 

						'Executing a twist command to rotate the '+ 
						 twist.group +' '+ twist.wise +' by',
						 twist.degrees, 'degrees.'
					)
				}
		
				if( command === 'X' && !cube.isEngagedY() && !cube.isEngagedZ() ){


					onTwistComplete = function( swap ){

						cube.cubelets = [

							swap[  6 ], swap[  7 ], swap[  8 ],
							swap[ 15 ], swap[ 16 ], swap[ 17 ],
							swap[ 24 ], swap[ 25 ], swap[ 26 ],

							swap[  3 ], swap[  4 ], swap[  5 ],
							swap[ 12 ], swap[ 13 ], swap[ 14 ],
							swap[ 21 ], swap[ 22 ], swap[ 23 ],

							swap[  0 ], swap[  1 ], swap[  2 ],
							swap[  9 ], swap[ 10 ], swap[ 11 ],
							swap[ 18 ], swap[ 19 ], swap[ 20 ]
						]
					}
					if( degrees === undefined ) degrees = cube.getDistanceToPeg( 'X' )
					cube.cubelets.forEach( function( cubelet, i ){

						if( i === cube.cubelets.length - 1 ) cubelet.rotate( 'X', degrees, onTwistComplete )
						else cubelet.rotate( 'X', degrees )
					})
				}
				else if( command === 'x' && !cube.isEngagedY() && !cube.isEngagedZ() ){

					onTwistComplete = function( swap ){

						cube.cubelets = [

							swap[ 18 ], swap[ 19 ], swap[ 20 ],
							swap[  9 ], swap[ 10 ], swap[ 11 ],
							swap[  0 ], swap[  1 ], swap[  2 ],

							swap[ 21 ], swap[ 22 ], swap[ 23 ],
							swap[ 12 ], swap[ 13 ], swap[ 14 ],
							swap[  3 ], swap[  4 ], swap[  5 ],

							swap[ 24 ], swap[ 25 ], swap[ 26 ],
							swap[ 15 ], swap[ 16 ], swap[ 17 ],
							swap[  6 ], swap[  7 ], swap[  8 ]
						]
					}
					if( degrees === undefined ) degrees = cube.getDistanceToPeg( 'x' )
					cube.cubelets.forEach( function( cubelet, i ){

						if( i === cube.cubelets.length - 1 ) cubelet.rotate( 'x', degrees, onTwistComplete )
						else cubelet.rotate( 'x', degrees )
					})
				}
				else if( command === 'R' && !cube.right.isEngagedY() && !cube.right.isEngagedZ() ){

					onTwistComplete = function( swap ){

						cube.cubelets[  2 ] = swap[  8 ]
						cube.cubelets[ 11 ] = swap[  5 ]
						cube.cubelets[ 20 ] = swap[  2 ]
						cube.cubelets[  5 ] = swap[ 17 ]
						cube.cubelets[ 23 ] = swap[ 11 ]
						cube.cubelets[  8 ] = swap[ 26 ]
						cube.cubelets[ 17 ] = swap[ 23 ]
						cube.cubelets[ 26 ] = swap[ 20 ]
					}
					if( degrees === undefined ) degrees = cube.right.getDistanceToPeg( 'X' )
					cube.right.cubelets.forEach( function( cubelet, i ){

						if( i === cube.right.cubelets.length - 1 ) cubelet.rotate( 'X', degrees, onTwistComplete )
						else cubelet.rotate( 'X', degrees )
					})
				}
				else if( command === 'r' && !cube.right.isEngagedY() && !cube.right.isEngagedZ() ){

					onTwistComplete = function( swap ){

						cube.cubelets[  2 ] = swap[ 20 ]
						cube.cubelets[ 11 ] = swap[ 23 ]
						cube.cubelets[ 20 ] = swap[ 26 ]
						cube.cubelets[  5 ] = swap[ 11 ]
						cube.cubelets[ 23 ] = swap[ 17 ]
						cube.cubelets[  8 ] = swap[  2 ]
						cube.cubelets[ 17 ] = swap[  5 ]
						cube.cubelets[ 26 ] = swap[  8 ]
					}
					if( degrees === undefined ) degrees = cube.right.getDistanceToPeg( 'x' )
					cube.right.cubelets.forEach( function( cubelet, i ){

						if( i === cube.right.cubelets.length - 1 ) cubelet.rotate( 'x', degrees, onTwistComplete )
						else cubelet.rotate( 'x', degrees )
					})
				}
				else if( command === 'M' && !cube.middle.isEngagedY() && !cube.middle.isEngagedZ() ){

					onTwistComplete = function( swap ){

						cube.cubelets[  1 ] = swap[ 19 ]
						cube.cubelets[ 10 ] = swap[ 22 ]
						cube.cubelets[ 19 ] = swap[ 25 ]
						cube.cubelets[  4 ] = swap[ 10 ]
						cube.cubelets[ 22 ] = swap[ 16 ]
						cube.cubelets[  7 ] = swap[  1 ]
						cube.cubelets[ 16 ] = swap[  4 ]
						cube.cubelets[ 25 ] = swap[  7 ]
					}
					if( degrees === undefined ) degrees = cube.middle.getDistanceToPeg( 'x' )
					cube.middle.cubelets.forEach( function( cubelet, i ){

						if( i === cube.middle.cubelets.length - 1 ) cubelet.rotate( 'x', degrees, onTwistComplete )
						else cubelet.rotate( 'x', degrees )
					})
				}
				else if( command === 'm' && !cube.middle.isEngagedY() && !cube.middle.isEngagedZ() ){

					onTwistComplete = function( swap ){

						cube.cubelets[  1 ] = swap[  7 ]
						cube.cubelets[ 10 ] = swap[  4 ]
						cube.cubelets[ 19 ] = swap[  1 ]
						cube.cubelets[  4 ] = swap[ 16 ]
						cube.cubelets[ 22 ] = swap[ 10 ]
						cube.cubelets[  7 ] = swap[ 25 ]
						cube.cubelets[ 16 ] = swap[ 22 ]
						cube.cubelets[ 25 ] = swap[ 19 ]
					}
					if( degrees === undefined ) degrees = cube.middle.getDistanceToPeg( 'X' )
					cube.middle.cubelets.forEach( function( cubelet, i ){

						if( i === cube.middle.cubelets.length - 1 ) cubelet.rotate( 'X', degrees, onTwistComplete )
						else cubelet.rotate( 'X', degrees, onTwistComplete )
					})
				}
				else if( command === 'L' && !cube.left.isEngagedY() && !cube.left.isEngagedZ() ){

					onTwistComplete = function( swap ){

						cube.cubelets[ 18 ] = swap[ 24 ]
						cube.cubelets[  9 ] = swap[ 21 ]
						cube.cubelets[  0 ] = swap[ 18 ]
						cube.cubelets[ 21 ] = swap[ 15 ]
						cube.cubelets[  3 ] = swap[  9 ]
						cube.cubelets[ 24 ] = swap[  6 ]
						cube.cubelets[ 15 ] = swap[  3 ]
						cube.cubelets[  6 ] = swap[  0 ]
					}
					if( degrees === undefined ) degrees = cube.left.getDistanceToPeg( 'x' )
					cube.left.cubelets.forEach( function( cubelet, i ){

						if( i === cube.left.cubelets.length - 1 ) cubelet.rotate( 'x', degrees, onTwistComplete )
						else cubelet.rotate( 'x', degrees )
					})
				}
				else if( command === 'l' && !cube.left.isEngagedY() && !cube.left.isEngagedZ() ){

					onTwistComplete = function( swap ){

						cube.cubelets[ 18 ] = swap[  0 ]
						cube.cubelets[  9 ] = swap[  3 ]
						cube.cubelets[  0 ] = swap[  6 ]
						cube.cubelets[ 21 ] = swap[  9 ]
						cube.cubelets[  3 ] = swap[ 15 ]
						cube.cubelets[ 24 ] = swap[ 18 ]
						cube.cubelets[ 15 ] = swap[ 21 ]
						cube.cubelets[  6 ] = swap[ 24 ]
					}
					if( degrees === undefined ) degrees = cube.left.getDistanceToPeg( 'X' )
					cube.left.cubelets.forEach( function( cubelet, i ){

						if( i === cube.left.cubelets.length - 1 ) cubelet.rotate( 'X', degrees, onTwistComplete )
						else cubelet.rotate( 'X', degrees )
					})
				}
				

				
		
				if( command === 'Y' && !cube.isEngagedX() && !cube.isEngagedZ() ){
			
					onTwistComplete = function( swap ){

						cube.cubelets = [

							swap[  2 ], swap[ 11 ], swap[ 20 ],
							swap[  5 ], swap[ 14 ], swap[ 23 ],
							swap[  8 ], swap[ 17 ], swap[ 26 ],

							swap[  1 ], swap[ 10 ], swap[ 19 ],
							swap[  4 ], swap[ 13 ], swap[ 22 ],
							swap[  7 ], swap[ 16 ], swap[ 25 ],

							swap[  0 ], swap[  9 ], swap[ 18 ],
							swap[  3 ], swap[ 12 ], swap[ 21 ],
							swap[  6 ], swap[ 15 ], swap[ 24 ]
						]
					}
					if( degrees === undefined ) degrees = cube.getDistanceToPeg( 'Y' )
					cube.cubelets.forEach( function( cubelet, i ){

						if( i === cube.cubelets.length - 1 ) cubelet.rotate( 'Y', degrees, onTwistComplete )
						else cubelet.rotate( 'Y', degrees )
					})
				}
				else if( command === 'y' && !cube.isEngagedX() && !cube.isEngagedZ() ){

					onTwistComplete = function( swap ){

						cube.cubelets = [

							swap[ 18 ], swap[  9 ], swap[  0 ],
							swap[ 21 ], swap[ 12 ], swap[  3 ],
							swap[ 24 ], swap[ 15 ], swap[  6 ],

							swap[ 19 ], swap[ 10 ], swap[  1 ],
							swap[ 22 ], swap[ 13 ], swap[  4 ],
							swap[ 25 ], swap[ 16 ], swap[  7 ],

							swap[ 20 ], swap[ 11 ], swap[  2 ],
							swap[ 23 ], swap[ 14 ], swap[  5 ],
							swap[ 26 ], swap[ 17 ], swap[  8 ]
						]
					}
					if( degrees === undefined ) degrees = cube.getDistanceToPeg( 'y' )
					cube.cubelets.forEach( function( cubelet, i ){

						if( i === cube.cubelets.length - 1 ) cubelet.rotate( 'y', degrees, onTwistComplete )
						else cubelet.rotate( 'y', degrees )
					})
				}
				else if( command === 'U' && !cube.up.isEngagedX() && !cube.up.isEngagedZ() ){
					
					onTwistComplete = function( swap ){

						cube.cubelets[ 18 ] = swap[  0 ]
						cube.cubelets[ 19 ] = swap[  9 ]
						cube.cubelets[ 20 ] = swap[ 18 ]
						cube.cubelets[  9 ] = swap[  1 ]
						cube.cubelets[ 11 ] = swap[ 19 ]
						cube.cubelets[  0 ] = swap[  2 ]
						cube.cubelets[  1 ] = swap[ 11 ]
						cube.cubelets[  2 ] = swap[ 20 ]
					}					
					if( degrees === undefined ) degrees = cube.up.getDistanceToPeg( 'Y' )
					cube.up.cubelets.forEach( function( cubelet, i ){
						
						if( i === cube.up.cubelets.length - 1 ) cubelet.rotate( 'Y', degrees, onTwistComplete )
						else cubelet.rotate( 'Y', degrees )
					})
				}
				else if( command === 'u' && !cube.up.isEngagedX() && !cube.up.isEngagedZ() ){
				
					onTwistComplete = function( swap ){

						cube.cubelets[ 18 ] = swap[ 20 ]
						cube.cubelets[ 19 ] = swap[ 11 ]
						cube.cubelets[ 20 ] = swap[  2 ]
						cube.cubelets[  9 ] = swap[ 19 ]
						cube.cubelets[ 11 ] = swap[  1 ]
						cube.cubelets[  0 ] = swap[ 18 ]
						cube.cubelets[  1 ] = swap[  9 ]
						cube.cubelets[  2 ] = swap[  0 ]
					}
					if( degrees === undefined ) degrees = cube.up.getDistanceToPeg( 'y' )
					cube.up.cubelets.forEach( function( cubelet, i ){
						
						if( i === cube.up.cubelets.length - 1 ) cubelet.rotate( 'y', degrees, onTwistComplete )
						else cubelet.rotate( 'y', degrees )
					})
				}
				else if( command === 'E' && !cube.equator.isEngagedX() && !cube.equator.isEngagedZ() ){
					
					onTwistComplete = function( swap ){
					
						cube.cubelets[ 21 ] = swap[ 23 ]
						cube.cubelets[ 22 ] = swap[ 14 ]
						cube.cubelets[ 23 ] = swap[  5 ]
						cube.cubelets[ 12 ] = swap[ 22 ]
						cube.cubelets[ 14 ] = swap[  4 ]
						cube.cubelets[  3 ] = swap[ 21 ]
						cube.cubelets[  4 ] = swap[ 12 ]
						cube.cubelets[  5 ] = swap[  3 ]
					}
					if( degrees === undefined ) degrees = cube.equator.getDistanceToPeg( 'y' )
					cube.equator.cubelets.forEach( function( cubelet, i ){

						if( i === cube.equator.cubelets.length - 1 ) cubelet.rotate( 'y', degrees, onTwistComplete )
						else cubelet.rotate( 'y', degrees )
					})
				}
				else if( command === 'e' && !cube.equator.isEngagedX() && !cube.equator.isEngagedZ() ){
					
					onTwistComplete = function( swap ){

						cube.cubelets[ 21 ] = swap[  3 ]
						cube.cubelets[ 22 ] = swap[ 12 ]
						cube.cubelets[ 23 ] = swap[ 21 ]
						cube.cubelets[ 12 ] = swap[  4 ]
						cube.cubelets[ 14 ] = swap[ 22 ]
						cube.cubelets[  3 ] = swap[  5 ]
						cube.cubelets[  4 ] = swap[ 14 ]
						cube.cubelets[  5 ] = swap[ 23 ]
					}
					if( degrees === undefined ) degrees = cube.equator.getDistanceToPeg( 'Y' )
					cube.equator.cubelets.forEach( function( cubelet, i ){

						if( i === cube.equator.cubelets.length - 1 ) cubelet.rotate( 'Y', degrees, onTwistComplete )
						else cubelet.rotate( 'Y', degrees )
					})
				}
				else if( command === 'D' && !cube.down.isEngagedX() && !cube.down.isEngagedZ() ){

					onTwistComplete = function( swap ){

						cube.cubelets[  6 ] = swap[ 24 ]
						cube.cubelets[  7 ] = swap[ 15 ]
						cube.cubelets[  8 ] = swap[  6 ]
						cube.cubelets[ 15 ] = swap[ 25 ]
						cube.cubelets[ 17 ] = swap[  7 ]
						cube.cubelets[ 24 ] = swap[ 26 ]
						cube.cubelets[ 25 ] = swap[ 17 ]
						cube.cubelets[ 26 ] = swap[  8 ]
					}
					if( degrees === undefined ) degrees = cube.down.getDistanceToPeg( 'y' )
					cube.down.cubelets.forEach( function( cubelet, i ){

						if( i === cube.down.cubelets.length - 1 ) cubelet.rotate( 'y', degrees, onTwistComplete )
						else cubelet.rotate( 'y', degrees )
					})
				}
				else if( command === 'd' && !cube.down.isEngagedX() && !cube.down.isEngagedZ() ){
					
					onTwistComplete = function( swap ){

						cube.cubelets[  6 ] = swap[  8 ]
						cube.cubelets[  7 ] = swap[ 17 ]
						cube.cubelets[  8 ] = swap[ 26 ]
						cube.cubelets[ 15 ] = swap[  7 ]
						cube.cubelets[ 17 ] = swap[ 25 ]
						cube.cubelets[ 24 ] = swap[  6 ]
						cube.cubelets[ 25 ] = swap[ 15 ]
						cube.cubelets[ 26 ] = swap[ 24 ]
					}
					if( degrees === undefined ) degrees = cube.down.getDistanceToPeg( 'Y' )
					cube.down.cubelets.forEach( function( cubelet, i ){

						if( i === cube.down.cubelets.length - 1 ) cubelet.rotate( 'Y', degrees, onTwistComplete )
						else cubelet.rotate( 'Y', degrees )
					})
				}

				

				if( command === 'Z' && !cube.isEngagedX() && !cube.isEngagedY() ){
			
					onTwistComplete = function( swap ){
						
						cube.cubelets = [

							swap[  6 ], swap[  3 ], swap[  0 ],
							swap[  7 ], swap[  4 ], swap[  1 ],
							swap[  8 ], swap[  5 ], swap[  2 ],

							swap[ 15 ], swap[ 12 ], swap[  9 ],
							swap[ 16 ], swap[ 13 ], swap[ 10 ],
							swap[ 17 ], swap[ 14 ], swap[ 11 ],

							swap[ 24 ], swap[ 21 ], swap[ 18 ],
							swap[ 25 ], swap[ 22 ], swap[ 19 ],
							swap[ 26 ], swap[ 23 ], swap[ 20 ]
						]
					}
					if( degrees === undefined ) degrees = cube.getDistanceToPeg( 'Z' )
					cube.cubelets.forEach( function( cubelet, i ){

						if( i === cube.cubelets.length - 1 ) cubelet.rotate( 'Z', degrees, onTwistComplete )
						else cubelet.rotate( 'Z', degrees )
					})
				}
				else if( command === 'z' && !cube.isEngagedX() && !cube.isEngagedY() ){

					onTwistComplete = function( swap ){

						cube.cubelets = [

							swap[  2 ], swap[  5 ], swap[  8 ],
							swap[  1 ], swap[  4 ], swap[  7 ],
							swap[  0 ], swap[  3 ], swap[  6 ],

							swap[ 11 ], swap[ 14 ], swap[ 17 ],
							swap[ 10 ], swap[ 13 ], swap[ 16 ],
							swap[  9 ], swap[ 12 ], swap[ 15 ],

							swap[ 20 ], swap[ 23 ], swap[ 26 ],
							swap[ 19 ], swap[ 22 ], swap[ 25 ],
							swap[ 18 ], swap[ 21 ], swap[ 24 ]
						]
					}
					if( degrees === undefined ) degrees = cube.getDistanceToPeg( 'z' )
					cube.cubelets.forEach( function( cubelet, i ){

						if( i === cube.cubelets.length - 1 ) cubelet.rotate( 'z', degrees, onTwistComplete )
						else cubelet.rotate( 'z', degrees )
					})
				}
				else if( command === 'F' && !cube.front.isEngagedX() && !cube.front.isEngagedY() ){

					onTwistComplete = function( swap ){

						cube.cubelets[  0 ] = swap[  6 ]
						cube.cubelets[  1 ] = swap[  3 ]
						cube.cubelets[  2 ] = swap[  0 ]
						cube.cubelets[  3 ] = swap[  7 ]
						cube.cubelets[  5 ] = swap[  1 ]
						cube.cubelets[  6 ] = swap[  8 ]
						cube.cubelets[  7 ] = swap[  5 ]
						cube.cubelets[  8 ] = swap[  2 ]
					}
					if( degrees === undefined ) degrees = cube.front.getDistanceToPeg( 'Z' )
					cube.front.cubelets.forEach( function( cubelet, i ){

						if( i === cube.front.cubelets.length - 1 ) cubelet.rotate( 'Z', degrees, onTwistComplete )
						else cubelet.rotate( 'Z', degrees )
					})
				}
				else if( command === 'f' && !cube.front.isEngagedX() && !cube.front.isEngagedY() ){

					onTwistComplete = function( swap ){

						cube.cubelets[  0 ] = swap[  2 ]
						cube.cubelets[  1 ] = swap[  5 ]
						cube.cubelets[  2 ] = swap[  8 ]
						cube.cubelets[  3 ] = swap[  1 ]
						cube.cubelets[  5 ] = swap[  7 ]
						cube.cubelets[  6 ] = swap[  0 ]
						cube.cubelets[  7 ] = swap[  3 ]
						cube.cubelets[  8 ] = swap[  6 ]
					}
					if( degrees === undefined ) degrees = cube.front.getDistanceToPeg( 'z' )
					cube.front.cubelets.forEach( function( cubelet, i ){

						if( i === cube.front.cubelets.length - 1 ) cubelet.rotate( 'z', degrees, onTwistComplete )
						else cubelet.rotate( 'z', degrees )
					})
				}
				else if( command === 'S' && !cube.standing.isEngagedX() && !cube.standing.isEngagedY() ){

					onTwistComplete = function( swap ){

						cube.cubelets[  9 ] = swap[ 15 ]
						cube.cubelets[ 10 ] = swap[ 12 ]
						cube.cubelets[ 11 ] = swap[  9 ]
						cube.cubelets[ 12 ] = swap[ 16 ]
						cube.cubelets[ 14 ] = swap[ 10 ]
						cube.cubelets[ 15 ] = swap[ 17 ]
						cube.cubelets[ 16 ] = swap[ 14 ]
						cube.cubelets[ 17 ] = swap[ 11 ]
					}
					if( degrees === undefined ) degrees = cube.standing.getDistanceToPeg( 'Z' )
					cube.standing.cubelets.forEach( function( cubelet, i ){

						if( i === cube.standing.cubelets.length - 1 ) cubelet.rotate( 'Z', degrees, onTwistComplete )
						else cubelet.rotate( 'Z', degrees )
					})
				}
				else if( command === 's' && !cube.standing.isEngagedX() && !cube.standing.isEngagedY() ){

					onTwistComplete = function( swap ){

						cube.cubelets[  9 ] = swap[ 11 ]
						cube.cubelets[ 10 ] = swap[ 14 ]
						cube.cubelets[ 11 ] = swap[ 17 ]
						cube.cubelets[ 12 ] = swap[ 10 ]
						cube.cubelets[ 14 ] = swap[ 16 ]
						cube.cubelets[ 15 ] = swap[  9 ]
						cube.cubelets[ 16 ] = swap[ 12 ]
						cube.cubelets[ 17 ] = swap[ 15 ]
					}
					if( degrees === undefined ) degrees = cube.standing.getDistanceToPeg( 'z' )
					cube.standing.cubelets.forEach( function( cubelet, i ){

						if( i === cube.standing.cubelets.length - 1 ) cubelet.rotate( 'z', degrees, onTwistComplete )
						else cubelet.rotate( 'z', degrees )
					})
				}
				else if( command === 'B' && !cube.back.isEngagedX() && !cube.back.isEngagedY() ){

					onTwistComplete = function( swap ){

						cube.cubelets[ 18 ] = swap[ 20 ]
						cube.cubelets[ 19 ] = swap[ 23 ]
						cube.cubelets[ 20 ] = swap[ 26 ]
						cube.cubelets[ 21 ] = swap[ 19 ]
						cube.cubelets[ 23 ] = swap[ 25 ]
						cube.cubelets[ 24 ] = swap[ 18 ]
						cube.cubelets[ 25 ] = swap[ 21 ]
						cube.cubelets[ 26 ] = swap[ 24 ]
					}
					if( degrees === undefined ) degrees = cube.back.getDistanceToPeg( 'z' )
					cube.back.cubelets.forEach( function( cubelet, i ){

						if( i === cube.back.cubelets.length - 1 ) cubelet.rotate( 'z', degrees, onTwistComplete )
						else cubelet.rotate( 'z', degrees )
					})
				}
				else if( command === 'b' && !cube.back.isEngagedX() && !cube.back.isEngagedY() ){

					onTwistComplete = function( swap ){

						cube.cubelets[ 18 ] = swap[ 24 ]
						cube.cubelets[ 19 ] = swap[ 21 ]
						cube.cubelets[ 20 ] = swap[ 18 ]
						cube.cubelets[ 21 ] = swap[ 25 ]
						cube.cubelets[ 23 ] = swap[ 19 ]
						cube.cubelets[ 24 ] = swap[ 26 ]
						cube.cubelets[ 25 ] = swap[ 23 ]
						cube.cubelets[ 26 ] = swap[ 20 ]
					}
					if( degrees === undefined ) degrees = cube.back.getDistanceToPeg( 'Z' )
					cube.back.cubelets.forEach( function( cubelet, i ){

						if( i === cube.back.cubelets.length - 1 ) cubelet.rotate( 'Z', degrees, onTwistComplete )
						else cubelet.rotate( 'Z', degrees )
					})
				}

				

				if( onTwistComplete instanceof Function ){

					twist.completed = Date.now()
					$( '#twist' ).text( command ).fadeIn( 50, function(){ 

						var that = this
						setTimeout( function(){

							$( that ).fadeOut( 500 )
						
						}, 50 )
					})				
				}
				else console.log( '! Received a twist command ('+ command +'), however some of the required Cubelets are currently engaged.' )
			}
			else if( erno.verbosity >= 0.8 ) console.log( '! Received an invalid twist command: '+ command +'.' )
		},

		showFaceLabels: function(){

			$( '.faceLabel' ).show()
			this.showingFaceLabels = true
		},
		hideFaceLabels: function(){

			$( '.faceLabel' ).hide()
			this.showingFaceLabels = false
		},

		loop: function(){

			if( cube.isRotating ){

				cube.threeObject.rotation.x += cube.rotationDeltaX.degreesToRadians()
				cube.threeObject.rotation.y += cube.rotationDeltaY.degreesToRadians()
				cube.threeObject.rotation.z += cube.rotationDeltaZ.degreesToRadians()
				updateControls()
			}

			
			
			
			
			

			if( cube.isReady && !cube.isTweening() ){
	
				if( cube.twistQueue.isReady ){

					
					

					if( cube.twistQueue.future.length === 0 ){

						
						

						if( cube.isShuffling ){

							cube.twistQueue.add( cube.shuffleMethod[ cube.shuffleMethod.length.rand() ])
						}
						

						else if( cube.isSolving && window.solver ){

							cube.isSolving = window.solver.consider( cube )
						}

						else if(cube.isSolvingLL && window.striegelSolver ){

							cube.isSolvingLL = window.striegelSolver.consider( cube )
						}

						else if(cube.isSolvingBeginner && window.beginnerSolver ){

							cube.isSolvingBeginner = window.beginnerSolver.consider( cube )
						}

						else if( cube.taskQueue.isReady === true ){

							var task = cube.taskQueue.do()
							if( task instanceof Function ) task()
						}					 
					}

					
					

					else {
						
						cube.twist( cube.twistQueue.do() )
					}

				}
			}
			else if( cube.isTweening ){
			}
		}

	})
})