var erno = {

	
	
	

	version: 20131102.1337,

	
	

	verbosity: 0.5,

	
	
	

	renderMode: 'css',

	
	
	
	
	

	state: 'setup',
	stateFrames: 0,
	stateHistory: [ 'setup' ],

	
	
	
	
	

	changeStateTo: function( stateNext ){

		if( erno.state !== stateNext ){

			if( erno.verbosity >= 0.3 ){
		
				console.log( '< Exiting  "'+ erno.state +'" state at '+ erno.stateFrames +' frames.' )
				console.log( '> Entering "'+ stateNext +'" state.' )
			}
		
			var 
			teardown = erno.states[ erno.state +'Teardown' ],
			setup    = erno.states[ stateNext +'Setup' ]

			if( teardown instanceof Function ) teardown()
			if( setup    instanceof Function ) setup()
			erno.stateHistory.push( stateNext )
			erno.state = stateNext	
			erno.stateFrames = 0
		}
		return false
	},

	
	

	states: {

		
		
		

		setup: function(){

			console.log( '\nCuber', erno.version )
			console.log( '' )

		

			
			

			if( window.setupTasks )	setupTasks.forEach( function( task ){ task() })

			
			

			setupThree()
			setupControls()

			
			

			var hash = document.location.search.substr( 1 )

			if( hash.charAt( hash.length - 1 ) === '/' ) hash = hash.substr( 0, hash.length - 1 )
			hash = hash.charAt( 0 ).toUpperCase() + hash.substr( 1, hash.length )

			
			
			

			window.cube = new Cube( hash )
			$( '#panelToggle' ).click( function(){

				var isOpen = $( '#sidePanel' ).hasClass( 'open' )
				$( '#sidePanel' ).toggleClass( 'open' ).attr( 'aria-hidden', isOpen ? 'true' : 'false' )
			})
			var $twistDurationSlider = $( '#twistDurationSlider' )
			var $twistDurationValue = $( '#twistDurationValue' )
			var $twistDurationSliderBG = $( '#twistDurationSliderBG' )
			var $twistDurationValueBG = $( '#twistDurationValueBG' )
			var speedPresets = [
				{ label: 'Fast', duration: 110 },
				{ label: 'Normal', duration: 360 },
				{ label: 'Slow', duration: 580 }
			]
			var speedPresetsBG = [
				{ label: 'Бързо', duration: 110 },
				{ label: 'Нормално', duration: 360 },
				{ label: 'Бавно', duration: 580 }
			]
			var bindTwistDurationSlider = function( $slider, $label, presets ){

				if( !$slider.length || !$label.length ) return

				$slider.on( 'input change', function(){

					var speedIndex = +$( this ).val()
					var preset = presets[ speedIndex ] || presets[ 1 ]
					window.cube.setTwistDuration( preset.duration )
					$label.text( preset.label )
				})

				$slider.trigger( 'change' )
			}
			bindTwistDurationSlider( $twistDurationSlider, $twistDurationValue, speedPresets )
			bindTwistDurationSlider( $twistDurationSliderBG, $twistDurationValueBG, speedPresetsBG )
			$( '#shuffleButton' ).click( function(){
				$( '#Beginner, #CFOP, #Roux, #shuffleButton' ).prop( 'disabled', true )
				$( '#stopShuffleButton' ).prop( 'disabled', false )
				window.cube.isShuffling = true
				
			})
			$( '#stopShuffleButton' ).click( function(){

				window.cube.isShuffling = false
			})
			$( '#hintsButton' ).click( function(){

				$( '#hintsModal' ).addClass( 'open' ).attr( 'aria-hidden', 'false' )
			})
			$( '#closeHintsButton' ).click( function(){

				$( '#hintsModal' ).removeClass( 'open' ).attr( 'aria-hidden', 'true' )
			})
			$( '#hintsModal' ).click( function( event ){

				if( event.target === this ){
					$( '#hintsModal' ).removeClass( 'open' ).attr( 'aria-hidden', 'true' )
				}
			})
			$( document ).keydown( function( event ){

				if( event.keyCode === 27 ){
					$( '#hintsModal' ).removeClass( 'open' ).attr( 'aria-hidden', 'true' )
				}
			})
			var isValidScrambleNotation = function( input ){

				return !!( window.Algorithm && Algorithm.parse( input ).length )
			}
			var executeScrambleInput = function( scramble ){
				if( !isValidScrambleNotation( scramble )){
					
					return false
				}

				$( '#Beginner, #CFOP, #Roux, #shuffleButton, #stopShuffleButton' ).prop( 'disabled', true )
				return Algorithm.execute( scramble )
			}
			$( '#executeScrambleButton' ).click( function(){

				window.cube.isSolving = false
				window.cube.isSolvingLL = false
				window.cube.isSolvingBeginner = false
				timerState.running = false
				timerState.paused = false
				var scramble = $( '#scrambleInput' ).val()
				executeScrambleInput( scramble )
			})
			$( '#scrambleInput' ).keydown( function( event ){
				
				if( event.keyCode === 13 ){
					window.cube.isSolving = false
					window.cube.isSolvingLL = false
					window.cube.isSolvingBeginner = false
					timerState.running = false
					timerState.paused = false
					var scramble = $( this ).val()
					executeScrambleInput( scramble )
					
				}
			})

			var $algorithmSelect = $( '#algorithmSelect' )
			var $algorithmNotationValue = $( '#algorithmNotationValue' )
			var updateAlgorithmNotationDisplay = function( selectedName ){

				if( !$algorithmNotationValue.length || !window.Algorithm || !window.Algorithm.library ) return

				if( !selectedName ){

					$algorithmNotationValue.text( 'Select an algorithm to see its notation.' )
					return
				}

				$algorithmNotationValue.text( Algorithm.library[ selectedName ] || 'No notation available.' )
			}

			var $algorithmSelectBG = $( '#algorithmSelectBG' )
			var $algorithmNotationValueBG = $( '#algorithmNotationValueBG' )
			var updateAlgorithmNotationDisplayBG = function( selectedName ){

				if( !$algorithmNotationValueBG.length || !window.Algorithm || !window.Algorithm.library ) return

				if( !selectedName ){

					$algorithmNotationValueBG.text( 'Изберете алгоритъм, за да видите неговата нотация.' )
					return
				}

				$algorithmNotationValueBG.text( Algorithm.library[ selectedName ] || 'Няма налична нотация.' )
			}
			var runSelectedAlgorithm = function(){

				if( !window.Algorithm || !window.Algorithm.library ) return false

				var selectedName = $algorithmSelect.length ? $algorithmSelect.val() : $algorithmSelectBG.val()
				updateAlgorithmNotationDisplay( selectedName )
				updateAlgorithmNotationDisplayBG( selectedName )
				if( selectedName ){

					return Algorithm.executeNamed( selectedName )
				}
				return false
			}

			if(( $algorithmSelect.length || $algorithmSelectBG.length ) && window.Algorithm && window.Algorithm.library ){

				var groupedAlgorithms = {
					pll: [],
					oll: []
				}
				var groupLabels = {
					pll: 'PLL',
					oll: 'OLL'
				}
				var groupOrder = [ 'pll', 'oll' ]
				var ungroupedAlgorithms = []
				var getAlgorithmGroup = function( name ){

					if( /^oll_/i.test( name )) return 'oll'
					if( /perm/i.test( name )) return 'pll'
					return null
				}

				if( $algorithmSelect.length ){
					$algorithmSelect.empty()
					$algorithmSelect.append( $( '<option />', {
						value: '',
						text: 'Select algorithm'
					}))
				}

				if( $algorithmSelectBG.length ){
					$algorithmSelectBG.empty()
					$algorithmSelectBG.append( $( '<option />', {
						value: '',
						text: 'Изберете алгоритъм'
					}))
				}



				Object.keys( Algorithm.library ).forEach( function( name ){

					var groupKey = getAlgorithmGroup( name )
					if( groupKey ) groupedAlgorithms[ groupKey ].push( name )
					else ungroupedAlgorithms.push( name )
				})

				groupOrder.forEach( function( groupKey ){

					if( groupedAlgorithms[ groupKey ].length === 0 ) return

					if( $algorithmSelect.length ){

						var $group = $( '<optgroup />', {
							label: groupLabels[ groupKey ]
						})

						groupedAlgorithms[ groupKey ].forEach( function( name ){

							$group.append( $( '<option />', {
								value: name,
								text: name
							}))
						})

						$algorithmSelect.append( $group )
					}

					if( $algorithmSelectBG.length ){

						var $groupBG = $( '<optgroup />', {
							label: groupLabels[ groupKey ]
						})

						groupedAlgorithms[ groupKey ].forEach( function( name ){

							$groupBG.append( $( '<option />', {
								value: name,
								text: name
							}))
						})

						$algorithmSelectBG.append( $groupBG )
					}
				})

				ungroupedAlgorithms.forEach( function( name ){

					if( $algorithmSelect.length ){
						$algorithmSelect.append( $( '<option />', {
							value: name,
							text: name
						}))
					}

					if( $algorithmSelectBG.length ){
						$algorithmSelectBG.append( $( '<option />', {
							value: name,
							text: name
						}))
					}
				})

				$algorithmSelect.on( 'change', function(){

					var selected = $( this ).val()
					updateAlgorithmNotationDisplay( selected )
				})

				$algorithmSelectBG.on( 'change', function(){

					var selected = $( this ).val()
					updateAlgorithmNotationDisplayBG( selected )
				})

				updateAlgorithmNotationDisplay( '' )
				updateAlgorithmNotationDisplayBG( '' )
			}

			$( '#runAlgorithmButton' ).click( function(){

				runSelectedAlgorithm()
			})
			$( '#Beginner' ).click( function(){
				if(cube.isSolved() === false && cube.isShuffling === false) {
				timerState.startTime = Date.now()
				timerState.running = true
				timerState.paused = false
				$( '#timer' ).addClass( 'active' )
				$( '#Beginner, #CFOP, #Roux, #shuffleButton, #stopShuffleButton' ).prop( 'disabled', true )
				}
				window.cube.solve()
				window.cube.solveBeginner()
			})
			$( '#CFOP' ).click( function(){

				if(cube.isSolved() === false && cube.isShuffling === false) {
				timerState.startTime = Date.now()
				timerState.running = true
				timerState.paused = false
				$( '#timer' ).addClass( 'active' )
				$( '#Beginner, #CFOP, #Roux, #shuffleButton, #stopShuffleButton' ).prop( 'disabled', true )
				}
				window.cube.solve()
				window.cube.solveLL()
			})
			$( '#Roux' ).click( function(){
				if(cube.isSolved() === false && cube.isShuffling === false) {
				timerState.startTime = Date.now()
				timerState.running = true
				timerState.paused = false
				$( '#timer' ).addClass( 'active' )
				$( '#Beginner, #CFOP, #Roux, #shuffleButton, #stopShuffleButton' ).prop( 'disabled', true )
				}
				window.cube.solve()
				window.cube.solveRoux()
			})

			

			updateControls()
			$( '#container' ).click( function(){

				$( '#controls input, #controls textarea' ).blur()
			})
			$( '#controls input' ).change( applyControls )
			$( '#controls input' ).keydown( function( event ){

				var code = event.keyCode || event.which

				if( code === 13 ) applyControls()
				if( !isNaN( $( this ).val() ) &&  ( code === 38 || code === 40 )){

					if( code === 40 ) $( this ).val( +$( this ).val() - 1 )
					if( code === 38 ) $( this ).val( +$( this ).val() + 1 )
					applyControls()
				}
			})
			$( '#texts' ).keydown( function( event ){

				var code = event.keyCode || event.which
				if( code === 13 ){

					applyControls()
					return false
				}
			})
			$( '#texts' ).change( applyControls ).blur( applyControls )

			
			

			erno.changeStateTo( 'loop' )
		},
		loop: function(){

			animate()
		}
	},

	
	

	inspect: function(){

		var 
		memAvailableMB = window.performance.memory.totalJSHeapSize
			.divide( 1024 * 1024 )
			.multiply( 10 ).roundDown().divide( 10 ),
		memUsedMB = window.performance.memory.usedJSHeapSize
			.divide( 1024 * 1024 )
			.multiply( 10 ).roundDown().divide( 10 ),
		memUsedPercent = window.performance.memory.usedJSHeapSize
			.divide( window.performance.memory.totalJSHeapSize )
			.multiply( 1000 ).roundDown().divide( 10 )		
		
		console.log( '' )
		console.log(  now().toDate() )
		console.log( 'JS heap size total  ', memAvailableMB +' MB  (100.0%)' )
		console.log( 'JS heap size used   ', memUsedMB +' MB  ('+ memUsedPercent +'%)' )
		console.log( 'cube.twistQueue     ', ( cube.twistQueue.history.length + cube.twistQueue.future.length ))
		console.log( 'cube.taskQueue      ', ( cube.taskQueue.history.length + cube.taskQueue.future.length ))
		console.log( 'THREE.Object3D index', THREE.Object3DIdCount )
		console.log( '' )

		return memUsedPercent
	}
}

    
   
  
 

function setupThree(){

	

	window.scene = new THREE.Scene()

	
	
	var
	FIELD_OF_VIEW = 45,
	WIDTH         = window.innerWidth,
	HEIGHT        = window.innerHeight,
	ASPECT_RATIO  = WIDTH / HEIGHT,
	NEAR          = 1,
	FAR           = 6000

	window.camera = new THREE.PerspectiveCamera( FIELD_OF_VIEW, ASPECT_RATIO, NEAR, FAR )
	camera.position.z = 1500
	camera.tanFOV = Math.tan((( Math.PI / 180 ) * camera.fov / 2 ))
	camera.oneToOne = function(){
		
		
		

		return - 0.5 / Math.tan( this.fov * Math.PI / 360 ) * HEIGHT
	}
	camera.lookAt( scene.position )
	scene.add( camera )

	
	

	window.projector = new THREE.Projector()

	

	if( erno.renderMode === 'css' ){

		window.renderer = new THREE.CSS3DRenderer()
		renderer.domElement.style.position = 'absolute'
		renderer.domElement.style.top = 0
	}
	else if( erno.renderMode === 'svg' ){

		window.renderer = new THREE.SVGRenderer()
		renderer.setQuality( 'low' )
	}
	else if( erno.renderMode === 'webgl' ){

		window.renderer = new THREE.WebGLRenderer({ antialias: true })
		renderer.shadowMapEnabled = true
	}
	renderer.setSize( WIDTH, HEIGHT )
	renderer.originalHeight = HEIGHT
	document.getElementById( 'container' ).appendChild( renderer.domElement )

	

	window.addEventListener( 'resize', onWindowResize, false )
}
function setupControls(){

	

	window.controls = new THREE.TrackballControls( camera, renderer.domElement )
	
	controls.rotateSpeed = 0.5
	

	

	$( document ).keydown( function( event ){

		if( event.keyCode === 38 ) camera.fov ++
		if( event.keyCode === 40 ) camera.fov --
		
	})
}
function onWindowResize(){
	
	var
	WIDTH  = window.innerWidth,
	HEIGHT = window.innerHeight

	camera.aspect = WIDTH / HEIGHT
	
	camera.updateProjectionMatrix()
	renderer.setSize( WIDTH, HEIGHT )
	render()
}
var timerState = { startTime: null, running: false, paused: false }
function updateTimer(){

	if( window.cube === undefined ) return
	
	if( window.cube.isSolving && !timerState.running && window.cube.isShuffling === false && cube.isSolved() === false ) {

		timerState.startTime = Date.now()
		timerState.running = true
		timerState.paused = false
		$( '#timer' ).addClass( 'active' )
	}
	
	if( timerState.running ){

		if( !timerState.paused ){

			var elapsed = ( Date.now() - timerState.startTime ) / 1000
			$( '#timer' ).text( elapsed.toFixed( 2 ) + 's' )
		}
		
		if( window.cube.isSolved() && !timerState.paused ){

			timerState.paused = true
		}
	}

	if( window.cube.isShuffling ){

		$( '#Beginner, #CFOP, #Roux, #shuffleButton' ).prop( 'disabled', true )
		$( '#stopShuffleButton' ).prop( 'disabled', false )
	}
	else if( window.cube.twistQueue.future.length === 0 && !window.cube.isTweening() ){

		$( '#Beginner, #CFOP, #Roux, #shuffleButton, #stopShuffleButton' ).prop( 'disabled', false )
	}
}
function animate(){
	
	updateTimer()
	TWEEN.update()
	if( window.controls && window.controls instanceof THREE.TrackballControls ){

		var 
		cameraPositionX = camera.position.x,
		cameraPositionY = camera.position.y,
		cameraPositionZ = camera.position.z,

		cameraRotationX = camera.rotation.x,
		cameraRotationY = camera.rotation.y,
		cameraRotationZ = camera.rotation.z

		controls.update()

		if( cameraPositionX !== camera.position.x ||
			cameraPositionY !== camera.position.y || 
			cameraPositionZ !== camera.position.z ||
			
			cameraRotationX !== camera.rotation.x ||
			cameraRotationY !== camera.rotation.y || 
			cameraRotationZ !== camera.rotation.z ){

			updateControls()	
		}		
	}
	render()
	
}
function render(){
	
	renderer.render( scene, camera )
}

    
   
  
 

function applyControls(){

	if( $( '#attributeFaceLabels' ).prop( 'indeterminate' ) !== true ){

		if( $( '#attributeFaceLabels' ).prop( 'checked' )) cube.showFaceLabels()
		else cube.hideFaceLabels()
	}
	if( $( '#attributePlastics' ).prop( 'indeterminate' ) !== true ){

		if( $( '#attributePlastics' ).prop( 'checked' )) cube.showPlastics()
		else cube.hidePlastics()
	}
	if( $( '#attributeInteriors' ).prop( 'indeterminate' ) !== true ){

		if( $( '#attributeIntroverts' ).prop( 'checked' )) cube.showIntroverts()
		else cube.hideIntroverts()
	}
	if( $( '#attributeStickers' ).prop( 'indeterminate' ) !== true ){

		if( $( '#attributeStickers' ).prop( 'checked' )) cube.showStickers()
		else cube.hideStickers()
	}
	if( $( '#attributeIds' ).prop( 'indeterminate' ) !== true ){

		if( $( '#attributeIds' ).prop( 'checked' )) cube.showIds()
		else cube.hideIds()
	}
	if( $( '#attributeTexts' ).prop( 'indeterminate' ) !== true ){

		if( $( '#attributeTexts' ).prop( 'checked' )) cube.showTexts()
		else cube.hideTexts()
	}
	if( $( '#attributeWireframes' ).prop( 'indeterminate' ) !== true ){

		if( $( '#attributeWireframes' ).prop( 'checked' )) cube.showWireframes()
		else cube.hideWireframes()
	}
	cube.isShuffling = $( '#actionShuffle' ).prop( 'checked' )
	cube.isRotating  = $( '#actionRotate'  ).prop( 'checked' )
	$( '#twist' ).css( 'visibility', $( '#actionNotation' ).prop( 'checked' ) ? 'visible' : 'hidden' )
	cube.setText( $( '#texts' ).val())
}
function updateControls( cube ){

	if( cube === undefined ) cube = window.cube
	$( '#backgroundColorCss' ).val( $( 'body' ).css( 'background-color' ))	
	$( '#cameraFov' ).val( camera.fov )
	if( cube.showingFaceLabels ) $( '#attributeFaceLabels' ).prop( 'checked', true )
	else $( '#attributeFaceLabels' ).prop( 'checked', false )

	var
	plastics   = 0,
	introverts = 0,
	stickers   = 0,
	ids        = 0,
	texts      = 0,
	wireframes = 0

	cube.cubelets.forEach( function( cubelet ){

		if( cubelet.showingPlastics   ) plastics ++
		if( cubelet.showingIntroverts ) introverts ++
		if( cubelet.showingStickers   ) stickers ++
		if( cubelet.showingIds        ) ids ++
		if( cubelet.showingTexts      ) texts ++
		if( cubelet.showingWireframes ) wireframes ++
	})
	if( erno.verbosity >= 0.9 ){
	
		console.log( '\n\nCubelets tallied with the following attributes:' )
		console.log( '  plastics .....', plastics )
		console.log( '  introverts ...', introverts )
		console.log( '  stickers .....', stickers )
		console.log( '  ids ..........', ids )
		console.log( '  texts ........', texts )
		console.log( '  wireframes ...', wireframes )
		console.log( '' )
	}

	assessTrueFalseMixed( '#attributePlastics',   plastics )
	assessTrueFalseMixed( '#attributeIntroverts', introverts )
	assessTrueFalseMixed( '#attributeStickers',   stickers )
	assessTrueFalseMixed( '#attributeIds',        ids )
	assessTrueFalseMixed( '#attributeTexts',      texts )
	assessTrueFalseMixed( '#attributeWireframes', wireframes )

	$( '#actionShuffle'  ).prop( 'checked', cube.isShuffling )
	$( '#actionNotation' ).prop( 'checked', $( '#twist' ).css( 'visibility' ) === 'visible' ? true : false )
	$( '#actionRotate'   ).prop( 'checked', cube.isRotating )

	$( '#texts' ).val( cube.getText( 0 ))
}
function assessTrueFalseMixed( id, count ){

	if( count === 0 ){

		$( id ).prop( 'indeterminate', false )
		$( id ).prop( 'checked', false )
	}
	else if( count === 27 ){

		$( id ).prop( 'indeterminate', false )
		$( id ).prop( 'checked', true )
	}
	else $( id ).prop( 'indeterminate', true )
}

    
   
  
 

function loop(){
	
	if( document.readyState === 'complete' ){

		erno.stateFrames ++
		var state = erno.states[ erno.state ]
		if( state instanceof Function ) state()
	}
}
setInterval( loop, 16 )