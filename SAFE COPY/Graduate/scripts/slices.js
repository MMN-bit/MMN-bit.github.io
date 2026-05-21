function Slice(){

	this.cubelets = Array.prototype.slice.call( arguments )
	this.map()
}

setupTasks = window.setupTasks || []
setupTasks.push( function(){

	augment( Slice, {

	
		inspect: function( compact, side ){

			var
			getColorName = function( cubelet ){

				return cubelet[ side ].color.name.toUpperCase().justifyCenter( 9 )
			},
			sideLabel = ''

			if( side === undefined ){

 				if( this.face !== undefined ) side = this.face
				else side = 'front'
			}
			if( side instanceof Direction ) side = side.name
			if( side !== this.face ) sideLabel = side + 's'
			if( compact ){

				console.log(

					'\n' + this.name.capitalize().justifyLeft( 10 ) +
					'%c '+ this.northWest.id.toPaddedString( 2 ) +' %c '+
					'%c '+ this.north.id.toPaddedString( 2 ) +' %c '+
					'%c '+ this.northEast.id.toPaddedString( 2 ) +' %c '+
					'\n' + sideLabel +'\n'+

					'          %c '+ this.west.id.toPaddedString( 2 ) +' %c '+
					'%c '+ this.origin.id.toPaddedString( 2 ) +' %c '+
					'%c '+ this.east.id.toPaddedString( 2 ) +' %c '+
					'\n\n'+
					'          %c '+ this.southWest.id.toPaddedString( 2 ) +' %c '+
					'%c '+ this.south.id.toPaddedString( 2 ) +' %c '+
					'%c '+ this.southEast.id.toPaddedString( 2 ) +' %c '+
					'\n',

					this.northWest[ side ].color.styleB, '',
					this.north[     side ].color.styleB, '',
					this.northEast[ side ].color.styleB, '',
					
					this.west[      side ].color.styleB, '',
					this.origin[    side ].color.styleB, '',
					this.east[      side ].color.styleB, '',
					
					this.southWest[ side ].color.styleB, '',
					this.south[     side ].color.styleB, '',
					this.southEast[ side ].color.styleB, ''
				)
			}
			else {

				console.log(

					'\n          %c           %c %c           %c %c           %c '+
					'\n'+ this.name.capitalize().justifyLeft( 10 ) +
					'%c northWest %c '+
					'%c   north   %c '+
					'%c northEast %c '+
					'\n' + sideLabel.justifyLeft( 10 ) +
					'%c '+ this.northWest.id.toPaddedString( 2 ).justifyCenter( 9 ) +' %c '+
					'%c '+ this.north.id.toPaddedString( 2 ).justifyCenter( 9 ) +' %c '+
					'%c '+ this.northEast.id.toPaddedString( 2 ).justifyCenter( 9 ) +' %c '+
					'\n' +
					'          %c ' + getColorName( this.northWest ) +' %c '+
					'%c '+ getColorName( this.north ) +' %c '+
					'%c '+ getColorName( this.northEast ) +' %c '+
					'\n          %c           %c %c           %c %c           %c '+

					'\n\n          %c           %c %c           %c %c           %c '+
					'\n          %c    west   %c '+
					'%c   origin  %c '+
					'%c    east   %c '+
					'\n' +
					'          %c ' + this.west.id.toPaddedString( 2 ).justifyCenter( 9 ) +' %c '+
					'%c '+ this.origin.id.toPaddedString( 2 ).justifyCenter( 9 ) +' %c '+
					'%c '+ this.east.id.toPaddedString( 2 ).justifyCenter( 9 ) +' %c '+
					'\n' +
					'          %c ' + getColorName( this.west ) +' %c '+
					'%c '+ getColorName( this.origin ) +' %c '+
					'%c '+ getColorName( this.east ) +' %c '+
					'\n          %c           %c %c           %c %c           %c '+

					'\n\n          %c           %c %c           %c %c           %c '+
					'\n          %c southWest %c '+
					'%c   south   %c '+
					'%c southEast %c '+
					'\n' +
					'          %c ' + this.southWest.id.toPaddedString( 2 ).justifyCenter( 9 ) +' %c '+
					'%c '+ this.south.id.toPaddedString( 2 ).justifyCenter( 9 ) +' %c '+
					'%c '+ this.southEast.id.toPaddedString( 2 ).justifyCenter( 9 ) +' %c '+
					'\n' +
					'          %c ' + getColorName( this.southWest ) +' %c '+
					'%c '+ getColorName( this.south ) +' %c '+
					'%c '+ getColorName( this.southEast ) +' %c '+
					'\n          %c           %c %c           %c %c           %c\n',

					this.northWest[ side ].color.styleB, '',
					this.north[     side ].color.styleB, '',
					this.northEast[ side ].color.styleB, '',
					this.northWest[ side ].color.styleB, '',
					this.north[     side ].color.styleB, '',
					this.northEast[ side ].color.styleB, '',
					this.northWest[ side ].color.styleB, '',
					this.north[     side ].color.styleB, '',
					this.northEast[ side ].color.styleB, '',
					this.northWest[ side ].color.styleB, '',
					this.north[     side ].color.styleB, '',
					this.northEast[ side ].color.styleB, '',
					this.northWest[ side ].color.styleB, '',
					this.north[     side ].color.styleB, '',
					this.northEast[ side ].color.styleB, '',
					
					this.west[      side ].color.styleB, '',
					this.origin[    side ].color.styleB, '',
					this.east[      side ].color.styleB, '',
					this.west[      side ].color.styleB, '',
					this.origin[    side ].color.styleB, '',
					this.east[      side ].color.styleB, '',
					this.west[      side ].color.styleB, '',
					this.origin[    side ].color.styleB, '',
					this.east[      side ].color.styleB, '',
					this.west[      side ].color.styleB, '',
					this.origin[    side ].color.styleB, '',
					this.east[      side ].color.styleB, '',
					this.west[      side ].color.styleB, '',
					this.origin[    side ].color.styleB, '',
					this.east[      side ].color.styleB, '',
					
					this.southWest[ side ].color.styleB, '',
					this.south[     side ].color.styleB, '',
					this.southEast[ side ].color.styleB, '',
					this.southWest[ side ].color.styleB, '',
					this.south[     side ].color.styleB, '',
					this.southEast[ side ].color.styleB, '',
					this.southWest[ side ].color.styleB, '',
					this.south[     side ].color.styleB, '',
					this.southEast[ side ].color.styleB, '',
					this.southWest[ side ].color.styleB, '',
					this.south[     side ].color.styleB, '',
					this.southEast[ side ].color.styleB, '',
					this.southWest[ side ].color.styleB, '',
					this.south[     side ].color.styleB, '',
					this.southEast[ side ].color.styleB, ''
				)
			}
		},
		map: function(){

			
			

			this.origin    = this.cubelets[ 4 ]
			this.north     = this.cubelets[ 1 ]
			this.northEast = this.cubelets[ 2 ]
			this.east      = this.cubelets[ 5 ]
			this.southEast = this.cubelets[ 8 ]
			this.south     = this.cubelets[ 7 ]
			this.southWest = this.cubelets[ 6 ]
			this.west      = this.cubelets[ 3 ]
			this.northWest = this.cubelets[ 0 ]

			
			
			
			
			

			for( var i = 0; i < 6; i ++ ){

				if( this.origin.faces[ i ].color && this.origin.faces[ i ].color !== COLORLESS ){

					this.color = this.origin.faces[ i ].color
					this.face = Direction.getNameById( i )
					break
				}
			}

			
			
			
		
			this.up = new Group(

				this.northWest, this.north, this.northEast
			)
			this.equator = new Group(

				this.west, this.origin, this.east
			)
			this.down = new Group(

				this.southWest, this.south, this.southEast
			)
			this.left = new Group(

				this.northWest,
				this.west,
				this.southWest
			)
			this.middle = new Group(

				this.north,
				this.origin,
				this.south
			)
			this.right = new Group(

				this.northEast,
				this.east,
				this.southEast
			)

			
			
			

			var hasCenter = this.hasType( 'center' )
			if( hasCenter && hasCenter.cubelets.length === 1 ){

				this.center  = this.hasType( 'center' )
				this.corners = new Group( this.hasType( 'corner' ))
				this.cross   = new Group( this.center, this.hasType( 'edge' ))				
				this.ex      = new Group( this.center, this.hasType( 'corner' ))
			}

			
			
			
			

			else {

				this.centers = new Group( this.hasType( 'center' ))
			}
			this.edges = new Group( this.hasType( 'edge' ))			

			
			
			

			this.ring = new Group(

				this.northWest, this.north, this.northEast,
				this.west, this.east,
				this.southWest, this.south, this.southEast
			)

			
			

			this.dexter = new Group(

				this.northWest,
				this.origin,
				this.southEast
			)
			this.sinister = new Group(

				this.northEast,
				this.origin,
				this.southWest
			)
		},

		
		

		getLocation: function( cubelet ){

			if( cubelet === this.origin    ) return 'origin'
			if( cubelet === this.north     ) return 'north'
			if( cubelet === this.northEast ) return 'northEast'
			if( cubelet === this.east      ) return 'east'
			if( cubelet === this.southEast ) return 'southEast'
			if( cubelet === this.south     ) return 'south'
			if( cubelet === this.southWest ) return 'southWest'
			if( cubelet === this.west      ) return 'west'
			if( cubelet === this.northWest ) return 'northWest'

			return false
		}

	})

	
	
	

	learn( Slice.prototype, Group.prototype )
})