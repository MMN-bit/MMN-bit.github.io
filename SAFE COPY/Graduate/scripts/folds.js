function Fold( left, right ){

	this.map = [

		left.northWest[  left.face  ].text,
		left.north[      left.face  ].text,
		left.northEast[  left.face  ].text,
		right.northWest[ right.face ].text,
		right.north[     right.face ].text,
		right.northEast[ right.face ].text,

		left.west[       left.face  ].text,
		left.origin[     left.face  ].text,
		left.east[       left.face  ].text,
		right.west[      right.face ].text,
		right.origin[    right.face ].text,
		right.east[      right.face ].text,

		left.southWest[  left.face  ].text,
		left.south[      left.face  ].text,
		left.southEast[  left.face  ].text,
		right.southWest[ right.face ].text,
		right.south[     right.face ].text,
		right.southEast[ right.face ].text
	]
}

Fold.prototype.getText = function(){

	var text = ''

	this.map.forEach( function( element ){

		text += element.innerHTML
	})
	return text
}
Fold.prototype.setText = function( text ){

	var i

	text = text.justifyLeft( 18 )
	for( i = 0; i < 18; i ++ ){

		this.map[ i ].innerHTML = text.substr( i, 1 )
	}
}