window.striegelSolver = new Solver()
striegelSolver.hint = function(){}

striegelSolver.logic = function( cube ){

	function isSolvedSafe( target, face ){

		if( target && target.isSolved instanceof Function ) return target.isSolved( face )
		return false
	}

	//  =====================
	//  Solving Methods
	//  =====================
    

	function solveLL(){

        var
        upCrossSolved = isSolvedSafe( cube.up.cross, UP ),
        upCornersSolved = isSolvedSafe( cube.up.corners, UP ),
        upFaceSolved = isSolvedSafe ( cube.up, UP )

        // NO ORIENTED PIECES
        if( upCrossSolved === false && upCornersSolved === false ){
            if( cube.right.north.right.color === cube.right.northWest.right.color && cube.right.northWest.right.color === cube.right.northEast.right.color && cube.left.east.left.color === cube.left.northEast.left.color && cube.left.northEast.left.color === cube.left.southEast.left.color && cube.left.southEast.left.color === cube.front.north.front.color &&
                cube.front.north.front.color === cube.back.east.back.color && cube.right.north.right.color === cube.up.color ){
				Algorithm.executeNamed('oll_1')
				return true
            }
            if( cube.left.east.left.color === cube.left.northEast.left.color && cube.left.northEast.left.color === cube.left.southEast.left.color && cube.left.southEast.left.color === cube.front.north.front.color &&
                cube.front.north.front.color === cube.front.northEast.front.color && cube.front.northEast.front.color === cube.right.north.right.color && cube.right.north.right.color === cube.back.east.back.color &&
                cube.back.east.back.color === cube.back.northEast.back.color && cube.left.east.left.color === cube.up.color
             ){
                Algorithm.executeNamed('oll_2')
				return true
            }

            if(cube.front.northEast.up.color === cube.front.north.front.color && cube.front.north.front.color === cube.right.north.right.color && cube.right.north.right.color === cube.right.northEast.right.color && cube.right.northEast.right.color === cube.back.east.back.color &&
                cube.back.east.back.color === cube.back.southEast.back.color && cube.front.northEast.up.color === cube.up.color
            ){
                Algorithm.executeNamed('oll_3')
				return true
            }

            if(cube.back.east.back.color === cube.back.northEast.up.color && cube.back.northEast.up.color === cube.front.north.front.color && cube.front.north.front.color === cube.front.northWest.front.color && cube.front.northWest.front.color === cube.front.northEast.right.color && cube.front.northEast.right.color === cube.right.north.right.color && cube.back.east.back.color === cube.up.color){
                Algorithm.executeNamed('oll_4')
				return true
            }

            if(cube.front.north.up.color === cube.right.north.up.color && cube.front.northEast.up.color === cube.front.north.up.color && cube.front.north.up.color === cube.right.northEast.right.color && cube.right.northEast.right.color === cube.back.east.back.color && cube.back.east.back.color === cube.left.east.left.color &&
                cube.left.east.left.color === cube.front.northWest.left.color && cube.front.northWest.left.color === cube.left.northEast.back.color && cube.front.north.up.color === cube.up.color){
                Algorithm.executeNamed('oll_5')
				return true
            }

            if(cube.back.east.up.color === cube.right.north.up.color && cube.right.northEast.up.color === cube.back.east.up.color && cube.back.east.up.color === cube.front.northEast.right.color && cube.front.northEast.right.color === cube.front.north.front.color && cube.front.north.front.color === cube.front.northWest.front.color &&
                cube.front.northWest.front.color === cube.left.east.left.color && cube.left.east.left.color === cube.left.northEast.left.color && cube.back.east.up.color === cube.up.color){
                Algorithm.executeNamed('oll_6')
				return true
            }

            if(cube.back.east.up.color === cube.left.east.up.color && cube.left.east.up.color === cube.front.northWest.up.color && cube.front.northWest.up.color === cube.front.north.front.color && cube.front.north.front.color === cube.front.northEast.front.color && cube.front.northEast.front.color === cube.right.north.right.color && 
                cube.right.north.right.color === cube.right.northEast.right.color && cube.back.east.up.color !== cube.front.northEast.up.color && cube.back.east.up.color === cube.up.color){
                Algorithm.executeNamed('oll_7')
				return true
            }

            if(cube.back.east.up.color === cube.right.north.up.color && cube.right.north.up.color === cube.front.northEast.up.color && cube.front.northEast.up.color === cube.front.north.front.color && cube.front.north.front.color === cube.front.northWest.front.color && cube.front.northWest.front.color === cube.left.east.left.color && 
                cube.left.east.left.color === cube.left.northEast.left.color && cube.back.east.up.color !== cube.front.northWest.up.color && cube.back.east.up.color === cube.up.color){
                Algorithm.executeNamed('oll_8')
				return true
            }

            if(cube.front.north.up.color === cube.right.north.up.color && cube.right.north.up.color === cube.left.northEast.up.color && cube.left.northEast.up.color === cube.back.east.back.color && cube.back.east.back.color === cube.back.northEast.back.color && cube.back.northEast.back.color === cube.left.east.left.color && 
                cube.left.east.left.color === cube.front.northWest.front.color && cube.front.northWest.front.color === cube.front.northEast.right.color && cube.front.north.up.color === cube.up.color){
                Algorithm.executeNamed('oll_9')
				return true
            }

            if(cube.front.north.up.color === cube.left.east.up.color && cube.left.east.up.color === cube.right.northEast.up.color && cube.right.northEast.up.color === cube.back.east.back.color && cube.back.east.back.color === cube.back.southEast.back.color && cube.back.southEast.back.color === cube.right.north.right.color && 
                cube.right.north.right.color === cube.front.northEast.front.color && cube.front.northEast.front.color === cube.front.northWest.left.color && cube.front.north.up.color === cube.up.color){
                Algorithm.executeNamed('oll_10')
				return true
            }

            if(cube.front.north.up.color === cube.right.north.up.color && cube.right.north.up.color === cube.front.northWest.up.color && cube.front.northWest.up.color === cube.front.northEast.front.color &&  cube.front.northEast.front.color === cube.left.east.left.color && cube.left.east.left.color === cube.back.east.back.color && 
                cube.back.east.back.color === cube.back.southEast.back.color && cube.back.southEast.back.color === cube.right.northEast.right.color && cube.front.north.up.color === cube.up.color){
                Algorithm.executeNamed('oll_11')
				return true
            }

            if(cube.back.east.up.color === cube.right.north.up.color && cube.right.north.up.color === cube.back.southEast.up.color && cube.back.southEast.up.color === cube.front.north.front.color && cube.front.north.front.color === cube.front.northWest.front.color && cube.front.northWest.front.color === cube.left.east.left.color && 
                cube.left.east.left.color === cube.front.northEast.right.color && cube.front.northEast.right.color === cube.right.northEast.back.color && cube.back.east.up.color === cube.up.color){
                Algorithm.executeNamed('oll_12')
				return true
            }

            if(cube.left.east.up.color === cube.right.north.up.color && cube.right.north.up.color === cube.front.northWest.up.color && cube.front.northWest.up.color === cube.front.north.front.color && cube.front.north.front.color === cube.front.northEast.front.color && cube.front.northEast.front.color === cube.back.east.back.color && 
                cube.back.east.back.color === cube.back.southEast.back.color && cube.back.southEast.back.color === cube.right.northEast.right.color && cube.left.east.up.color === cube.up.color){
                Algorithm.executeNamed('oll_13')
				return true
            }

            if(cube.left.east.up.color === cube.right.north.up.color && cube.right.north.up.color === cube.front.northEast.up.color && cube.front.northEast.up.color === cube.front.north.front.color && cube.front.north.front.color === cube.front.northWest.front.color && cube.front.northWest.front.color === cube.back.east.back.color && 
                cube.back.east.back.color === cube.back.northEast.back.color && cube.back.northEast.back.color === cube.left.northEast.left.color && cube.left.east.up.color === cube.up.color){
                Algorithm.executeNamed('oll_14')
				return true
            }

            if(cube.left.east.up.color === cube.right.north.up.color && cube.right.north.up.color === cube.front.northEast.up.color && cube.front.northEast.up.color === cube.front.north.front.color && cube.front.north.front.color === cube.back.east.back.color && cube.back.east.back.color === cube.back.southEast.back.color && 
                cube.back.southEast.back.color === cube.front.northWest.left.color && cube.front.northWest.left.color === cube.right.northEast.right.color && cube.left.east.up.color === cube.up.color){
                Algorithm.executeNamed('oll_15')
				return true
            }

            if(cube.left.east.up.color === cube.right.north.up.color && cube.right.north.up.color === cube.right.northEast.up.color && cube.right.northEast.up.color === cube.front.north.front.color && cube.front.north.front.color === cube.front.northWest.front.color && cube.front.northWest.front.color === cube.front.northEast.right.color && 
                cube.front.northEast.right.color === cube.back.east.back.color && cube.back.east.back.color === cube.left.northEast.left.color && cube.left.east.up.color === cube.up.color){
                Algorithm.executeNamed('oll_16')
				return true
            }

            if(cube.front.north.front.color === cube.right.north.right.color && cube.right.north.right.color === cube.front.northEast.up.color && cube.front.northEast.up.color === cube.back.southEast.up.color && cube.back.southEast.up.color === cube.back.east.back.color && cube.back.east.back.color === cube.back.northEast.back.color && 
                cube.back.northEast.back.color === cube.left.east.left.color && cube.left.east.left.color === cube.left.southEast.left.color && cube.front.north.front.color === cube.up.color){
                Algorithm.executeNamed('oll_17')
				return true
            }

            if(cube.front.north.front.color === cube.front.northEast.front.color && cube.front.northEast.front.color === cube.front.northWest.front.color && cube.front.northWest.front.color === cube.left.east.left.color && cube.left.east.left.color === cube.right.north.right.color && cube.right.north.right.color === cube.back.east.back.color && cube.back.east.back.color === cube.back.northEast.up.color && 
                cube.back.northEast.up.color ===  cube.back.southEast.up.color && cube.front.north.front.color === cube.up.color){
                Algorithm.executeNamed('oll_18')
				return true
            }

            if(cube.front.north.front.color === cube.front.northEast.right.color && cube.front.northEast.right.color === cube.right.north.right.color && cube.right.north.right.color === cube.left.east.left.color && cube.left.east.left.color === cube.front.northWest.left.color && cube.front.northWest.left.color === cube.back.east.back.color && cube.back.east.back.color === cube.back.northEast.up.color && 
                cube.back.northEast.up.color ===  cube.back.southEast.up.color && cube.front.north.front.color === cube.up.color){
                Algorithm.executeNamed('oll_19')
				return true
            }

            if(cube.front.north.up.color === cube.left.east.up.color && cube.left.east.up.color === cube.left.northEast.up.color && cube.left.northEast.up.color === cube.back.east.back.color && cube.back.east.back.color === cube.right.north.right.color && cube.right.north.right.color === cube.front.northEast.right.color && cube.front.northEast.right.color === cube.front.northWest.left.color && 
               cube.front.northWest.left.color ===  cube.right.northEast.up.color && cube.front.north.up.color === cube.up.color){
                Algorithm.executeNamed('oll_29')
				return true
            }

            if(cube.left.east.up.color === cube.back.east.up.color && cube.back.east.up.color === cube.front.north.front.color && cube.front.north.front.color === cube.right.north.right.color && cube.right.north.right.color === cube.right.northEast.right.color && cube.right.northEast.right.color === cube.front.northEast.up.color && cube.front.northEast.up.color === cube.front.northWest.up.color && 
              cube.front.northWest.up.color ===  cube.left.northEast.left.color && cube.left.east.up.color === cube.up.color){
                Algorithm.executeNamed('oll_30')
				return true
            }

            if(cube.back.east.up.color === cube.right.north.up.color && cube.right.north.up.color === cube.front.north.front.color && cube.front.north.front.color === cube.front.northWest.front.color && cube.front.northWest.front.color === cube.left.east.left.color && cube.left.east.left.color === cube.left.northEast.back.color && cube.left.northEast.back.color === cube.front.northEast.up.color && 
              cube.front.northEast.up.color ===  cube.right.northEast.up.color && cube.back.east.up.color === cube.up.color){
                Algorithm.executeNamed('oll_31')
				return true
            }

            if(cube.back.east.up.color === cube.left.east.up.color && cube.left.east.up.color === cube.front.northWest.up.color && cube.front.northWest.up.color === cube.left.northEast.up.color && cube.left.northEast.up.color === cube.front.north.front.color && cube.front.north.front.color === cube.front.northEast.front.color && cube.front.northEast.front.color === cube.right.north.right.color && 
              cube.right.north.right.color ===  cube.right.northEast.back.color && cube.back.east.up.color === cube.up.color){
                Algorithm.executeNamed('oll_32')
				return true
            }

            if(cube.left.east.up.color === cube.right.north.up.color && cube.right.north.up.color === cube.right.northWest.up.color && cube.right.northWest.up.color === cube.right.northEast.up.color && cube.right.northEast.up.color === cube.front.north.front.color && cube.front.north.front.color === cube.front.northWest.front.color && cube.front.northWest.front.color === cube.back.east.back.color && 
              cube.back.east.back.color ===  cube.left.northEast.back.color && cube.left.east.up.color === cube.up.color){
                Algorithm.executeNamed('oll_33')
				return true
            }


            if(cube.left.east.up.color === cube.right.north.up.color && cube.right.north.up.color === cube.front.northWest.up.color && cube.front.northWest.up.color === cube.front.northEast.up.color && cube.front.northEast.up.color === cube.front.north.front.color && cube.front.north.front.color === cube.right.northEast.right.color && cube.right.northEast.right.color === cube.back.east.back.color && 
              cube.back.east.back.color ===  cube.left.northEast.left.color && cube.left.east.up.color === cube.up.color){
                Algorithm.executeNamed('oll_34')
				return true
            }

            if(cube.front.north.up.color === cube.right.north.up.color && cube.right.north.up.color === cube.front.northEast.up.color && cube.front.northEast.up.color === cube.front.northWest.front.color && cube.front.northWest.front.color === cube.right.northEast.right.color && cube.right.northEast.right.color === cube.back.east.back.color && cube.back.east.back.color === cube.left.east.left.color && 
              cube.left.east.left.color ===  cube.left.northEast.up.color && cube.front.north.up.color === cube.up.color){
                Algorithm.executeNamed('oll_35')
				return true
            }

            if(cube.back.east.up.color === cube.right.north.up.color && cube.right.north.up.color === cube.front.northEast.up.color && cube.front.northEast.up.color === cube.front.north.front.color && cube.front.north.front.color === cube.front.northWest.left.color && cube.front.northWest.left.color === cube.left.east.left.color && cube.left.east.left.color === cube.left.northEast.up.color && 
              cube.left.northEast.up.color ===  cube.right.northEast.back.color && cube.back.east.up.color === cube.up.color){
                Algorithm.executeNamed('oll_36')
				return true
            }

            if(cube.back.east.up.color === cube.left.east.up.color && cube.left.east.up.color === cube.front.northEast.up.color && cube.front.northEast.up.color === cube.front.north.front.color && cube.front.north.front.color === cube.front.northWest.front.color && cube.front.northWest.front.color === cube.right.north.right.color && cube.right.north.right.color === cube.right.northEast.right.color && 
              cube.right.northEast.right.color ===  cube.left.northEast.up.color && cube.back.east.up.color === cube.up.color){
                Algorithm.executeNamed('oll_37')
				return true
            }

            if(cube.back.east.up.color === cube.left.east.up.color && cube.left.east.up.color === cube.front.northWest.up.color && cube.front.northWest.up.color === cube.front.north.front.color && cube.front.north.front.color === cube.right.north.right.color && cube.right.north.right.color === cube.right.northWest.right.color && cube.right.northWest.right.color === cube.left.northEast.back.color && 
              cube.left.northEast.back.color ===  cube.right.northEast.up.color && cube.back.east.up.color === cube.up.color){
                Algorithm.executeNamed('oll_38')
				return true
            }

            if(cube.left.east.up.color === cube.right.north.up.color && cube.right.north.up.color === cube.front.north.front.color && cube.front.north.front.color === cube.front.northWest.up.color && cube.front.northWest.up.color === cube.right.northEast.up.color && cube.right.northEast.up.color === cube.front.northEast.right.color && cube.front.northEast.right.color === cube.back.east.back.color && 
              cube.back.east.back.color ===  cube.left.northEast.back.color && cube.left.east.up.color === cube.up.color){
                Algorithm.executeNamed('oll_39')
				return true
            }

            if(cube.left.east.up.color === cube.right.north.up.color && cube.right.north.up.color === cube.front.north.front.color && cube.front.north.front.color === cube.front.northEast.up.color && cube.front.northEast.up.color === cube.left.northEast.up.color && cube.left.northEast.up.color === cube.front.northWest.left.color && cube.front.northWest.left.color === cube.back.east.back.color && 
              cube.back.east.back.color ===  cube.right.northEast.back.color && cube.left.east.up.color === cube.up.color){
                Algorithm.executeNamed('oll_40')
				return true
            }

            if(cube.left.east.up.color === cube.back.east.up.color && cube.back.east.up.color === cube.front.north.front.color && cube.front.north.front.color === cube.front.northEast.up.color && cube.front.northEast.up.color === cube.front.northWest.up.color && cube.front.northWest.up.color === cube.right.north.right.color && cube.right.north.right.color === cube.right.northEast.back.color && 
              cube.right.northEast.back.color ===  cube.left.northEast.back.color && cube.left.east.up.color === cube.up.color){
                Algorithm.executeNamed('oll_41')
				return true
            }

            if(cube.left.east.up.color === cube.front.north.up.color && cube.front.north.up.color === cube.front.northWest.front.color && cube.front.northWest.front.color === cube.front.northEast.front.color && cube.front.northEast.front.color === cube.right.north.right.color && cube.right.north.right.color === cube.back.east.back.color && cube.back.east.back.color === cube.right.northEast.up.color && 
              cube.right.northEast.up.color ===  cube.left.northEast.up.color && cube.left.east.up.color === cube.up.color){
                Algorithm.executeNamed('oll_42')
				return true
            }

            if(cube.left.east.up.color === cube.front.north.up.color && cube.front.north.up.color === cube.front.northWest.up.color && cube.front.northWest.up.color === cube.left.northEast.up.color && cube.left.northEast.up.color === cube.back.east.back.color && cube.back.east.back.color === cube.right.north.right.color && cube.right.north.right.color === cube.right.northEast.right.color && 
              cube.right.northEast.right.color ===  cube.right.northWest.right.color && cube.left.east.up.color === cube.up.color){
                Algorithm.executeNamed('oll_43')
				return true
            }

            if(cube.right.north.up.color === cube.front.north.up.color && cube.front.north.up.color === cube.front.northEast.up.color && cube.front.northEast.up.color === cube.right.northEast.up.color && cube.right.northEast.up.color === cube.back.east.back.color && cube.back.east.back.color === cube.left.east.left.color && cube.left.east.left.color === cube.left.northEast.left.color && 
              cube.left.northEast.left.color ===  cube.left.southEast.left.color && cube.right.north.up.color === cube.up.color){
                Algorithm.executeNamed('oll_44')
				return true
            }

            if(cube.right.north.up.color === cube.left.east.up.color && cube.left.east.up.color === cube.front.northEast.up.color && cube.front.northEast.up.color === cube.right.northEast.up.color && cube.right.northEast.up.color === cube.back.east.back.color && cube.back.east.back.color === cube.front.north.front.color && cube.front.north.front.color === cube.front.northWest.left.color && 
              cube.front.northWest.left.color ===  cube.left.northEast.left.color && cube.right.north.up.color === cube.up.color){
                Algorithm.executeNamed('oll_45')
				return true
            }

            if(cube.front.north.up.color === cube.back.east.up.color && cube.back.east.up.color === cube.front.northWest.up.color && cube.front.northWest.up.color === cube.left.northEast.up.color && cube.left.northEast.up.color === cube.left.east.left.color && cube.left.east.left.color === cube.right.north.right.color && cube.right.north.right.color === cube.right.northWest.right.color && 
              cube.right.northWest.right.color ===  cube.right.northEast.right.color && cube.front.north.up.color === cube.up.color){
                Algorithm.executeNamed('oll_46')
				return true
            }

            if(cube.right.north.up.color === cube.back.east.up.color && cube.back.east.up.color === cube.front.northWest.front.color && cube.front.northWest.front.color === cube.front.north.front.color && cube.front.north.front.color === cube.left.east.left.color && cube.left.east.left.color === cube.right.northWest.right.color && cube.right.northWest.right.color === cube.right.northEast.right.color && 
              cube.right.northEast.right.color ===  cube.left.northEast.back.color && cube.right.north.up.color === cube.up.color){
                Algorithm.executeNamed('oll_47')
				return true
            }

            if(cube.left.east.up.color === cube.back.east.up.color && cube.back.east.up.color === cube.front.northEast.front.color && cube.front.northEast.front.color === cube.front.north.front.color && cube.front.north.front.color === cube.right.north.right.color && cube.right.north.right.color === cube.left.southEast.left.color && cube.left.southEast.left.color === cube.left.northEast.left.color && 
              cube.left.northEast.left.color ===  cube.right.northEast.back.color && cube.left.east.up.color === cube.up.color){
                Algorithm.executeNamed('oll_48')
				return true
            }

            if(cube.left.east.up.color === cube.front.north.up.color && cube.front.north.up.color === cube.front.northWest.front.color && cube.front.northWest.front.color === cube.left.northEast.back.color && cube.left.northEast.back.color === cube.back.east.back.color && cube.back.east.back.color === cube.right.north.right.color && cube.right.north.right.color === cube.right.northEast.right.color && 
              cube.right.northEast.right.color ===  cube.right.northWest.right.color && cube.left.east.up.color === cube.up.color){
                Algorithm.executeNamed('oll_49')
				return true
            }

            if(cube.left.east.up.color === cube.back.east.up.color && cube.back.east.up.color === cube.front.north.front.color && cube.front.north.front.color === cube.front.northWest.front.color && cube.front.northWest.front.color === cube.left.northEast.back.color && cube.left.northEast.back.color === cube.right.north.right.color && cube.right.north.right.color === cube.right.northEast.right.color && 
              cube.right.northEast.right.color ===  cube.right.northWest.right.color && cube.left.east.up.color === cube.up.color){
                Algorithm.executeNamed('oll_50')
				return true
            }

            if(cube.left.east.up.color === cube.right.north.up.color && cube.right.north.up.color === cube.right.northEast.right.color && cube.right.northEast.right.color === cube.right.northWest.right.color && cube.right.northWest.right.color === cube.front.north.front.color && cube.front.north.front.color === cube.front.northWest.front.color && cube.front.northWest.front.color === cube.back.east.back.color && 
              cube.back.east.back.color ===  cube.left.northEast.back.color && cube.left.east.up.color === cube.up.color){
                Algorithm.executeNamed('oll_51')
				return true
            }

            if(cube.back.east.up.color === cube.front.north.up.color && cube.front.north.up.color === cube.right.north.right.color && cube.right.north.right.color === cube.right.northEast.back.color && cube.right.northEast.back.color === cube.front.northEast.front.color && cube.front.northEast.front.color === cube.left.east.left.color && cube.left.east.left.color === cube.left.northEast.left.color && 
              cube.left.northEast.left.color ===  cube.left.southEast.left.color && cube.back.east.up.color === cube.up.color){
                Algorithm.executeNamed('oll_52')
				return true
            }

            if(cube.front.north.up.color === cube.right.north.up.color && cube.right.north.up.color === cube.right.northEast.right.color && cube.right.northEast.right.color === cube.right.northWest.right.color && cube.right.northWest.right.color === cube.left.east.left.color && cube.left.east.left.color === cube.left.northEast.left.color && cube.left.northEast.left.color === cube.left.southEast.left.color && 
              cube.left.southEast.left.color ===  cube.back.east.back.color && cube.front.north.up.color === cube.up.color){
                Algorithm.executeNamed('oll_53')
				return true
            }

            if(cube.right.north.up.color === cube.back.east.up.color && cube.back.east.up.color === cube.front.north.front.color && cube.front.north.front.color === cube.right.northWest.right.color && cube.right.northWest.right.color === cube.right.northEast.right.color && cube.right.northEast.right.color === cube.left.northEast.left.color && cube.left.northEast.left.color === cube.left.southEast.left.color && 
              cube.left.southEast.left.color ===  cube.left.east.left.color && cube.right.north.up.color === cube.up.color){
                Algorithm.executeNamed('oll_54')
				return true
            }

            if(cube.right.north.up.color === cube.left.east.up.color && cube.left.east.up.color === cube.front.north.front.color && cube.front.north.front.color === cube.front.northWest.front.color && cube.front.northWest.front.color === cube.front.northEast.front.color && cube.front.northEast.front.color === cube.back.east.back.color && cube.back.east.back.color === cube.left.northEast.back.color && 
              cube.left.northEast.back.color ===  cube.right.northEast.back.color && cube.right.north.up.color === cube.up.color){
                Algorithm.executeNamed('oll_55')
				return true
            }

            if(cube.right.north.up.color === cube.left.east.up.color && cube.left.east.up.color === cube.front.north.front.color && cube.front.north.front.color === cube.front.northWest.left.color && cube.front.northWest.left.color === cube.front.northEast.right.color && cube.front.northEast.right.color === cube.back.east.back.color && cube.back.east.back.color === cube.left.northEast.left.color && 
              cube.left.northEast.left.color ===  cube.right.northEast.right.color && cube.right.north.up.color === cube.up.color){
                Algorithm.executeNamed('oll_56')
				return true
            }
            
           
		}

        // CORNERS ALREADY ORIENTED

		if( upCornersSolved === true && upCrossSolved === false ){
                   
               
            if(cube.left.east.left.color === cube.up.color && cube.back.east.back.color === cube.up.color && cube.right.north.right.color === cube.up.color)
            {
                Algorithm.executeNamed('oll_20')
				return true
            }

            if(cube.front.north.up.color !== cube.up.color && cube.back.east.up.color !== cube.up.color)
            {
                Algorithm.executeNamed('oll_57')
				return true
            }

            if(cube.front.north.up.color !== cube.up.color && cube.right.north.up.color !== cube.up.color){
             Algorithm.executeNamed('oll_28')
				return true
            }
        }

        // CROSS ALREADY ORIENTED
		if( upCrossSolved === true && upCornersSolved === false ){

            if(cube.back.northEast.back.color === cube.up.color && cube.back.southEast.back.color === cube.up.color && cube.front.northEast.front.color === cube.up.color && cube.front.northWest.front.color === cube.up.color)
            {
                Algorithm.executeNamed('oll_21')
				return true
            }

            if(cube.left.southEast.left.color === cube.up.color && cube.left.northEast.left.color === cube.up.color && cube.front.northEast.front.color === cube.up.color && cube.front.northEast.front.color === cube.up.color){
                Algorithm.executeNamed('oll_22')
				return true
                
            }

            if(cube.front.northEast.front.color === cube.up.color && cube.front.northWest.front.color === cube.up.color && cube.back.northEast.right.color !== cube.up.color && cube.back.southEast.left.color !== cube.up.color)
            {
                Algorithm.executeNamed('oll_23')
				return true
            }
            
            
            if(cube.back.northEast.up.color === cube.up.color && cube.back.southEast.back.color === cube.up.color && cube.front.northEast.up.color === cube.up.color && cube.front.northWest.front.color === cube.up.color)
            {
                Algorithm.executeNamed('oll_24')
				return true
            }

            if(cube.front.northWest.front.color === cube.up.color && cube.back.northEast.right.color === cube.up.color && cube.front.northEast.up.color === cube.up.color  )
            {
                Algorithm.executeNamed('oll_25')
				return true
            }

            if(cube.front.northWest.front.color === cube.up.color && cube.back.southEast.left.color === cube.up.color && cube.front.northEast.right.color === cube.up.color)
            {
                Algorithm.executeNamed('oll_26')
				return true
            }

             if(cube.front.northEast.front.color === cube.up.color && cube.back.northEast.right.color === cube.up.color && cube.back.southEast.back.color === cube.up.color)
            {
                Algorithm.executeNamed('oll_27')
				return true
            }
             
            
        }
    


        // PLL

        if(upFaceSolved === true){

            if(cube.front.north.front.color === cube.back.color && cube.left.east.left.color === cube.right.color && cube.back.east.back.color === cube.front.color && cube.right.north.right.color === cube.left.color && cube.front.northWest.front.color === cube.front.color && cube.front.northEast.front.color === cube.front.color){
                Algorithm.executeNamed('hPerm')
                return true
            }

            if(cube.front.north.front.color === cube.front.northWest.left.color && cube.left.east.left.color === cube.front.northEast.front.color && cube.back.east.back.color === cube.front.northEast.right.color && cube.right.north.right.color === cube.right.northEast.back.color){
                Algorithm.executeNamed('zPerm')
                return true
            }

             if(cube.front.northWest.front.color === cube.left.northEast.back.color && cube.front.northWest.front.color === cube.left.east.left.color && cube.front.northEast.front.color === cube.right.northEast.back.color && cube.front.northEast.front.color === cube.right.north.right.color){
                Algorithm.executeNamed('ePerm')
                return true
            }

            if(cube.front.north.front.color === cube.right.northWest.right.color && cube.left.east.left.color === cube.front.northWest.front.color && cube.right.north.right.color === cube.left.southEast.left.color && cube.back.east.back.color === cube.back.southEast.back.color && cube.front.northWest.front.color ===  cube.front.northEast.front.color){
                Algorithm.executeNamed('uPermA')
                return true
            }

            if(cube.front.north.front.color === cube.front.northWest.left.color && cube.left.east.left.color === cube.front.northEast.right.color && cube.right.north.right.color === cube.front.northWest.front.color && cube.back.east.back.color ===  cube.back.southEast.back.color && cube.back.southEast.back.color === cube.back.northEast.back.color){
                Algorithm.executeNamed('uPermB')
                return true
            }

            if(cube.front.northEast.front.color !== cube.front.north.front.color && cube.front.north.front.color === cube.front.northWest.front.color && 
                cube.right.north.right.color === cube.right.northEast.right.color && cube.right.northEast.right.color === cube.right.northWest.right.color){
                Algorithm.executeNamed('jPermA')
                return true
            }

            if(cube.front.northWest.front.color !== cube.front.north.front.color && cube.front.north.front.color === cube.front.northEast.front.color && 
                cube.left.east.left.color === cube.left.southEast.left.color && cube.left.southEast.left.color === cube.left.northEast.left.color){

               Algorithm.executeNamed('jPermB')
                return true
            }

            if(cube.front.northWest.front.color !== cube.front.north.front.color && cube.front.north.front.color === cube.front.northEast.front.color && cube.right.northWest.right.color !== cube.right.north.right.color && cube.right.north.right.color === cube.right.northEast.right.color
                && cube.left.northEast.left.color !== cube.left.east.left.color && cube.left.east.left.color === cube.left.southEast.left.color && cube.right.northEast.back.color !== cube.back.east.back.color
            ){

                Algorithm.executeNamed('nPermA')
                return true
            }

            if(cube.front.northEast.front.color !== cube.front.north.front.color && cube.front.north.front.color === cube.front.northWest.front.color && cube.right.northWest.right.color === cube.right.north.right.color && cube.right.north.right.color !== cube.right.northEast.right.color
                && cube.left.northEast.left.color === cube.left.east.left.color && cube.left.east.left.color !== cube.left.southEast.left.color && cube.left.northEast.back.color !== cube.back.east.back.color){

                Algorithm.executeNamed('nPermB')
                return true
            }


            if( cube.left.east.left.color === cube.left.southEast.left.color && cube.left.southEast.left.color === cube.left.northEast.left.color
                && cube.front.northWest.front.color === cube.right.northEast.right.color && cube.front.northEast.front.color === cube.right.northEast.back.color &&
                cube.front.north.front.color === cube.left.northEast.back.color && cube.back.east.back.color === cube.front.northWest.front.color
            ){
                Algorithm.executeNamed('fPerm')
                return true
            }

            if(cube.left.east.left.color === cube.front.northEast.front.color && cube.front.northEast.front.color === cube.right.northEast.back.color 
                && cube.front.northEast.right.color === cube.back.east.back.color && cube.right.northEast.right.color === cube.front.north.front.color){
                Algorithm.executeNamed('tPerm')
                return true
            }

            if(cube.front.northWest.front.color === cube.front.north.front.color && cube.front.north.front.color !== cube.front.northEast.front.color &&
                cube.left.east.left.color !== cube.left.northEast.left.color && cube.left.northEast.left.color === cube.right.northEast.right.color && cube.left.east.left.color === cube.left.southEast.left.color
            ){
                Algorithm.executeNamed('vPerm')
                return true
            }

            if(cube.left.northEast.left.color !== cube.front.north.front.color && cube.front.north.front.color === cube.front.northWest.front.color && 
                cube.left.northEast.left.color !== cube.left.east.left.color && cube.left.east.left.color === cube.left.southEast.left.color && cube.left.northEast.back.color === cube.right.northEast.back.color){
                Algorithm.executeNamed('aPermA')
                return true
            }
            
            if(cube.left.northEast.left.color !== cube.front.north.front.color && cube.front.north.front.color === cube.front.northWest.front.color && 
                cube.left.northEast.left.color !== cube.left.east.left.color && cube.left.east.left.color === cube.left.southEast.left.color && cube.right.northEast.right.color === cube.right.northWest.right.color){
                Algorithm.executeNamed('aPermB')
                return true
            }

            if(cube.front.northEast.front.color === cube.right.north.right.color && cube.front.north.front.color === cube.front.northWest.front.color &&  cube.left.east.left.color === cube.left.northEast.back.color && cube.left.southEast.left.color === cube.left.northEast.left.color && cube.left.northEast.left.color === cube.back.east.back.color){
                Algorithm.executeNamed('rPermA')
                return true
            }

            if(cube.front.north.front.color === cube.front.northEast.right.color &&  cube.left.northEast.left.color === cube.right.northEast.right.color && cube.left.east.left.color === cube.left.southEast.left.color){
                Algorithm.executeNamed('rPermB')
                return true
            }

            if(cube.front.northEast.front.color === cube.right.northEast.back.color && cube.front.north.front.color === cube.front.northWest.front.color && cube.front.northEast.right.color === cube.front.northWest.left.color && cube.right.north.right.color === cube.right.northEast.right.color){
                Algorithm.executeNamed('yPerm')
                return true
            }

            if(cube.left.northEast.left.color === cube.left.southEast.left.color && cube.left.southEast.left.color === cube.right.north.right.color && cube.front.northEast.front.color === cube.front.north.front.color && cube.front.north.front.color !== cube.front.northWest.front.color){
                Algorithm.executeNamed('gPermA')
                return true
            }

            if(cube.left.northEast.left.color === cube.left.southEast.left.color && cube.left.southEast.left.color === cube.back.east.back.color && cube.right.northEast.right.color === cube.right.north.right.color && cube.right.northWest.right.color === cube.front.north.front.color){
                Algorithm.executeNamed('gPermB')
                return true
            }

            if(cube.left.northEast.left.color === cube.left.southEast.left.color && cube.left.southEast.left.color === cube.right.north.right.color && cube.back.east.back.color === cube.right.northEast.back.color && cube.back.east.back.color !== cube.left.northEast.back.color){
                Algorithm.executeNamed('gPermC')
                return true
            }

              if(cube.left.northEast.left.color === cube.left.southEast.left.color && cube.left.southEast.left.color === cube.front.north.front.color && cube.right.northWest.right.color === cube.right.north.right.color && cube.right.north.right.color !== cube.right.northEast.right.color){
                Algorithm.executeNamed('gPermD')
                return true
            }

            
        }
        
            // if( striegelSolver.uMoveCount >= 4 ){
            //     striegelSolver.uMoveCount = 0
            //     Algorithm.execute('Y')
            // } else {
            //     striegelSolver.uMoveCount++
            //     Algorithm.execute('U')
            // }
            // return true
        Algorithm.execute('U')
        return true
        
	}

	if( solveLL() )  return true
   

}
