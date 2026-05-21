var Algorithm = {}

Algorithm.execute = function(algorithmString) {
	if (!window.cube) {
		console.error('Cube not initialized')
		return false
	}
	
	var moves = Algorithm.parse(algorithmString)
	if (moves.length === 0) {
		console.warn('No valid moves in algorithm')
		return false
	}
	
	
	window.cube.twistQueue.add.apply(window.cube.twistQueue, moves)
	return true
}

Algorithm.parse = function(algorithmString) {
	if (typeof algorithmString !== 'string') {
		console.error('Algorithm must be a string')
		return []
	}
	
	algorithmString = algorithmString.trim()
	if (algorithmString.length === 0) {
		return []
	}
	
	var moves = []
	var validMoves = 'XxRrMmLlYyUuEeDdZzFfSsBb'
	var i = 0
	
	while (i < algorithmString.length) {
		var char = algorithmString[i]
		
		if (/\s/.test(char)) {
			i++
			continue
		}
		
		if (validMoves.indexOf(char) === -1) {
			return []
		}
		
		var move = char
		i++
		
		if (i < algorithmString.length) {
			var next = algorithmString[i]
			
			if (next === "'") {
				move = move.toLowerCase()
				i++
			} else if (next === '2') {
				moves.push(move)
				moves.push(move)
				i++
				continue
			} else if (!/\s/.test(next) && validMoves.indexOf(next) === -1) {
				return []
			}
		}
		
		moves.push(move)
	}
	
	return moves
}

Algorithm.executeNamed = function(name) {
	if (typeof name !== 'string') {
		console.error('Algorithm name must be a string')
		return false
	}
	
	var algo = Algorithm.library[name]
	
	if (!algo) {
		console.error('Algorithm "' + name + '" not found')
		return false
	}
	
	return Algorithm.execute(algo)
}


Algorithm.library = {

	//CFOP - PLL
	uPermA: "R U' R U R U R U' R' U' R2",

	uPermB: "R2 U R U R' U' R' U' R' U R'",

	zPerm: "M2 U' M2 U' M' U2 M2 U2 M'",

	hPerm: "M2 U' M2 U2 M2 U' M2",

	ePerm: "X' R U' R' D R U R' D' R U R' D R U' R' D' X",

	aPermA: "X R' U R' D2 R U' R' D2 R2 X'",

	aPermB: "X R2 D2 R U R' D2 R U' R X'",

	rPermA: "R U' R' U' R U R D R' U' R D' R' U2 R'",

	rPermB: "R' U2 R U2 ' R' F R U R' U' R' F' R2",
	
	tPerm: "R U R' U' R' F R2 U' R' U' R U R' F'",
	
	jPermA: "L' U' L F L' U' L U L F' L2 U L",
	
	jPermB: "R U R' F' R U R' U' R' F R2 U' R'",
	
	yPerm: "F R U' R' U' R U R' F' R U R' U' R' F R F'",

	fPerm: "R' U' F' R U R' U' R' F R2 U' R' U' R U R' U R",

	vPerm: "R' U R' U' Y R' F' R2 U' R' U R' F R F Y' ",

	nPermA: "R U R' U R U R' F' R U R' U' R' F R2 U' R' U2 R U' R'",

	nPermB: "R' U R U' R' F' U' F R U R' F R' F' R U' R",

	gPermA: "R2 U R' U R' U' R U' R2 D U' R' U R D'",

	gPermB: "D R' U' R U D' R2 U R' U R U' R U' R2",

	gPermC: "R2 U' R U' R U R' U R2 D' U R U' R' D",

	gPermD: "R U R' U' D R2 U' R U' R' U R' U R2 D'",

	//CFOP - OLL
	oll_1: "R U2 R2 F R F' U2 R' F R F'",

	oll_2: "F R U R' U' F' B Z R U R' U' B' Z'",

	oll_3: "B Z R U R' U' B' Z' U' F R U R' U' F'",

	oll_4: "B Z R U R' U' B' Z' U F R U R' U' F'",	

	oll_5: "L' X' U2 R U R' U L X",

	oll_6: "L X U2 R' U' R U' L' X'",

	oll_7: "L X U R' U R U2 L' X'",	
	
	oll_8: "R' X U' L U' L' U2 R X'",
	
	oll_9: "L' U' L U' L F' L' F L' U2 L",

	oll_10: "R U R' U R' F R F' R U2 R'",

	oll_11: "M R U R' U R U2 R' U M'",

	oll_12: "M' R' U' R U' R' U2 R U' M",

	oll_13: "F U R U2 R' U' R U R' F'",

	oll_14: "R' F R U R' F' R F U' F'",

	oll_15: "L' X' U' L X R' U' R U L' X' U L X",

	oll_16: "L X U L' X' R U R' U' L X U' L' X'",

	oll_17: "R U R' U R' F R F' U2 R' F R F'",
	
	oll_18: "L X U R' U R U2 L2 X2 U' R U' R' U2 L X",

	oll_19: "M U R U R' U' M' R' F R F'",

	oll_20: "L X U R' U' M2 U R U' R' U' M'",

	oll_21: "R U2 R' U' R U R' U' R U' R'",

	oll_22: "R U2 R2 U' R2 U' R2 U2 R", 

	oll_23: "R2 D R' U2 R D' R' U2 R'",

	oll_24: "L X U R' U' L' X' F R F'",

	oll_25: "F R' F' L X U R U' L' X'",

	oll_26: "R U2 R' U' R U' R'",

	oll_27: "R U R' U R U2 R'",

	oll_28: "L X U R' U' M U R U' R'",

	oll_29: "M U R U R' U' R' F R F' M'",

	oll_30: "F R' F R2 U' R' U' R U R' F2",

	oll_31: "R' U' F U R U' R' F' R",

	oll_32: "L U F' U' L' U L F L'",

	oll_33: "R U R' U' R' F R F'",

	oll_34: "R U R2 U' R' F R U R U' F'",

	oll_35: "R U2 R2 F R F' R U2 R'",

	oll_36: "L' U' L U' L' U L U L F' L' F",

	oll_37: "F R' F' R U R U' R'",

	oll_38: "R U R' U R U' R' U' R' F R F'",

	oll_39: "L F' L' U' L U F U' L'",

	oll_40: "R' F R U R' U' F' U R",

	oll_41: "R U R' U R U2 R' F R U R' U' F'",

	oll_42: "R' U' R U' R' U2 R F R U R' U' F'",

	oll_43: "B' Z' L' U' L U B Z",

	oll_44: "B Z R U R' U' B' Z'",

	oll_45: "F R U R' U' F'",

	oll_46: "R' U' R' F R F' U R",

	oll_47: "F' L' U' L U L' U' L U F",

	oll_48: "F R U R' U' R U R' U' F'",

	oll_49: "R B' R2 F R2 B R2 F' R",

	oll_50: "R' F R2 B' R2 F' R2 B R'",

	oll_51: "F U R U' R' U R U' R' F'",

	oll_52: "R' F' U' F U' R U R' U R",

	oll_53: "R' M U' R U' R' U R U' R' U2 R M'",

	oll_54: "R M' U R' U R U' R' U R U2 R' M",

	oll_55: "R' F U R U' R2 F' R2 U R' U' R",

	oll_56: "F R U R' U' R F' R M' U R' U' R' M",

	oll_57: "R U R' U' M' U R U' R' M",

	
}

Algorithm.list = function() {
	var names = Object.keys(Algorithm.library)
	console.log('Available algorithms:')
	names.forEach(function(name) {
		console.log('  ' + name + ': ' + Algorithm.library[name])
	})
	return names
}

Algorithm.addCustom = function(name, notation) {
	if (typeof name !== 'string' || typeof notation !== 'string') {
		console.error('Both name and notation must be strings')
		return false
	}
	
	Algorithm.library[name.toLowerCase()] = notation
	return true
}

Algorithm.info = function(name) {
	var algo = Algorithm.library[name.toLowerCase()]
	
	if (!algo) {
		console.error('Algorithm "' + name + '" not found')
		return null
	}

	var moves = Algorithm.parse(algo)
	
	return {
		name: name,
		notation: algo,
		moves: moves,
		moveCount: moves.length
	}
}
