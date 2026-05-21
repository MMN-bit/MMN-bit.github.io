function Cubelet( cube, id, colors ){

	this.cube = cube

	this.id = id || 0

	this.setAddress( this.id )

	this.size = cube.cubeletSize || 140

	var
	x = this.addressX * this.size,
	y = this.addressY * this.size,
	z = this.addressZ * this.size

	var	
	half = this.size / 2,
	rotations = [

		[   0,   0, 0 ],
		[ -90,   0, 0 ],
		[   0,  90, 0 ],
		[  90,   0, 0 ],
		[   0, -90, 0 ],
		[   0, 180, 0 ] 
	],
	positions = [

		[  0,     0,    half ],
		[  0,    -half, 0    ],
		[  half,  0,    0    ],
		[  0,     half, 0    ],
		[ -half,  0,    0    ],
		[  0,     0,   -half ] 
	]

	
	
	
	

	this.anchor = new THREE.Object3D()
	this.anchor.name = 'anchor-' + this.id
	if( this.cube )	this.cube.threeObject.add( this.anchor )
	else scene.add( this.anchor )

	if( erno.renderMode === 'css' ){
	
		var domElement = document.createElement( 'div' )
		domElement.classList.add( 'cubelet' )
		domElement.classList.add( 'cubeletId-'+ this.id )
		this.wrapper = new THREE.CSS3DObject( domElement )
	}
	else if( erno.renderMode === 'svg' ){
		
		this.wrapper = new THREE.Object3D()

		

		this.plastic = new THREE.Mesh( 

			new THREE.CubeGeometry( cube.cubeletSize, cube.cubeletSize, cube.cubeletSize ),
			new THREE.MeshBasicMaterial({ color: 0xFFFFFF, vertexColors: THREE.FaceColors })
		)
		this.plastic.position.set( x, y, z )
		this.wrapper.add( this.plastic )

		

		this.wireframe = new THREE.Mesh( 

			new THREE.CubeGeometry( cube.cubeletSize, cube.cubeletSize, cube.cubeletSize ),
			new THREE.MeshBasicMaterial({ color: 0x00CCFF, wireframe: true })
		)
		this.wireframe.position.set( x, y, z )
		this.wrapper.add( this.wireframe )
	}
	this.wrapper.name = 'wrapper-' + this.id
	this.wrapper.position.set( x, y, z )
	this.anchor.add( this.wrapper )

	

	

	
	
	

	var extrovertedFaces = 0
	if( colors === undefined ) colors = [ W, O,  ,  , G, ]
	this.faces = []

	
	
	
	

	for( var i = 0; i < 6; i ++ ){

		
		
		

		var
		color  = colors[ i ] || COLORLESS
		

		
		
		

		this.faces[ i ] = {}
		this.faces[ i ].id = i
		this.faces[ i ].color = color
		

		
		
		
		

		this.faces[ i ].normal = Direction.getNameById( i )

		if( erno.renderMode === 'css' ){

			
			
			

			var faceElement = document.createElement( 'div' )
			faceElement.classList.add( 'face' )
			faceElement.classList.add( 'face'+ Direction.getNameById( i ).capitalize() )
			this.wrapper.element.appendChild( faceElement )

			

			var wireframeElement = document.createElement( 'div' )
			wireframeElement.classList.add( 'wireframe' )
			faceElement.appendChild( wireframeElement )

			
			
			

			var idElement = document.createElement( 'div' )
			idElement.classList.add( 'id' )
			faceElement.appendChild( idElement )
			
			var underlineElement = document.createElement( 'span' )
			underlineElement.classList.add( 'underline' )
			underlineElement.innerText = this.id
			idElement.appendChild( underlineElement )
		}

		
		
		

		if( color === COLORLESS ){

			if( erno.renderMode === 'css' ) faceElement.classList.add( 'faceIntroverted' )
			else {

				this.plastic.geometry.faces[ i ].color.setHex( 0x000000 )
				this.plastic.geometry.colorsNeedUpdate = true
			}
		}

		
		
		
		

		else {

			
			
			

			extrovertedFaces ++

			if( erno.renderMode === 'css' ){	

				faceElement.classList.add( 'faceExtroverted' )

				
				
				

				var stickerElement = document.createElement( 'div' )
				stickerElement.classList.add( 'sticker' )			
				stickerElement.style.backgroundColor = color.hex
				faceElement.appendChild( stickerElement )

				
				

				var textElement = document.createElement( 'div' )
				textElement.classList.add( 'text' )
				textElement.innerText = i
				this.faces[ i ].text = textElement
				faceElement.appendChild( textElement )
			}
			else {

				
				
				
				
				

				
				var j = [ 3,3,3,3,3,3 ][ i ]

				this.plastic.geometry.faces[ j ].color.setHex( colorNameToDecimal( color ))
				
				this.plastic.geometry.colorsNeedUpdate = true
				
				
			}
		}
	}

	
	
	

	this.type = [

		'core',
		'center',
		'edge',
		'corner'

	][ extrovertedFaces ]

	
	

	this.map()

	
	
	

	this.isTweening = true
	this.isEngagedX = false
	this.isEngagedY = false
	this.isEngagedZ = false

	
	
	
	

	this.x = this.xPrevious = 0
	this.y = this.yPrevious = 0
	this.z = this.zPrevious = 0

	
	

	this.show()
	this.showPlastics()
	this.showIntroverts()
	this.showStickers()
	this.hideIds()
	this.hideTexts()
	this.hideWireframes()

	
	
	

	this.isTweening = false

	

	this.opacity = 1
	this.radius  = 0
}

setupTasks = window.setupTasks || []
setupTasks.push( function(){

	
	
	
	

	augment( Cubelet, {

		
		

		map: function(){

			this.front  = this.faces[ 0 ]
			this.up     = this.faces[ 1 ]
			this.right  = this.faces[ 2 ]
			this.down   = this.faces[ 3 ]
			this.left   = this.faces[ 4 ]
			this.back   = this.faces[ 5 ]
			this.colors = 

				( this.faces[ 0 ].color ? this.faces[ 0 ].color.initial : '-' ) +
				( this.faces[ 1 ].color ? this.faces[ 1 ].color.initial : '-' ) +
				( this.faces[ 2 ].color ? this.faces[ 2 ].color.initial : '-' ) +
				( this.faces[ 3 ].color ? this.faces[ 3 ].color.initial : '-' ) +
				( this.faces[ 4 ].color ? this.faces[ 4 ].color.initial : '-' ) +
				( this.faces[ 5 ].color ? this.faces[ 5 ].color.initial : '-' )
		},

		
		
		
		
		
		

		setAddress: function( address ){

			this.address  = address || 0
			this.addressX = address.modulo( 3 ).subtract( 1 )
			this.addressY = address.modulo( 9 ).divide( 3 ).roundDown().subtract( 1 ) * -1
			this.addressZ = address.divide( 9 ).roundDown().subtract( 1 ) * -1
		},

		
		

		inspect: function( face ){			

			if( face !== undefined ){

				
				
				
				return this[ face ].color || '!'
			}
			else {
				

				

				var
				that    = this,
				id      = this.id,
				address = this.address,
				type    = this.type,
				color   = this.cube.color,				
				LEFT    = 0,
				CENTER  = 1,
				getColorName = function( face, justification, minimumLength ){

					var colorName = that[ face ].color.name.toUpperCase()
					
					if( justification !== undefined && minimumLength !== undefined ){

						if( justification === CENTER ) colorName = colorName.justifyCenter( minimumLength )
						else if( justification === LEFT ) colorName = colorName.justifyLeft( minimumLength )
					}
					return colorName
				}

				if( id < 10 ) id = '0' + id
				if( address < 10 ) address = '0' + address
				console.log(

					'\n    ID         '+ id +
					'\n    Type       '+ type.toUpperCase() +'\n'+

					'\n    Address    '+ address +
					'\n    Address X  '+ this.addressX.toSignedString() +
					'\n    Address Y  '+ this.addressY.toSignedString() +
					'\n    Address Z  '+ this.addressZ.toSignedString() +'\n'+

					'\n    Engaged X  '+ this.isEngagedX +
					'\n    Engaged Y  '+ this.isEngagedY +
					'\n    Engaged Z  '+ this.isEngagedZ +
					'\n    Tweening   '+ this.isTweening +'\n'+
					
					'\n%c 0  Front      '+ getColorName( 'front', LEFT, 7 ) +'%c'+
					'\n%c 1  Up         '+ getColorName( 'up',    LEFT, 7 ) +'%c'+
					'\n%c 2  Right      '+ getColorName( 'right', LEFT, 7 ) +'%c'+
					'\n%c 3  Down       '+ getColorName( 'down',  LEFT, 7 ) +'%c'+
					'\n%c 4  Left       '+ getColorName( 'left',  LEFT, 7 ) +'%c'+
					'\n%c 5  Back       '+ getColorName( 'back',  LEFT, 7 ) +'%c\n' +

					'\n              -----------  %cback%c'+
					'\n            /    %cup%c     /|  %c5%c'+
					'\n           /     %c1%c     / | %c'+ getColorName( 'back' ) +'%c'+
					'\n          /%c'+ getColorName( 'up', CENTER, 11 ) +'%c/  |'+
					'\n  %cleft%c    -----------   %cright%c'+
					'\n   %c4%c     |           |   %c2%c'+
					'\n%c'+ getColorName( 'left', CENTER, 8 ) +'%c |   %cfront%c   |  %c'+ getColorName( 'right' ) +'%c'+
					'\n         |     %c0%c     |  /'+
					'\n         |%c'+ getColorName( 'front', CENTER, 11 ) +'%c| /'+
					'\n         |           |/'+
					'\n          -----------'+
					'\n               %cdown%c'+
					'\n                %c3%c'+
					'\n           %c'+ getColorName( 'down', CENTER, 11 ) +'%c\n',

					this.front.color.styleB, '',
					this.up.color.styleB,    '',
					this.right.color.styleB, '',
					this.down.color.styleB,  '',
					this.left.color.styleB,  '',
					this.back.color.styleB,  '',

					this.back.color.styleF,  '',
					this.up.color.styleF,    '',
					this.back.color.styleF,  '',
					this.up.color.styleF,    '',
					this.back.color.styleF,  '',
					this.up.color.styleF,    '',
					this.left.color.styleF,  '',
					this.right.color.styleF, '',
					this.left.color.styleF,  '',
					this.right.color.styleF, '',
					this.left.color.styleF,  '',
					this.front.color.styleF, '',
					this.right.color.styleF, '',
					this.front.color.styleF, '',
					this.front.color.styleF, '',
					this.down.color.styleF,  '',
					this.down.color.styleF,  '',
					this.down.color.styleF,  ''
				)
			}
		},

		
		
		

		hasColor: function( color ){

			var i, face
			
			for( i = 0; i < 6; i ++ ){

				if( this.faces[ i ].color === color ){
					
					face = i
					break
				}
			}
			if( face !== undefined ){

				return [

					'front',
					'up',
					'right',
					'down',
					'left',
					'back'

				][ face ]
			}
			else return false
		},

		
		

		hasColors: function(){

			var 
			cubelet = this,
			result  = true,
			colors  = Array.prototype.slice.call( arguments )
			
			colors.forEach( function( color ){

				result = result && !!cubelet.hasColor( color )
			})
			return result
		},

		
		

		rotate: function( rotation, degrees, cubeCallback ){

			var 
			cubelet = this,
			cube    = this.cube,
			xTarget = 0,
			yTarget = 0,
			zTarget = 0,			
			rotationUpperCase = rotation.toUpperCase(),
			threshold = 0.001

			
			
			

			this.isTweening = true

			
			
			

			if( rotationUpperCase === 'X' ){

				cubelet.isEngagedX = true
				if( rotation === 'X' ) xTarget = degrees
				else xTarget = -degrees
			}
			else if( rotationUpperCase === 'Y' ){

				cubelet.isEngagedY = true
				if( rotation === 'Y' ) yTarget = degrees
				else yTarget = -degrees
			}
			else if( rotationUpperCase === 'Z' ){

				cubelet.isEngagedZ = true
				if( rotation === 'Z' ) zTarget = degrees
				else zTarget = -degrees
			}

			

			this.x += xTarget.round()
			this.y += yTarget.round()
			this.z += zTarget.round()

			
			
			

			var 
			twistDuration = this.cube !== undefined ? this.cube.twistDuration : SECOND,
			twistDurationScaled = [ degrees.absolute().scale( 0, 90, 0, twistDuration ), SECOND ].minimum()

			
			
			

			new TWEEN.Tween( this.anchor.rotation )
			.to({

				x: -xTarget.degreesToRadians(),
				y: -yTarget.degreesToRadians(),
				z: -zTarget.degreesToRadians()
			
			}, twistDurationScaled )
			.easing( TWEEN.Easing.Quartic.Out )
			.start()
			.onComplete( function(){

				
				
				
				
				
				
				
				
				
				render()

				
				
				
				

				cubelet.wrapper.applyMatrix( cubelet.anchor.matrix )

				
				

				cubelet.anchor.rotation.set( 0, 0, 0 )

				
				
				
				
				

				var 
				xRemaps = cubelet.x.divide( 90 ).round()
					.subtract( cubelet.xPrevious.divide( 90 ).round() )
					.absolute(),
				yRemaps = cubelet.y.divide( 90 ).round()
					.subtract( cubelet.yPrevious.divide( 90 ).round() )
					.absolute(),
				zRemaps = cubelet.z.divide( 90 ).round()
					.subtract( cubelet.zPrevious.divide( 90 ).round() )
					.absolute()

				if( erno.verbosity >= 0.9 ){

					console.log( 'Cublet #'+ ( cubelet.id < 10 ? '0'+ cubelet.id : cubelet.id ), 
						' |  xRemaps:', xRemaps, ' yRemaps:', yRemaps, ' zRemaps:', zRemaps,
						' |  xPrev:', cubelet.xPrevious, ' x:', cubelet.x,
						' |  yPrev:', cubelet.yPrevious, ' y:', cubelet.y,
						' |  zPrev:', cubelet.zPrevious, ' z:', cubelet.z )
				}

				if( xRemaps ){
					
					while( xRemaps -- ){

						if( cubelet.x < cubelet.xPrevious ) cubelet.faces = [ cubelet.up, cubelet.back, cubelet.right, cubelet.front, cubelet.left, cubelet.down ]
						else cubelet.faces = [ cubelet.down, cubelet.front, cubelet.right, cubelet.back, cubelet.left, cubelet.up ]
						cubelet.map()
						if( cubeCallback !== undefined ){

							cubeCallback( cubelet.cube.cubelets.slice())
							cubelet.cube.map()
						}
					}
					cubelet.xPrevious = cubelet.x
				}
				if( cubelet.x.modulo( 90 ).absolute() < threshold ){

					cubelet.x = 0
					cubelet.xPrevious = cubelet.x
					cubelet.isEngagedX = false
				}
				

				if( yRemaps ){
					
					while( yRemaps -- ){

						if( cubelet.y < cubelet.yPrevious ) cubelet.faces = [ cubelet.left, cubelet.up, cubelet.front, cubelet.down, cubelet.back, cubelet.right ]
						else cubelet.faces = [ cubelet.right, cubelet.up, cubelet.back, cubelet.down, cubelet.front, cubelet.left ]
						cubelet.map()
						if( cubeCallback !== undefined ){

							cubeCallback( cubelet.cube.cubelets.slice())
							cubelet.cube.map()
						}
					}
					cubelet.yPrevious = cubelet.y
				}
				if( cubelet.y.modulo( 90 ).absolute() < threshold ){

					cubelet.y = 0
					cubelet.yPrevious = cubelet.y
					cubelet.isEngagedY = false
				}

				if( zRemaps ){
					
					while( zRemaps -- ){

						if( cubelet.z < cubelet.zPrevious ) cubelet.faces = [ cubelet.front, cubelet.right, cubelet.down, cubelet.left, cubelet.up, cubelet.back ]
						else cubelet.faces = [ cubelet.front, cubelet.left, cubelet.up, cubelet.right, cubelet.down, cubelet.back ]
						cubelet.map()
						if( cubeCallback !== undefined ){

							cubeCallback( cubelet.cube.cubelets.slice())
							cubelet.cube.map()
						}
					}
					cubelet.zPrevious = cubelet.z
				}
				if( cubelet.z.modulo( 90 ).absolute() < threshold ){

					cubelet.z = 0
					cubelet.zPrevious = cubelet.z
					cubelet.isEngagedZ = false
				}

				

				cubelet.isTweening = false
			})
		},

		

		show: function(){

			$( '.cubeletId-'+ this.id ).show()
			this.showing = true
		},
		hide: function(){

			$( '.cubeletId-'+ this.id ).hide()
			this.showing = false
		},
		showPlastics: function(){

			if( erno.renderMode === 'css' ) $( '.cubeletId-'+ this.id +' .face' ).removeClass( 'faceTransparent' )
			else this.plastic.material.opacity = 1
			this.showingPlastics = true
		},
		hidePlastics: function(){

			if( erno.renderMode === 'css' ) $( '.cubeletId-'+ this.id +' .face' ).addClass( 'faceTransparent' )
			else this.plastic.material.opacity = 0
			this.showingPlastics = false
		},
		showExtroverts: function(){

			$( '.cubeletId-'+ this.id + ' .faceExtroverted' ).show()
			this.showingExtroverts = true
		},
		hideExtroverts: function(){

			$( '.cubeletId-'+ this.id + ' .faceExtroverted' ).hide()
			this.showingExtroverts = false
		},
		showIntroverts: function(){

			$( '.cubeletId-'+ this.id + ' .faceIntroverted' ).show()
			this.showingIntroverts = true
		},
		hideIntroverts: function(){

			$( '.cubeletId-'+ this.id + ' .faceIntroverted' ).hide()
			this.showingIntroverts = false
		},
		showStickers: function(){

			if( erno.renderMode === 'css' ) $( '.cubeletId-'+ this.id + ' .sticker' ).show()
			else this.faces.forEach( function( face ){

				if( face.sticker ) face.sticker.material.opacity = 1
			})
			this.showingStickers = true
		},
		hideStickers: function(){

			if( erno.renderMode === 'css' ) $( '.cubeletId-'+ this.id + ' .sticker' ).hide()
			else this.faces.forEach( function( face ){

				if( face.sticker ) face.sticker.material.opacity = 0
			})
			this.showingStickers = false
		},
		showWireframes: function(){

			if( erno.renderMode === 'css' ) $( '.cubeletId-'+ this.id + ' .wireframe' ).show()
			else this.wireframe.material.opacity = 1
			this.showingWireframes = true
		},
		hideWireframes: function(){

			if( erno.renderMode === 'css' ) $( '.cubeletId-'+ this.id + ' .wireframe' ).hide()
			else this.wireframe.material.opacity = 0
			this.showingWireframes = false
		},
		showIds: function(){

			$( '.cubeletId-'+ this.id + ' .id' ).show()
			this.showingIds = true
		},
		hideIds: function(){

			$( '.cubeletId-'+ this.id + ' .id' ).hide()
			this.showingIds = false
		},
		showTexts: function(){

			$( '.cubeletId-'+ this.id + ' .text' ).show()
			this.showingTexts = true
		},
		hideTexts: function(){

			$( '.cubeletId-'+ this.id + ' .text' ).hide()
			this.showingTexts = false
		},

		getOpacity: function(){

			return this.opacity
		},
		setOpacity: function( opacityTarget, onComplete ){

			if( this.opacityTween ) this.opacityTween.stop()
			if( opacityTarget === undefined ) opacityTarget = 1
			if( opacityTarget !== this.opacity ){

				var 
				that = this,
				tweenDuration = ( opacityTarget - this.opacity ).absolute().scale( 0, 1, 0, SECOND )

				this.opacityTween = new TWEEN.Tween({ opacity: this.opacity })
				.to({

					opacity: opacityTarget
				
				}, tweenDuration )
				.easing( TWEEN.Easing.Quadratic.InOut )
				.onUpdate( function(){

					$( '.cubeletId-'+ that.id ).css( 'opacity', this.opacity )
					that.opacity = this.opacity
				})
				.onComplete( function(){

					if( onComplete instanceof Function ) onComplete()
				})
				.start()
			}
		},
		getStickersOpacity: function( value ){

			return $( '.cubeletId-'+ this.id + ' .sticker' ).css( 'opacity' )
		},
		setStickersOpacity: function( value ){

			if( value === undefined ) value = 0.2
			$( '.cubeletId-'+ this.id + ' .sticker' ).css( 'opacity', value )
		},
		getRadius: function(){

			return this.radius
		},
		setRadius: function( radius, onComplete ){

			
			
			
			

			
			
			
			

			if( this.isTweening === false ){
	
				radius = radius || 0
				if( this.radius === undefined ) this.radius = 0
				if( this.radius !== radius ){

					
					

					var tweenDuration = ( this.radius - radius ).absolute().scale( 0, 100, 0, SECOND )

					
					

					var that = this
					new TWEEN.Tween( this.wrapper.position )
					.to({

						x: this.addressX.multiply( this.size + radius ),
						y: this.addressY.multiply( this.size + radius ),
						z: this.addressZ.multiply( this.size + radius )
					
					}, tweenDuration )
					.easing( TWEEN.Easing.Quartic.Out )	
					.onComplete( function(){

						that.radius = radius
						if( onComplete instanceof Function ) onComplete()
					})
					.start()
				}
			}
		}
	

	})
})