window.beginnerSolver = new Solver();
beginnerSolver.logic = function(cube){
    	function isSolvedSafe( target, face ){

		if( target && target.isSolved instanceof Function ) return target.isSolved( face )
		return false
	}

	//  =====================
	//  Solving Methods
	//  =====================

        function beginner(){
        var
        upCrossSolved = isSolvedSafe( cube.up.cross, UP ),
        upCornersSolved = isSolvedSafe( cube.up.corners, UP ),
        upFaceSolved = isSolvedSafe ( cube.up, UP )

        if(upCrossSolved === false ){
            if(cube.left.east.up.color === cube.up.color && cube.back.east.up.color === cube.up.color)
            {
                    Algorithm.execute("F R U R' U' F' F R U R' U' F'")
                    return true
            }

            if(cube.left.east.up.color === cube.up.color && cube.right.north.up.color === cube.up.color){
                    Algorithm.execute("F R U R' U' F'")
                    return true

            }
            if(cube.front.north.up.color !== cube.up.color && cube.right.north.up.color !== cube.up.color
                && cube.back.east.up.color !== cube.up.color && cube.left.east.up.color !== cube.up.color) {
                    Algorithm.execute("F R U R' U' F'")
                    return true

            }
           
        }

        else if(upCrossSolved === true ){
            if(cube.left.east.left.color === cube.left.color && cube.right.north.right.color === cube.right.color &&
                cube.front.north.front.color !== cube.front.color && cube.back.east.back.color !== cube.back.color
            ){
                    Algorithm.execute("R U R' U R U2 R'")
                    return true
            }

            if(cube.right.north.right.color === cube.right.color && cube.back.east.back.color === cube.back.color
                && cube.front.north.front.color !== cube.front.color && cube.left.east.left.color !== cube.left.color)
            {
                    Algorithm.execute("R U R' U R U2 R'")
                    return true
            }

            if(cube.front.north.front.color !== cube.front.color && cube.left.east.left.color === cube.left.color && cube.right.north.right.color !== cube.right.color && cube.back.east.back.color === cube.back.color){
                    Algorithm.execute("U R U R' U R U2 R'")
                    return true
            } 

            if(cube.front.north.front.color === cube.front.color && cube.right.north.right.color === cube.right.color && cube.left.east.left.color !== cube.left.color && cube.back.east.back.color !== cube.back.color){
                    Algorithm.execute("U' R U R' U R U2 R'")
                    return true
            }

            if(cube.front.north.front.color === cube.front.color && cube.right.north.right.color !== cube.right.color && cube.left.east.left.color === cube.left.color && cube.back.east.back.color !== cube.back.color){
                    Algorithm.execute("U2 R U R' U R U2 R'")
                    return true
            }

            if(cube.front.northEast.hasColors(cube.front.north.front.color, cube.right.north.right.color) == true &&  cube.left.northEast.hasColors(cube.left.east.left.color, cube.back.east.back.color) == false 
            && cube.front.northWest.hasColors(cube.front.north.front.color,cube.left.east.left.color) == false && cube.right.northEast.hasColors(cube.right.north.right.color, cube.back.east.back.color) == false && cube.front.north.front.color === cube.front.color &&
                cube.left.east.left.color === cube.left.color && cube.right.north.right.color === cube.right.color && cube.back.east.back.color === cube.back.color){
                    Algorithm.execute("U R U' L' U R' U' L")
                    return true

            }

              if(cube.front.northEast.hasColors(cube.front.north.front.color, cube.right.north.right.color) == false &&  cube.left.northEast.hasColors(cube.left.east.left.color, cube.back.east.back.color) == false 
            && cube.front.northWest.hasColors(cube.front.north.front.color,cube.left.east.left.color) == false && cube.right.northEast.hasColors(cube.right.north.right.color, cube.back.east.back.color) == false && cube.front.north.front.color === cube.front.color &&
                cube.left.east.left.color === cube.left.color && cube.right.north.right.color === cube.right.color && cube.back.east.back.color === cube.back.color){
                    Algorithm.execute("U R U' L' U R' U' L")
                    return true

            }
            
            if (cube.front.northWest.hasColors(cube.front.north.front.color,cube.left.east.left.color) == true &&
                cube.front.northEast.hasColors(cube.front.north.front.color, cube.right.north.right.color) == false && cube.right.northEast.hasColors(cube.right.north.right.color, cube.back.east.back.color) == false &&
                cube.left.northEast.hasColors(cube.left.east.left.color, cube.back.east.back.color) == false && cube.front.north.front.color === cube.front.color &&
                cube.left.east.left.color === cube.left.color && cube.right.north.right.color === cube.right.color && cube.back.east.back.color === cube.back.color){
                     Algorithm.execute("U' U R U' L' U R' U' L")
                    return true
            }

            if (cube.front.northWest.hasColors(cube.front.north.front.color,cube.left.east.left.color) == false &&
                cube.front.northEast.hasColors(cube.front.north.front.color, cube.right.north.right.color) == false && cube.right.northEast.hasColors(cube.right.north.right.color, cube.back.east.back.color) == false &&
                cube.left.northEast.hasColors(cube.left.east.left.color, cube.back.east.back.color) == true && cube.front.north.front.color === cube.front.color &&
                cube.left.east.left.color === cube.left.color && cube.right.north.right.color === cube.right.color && cube.back.east.back.color === cube.back.color){
                     Algorithm.execute(" U2 U R U' L' U R' U' L")
                    return true
            }

               if (cube.front.northWest.hasColors(cube.front.north.front.color,cube.left.east.left.color) == false &&
                cube.front.northEast.hasColors(cube.front.north.front.color, cube.right.north.right.color) == false && cube.right.northEast.hasColors(cube.right.north.right.color, cube.back.east.back.color) == true &&
                cube.left.northEast.hasColors(cube.left.east.left.color, cube.back.east.back.color) == false && cube.front.north.front.color === cube.front.color &&
                cube.left.east.left.color === cube.left.color && cube.right.north.right.color === cube.right.color && cube.back.east.back.color === cube.back.color){
                     Algorithm.execute("U U R U' L' U R' U' L")
                    return true
            }



            if (cube.front.northWest.hasColors(cube.front.north.front.color,cube.left.east.left.color) &&
                cube.front.northEast.hasColors(cube.front.north.front.color, cube.right.north.right.color) && cube.right.northEast.hasColors(cube.right.north.right.color, cube.back.east.back.color) &&
                cube.left.northEast.hasColors(cube.left.east.left.color, cube.back.east.back.color) && cube.front.northEast.up.color !== cube.up.color){
                     Algorithm.execute("R' D' R D R' D' R D")
                    return true
                }

        }
            
        Algorithm.execute("U")
        return true
    }

     if ( beginner() ) return true
}