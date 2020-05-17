



(function(){
	'use strict';
	// HTML elements
	var baddie, content, coinTab, messageTab, thirdTab, forthTab;
	// Numbers
	var tileSize, gridSize, left, top, posLeft, posTop;
	// Arrays
	var gameArea;
	// Get HTML elements that are to be used
	baddie = document.getElementById("baddie");
	content = document.getElementById("content");
	coinTab = document.getElementById("coinTab");
	messageTab = document.getElementById("messageTab");
	thirdTab = document.getElementById("thirdTab");
	forthTab = document.getElementById("forthTab");
	

	// Size of each tile
	tileSize = 32;
	// Number of tiles per row
	gridSize = 10;
	// Sets content size to match tilesize and gridsize
	content.style.width = content.style.height = gridSize*tileSize + "px";
	coinTab.style.width = (gridSize*tileSize)/3 +1 + "px";
	coinTab.style.height = (gridSize*tileSize)/13 + "px";
	messageTab.style.width = coinTab.style.width;
	messageTab.style.height = coinTab.style.height;
	thirdTab.style.width = (gridSize*tileSize)/6 +1 + "px";
	thirdTab.style.height = coinTab.style.height;
	forthTab.style.width = (gridSize*tileSize)/6 +1 + "px";
	forthTab.style.height = coinTab.style.height;
	// Gets starting position of baddie
	left = baddie.offsetLeft;
	top = baddie.offsetTop;
	// Starting position of baddie in the grid
	posLeft = 0;
	posTop = 0;

	//Other global variables
	var unRead = 0;
	var finishedMission1 = false;
	var finishedMission2 = false;
	var finishedMission3 = false;

	/**
	 * This is the game area with a 10x10 grid
	 * 10 - nothing (grass)
	 * 11 - wall (impassible)
	 * 12 - obstacle (movable)
	 * 13 - door (passible)
	 * 14 - coin (movable)
	 * 15 - vortex (movable)
	 * 16 - guard (passable if payed)
	 * 17 - guard 2 (passable if payed)
	 * 18 - penguin (picked up)
	 * 19 - penguin-home (dropped off)
	 * 20 - enemy (deducts points)
	 */

	/* gameArea = [
		11,11,11,11,11,11,11,11,11,11,
		11,10,10,10,10,10,10,10,10,11,
		11,10,10,10,10,10,10,10,10,11,
		11,10,10,10,10,10,10,10,10,11,
		11,10,10,10,10,10,10,10,10,11,
		11,10,10,10,10,10,10,10,10,11,
		11,10,10,10,10,10,10,10,10,11,
		11,10,10,10,10,10,10,10,10,11,
		11,10,10,10,10,10,10,10,10,11,
		11,11,11,11,11,11,11,11,11,11,
		]; */

	gameArea = [
		11,11,11,11,11,11,11,11,11,11,
		11,10,11,11,10,14,11,10,10,11,
		11,10,11,10,10,11,11,13,10,11,
		11,25,10,10,11,10,10,10,10,11,
		11,11,11,10,11,11,11,12,12,11,
		11,14,11,10,10,14,11,10,10,11,
		11,10,11,10,11,11,11,11,10,11,
		11,10,10,10,10,11,14,10,10,11,
		11,14,11,11,10,10,10,11,10,11,
		11,11,11,11,11,11,11,11,11,11,
		];

    var level0 = [
		11,11,11,11,11,11,11,11,11,11,
		11,10,11,11,10,14,11,10,10,11,
		11,10,11,10,10,11,11,13,10,11,
		11,25,10,10,11,10,10,10,10,11,
		11,11,11,10,11,11,11,12,12,11,
		11,14,11,10,10,14,11,10,10,11,
		11,10,11,10,11,11,11,11,10,11,
		11,10,10,10,10,11,14,10,10,11,
		11,14,11,11,10,10,10,11,10,11,
		11,11,11,11,11,11,11,11,11,11,
		];
    
    var level1 = [
		11,11,11,11,11,11,11,11,11,11,
		11,10,10,10,10,10,10,10,10,11,
		11,10,10,10,10,10,10,10,10,11,
		11,10,10,13,10,10,10,10,10,11,
		11,10,10,10,10,10,10,10,10,11,
		11,20,10,10,10,10,10,10,10,11,
		11,10,10,10,10,10,10,10,10,11,
		11,10,10,10,10,10,10,10,10,11,
		11,10,10,10,10,10,10,21,10,11,
		11,11,11,11,11,11,11,11,11,11,
		];
    
    var level2 = [
		11,11,11,11,11,11,11,11,11,11,
		22,10,10,10,10,10,10,10,10,11,
		11,10,10,10,10,10,10,10,10,11,
		11,10,10,10,10,10,10,10,10,11,
		11,10,10,10,25,10,10,10,10,11,
		11,10,10,10,10,10,10,10,10,11,
		11,10,10,10,10,10,10,10,10,11,
		11,10,10,10,10,10,10,10,10,11,
		11,10,10,10,10,10,10,10,10,11,
		11,11,11,11,11,11,11,11,11,11,
		];
    
    var level3 = [
		11,11,11,11,11,11,11,11,11,11,
		23,10,10,10,10,10,10,10,15,11,
		11,10,11,10,11,10,11,10,11,11,
		11,10,11,10,11,10,11,10,11,11,
		11,10,11,10,11,12,11,10,11,11,
		11,14,11,14,11,14,11,14,11,11,
		11,10,11,10,11,10,11,12,11,11,
		11,10,11,10,11,10,11,10,11,11,
		11,10,10,10,10,10,10,10,13,11,
		11,11,11,11,11,11,11,11,11,11,
		];
    
    var level4 = [
		11,11,11,11,11,11,11,11,11,11,
		11,10,10,10,10,10,10,10,10,11,
		11,10,12,10,10,10,13,10,10,11,
		11,10,10,12,12,10,10,10,10,11,
		11,14,10,12,10,10,12,12,10,11,
		11,10,10,10,10,12,10,10,14,11,
		11,10,10,10,12,10,10,12,10,11,
		11,10,14,10,10,10,10,10,10,11,
		11,10,10,10,10,10,10,10,10,11,
		11,11,11,11,11,11,11,11,11,11,
		];
    
    var level5 = [
		11,11,11,11,11,11,11,11,11,11,
		11,14,10,10,10,10,10,10,10,11,
		11,10,10,10,10,10,10,10,10,11,
		11,12,10,10,10,10,10,10,10,11,
		11,10,12,12,11,11,11,11,11,11,
		11,10,10,10,16,10,10,14,11,11,
		11,10,10,12,11,10,11,10,10,11,
		11,10,10,10,11,14,10,11,10,11,
		11,24,10,10,11,11,10,10,10,11,
		11,11,11,11,11,11,11,11,22,11,
		];

	var level6 = [
		11,11,11,11,11,11,11,11,11,11,
		11,10,14,10,10,10,10,10,10,11,
		11,10,18,10,10,10,10,24,10,11,
		11,10,10,24,10,10,10,10,10,11,
		11,10,10,10,10,14,10,10,14,11,
		11,10,14,24,10,24,10,10,10,11,
		11,10,10,10,10,10,10,24,10,11,
		11,10,24,10,10,10,10,10,10,11,
		11,10,10,10,13,10,10,10,10,11,
		11,11,11,11,11,11,11,11,23,11,
		];

	var level7 = [
		11,11,11,11,11,11,11,11,11,11,
		11,12,12,12,10,10,10,10,10,11,
		11,10,12,10,10,10,13,10,10,11,
		11,10,10,12,12,12,10,10,10,11,
		11,10,10,10,12,10,10,10,10,11,
		11,10,10,10,10,12,12,12,10,11,
		11,10,10,10,10,10,12,10,10,11,
		11,10,10,10,10,10,10,12,12,11,
		11,10,10,10,10,10,10,10,12,11,
		11,11,11,11,11,11,11,11,11,11,
		];

	var level8 = [
		11,11,11,11,11,11,11,11,11,11,
		11,10,10,11,10,10,10,10,10,11,
		11,10,10,17,10,10,10,10,10,11,
		11,11,10,11,11,10,10,10,24,11,
		11,10,10,10,10,11,11,11,11,11,
		11,10,10,10,10,10,10,10,10,11,
		11,10,19,10,10,10,10,10,10,11,
		11,10,10,10,10,10,10,10,10,11,
		11,10,10,10,10,10,10,10,13,11,
		11,11,11,11,11,11,11,11,11,11,
		];
	
	var level9 = [
		11,11,11,11,11,11,11,11,11,11,
		11,10,10,10,10,10,10,10,10,11,
		11,10,10,10,10,10,10,10,10,11,
		11,10,10,13,10,10,10,10,10,11,
		11,10,10,10,10,10,10,10,10,11,
		11,20,10,10,10,10,10,10,10,11,
		11,10,10,10,10,10,10,10,10,11,
		11,10,10,10,10,10,10,10,10,11,
		11,10,10,10,10,10,10,21,10,11,
		11,11,11,11,11,11,11,11,11,11,
		];

	var level20 = [
		11,11,11,11,11,11,11,11,11,11,
		11,10,10,10,10,10,10,10,10,11,
		11,10,10,10,10,10,10,10,10,11,
		11,10,10,10,10,10,10,10,10,11,
		11,10,10,10,10,10,10,10,10,11,
		11,10,25,10,10,10,10,10,10,11,
		11,10,10,10,10,10,10,10,13,11,
		11,10,10,10,10,10,10,10,10,11,
		11,10,10,10,10,10,10,10,10,11,
		11,11,11,11,11,11,11,11,11,11,
		];

	/**
	 * Initiates the game area by adding each tile as a div with class and id to content area
	 * @param  {[type]} gameArea [description]
	 */
	var drawGamePlan = function(gameArea) {
		var i, tile;
		console.log("Drawing gameplan:");
		console.log(gameArea);

		for(i = 0; i < gameArea.length; i++) {
			// Creating a new tile
			tile = document.createElement("div");
			// Writing out the current tile from gameArea
			var tileFromArray = gameArea[i];
			// Adding class name to tile
			tile.className = "tile g" + tileFromArray;
			// Adding ID to tile
			tile.id = "n" + i;
			// Append tile to the content
			content.appendChild(tile);
		}
	};
/* ---- Coins menu ----- */
var coinViewOpen = false;
var coinView = document.getElementById("coinView");
var messageViewOpen = false;
var messageView = document.getElementById("messageView");
var person = "anna";

	document.getElementById("coinTab").addEventListener("click", function(){ 
		if(coinViewOpen == false){
			coinView.style.display = "block";
			messageView.style.display = "none";
			messageViewOpen = false;
			coinViewOpen = true;
		}else if(coinViewOpen == true){
			coinView.style.display = "none";
			coinViewOpen = false;
		}
		console.log("In coins funciton");
	});
	document.getElementById("messageTab").addEventListener("click", function(){ 
		if(messageViewOpen == false){
			document.getElementById("messageTab").innerHTML = "Messages";
			messageView.style.display = "block";
			coinView.style.display = "none";
			coinViewOpen = false;
			messageViewOpen = true;
			messageView.scrollTop = messageView.scrollHeight - messageView.clientHeight;
			unRead = 0;
		}else if(messageViewOpen == true){
			messageView.style.display = "none";
			messageViewOpen = false;
		}
	});
	document.getElementById("thirdTab").addEventListener("click", function(){ 
		console.log("Person1: " + person);
		if(person === "anna" ){
			person = "sebastian";
		}else{
			person = "anna";
		}
		moveBaddie(0,0);
		console.log("Person2: " + person);
	});

/* ---- Mouse keys ----- */
	document.getElementById("arrowLeft").addEventListener("click", function(){ 
                if(isBaddieMovable(-1, 0)) {
                    // Go left - Use moveBaddie-function
                    moveBaddie(-1, 0);
                    // Turn baddie left - Use the given function
                    turnLeft();
                }
	});
	document.getElementById("arrowRight").addEventListener("click", function(){ 
                if(isBaddieMovable(1, 0)) {
                    // Go right - Use moveBaddie-function
                    moveBaddie(1, 0);
                    // Turn baddie right - Use the given function
                    turnRight();
                }
	});
	document.getElementById("arrowUp").addEventListener("click", function(){ 
                if(isBaddieMovable(0, -1)) {
                    // Go up - Use moveBaddie-function
					moveBaddie(0, -1);
					turnUp();
                }
	});
	document.getElementById("arrowDown").addEventListener("click", function(){ 
                if(isBaddieMovable(0, 1)) {
                    // Go down - Use moveBaddie-function
					moveBaddie(0, 1);
					turnDown();
                }
	});

/* ---- Touch arrows ----- 
	document.getElementById("arrowLeft").addEventListener("touchstart", function(){ 
		if(isBaddieMovable(-1, 0)) {
			// Go left - Use moveBaddie-function
			moveBaddie(-1, 0);
			// Turn baddie left - Use the given function
			turnLeft();
		}
	});
	document.getElementById("arrowRight").addEventListener("touchstart", function(){ 
			if(isBaddieMovable(1, 0)) {
				// Go right - Use moveBaddie-function
				moveBaddie(1, 0);
				// Turn baddie right - Use the given function
				turnRight();
			}
	});
	document.getElementById("arrowUp").addEventListener("touchstart", function(){ 
			if(isBaddieMovable(0, -1)) {
				// Go up - Use moveBaddie-function
				moveBaddie(0, -1);
			}
	});
	document.getElementById("arrowDown").addEventListener("touchstart", function(){ 
			if(isBaddieMovable(0, 1)) {
				// Go down - Use moveBaddie-function
				moveBaddie(0, 1);
			}
	}); */
/* ----- Kyboard keys ----- */
	// Triggers action on keypress
	document.addEventListener("keydown", function(event) {
		var key;
		// Gets what key was pressed as number
		key = event.keyCode || event.which;
		console.log("");
		console.log(key + " was pressed");
		
        switch(key) {
            case 37:
                if(isBaddieMovable(-1, 0)) {
                    // Go left - Use moveBaddie-function
                    moveBaddie(-1, 0);
                    // Turn baddie left - Use the given function
                    turnLeft();
                }
                break;
            case 38:
                if(isBaddieMovable(0, -1)) {
                    // Go up - Use moveBaddie-function
					moveBaddie(0, -1);
					turnUp();
                }
                break;
            case 39:
                if(isBaddieMovable(1, 0)) {
                    // Go right - Use moveBaddie-function
                    moveBaddie(1, 0);
                    // Turn baddie right - Use the given function
                    turnRight();
                }
                break;
            case 40:
                if(isBaddieMovable(0, 1)) {
                    // Go down - Use moveBaddie-function
					moveBaddie(0, 1);
					turnDown();
                }
                break;
			default:
				// Button was pressed but no action is to be performed
				console.log("Nothing happened with the gameboard");
				// return this function so that the default button action is performed instead
				return true;
		}
		// Baddie action was performed - prevent button default
		event.preventDefault();
	});
/* ----- SWIPE FUNCTIONALITY -----*/
	var fingerCount = 0;
	var startX = 0;
	var startY = 0;
	var curX = 0;
	var curY = 0;
	var deltaX = 0;
	var deltaY = 0;
	var horzDiff = 0;
	var vertDiff = 0;
	var minLength = 72; // the shortest distance the user may swipe
	var swipeLength = 0;
	var swipeAngle = null;
	var swipeDirection = null;	

	document.getElementById("swipeBox").addEventListener("touchstart", function(event) {
		coinView.style.display = "none";
		coinViewOpen = false;
		messageView.style.display = "none";
		messageViewOpen = false
		// disable the standard ability to select the touched object
		event.preventDefault();
		// get the total number of fingers touching the screen
		fingerCount = event.touches.length;
		// since we're looking for a swipe (single finger) and not a gesture (multiple fingers),
		// check that only one finger was used
		if ( fingerCount == 1 ) {
			// get the coordinates of the touch
			startX = event.touches[0].pageX;
			startY = event.touches[0].pageY;
			// store the triggering element ID
			//triggerElementID = passedName;
		} else {
			// more than one finger touched so cancel
			touchCancel(event);
		}
		//document.getElementById("swipe-message").innerHTML = "Touchi-touchi";
	});

	document.getElementById("swipeBox").addEventListener("touchmove", function(event) {
		event.preventDefault();
		if ( event.touches.length == 1 ) {
			curX = event.touches[0].pageX;
			curY = event.touches[0].pageY;
		} else {
			touchCancel(event);
		}
	});

	document.getElementById("swipeBox").addEventListener("touchend", function(event) {
		event.preventDefault();
		// check to see if more than one finger was used and that there is an ending coordinate
		if ( fingerCount == 1 && curX != 0 ) {
			// use the Distance Formula to determine the length of the swipe
			swipeLength = Math.round(Math.sqrt(Math.pow(curX - startX,2) + Math.pow(curY - startY,2)));
			// if the user swiped more than the minimum length, perform the appropriate action
			if ( swipeLength >= minLength ) {
				caluculateAngle();
				determineSwipeDirection();
				processingRoutine();
				touchCancel(event); // reset the variables
			} else {
				touchCancel(event);
			}	
		} else {
			touchCancel(event);
		}
	});

	document.getElementById("swipeBox").addEventListener("touchCancel", function(event) {
		// reset the variables back to default values
		fingerCount = 0;
		startX = 0;
		startY = 0;
		curX = 0;
		curY = 0;
		deltaX = 0;
		deltaY = 0;
		horzDiff = 0;
		vertDiff = 0;
		swipeLength = 0;
		swipeAngle = null;
		swipeDirection = null;
		//triggerElementID = null;
	});
	var caluculateAngle = function() {
		var X = startX-curX;
		var Y = curY-startY;
		var Z = Math.round(Math.sqrt(Math.pow(X,2)+Math.pow(Y,2))); //the distance - rounded - in pixels
		var r = Math.atan2(Y,X); //angle in radians (Cartesian system)
		swipeAngle = Math.round(r*180/Math.PI); //angle in degrees
		if ( swipeAngle < 0 ) { swipeAngle =  360 - Math.abs(swipeAngle); }
	};

	var determineSwipeDirection = function() {
		if ( (swipeAngle <= 45) && (swipeAngle >= 0) ) {
			swipeDirection = 'left';
		} else if ( (swipeAngle <= 360) && (swipeAngle >= 315) ) {
			swipeDirection = 'left';
		} else if ( (swipeAngle >= 135) && (swipeAngle <= 225) ) {
			swipeDirection = 'right';
		} else if ( (swipeAngle > 45) && (swipeAngle < 135) ) {
			swipeDirection = 'down';
		} else {
			swipeDirection = 'up';
		}
	};

	var processingRoutine = function() {
		//var element = document.getElementById("swipe-message").innerHTML;
		if ( swipeDirection == 'left' ) {
			if(isBaddieMovable(-1, 0)) {
				// Go left - Use moveBaddie-function
				moveBaddie(-1, 0);
				// Turn baddie left - Use the given function
				turnLeft();
			}
			document.getElementById("swipe-message").innerHTML = 'left';
		} else if ( swipeDirection == 'up' ) {
			if(isBaddieMovable(0, -1)) {
				// Go up - Use moveBaddie-function
				moveBaddie(0, -1);
			}
			document.getElementById("swipe-message").innerHTML = 'up';
		} else if ( swipeDirection == 'right' ) {
			if(isBaddieMovable(1, 0)) {
				// Go right - Use moveBaddie-function
				moveBaddie(1, 0);
				// Turn baddie right - Use the given function
				turnRight();
			}
			document.getElementById("swipe-message").innerHTML = 'right';
		} else if ( swipeDirection == 'down' ) {
			if(isBaddieMovable(0, 1)) {
				// Go down - Use moveBaddie-function
				moveBaddie(0, 1);
			}
			document.getElementById("swipe-message").innerHTML = 'down';
		}
	};

/* ------ FUNCTIONS ------ */

	/** Initiates area and baddie */
	var init = function() {
		drawGamePlan(gameArea);
		moveBaddie(1, 1);
	};

	/**
	 * This function checks that the move was possible and returns either the new position or false
	 * @param  {int} moveLeft	- direction to move horizontally, range: -1 -> 1
	 * @param  {int} moveTop	- direction to move vertically, range: -1 -> 1
	 * @return {bool} 			- if baddie was movable true is returned, otherwise false is returned
	 */

	// Variables
	var backdrop = "grass";
	var coinCount = 0;
	var level = 0;
	var gotPenguin = false;

	var isBaddieMovable = function(moveLeft, moveTop){
		var tile, tilePos, newLeft, newTop, movable;
		// This time we want the grid position values, not the pixel position values
		newLeft = posLeft + moveLeft;
		newTop = posTop + moveTop;
		//Assume that badddie cannot move there
		movable = false;
		// Get the tile baddie wants to move to
		// Left is the row number and top is the column number
		tilePos = newLeft + newTop*gridSize;
		// Getting the tile value from array gameArea and place it in the variable tile
		tile = gameArea[tilePos];
		//Writing out moves
		console.log("Move to: " + newLeft + "," + newTop);
		console.log("Tile " + tilePos + " contains " + gameArea[tilePos]);
		
		// Switch case on the tile value - do different things depending on what tile baddie is moving to
		switch(tile) {
			case 10: // Empty tile
				movable = true;
				break;
			case 11: // Wall, don't move baddie
				console.log("Baddie collided with wall: %s", tile);
				break;
			case 12: // Tile was an obstacle, move it and then baddie
				var nextPos, nextTile;
				// Calculate where the sibling tile to be checked is in the array
				nextPos = tilePos + moveLeft + (gridSize*moveTop);
				// Get the next tile from gameArea and place it in the variable nextTile (5b)
				nextTile = gameArea[nextPos];
				console.log("The next tile is: " + nextTile);
				console.log("Game area: " + gameArea);
				// Only move if the sibling tile to be moved to is empty
				if(nextTile == 10) {
					moveTile(tilePos, nextPos);
					// Allow  baddie to move to the current tile
					movable = true;
					console.log("Moved an obstacle");
				} else {
					// If not empty - don't do anything else
					console.log("Can't push obstacle - next tile is not empty");					
				}
				break;
			case 13: // Door
				if(level == 20){
					level = 1;
				}else{
					level = level + 1;
				}
				movable = true;
				if(backdrop === "grass" || backdrop == "agate"){backdrop = "space";}
				else{backdrop = "grass";}
				
				updateTiles(level);
				console.log("In the tardis! gameArea[titlePos]: " + gameArea[tilePos] + ". Should be: 13")
				console.log("Class: " + baddie.classList);
				console.log("Level: " + level);
				break;
			case 14: // Coin - pick up
				coinCount = coinCount + 1;
				if(coinCount == 1){
					document.getElementById("coin_count").innerHTML = "You have " + coinCount + " coin. ";
				}else{
					document.getElementById("coin_count").innerHTML = "You have " + coinCount + " coins. ";
				}
				
			    movable = true;
			    console.log("Picked up coin/gem. coinCount: " + coinCount);
			    gameArea[tilePos] = 10;
				emptyTile(tilePos);
				
				document.getElementById("coinTab").innerHTML = "Coins: " + coinCount;
			    break;
            case 15: //Vortex
				// level = 0;
				movable = true;
				updateTiles(level);
				updateMessage(15);
                break;
            case 16: //Guard
				updateMessage(16);
                if(coinCount >= 1){
                    movable = true;
                    gameArea[tilePos] = 10;
					emptyTile(tilePos);
					coinCount = coinCount - 1;
					document.getElementById("coinTab").innerHTML = "Coins: " + coinCount;
					document.getElementById("coin_count").innerHTML = "Coins: " + coinCount;
                }else{
                    movable = false;
                }
				break;
			case 17: //Guard 2
				updateMessage(17);
				if(coinCount >= 5){
					movable = true;
					gameArea[tilePos] = 10;
					emptyTile(tilePos);
					coinCount = coinCount - 5;
					document.getElementById("coinTab").innerHTML = "Coins: " + coinCount;
					document.getElementById("coin_count").innerHTML = "Coins: " + coinCount;
				}else{
					movable = false;
				}
				break;
			case 18: // Bag
				updateMessage(18);
				gotPenguin = true;
				movable = true;
				gameArea[tilePos] = 10;
				emptyTile(tilePos);
				moveBaddie(0,0);
				break;
			case 19: // Penguin-home
				updateMessage(19);	
				if(gotPenguin == true){
					movable = true;
					document.getElementById("baddie").style.visibility = "hidden";
					finishedMission1 = true;
					setTimeout(baddieWorking, 3000);
					moveBaddie(0, 1);
				}else{
					movable = false;
				}
				break;
			case 20: // Blue planet
				if(finishedMission1 == true){
					movable = true;
					level = 20;
					backdrop = "agate";
					updateTiles(level);
					console.log("In the tardis! gameArea[titlePos]: " + gameArea[tilePos] + ". Should be: 13")
					console.log("Class: " + baddie.classList);
					console.log("Level: " + level);
				}else{
					movable = false;
					updateMessage(20);
				}
				break;
			case 21: // Orange planet
				if(finishedMission1 == true && finishedMission2 == true){
					movable = true;
					level = 30; 
				}else{
					updateMessage(21);
					movable = false;

				}
				break;
			case 22: // Exit
				movable = true;
				backdrop = "grass";
				level = level + 1;
				updateTiles(level);
				break;
			case 24: //Vortex2
				movable = true;
                level = level - 2;
				updateTiles(level);
				updateMessage(15);
				break;
			case 25: //Phone
				movable = true;
				updateMessage(25);
				gameArea[tilePos] = 10;
				emptyTile(tilePos);
				break;
			default:
				// Tile was impassible - collided, do not move baddie
				console.log("Oh no, baddie collided with the wall");
				movable = false;
		}

		return movable;
		
	};
	var baddieWorking = function(){
		document.getElementById("baddie").style.visibility = "visible";
		gotPenguin = false;
	}
	var firstMessage = true;
	var updateMessage = function(tileNr) {
		var addition = "";
		switch(tileNr){
			case 15: //Vortex
				addition = "<img id='doctorWho' class='profile-pic'>: <em>Going back in time.</em>";
				break;
			case 16: //guard
				addition = "<img id='guard' class='profile-pic'><p class='chat'>:<em> Entrance is 12 coins.</em></p>";
				if(coinCount >= 15){
					addition += "<br>" + "<img id='guard' class='profile-pic'>: <em>Thanks.</em>";
                }
				break;
			case 17: //guard 2
				addition = "<img id='guard2' class='profile-pic'>: <em>Entrance is 5 coins.</em>";
				if(coinCount >= 100){
					addition += "<br>" + "<img id='guard2' class='profile-pic'>: <em>Thanks.</em>";
				}
				break;
			case 18: //penguin
				addition = "<img id='doctorWho' class='profile-pic'>: <em>Bag picked up!</em>";
				break;
			case 19: //Work
				if(gotPenguin == true){
					addition = "<img id='doctorWho' class='profile-pic'>: <em>Working!</em>";
				}else{
					addition = "<img id='doctorWho' class='profile-pic'>: <em>I don't have the right uniform!</em>";
				} 
				break;
			case 20:
				addition = "<img id='doctorWho' class='profile-pic'>: <em>I have to comeplete mission 1 first!</em>";
				break;
			case 21:
				addition = "<img id='doctorWho' class='profile-pic'>: <em>I have to complete mission 1 and 2 first!</em>";
				break;
			case 25:
				if(level == 0){
					addition = "<img id='phone' class='profile-pic'>: Complete one mission on each planet.";
				}else if(level == 2){
					addition = "<img id='phone' class='profile-pic'>: Get your uniform and go to work.";
				}else if(level == 20){
					addition = "<img id='phone' class='profile-pic'>: Mission 2 is not yet available.";
				}
				break;
			default: 
				console.log("No message");
				break;
		}
		if(messageViewOpen == false){
			//unRead = unRead + 1;
			//document.getElementById("messageTab").innerHTML = "Messages (" + unRead + ")";
			unRead = 0;
		}else{
			unRead = 0;
		}
		console.log("Firstmessage: " + firstMessage);
		if(firstMessage == true){
			document.getElementById("message").innerHTML = addition + "<br>";
			firstMessage = false;
		}else{
			document.getElementById("message").innerHTML += addition + "<br>";
		}
		messageView.scrollTop = messageView.scrollHeight - messageView.clientHeight;
		popMessage(addition);
	}

	var popMessage = function(message){
		console.log("In popMessage function")
		console.log("Messge: " + message);
		var popUp = document.createElement('div');
		var parent = document.getElementById("content");
		popUp.id = "popMessage";
		popUp.className = "popMessage";
		popUp.innerHTML = message;
		parent.appendChild(popUp);
		setTimeout(removePopMessage, 2000);
	}
	var removePopMessage = function(){
		document.getElementById("content").removeChild(document.getElementById("popMessage"));
	}

	/**
	 * Changes position variables for baddie and style to draw the change out on the screen
	 * @param  {[type]} x	- direction to move horizontally
	 * @param  {[type]} y	- direction to move vertically
	 */
	var moveBaddie = function(x, y) {
		if(backdrop == "space"){
			baddie.className = "baddieTardis";
		}else if(backdrop == "grass" && person === "anna" && gotPenguin == false){
			baddie.className = "baddieAnna";
		}else if(backdrop == "grass" && person === "anna" && gotPenguin == true){
			baddie.className = "baddieAnnaWork";
		}else if(backdrop == "grass" && person === "sebastian" && gotPenguin == false){
			baddie.className = "baddieSebastian";
		}else if(backdrop == "grass" && person === "sebastian" && gotPenguin == true){
			baddie.className = "baddieSebastianWork";
		}else{
			baddie.className = "baddieAnna";
		}
		console.log("Person3: " + person);
		// Update baddies position variables
		posLeft += x;
		posTop += y;
		// Assigning left and right to the pixel positions inside the area that the baddie is moving to
		// x and y are the grid coordinates. tile tileSize is used to get the pixels
		left = posLeft*tileSize;
		top = posTop*tileSize;
		// To actually visually move baddie we need to change left and top in style as pixels
		baddie.style.left = left + "px";
		baddie.style.top = top + "px";
	};

	/**
	 * Switches two tiles and updates their classes to redraw them
	 * @param  {int} current	- array position of the tile to move
	 * @param  {int} next		- array position to move tile to
	 */

	var moveTile = function(current, next) {
		var tile = gameArea[current];
		// Switching the tiles
		// Placing tile into the next positon in the array gameArea
		// Then making sure the current tile is empty in the array gameArea
        gameArea[next] = tile; 
        tile = 12;
        gameArea[current] = 10;
		// Giving the tiles new classnames to redraw them
		if (backdrop === "grass"){
                document.getElementById("n" + next).className = "tile g" + tile; // box tile here
                document.getElementById("n" + current).className = "tile g" + 10; // current tile will be empty
		}
		else if (backdrop === "space"){
                document.getElementById("n" + next).className = "tile s" + tile; // box tile here
                document.getElementById("n" + current).className = "tile s" + 10; // current tile will be empty
		}
		else if (backdrop === "agate"){
			document.getElementById("n" + next).className = "tile a" + tile; // box tile here
			document.getElementById("n" + current).className = "tile a" + 10; // current tile will be empty
	}
	};
	var emptyTile = function(current){
        var tile = gameArea[current];
        tile = 14;
        gameArea[current] = 10;
        
		if (backdrop === "grass"){
                document.getElementById("n" + current).className = "tile g" + 10; // current tile will be empty
		}
		else if (backdrop === "space"){
                document.getElementById("n" + current).className = "tile s" + 10; // current tile will be empty
		}
		else if (backdrop === "agate"){
			document.getElementById("n" + current).className = "tile a" + 10; // current tile will be empty
		}
	};
    var updateTiles = function(level){
        var currentLevel = [];
        switch(level) {
            case 0:
                currentLevel = level0;
                backdrop = "grass";
                break;
            case 1:
                currentLevel = level1;
                break;
            case 2:
                currentLevel = level2;
                break;
            case 3:
                currentLevel = level3;
                break;
            case 4:
                currentLevel = level4;
                break;
            case 5:
                currentLevel = level5;
				break;
			case 6:
                currentLevel = level6;
				break;
			case 7:
				currentLevel = level7;
				break;
			case 8:
				currentLevel = level8;
				break;
			case 9:
				currentLevel = level9;
				break;
			case 20:
				currentLevel = level20;
				break;
			default:
				break;
		}
		//Redrawing the gameArea with the new level
        for(var i = 0; i < gameArea.length; i++){
            gameArea[i] = currentLevel[i];
            // emptyTile(i);            
            if (backdrop === "grass"){
				document.getElementById("n" + i).className = "tile g" + currentLevel[i]; // current tile will be empty
            }
            else if (backdrop === "space"){
				document.getElementById("n" + i).className = "tile s" + currentLevel[i]; // current tile will be empty
			}
			else if (backdrop === "agate"){
				document.getElementById("n" + i).className = "tile a" + currentLevel[i]; // current tile will be empty
            }
        }
    };
	/** Turn baddie image right or left - transform handled in style.css */
	
	function turnRight() {
		if (backdrop == "space") {
			baddie.classList.remove("baddie-point-left");
			baddie.classList.add("baddie-point-right");
		}else{
			baddie.classList.remove("baddie-left");
			baddie.classList.add("baddie-right");
		}
	}
	function turnLeft() {
		if (backdrop == "space") {
			baddie.classList.remove("baddie-point-right");
			baddie.classList.add("baddie-point-left");
		}else{
			baddie.classList.remove("baddie-right");
			baddie.classList.add("baddie-left");
		}
	}
	function turnUp() {
		if(backdrop == "space"){
			baddie.classList.remove("baddie-down");
			baddie.classList.add("baddie-up");
		}
	}
	function turnDown() {
		if(backdrop == "space"){
			console.log("turning down")
			baddie.classList.remove("baddie-up");
			baddie.classList.add("baddie-down");
		}
	}

	/* ---- Run code ---- */
	init();
})();

