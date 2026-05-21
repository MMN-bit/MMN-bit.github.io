/*



	I wanted to write a Solver that only minds the sticker colors,
	not the absolute desired positions and rotations.
	So basically I wanted to write a Solver that works the way a
	human does -- the way that I do.


	http://youtu.be/tOgN7d1D-3s


*/



window.solver = new Solver()
solver.hint = function(){}
solver.logic = function( cube ){
	var solver = this

	var history = cube.twistQueue.history
	if( cube.isSolved() === true ){
		cube.twistQueue.history = []
		return false
	}
	if( history.length > 0){

		var inverses = history.slice().reverse().map( function( twist ){
			return twist.getInverse().command
		})
		cube.twistQueue.add.apply( cube.twistQueue, inverses )
		cube.twistQueue.history = []
		return
	}

	var
	step,
	twist, i, j,
	relevant, irrelevant,
	targetCubelets, targetCubelet

	function showRelevant( group ){

		group
		.setOpacity( 1 )
		
	}
	function showIrrelevant( group ){

		group
		.setOpacity( 1 )
		
	}
	function showHighlighted( group ){

		
		return group
	}
	function isSolvedSafe( target, face ){

		if( target && target.isSolved instanceof Function ) return target.isSolved( face )
		return false
	}
	function queuePlan( moves ){

		cube.twistQueue.add.apply( cube.twistQueue, moves )
		return true
	}
	function isSecondLayerStage(){

		return cube.isSecondLayerRotated === true
	}
	
	function isCubeletInGroup( cubelet, group ){

		return group && group.cubelets && group.cubelets.indexOf( cubelet ) >= 0
	}
	
	function getTopCornerSlots(){

		return [
			{ sideA: FRONT, sideB: RIGHT, upCorner: 'southEast' },
			{ sideA: RIGHT, sideB: BACK,  upCorner: 'northEast' },
			{ sideA: BACK,  sideB: LEFT,  upCorner: 'northWest' },
			{ sideA: LEFT,  sideB: FRONT, upCorner: 'southWest' }
		]
	}
	function isTopCornerSlotSolved( slot ){

		var c = cube.up[ slot.upCorner ]
		if( !c ) return false

		return (
			c.up.color === cube.up.color &&
			c[ slot.sideA.name ].color === cube[ slot.sideA.name ].color &&
			c[ slot.sideB.name ].color === cube[ slot.sideB.name ].color
		)
	}
	function isTopCornersSolved(){

		var slots = getTopCornerSlots(), s
		for( s = 0; s < slots.length; s ++ ){

			if( !isTopCornerSlotSolved( slots[ s ] )) return false
		}
		return true
	}
	function findCornerForSlot( slot ){

		var g = cube.corners.hasColors(
			cube.up.color,
			cube[ slot.sideA.name ].color,
			cube[ slot.sideB.name ].color
		)

		return g && g.cubelets.length ? g.cubelets[ 0 ] : null
	}
	function isCornerUnderSlot( corner, slot ){

		return (
			isCubeletInGroup( corner, cube.down ) &&
			isCubeletInGroup( corner, cube[ slot.sideA.name ] ) &&
			isCubeletInGroup( corner, cube[ slot.sideB.name ] )
		)
	}
	function getCornerDownSlot( corner ){

		var slots = getTopCornerSlots(), s, slot
		for( s = 0; s < slots.length; s ++ ){

			slot = slots[ s ]
			if(
				isCubeletInGroup( corner, cube.down ) &&
				isCubeletInGroup( corner, cube[ slot.sideA.name ] ) &&
				isCubeletInGroup( corner, cube[ slot.sideB.name ] )
			) return slot
		}
		return null
	}
	function getCornerUpSlot( corner ){

		var slots = getTopCornerSlots(), s, slot
		for( s = 0; s < slots.length; s ++ ){

			slot = slots[ s ]
			if( cube.up[ slot.upCorner ] === corner ) return slot
		}
		return null
	}
	function cornerRightTrigger( slot ){

		return [
			slot.sideB.initial.toLowerCase(),
			'd',
			slot.sideB.initial,
			'D'
		]
	}
	function getSecondLayerSlots(){

		return [
			{ sideA: FRONT, sideB: RIGHT },
			{ sideA: RIGHT, sideB: BACK  },
			{ sideA: BACK,  sideB: LEFT  },
			{ sideA: LEFT,  sideB: FRONT }
		]
	}
	function findEdgeByColors( colorA, colorB ){

		var g = cube.edges.hasColors( colorA, colorB )
		return g && g.cubelets.length ? g.cubelets[ 0 ] : null
	}
	function findSecondLayerEdgeForSlot( slot ){

		return findEdgeByColors(
			cube[ slot.sideA.name ].color,
			cube[ slot.sideB.name ].color
		)
	}
	function isSecondLayerSlotSolved( slot ){

		var edge = findSecondLayerEdgeForSlot( slot )
		if( !edge ) return false

		return (
			isCubeletInGroup( edge, cube.equator ) &&
			isCubeletInGroup( edge, cube[ slot.sideA.name ] ) &&
			isCubeletInGroup( edge, cube[ slot.sideB.name ] ) &&
			edge[ slot.sideA.name ].color === cube[ slot.sideA.name ].color &&
			edge[ slot.sideB.name ].color === cube[ slot.sideB.name ].color
		)
	}
	function isSecondLayerSolved(){

		var slots = getSecondLayerSlots(), s
		for( s = 0; s < slots.length; s ++ ){

			if( !isSecondLayerSlotSolved( slots[ s ] )) return false
		}
		return true
	}
	function getColorHomeDirection( color ){

		var center = cube.centers.hasColor( color ).cubelets[ 0 ], k
		if( !center ) return null

		for( k = 0; k < 6; k ++ ){

			if( center.faces[ k ].color === color ) return Direction.getDirectionById( k )
		}
		return null
	}
	function getCubeletColorDirections( cubelet ){

		var directions = [], k
		for( k = 0; k < 6; k ++ ){

			if( cubelet.faces[ k ].color !== COLORLESS ){
				directions.push( Direction.getDirectionById( k ))
			}
		}
		return directions
	}
	function getSecondLayerEquatorSlot( edge ){

		var slots = getSecondLayerSlots(), s, slot
		for( s = 0; s < slots.length; s ++ ){

			slot = slots[ s ]
			if(
				isCubeletInGroup( edge, cube.equator ) &&
				isCubeletInGroup( edge, cube[ slot.sideA.name ] ) &&
				isCubeletInGroup( edge, cube[ slot.sideB.name ] )
			) return slot
		}
		return null
	}
	function secondLayerRightInsertion( front, right ){

		if( cube.isSecondLayerRotated === true ){

			return [
				'U',
				right.initial,
				'u',
				right.initial.toLowerCase(),
				'u',
				front.initial.toLowerCase(),
				'U',
				front.initial
			]
		}

		return [
			'd',
			right.initial.toLowerCase(),
			'D',
			right.initial,
			'D',
			front.initial,
			'd',
			front.initial.toLowerCase()
		]
	}
	function secondLayerLeftInsertion( front, left ){

		if( cube.isSecondLayerRotated === true ){

			return [
				'u',
				left.initial.toLowerCase(),
				'U',
				left.initial,
				'U',
				front.initial,
				'u',
				front.initial.toLowerCase()
			]
		}

		return [
			'D',
			left.initial,
			'd',
			left.initial.toLowerCase(),
			'd',
			front.initial.toLowerCase(),
			'D',
			front.initial
		]
	}
	
	function getDownRotationPlan( fromDirection, toDirection ){

		if( !fromDirection || !toDirection ) return []

		var cw = 0, ccw = 0, probe = fromDirection
		while( probe !== toDirection && cw < 4 ){

			probe = DOWN.getClockwise( probe )
			cw ++
		}

		probe = fromDirection
		while( probe !== toDirection && ccw < 4 ){

			probe = DOWN.getAnticlockwise( probe )
			ccw ++
		}

		if( cw <= ccw ) return Array( cw ).fill( 'D' )
		return Array( ccw ).fill( 'd' )
	}
	function getSecondLayerRotationPlan( fromDirection, toDirection ){

		if( !fromDirection || !toDirection ) return []

		var cw = 0, ccw = 0, probe = fromDirection
		while( probe !== toDirection && cw < 4 ){

			probe = DOWN.getClockwise( probe )
			cw ++
		}

		probe = fromDirection
		while( probe !== toDirection && ccw < 4 ){

			probe = DOWN.getAnticlockwise( probe )
			ccw ++
		}

		if( cube.isSecondLayerRotated === true ){

			if( cw <= ccw ) return Array( cw ).fill( 'U' )
			return Array( ccw ).fill( 'u' )
		}

		if( cw <= ccw ) return Array( cw ).fill( 'D' )
		return Array( ccw ).fill( 'd' )
	}


	

	




	    /////////////////////
	   //                 //
	  //   First Layer   //
	 //                 //
	/////////////////////


	//  Have we solved the TOP CROSS?




	
	if( isSecondLayerStage() !== true && (
		isSolvedSafe( cube.up && cube.up.cross, UP ) === false ||
		cube.up.north.back.color  !== cube.back.color  ||
		cube.up.east.right.color  !== cube.right.color ||
		cube.up.south.front.color !== cube.front.color ||
		cube.up.west.left.color   !== cube.left.color )){
		cube.isSecondLayerRotated = false
			

		relevant = new Group()
		relevant.add(
			
			cube.edges.hasColor( cube.up.color ),
			cube.centers.hasColor( cube.up.color ),
			cube.back.origin,
			cube.right.origin,
			cube.front.origin,
			cube.left.origin
		)
		showRelevant( relevant )



		irrelevant = new Group( cube.cubelets )
		irrelevant.remove( relevant.cubelets )
		showIrrelevant( irrelevant )



		
		//  Search the DOWN FACE for Top Cross pieces.

		var targetCubelet = cube.down.edges.hasColor( cube.up.color )
		if( targetCubelet && targetCubelet.cubelets.length > 0 ){
			
			targetCubelet = targetCubelet.cubelets[ 0 ]
			showHighlighted( targetCubelet )
			this.hint( 'I’ve found an edge cubelet on the Down face of the cube that we should bring to the Up face.' )


			//  Is the targetColor of the targetCubelet on the DOWN face or a side face?

			for( i = 0; i < 6; i ++ ){

				if( targetCubelet.faces[ i ].color !== COLORLESS ){

					if( targetCubelet.faces[ i ].color === cube.up.color ){

						var targetCubelet_targetFace_direction = Direction.getDirectionById( i )
					}
					else {

						var 
						targetCubelet_partnerFace_direction = Direction.getDirectionById( i ),
						targetCubelet_partnerFace_color = targetCubelet.faces[ i ].color
					}
				}
			}
			this.hint(
			
				'This edge cubelet on the down face that we want to move '+
				'is '+ cube.up.color.name.capitalize() +' on the '+ targetCubelet_targetFace_direction.name.capitalize() +' face '+
				'and '+ targetCubelet_partnerFace_color.name.capitalize() + ' on the '+ targetCubelet_partnerFace_direction.name.capitalize() + ' face.'
			)



			//  TOP CROSS search along the BOTTOM LAYER			
			
			//  If the targetFace of our targetCubelet is on the DOWN FACE...

			if( targetCubelet_targetFace_direction === DOWN ){


				//  Is this Cubelet just a 180 degree twist away from home?
				
				if( targetCubelet_partnerFace_color === cube[ targetCubelet_partnerFace_direction.name ].color ){

					
					twist = targetCubelet_partnerFace_direction.initial
					cube.twistQueue.add( twist, twist )
					return true
				}

				
				//  Does this Cubelet's other (non-up) color match the opposite face's color?
				//  Twist back face twice to move it to the opposite side,
				//  then whatever face that is we need to spin that twice too.

				else if( targetCubelet_partnerFace_color === cube[ targetCubelet_partnerFace_direction.getOpposite().name ].color ){

					
					twist = targetCubelet_partnerFace_direction.getOpposite().initial
					cube.twistQueue.add( 'dd', twist, twist )
					return true
				}


				//  We're adjacent to the face we need to be on.
				//  But in which direction? Clockwise or Anti?
				//  Once we're on that face we spin it twice.

				else {

					var 
					targetCubelet_partnerFace_cubeFaceOrigin = cube.equator.centers.hasColor( targetCubelet_partnerFace_color ).cubelets[ 0 ],
					targetCubelet_partnerFace_cubeFaceOrigin_direction

					for( i = 0; i < 6; i ++ ){

						if( targetCubelet_partnerFace_cubeFaceOrigin.faces[ i ].color !== COLORLESS ){

							targetCubelet_partnerFace_cubeFaceOrigin_direction = Direction.getDirectionById( i )
							break
						}
					}
					twist = 'd'					
					if( DOWN.getClockwise( targetCubelet_partnerFace_direction ) === targetCubelet_partnerFace_cubeFaceOrigin_direction )
						twist = 'D'
					cube.twistQueue.add( 
						
						twist,
						targetCubelet_partnerFace_cubeFaceOrigin_direction.initial,
						targetCubelet_partnerFace_cubeFaceOrigin_direction.initial
					)
					return true
				}
			}




			//  But if the *partnerFace* of our targetCubelet is on the DOWN FACE...

			else {

				var 
				targetCubelet_partnerFace_cubeFaceOrigin = cube.equator.centers.hasColor( targetCubelet_partnerFace_color ).cubelets[ 0 ],
				targetCubelet_partnerFace_cubeFaceOrigin_direction

				for( i = 0; i < 6; i ++ ){

					if( targetCubelet_partnerFace_cubeFaceOrigin.faces[ i ].color !== COLORLESS ){

						targetCubelet_partnerFace_cubeFaceOrigin_direction = Direction.getDirectionById( i )
						break
					}
				}


				//  Is our targetCubelet already on the correct face just rotated the wrong way?

				if( targetCubelet_targetFace_direction === targetCubelet_partnerFace_cubeFaceOrigin_direction ){


					//  This will put our targetCubelet in the right position
					//  for the logic below to sort out...
					//  So we'll just return true and let it get picked up in the next loop.
					//  One day we might want to optimize whether we spin clockwise or anti
					//  based on what pieces of the TOP CROSS are already solved...

					cube.twistQueue.add([ 'D', 'd' ].rand() )
				}


				//  Is our targetCubelet one clockwise twist away from the correct face?

				else if( DOWN.getClockwise( targetCubelet_targetFace_direction ) === targetCubelet_partnerFace_cubeFaceOrigin_direction ){

					cube.twistQueue.add(

						targetCubelet_targetFace_direction.initial.toLowerCase(),
						targetCubelet_partnerFace_cubeFaceOrigin_direction.initial.toUpperCase()

						//  Just in case we had solved this face's part of the top cross?
						//  Na... We'll catch that further down the line.
						//targetCubelet_targetFace_direction.initial.toUpperCase()
					)
				}


				//  Is our targetCubelet one anticlockwise twist away from the correct face?

				else if( DOWN.getAnticlockwise( targetCubelet_targetFace_direction ) === targetCubelet_partnerFace_cubeFaceOrigin_direction ){

					cube.twistQueue.add(

						targetCubelet_targetFace_direction.initial.toUpperCase(),
						targetCubelet_partnerFace_cubeFaceOrigin_direction.initial.toLowerCase(),

						//  Just in case we had solved this face's part of the top cross:

						targetCubelet_targetFace_direction.initial.toLowerCase()
					)
				}


				//  I suppose our targetCubelet is on the side opposite its partnerFace's home face.

				else {


					//  This will put our targetCubelet in the right position
					//  for the logic above to sort out...
					//  So we'll just return true and let it get picked up in the next loop.
					//  One day we might want to optimize whether we spin clockwise or anti
					//  based on what pieces of the TOP CROSS are already solved...

					cube.twistQueue.add([ 'D', 'd' ].rand() )
				}
				

				return true
			}
		}//  End of TOP CROSS search for Cubelets on the Down face.




		//  TOP CROSS search among the Equator slice.

		var targetCubelet = cube.equator.edges.hasColor( cube.up.color )
		if( targetCubelet && targetCubelet.cubelets.length > 0 ){

			targetCubelet = targetCubelet.cubelets[ 0 ]
			showHighlighted( targetCubelet )

			for( i = 0; i < 6; i ++ ){

				if( targetCubelet.faces[ i ].color !== COLORLESS ){

					if( targetCubelet.faces[ i ].color === cube.up.color ){

						var targetCubelet_targetFace_direction = Direction.getDirectionById( i )
					}
					else {

						var 
						targetCubelet_partnerFace_direction = Direction.getDirectionById( i ),
						targetCubelet_partnerFace_color = targetCubelet.faces[ i ].color
					}
				}
			}
			this.hint(
			
				'This edge cubelet on the Equator slice that we want to move '+
				'is '+ cube.up.color.name.capitalize() +' on the '+ targetCubelet_targetFace_direction.name.capitalize() +' face '+
				'and '+ targetCubelet_partnerFace_color.name.capitalize() + ' on the '+ targetCubelet_partnerFace_direction.name.capitalize() + ' face.'
			)


			var 
			targetCubelet_partnerFace_cubeFaceOrigin = cube.equator.centers.hasColor( targetCubelet_partnerFace_color ).cubelets[ 0 ],
			targetCubelet_partnerFace_cubeFaceOrigin_direction

			for( i = 0; i < 6; i ++ ){

				if( targetCubelet_partnerFace_cubeFaceOrigin.faces[ i ].color !== COLORLESS ){

					targetCubelet_partnerFace_cubeFaceOrigin_direction = Direction.getDirectionById( i )
				}
			}




			//  We're on the partnerFace and just one 90 degrees twist away from home.

			if( targetCubelet_partnerFace_direction === targetCubelet_partnerFace_cubeFaceOrigin_direction ){

				if( targetCubelet_partnerFace_direction.getClockwise( targetCubelet_targetFace_direction ) === UP ){

					cube.twistQueue.add( targetCubelet_partnerFace_direction.initial.toUpperCase() )
				}
				else {

					cube.twistQueue.add( targetCubelet_partnerFace_direction.initial.toLowerCase() )
				}
			}


			//  We're on the partnerFace but we're in the opposite orientation of what we need.

			else if( targetCubelet_targetFace_direction === targetCubelet_partnerFace_cubeFaceOrigin_direction ){

				if( targetCubelet_targetFace_direction.getClockwise( targetCubelet_partnerFace_direction ) === UP ){

					cube.twistQueue.add( 

						targetCubelet_partnerFace_direction.initial.toUpperCase(),
						'D',
						targetCubelet_partnerFace_cubeFaceOrigin_direction.initial.toUpperCase(),
						targetCubelet_partnerFace_cubeFaceOrigin_direction.initial.toUpperCase()
					)
				}
				else {

					cube.twistQueue.add( 

						targetCubelet_partnerFace_direction.initial.toLowerCase(),
						'd',
						targetCubelet_partnerFace_cubeFaceOrigin_direction.initial.toLowerCase(),
						targetCubelet_partnerFace_cubeFaceOrigin_direction.initial.toLowerCase()
					)					
				}
			}


			//  We're opposite our partnerFace and only need a 180 degree spin to fix that.
			//  Then we need to turn either clockwise or anti 90 degrees on the partner's home face.

			else if( targetCubelet_partnerFace_direction.getOpposite() === targetCubelet_partnerFace_cubeFaceOrigin_direction ){

				twist = targetCubelet_partnerFace_direction.getOpposite().initial.toLowerCase()
				if( targetCubelet_partnerFace_direction.getOpposite().getClockwise( targetCubelet_targetFace_direction ) === UP ){

					twist = twist.toUpperCase()
				}
				cube.twistQueue.add( 

					targetCubelet_targetFace_direction.initial.toUpperCase(),
					targetCubelet_targetFace_direction.initial.toUpperCase(),
					twist
				)
			}




//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

			//  We're opposite our partnerFace but it's going to take some doing.
			//  (If we didn't care about messing up what's already on the TOP CROSS it wouldn't be a big deal...)

			else { //if( targetCubelet_targetFace_direction.getOpposite() === targetCubelet_partnerFace_cubeFaceOrigin_direction ){



				twist = targetCubelet_partnerFace_direction.initial.toLowerCase()
				if( targetCubelet_partnerFace_direction.getClockwise( targetCubelet_targetFace_direction ) === DOWN ){

					twist = targetCubelet_partnerFace_direction.initial.toUpperCase()
				}
				cube.twistQueue.add( twist )

				//  Fuck it. Our targetCubelet is now on the DOWN face and above logic will pick it up from here.
			}


			return true
		}


//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@






		//  TOP CROSS search among the Up face.
		//  At this point the bottom and middle layers are already clear of targets!

		var targetCubelets = cube.up.edges.hasColor( cube.up.color )
		if( targetCubelets && targetCubelets.cubelets.length > 0 ){


			//  Loop through all the edge pieces on the Up face that have an Up-colored sticker
			//  and if either the position or orientation are wrong just flip it to the Down face.
			//  Previous logic from above will pick up the job from there.

			for( i = 0; i < targetCubelets.cubelets.length; i ++ ){

				targetCubelet = targetCubelets.cubelets[ i ]


				//  Let's get the targetFace and partnerFace data for this Cubelet.

				for( j = 0; j < 6; j ++ ){

					if( targetCubelet.faces[ j ].color !== COLORLESS ){

						if( targetCubelet.faces[ j ].color === cube.up.color ){

							targetCubelet_targetFace_direction = Direction.getDirectionById( j )
							targetCubelet_targetFace_color = targetCubelet.faces[ j ].color
						}
						else {
						
							targetCubelet_partnerFace_direction = Direction.getDirectionById( j )
							targetCubelet_partnerFace_color = targetCubelet.faces[ j ].color
						}
					}
				}


				//  We also need to know what side of the cube
				//  our partnerFace belongs to.

				var 
				targetCubelet_partnerFace_cubeFaceOrigin = cube.equator.centers.hasColor( targetCubelet_partnerFace_color ).cubelets[ 0 ],
				targetCubelet_partnerFace_cubeFaceOrigin_direction

				for( j = 0; j < 6; j ++ ){

					if( targetCubelet_partnerFace_cubeFaceOrigin.faces[ j ].color !== COLORLESS ){

						targetCubelet_partnerFace_cubeFaceOrigin_direction = Direction.getDirectionById( j )
					}
				}


				//  Ok. Now we're ready to check if this fucker is
				//  1. Positioned correctly
				//  2. Oriented correctly

				var
				positionCorrect = false,
				orientationCorrect = false,
				neighborFace,
				neighborFace_direction

				neighborFace_direction = targetCubelet_targetFace_direction === UP ? targetCubelet_partnerFace_direction : targetCubelet_targetFace_direction
				if( cube[ neighborFace_direction.name ].color === targetCubelet_partnerFace_color ){
					
					positionCorrect = true
				}
				if( targetCubelet_targetFace_direction === UP ) orientationCorrect = true
				if( positionCorrect === true && orientationCorrect === true ){

					//  AWESOME. Nothing to do. This do-nothing branch here is just for my own sanity.
				}
				else if( positionCorrect === true && orientationCorrect === false ){

					showHighlighted( targetCubelet )
					this.hint( 'This cubelet is in the correct position but oriented incorrectly.' )					
					cube.twistQueue.add(

						targetCubelet_targetFace_direction.initial.toUpperCase(),
						targetCubelet_targetFace_direction.initial.toUpperCase(),
						'D',
						targetCubelet_targetFace_direction.getClockwise( UP ).initial.toUpperCase(),
						targetCubelet_targetFace_direction.initial.toLowerCase(),
						targetCubelet_targetFace_direction.getClockwise( UP ).initial.toLowerCase()//  Just incase this part of the cross was already solved!

					)
					return true
				}
				else if( positionCorrect === false ){//  If the position is wrong orientationCorrect does not matter, eh?


					//  Need to move it to the down face, then is it safe to let previous logic pick it up? Or will that cause a loop?

					showHighlighted( targetCubelet )
					this.hint( 'This cubelet is in the wrong position so let’s move it to the Down face and continue from there.' )					
					cube.twistQueue.add(

						neighborFace_direction.initial.toUpperCase(),
						neighborFace_direction.initial.toUpperCase()
					)
					return true
				}


				//  Either we had to move a guy and have already returned true
				//  or this edge cubelet was correctly positioned and oriented.
				//  On to the next edge cubelet in the loop...
			}
		

			//  Looks like we inspected all the edge pieces on the top
			//  and they were all positioned and oriented correctly!
			//  The TOP CROSS is now UN-officially solved.
		}

	}//  The TOP CROSS is now OFFICIALLY solved!




		


//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@







	//  Have we solved the TOP CORNERS (and TOP CROSS)?

	else if( isSecondLayerStage() !== true && isTopCornersSolved() === false ){
		cube.isSecondLayerRotated = false

		var slots = getTopCornerSlots(), s
		for( s = 0; s < slots.length; s ++ ){

			var slot = slots[ s ]
			if( isTopCornerSlotSolved( slot )) continue

			var targetCorner = findCornerForSlot( slot )
			if( !targetCorner ) continue

			if( isCubeletInGroup( targetCorner, cube.up )){

				var currentUpSlot = getCornerUpSlot( targetCorner )
				if( currentUpSlot ) return queuePlan( cornerRightTrigger( currentUpSlot ) )
				return queuePlan( [ slot.sideB.initial.toLowerCase(), 'd', slot.sideB.initial, 'D' ] )
			}

			var downSlot = getCornerDownSlot( targetCorner )
			if( downSlot && downSlot !== slot ){

				var alignPlan = getDownRotationPlan( downSlot.sideA, slot.sideA )
				if( alignPlan.length ) return queuePlan( alignPlan )
			}

			if( isCornerUnderSlot( targetCorner, slot )){

				return queuePlan( cornerRightTrigger( slot ) )
			}

			return queuePlan( [ 'D' ] )
		}

		return queuePlan([ 'D' ] )
	}
	else if( isSecondLayerSolved() === false ){

		if( isSecondLayerStage() !== true ){

			cube.isSecondLayerRotated = true
			return queuePlan([ 'X', 'X' ] )
		}

		var middleSlots = getSecondLayerSlots(), m
		var secondLayerWorkingDirection = cube.isSecondLayerRotated === true ? UP : DOWN
		var secondLayerWorkingGroup = cube[ secondLayerWorkingDirection.name ]

		relevant = new Group()
		for( m = 0; m < middleSlots.length; m ++ ){

			var relevantEdge = findSecondLayerEdgeForSlot( middleSlots[ m ] )
			if( relevantEdge ) relevant.add( relevantEdge )
		}
		relevant.add( cube.front.origin, cube.right.origin, cube.back.origin, cube.left.origin )
		showRelevant( relevant )

		irrelevant = new Group( cube.cubelets )
		irrelevant.remove( relevant.cubelets )
		showIrrelevant( irrelevant )

		for( m = 0; m < middleSlots.length; m ++ ){

			var middleSlot = middleSlots[ m ]
			if( isSecondLayerSlotSolved( middleSlot )) continue

			var targetEdge = findSecondLayerEdgeForSlot( middleSlot )
			if( !targetEdge ) continue

			showHighlighted( targetEdge )

			if( isCubeletInGroup( targetEdge, cube.equator )){

				var currentSlot = getSecondLayerEquatorSlot( targetEdge )
				if( currentSlot ){

					this.hint( 'This middle-layer edge is stuck in the equator slice, so let’s kick it down and try again.' )
					return queuePlan( secondLayerRightInsertion( currentSlot.sideA, currentSlot.sideB ))
				}
			}

			if( isCubeletInGroup( targetEdge, secondLayerWorkingGroup )){

				var edgeDirections = getCubeletColorDirections( targetEdge ),
					directionIndex,
					visibleDirection = null,
					visibleColor = null,
					workingColor = null

				for( directionIndex = 0; directionIndex < edgeDirections.length; directionIndex ++ ){

					var edgeDirection = edgeDirections[ directionIndex ]
					if( edgeDirection === secondLayerWorkingDirection ) workingColor = targetEdge[ secondLayerWorkingDirection.name ].color
					else {

						visibleDirection = edgeDirection
						visibleColor = targetEdge[ edgeDirection.name ].color
					}
				}

				if( !visibleDirection || !visibleColor || !workingColor ) return queuePlan([ cube.isSecondLayerRotated === true ? 'U' : 'D' ] )

				var frontHome = getColorHomeDirection( visibleColor ),
					sideHome = getColorHomeDirection( workingColor ),
					alignMiddlePlan = getSecondLayerRotationPlan( visibleDirection, frontHome )

				if( alignMiddlePlan.length ) return queuePlan( alignMiddlePlan )

				this.hint( 'We’ve lined up the edge under its home face. Now we can insert it into the middle layer.' )

				if( DOWN.getClockwise( frontHome ) === sideHome ){

					return queuePlan( secondLayerRightInsertion( frontHome, sideHome ))
				}
				if( DOWN.getAnticlockwise( frontHome ) === sideHome ){

					return queuePlan( secondLayerLeftInsertion( frontHome, sideHome ))
				}
			}

			return queuePlan([ cube.isSecondLayerRotated === true ? 'U' : 'D' ] )
		}

		return queuePlan([ cube.isSecondLayerRotated === true ? 'U' : 'D' ] )
	}


	



	    /////////////////////
	   //                 //
	  //   Final Layer   //
	 //                 //
	/////////////////////


	/*
	Going to need a lot of 'rdRD'.multiply( 6 )
	and should flip a bit here so the Solver realizes we're in the middle of solving 
	and not to begin again at the front cross!
	*/


	return false
}














/*








FIRST LAYER



//  where is the logo? (the white origin cubelet with the logo on it)
//  rotate that to the front face (so we're looking at it)

FRONT_COLOR = 'white'
targetCubelet  = cube.centers.hasColor( FRONT_COLOR )//  Logo Sticker!
targetPosition = cube.front


targetCubelet  = cube.edges.hasColor( FRONT_COLOR && UP_COLOR )
targetPosition = cube.up (or where)

where is there a white edge piece on the front?
	if so, rotate it so that it matches the origin color on its partner side.
if not: find one. what are the handful of moves possible to make a white edge anywhere rotate into the correct position?
	we know it's white on one side. and we can see what its other color is.
	so then we know where it needs to go and in what orientation.
	from any other edge position there can only be a few different twist.queues that we'd need.
where are the white corners? 
	same thing. we know it needs to be on the white side.
	it has two other colors. based on that we know its target position.
	there can only be so many moves to get a corner from anywhere into its target position.

now the first layer (and its sides relative to neighboring origins) are solved!
rotate the front face down. 


SECOND LAYER
SIDE 1

now front is no longer white. deal with it.
let's pretend its green now.
we know the west edge needs to be green on the front and red on the left. find it!
	cube.edges where colors contains [R,G]
		@@@ should probably write a routine for asking if a cube contains a color. Cubelet.hasColor( String or Array[] )
	should be a method to move any edge to the corrcet position. 
once this is done with both edges, rotate the cube 'Y'

apply this for four sides!



THIRD LAYER

	do we need to rotate this so its in front now? that way you can actually see it get solved.

get the line (matching neighbor sides doesn't matter)
get the cross  (matching neighbor sides doesn't matter)
now matching the neighbor sides matters!
	do we only have one opposite  matching sides?
		if so just pick one at random to start with
		perform the twist to try to get more matches
	or do we have two adjacent?
		rotate that so matches are RIGHT and BACK
			perform the twist.
now we have matching cross on top.

do we have any matching corners?
nope?
	perform the twist. 
now we have match?
	move that match to top fron right corner.
	perform the twist. 
do we have all four matches? 
	do the move until until the top color of that cubelet matches the top face.
	rotate top face 'U'until we get an unsolved corner.
		repeat the process on all unsolved corners.

CUBE IS SOLVED!








*/





