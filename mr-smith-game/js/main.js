

//baddie is the moving character

(function(){
	'use strict';
	// HTML elements
	var baddie, content;
	// Numbers
	var tileSize, gridSize, left, top, posLeft, posTop;
	// Arrays
	var gameArea;
	// Get HTML elements that are to be used
	baddie = document.getElementById("baddie");
	content = document.getElementById("content");
	// Size of each tile
	tileSize = 32;
	// Number of tiles per row
	gridSize = 10;
	// Sets content size to match tilesize and gridsize
	content.style.width = content.style.height = gridSize*tileSize + "px";
	// Gets starting position of baddie
	left = baddie.offsetLeft;
	top = baddie.offsetTop;
	// Starting position of baddie in the grid
	posLeft = 0;
	posTop = 0;

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

	gameArea = [
		11,11,11,11,11,11,11,11,11,11,
		11,10,10,10,10,12,10,10,13,11,
		11,10,10,10,10,12,10,10,10,11,
		11,10,14,10,10,12,10,10,10,11,
		11,10,10,10,10,12,12,12,12,11,
		11,10,10,10,10,10,10,10,10,11,
		11,10,10,10,10,10,10,10,10,11,
		11,10,10,14,10,10,10,10,10,11,
		11,10,10,10,10,10,10,10,10,11,
		11,11,11,11,11,11,11,11,11,11,
		];
    var level0 = [
		11,11,11,11,11,11,11,11,11,11,
		11,10,10,10,10,12,10,10,13,11,
		11,10,10,10,10,12,10,10,10,11,
		11,10,14,10,10,12,10,10,10,11,
		11,10,10,10,10,12,12,12,12,11,
		11,10,10,10,10,10,10,10,10,11,
		11,10,10,10,10,10,10,10,10,11,
		11,10,10,14,10,10,10,10,10,11,
		11,10,10,10,10,10,10,10,10,11,
		11,11,11,11,11,11,11,11,11,11,
		];
    
    var level1 = [
		11,11,11,11,11,11,11,11,11,11,
		11,10,10,10,10,10,10,10,10,11,
		11,10,10,10,10,10,10,10,10,11,
		11,10,14,12,10,14,12,10,10,11,
		11,10,12,10,10,14,12,10,12,11,
		11,10,10,10,10,10,10,10,10,11,
		11,10,13,10,10,10,10,10,10,11,
		11,10,10,14,10,12,10,12,10,11,
		11,10,10,10,10,10,10,10,10,11,
		11,11,11,11,11,11,11,11,11,11,
		];
    
    var level2 = [
		11,11,11,11,11,11,11,11,11,11,
		11,14,10,10,10,10,10,10,14,11,
		11,10,10,10,13,10,10,10,10,11,
		11,10,10,10,10,10,10,10,10,11,
		11,10,10,10,10,10,10,10,10,11,
		11,10,10,10,10,10,12,10,10,11,
		11,10,10,10,10,10,10,10,10,11,
		11,10,10,10,10,12,12,12,10,11,
		11,14,10,10,10,10,10,10,14,11,
		11,11,11,11,11,11,11,11,11,11,
		];
    
    var level3 = [
		11,11,11,11,11,11,11,11,11,11,
		11,14,10,12,10,10,10,10,14,11,
		11,10,10,12,10,10,10,10,10,11,
		11,10,10,12,10,10,10,10,10,11,
		11,12,12,12,10,10,10,10,10,11,
		11,10,10,10,10,10,12,10,10,11,
		11,10,10,10,10,10,10,13,10,11,
		11,10,10,10,10,12,12,12,10,11,
		11,10,10,10,10,10,10,10,10,11,
		11,11,11,11,11,11,11,11,11,11,
		];
    
    var level4 = [
		11,11,11,11,11,11,11,11,11,11,
		11,15,10,10,10,10,10,10,10,11,
		11,10,10,10,10,10,10,10,10,11,
		11,10,10,10,10,10,10,10,10,11,
		11,10,10,10,10,10,10,10,10,11,
		11,10,10,10,10,10,10,10,10,11,
		11,11,16,11,10,10,10,10,10,11,
		11,10,10,11,10,10,10,10,10,11,
		11,13,10,11,10,10,10,10,10,11,
		11,11,11,11,11,11,11,11,11,11,
		];
    
    var level5 = [
		11,11,11,11,11,11,11,11,11,11,
		11,13,14,14,14,14,14,14,14,11,
		11,14,14,14,14,14,14,14,14,11,
		11,14,14,14,14,14,14,14,14,11,
		11,14,14,14,14,14,14,14,14,11,
		11,14,14,14,14,14,14,14,14,11,
		11,14,14,14,14,14,14,14,14,11,
		11,14,14,14,14,14,14,14,14,11,
		11,14,14,14,14,14,14,14,14,11,
		11,11,11,11,11,11,11,11,11,11,
		];

	var level6 = [
		11,11,11,11,11,11,11,11,11,11,
		11,10,10,10,10,10,10,10,10,11,
		11,10,10,10,10,10,10,10,10,11,
		11,10,10,10,10,10,10,10,10,11,
		11,10,10,10,10,10,10,10,10,11,
		11,10,10,10,10,10,10,10,10,11,
		11,10,13,10,10,10,10,10,10,11,
		11,10,10,10,10,10,10,10,10,11,
		11,14,10,10,10,10,10,10,14,11,
		11,11,11,11,11,11,11,11,11,11,
		];

	var level7 = [
		11,11,11,11,11,11,11,11,11,11,
		11,15,10,10,10,11,10,10,10,11,
		11,10,10,10,10,11,10,10,10,11,
		11,10,10,10,10,17,10,10,10,11,
		11,14,10,10,10,11,13,10,10,11,
		11,10,10,10,10,11,10,10,18,11,
		11,10,10,10,10,11,10,10,10,11,
		11,10,10,14,10,11,10,10,10,11,
		11,14,10,10,10,11,10,10,14,11,
		11,11,11,11,11,11,11,11,11,11,
		];

	var level8 = [
		11,11,11,11,11,11,11,11,11,11,
		11,10,10,10,10,10,10,10,10,11,
		11,10,19,10,10,10,10,10,10,11,
		11,10,10,10,10,10,10,10,10,11,
		11,10,10,10,10,10,10,10,10,11,
		11,10,10,10,10,10,10,10,10,11,
		11,10,10,10,10,10,10,10,10,11,
		11,10,10,10,10,10,10,10,15,11,
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
			tile.className = "tile t" + tileFromArray;
			// Adding ID to tile
			tile.id = "n" + i;
			// Append tile to the content
			content.appendChild(tile);
		}
	};
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
                }
	});
	document.getElementById("arrowDown").addEventListener("click", function(){ 
                if(isBaddieMovable(0, 1)) {
                    // Go down - Use moveBaddie-function
                    moveBaddie(0, 1);
                }
	});
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
/* ----- Swipe functionality ----- */	
// TOUCH-EVENTS SINGLE-FINGER SWIPE-SENSING JAVASCRIPT		
	// this script can be used with one or more page elements to perform actions based on them being swiped with a single finger
	var triggerElementID = null; // this variable is used to identity the triggering element
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
	
	// The 4 Touch Event Handlers
	
	// NOTE: the touchStart handler should also receive the ID of the triggering element
	// make sure its ID is passed in the event call placed in the element declaration, like:
	// <div id="picture-frame" ontouchstart="touchStart(event,'picture-frame');"  ontouchend="touchEnd(event);" ontouchmove="touchMove(event);" ontouchcancel="touchCancel(event);">

	function touchStart(event,passedName) {
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
			triggerElementID = passedName;
		} else {
			// more than one finger touched so cancel
			touchCancel(event);
		}
	}

	function touchMove(event) {
		event.preventDefault();
		if ( event.touches.length == 1 ) {
			curX = event.touches[0].pageX;
			curY = event.touches[0].pageY;
		} else {
			touchCancel(event);
		}
	}
	
	function touchEnd(event) {
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
	}

	function touchCancel(event) {
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
		triggerElementID = null;
	}
	
	function caluculateAngle() {
		var X = startX-curX;
		var Y = curY-startY;
		var Z = Math.round(Math.sqrt(Math.pow(X,2)+Math.pow(Y,2))); //the distance - rounded - in pixels
		var r = Math.atan2(Y,X); //angle in radians (Cartesian system)
		swipeAngle = Math.round(r*180/Math.PI); //angle in degrees
		if ( swipeAngle < 0 ) { swipeAngle =  360 - Math.abs(swipeAngle); }
	}
	
	function determineSwipeDirection() {
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
	}
	
	function processingRoutine() {
		var swipedElement = document.getElementById(triggerElementID);
		if ( swipeDirection == 'left' ) {
			// REPLACE WITH YOUR ROUTINES
			swipedElement.style.backgroundColor = 'orange';
		} else if ( swipeDirection == 'right' ) {
			// REPLACE WITH YOUR ROUTINES
			swipedElement.style.backgroundColor = 'green';
		} else if ( swipeDirection == 'up' ) {
			// REPLACE WITH YOUR ROUTINES
			swipedElement.style.backgroundColor = 'maroon';
		} else if ( swipeDirection == 'down' ) {
			// REPLACE WITH YOUR ROUTINES
			swipedElement.style.backgroundColor = 'purple';
		}
	}


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
	var space = false;
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
				movable = true;
				if(space === false){space = true;}
				else{space = false;}
				level = level + 1;
				updateTiles(level);
				console.log("In the tardis! gameArea[titlePos]: " + gameArea[tilePos] + ". Should be: 13")
				console.log("Class: " + baddie.classList);
				console.log("Level: " + level);
				break;
			case 14: // Coin - pick up
			    coinCount = coinCount + 1;
				document.getElementById("coin_count").innerHTML = "Coins: " + coinCount;
			    movable = true;
			    console.log("Picked up coin/gem. coinCount: " + coinCount);
			    gameArea[tilePos] = 10;
			    emptyTile(tilePos);
			    break;
            case 15: //Vortex
                level = 0;
				updateTiles(level);
				document.getElementById("message").innerHTML += "<br><em>Going back in time.</em>";
                break;
            case 16: //Guard
				document.getElementById("message").innerHTML += "<br><img class='guard'>: <em>Entrance is 15 coins.</em>";
                if(coinCount >= 15){
                    movable = true;
                    gameArea[tilePos] = 10;
					emptyTile(tilePos);
					coinCount = coinCount - 15;
					document.getElementById("coin_count").innerHTML = "Coins: " + coinCount;
					document.getElementById("message").innerHTML += "<br><img class='guard'>: <em>Thanks.</em>";
                }else{
                    movable = false;
                }
				break;
			case 17: //Guard 2
				document.getElementById("message").innerHTML += "<br><img class='guard2'>: <em>Entrance is 100 coins.</em>";
				if(coinCount >= 100){
					movable = true;
					gameArea[tilePos] = 10;
					emptyTile(tilePos);
					coinCount = coinCount - 100;
					document.getElementById("coin_count").innerHTML = "Coins: " + coinCount;
					document.getElementById("message").innerHTML += "<br><img class='guard2'>: <em>Thanks.</em>";
				}else{
					movable = false;
				}
				break;
			case 18: // Penguin
				document.getElementById("message").innerHTML += "<br><em>Penguin picked up!</em>";
				gotPenguin = true;
				movable = true;
				gameArea[tilePos] = 10;
				emptyTile(tilePos);
				break;
			case 19: // Penguin-home
				if(gotPenguin == true){
					document.getElementById("message").innerHTML += "<br><em>Penguin returned!</em>";
					$(".t19").removeClass("t19").addClass("t18");
					document.getElementById("message").innerHTML += "<br><img class='penguin'>:Thank you!!</em>";
				}else{
					document.getElementById("message").innerHTML += "<br><em>You don't have the penguin!</em>";
				}
				break;
			default:
				// Tile was impassible - collided, do not move baddie
				console.log("Oh no, baddie collided with the wall");
				movable = false;
		}

		return movable;
		
	};
	
	/**
	 * Changes position variables for baddie and style to draw the change out on the screen
	 * @param  {[type]} x	- direction to move horizontally
	 * @param  {[type]} y	- direction to move vertically
	 */
	var moveBaddie = function(x, y) {
		if(space == true){
			baddie.className = "baddieTardis";
		}else{
			baddie.className = "baddieDoctorWho";
		}
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
		if (space === false){
                document.getElementById("n" + next).className = "tile t" + tile; // box tile here
                document.getElementById("n" + current).className = "tile t" + 10; // current tile will be empty
		}
		else if (space === true){
                document.getElementById("n" + next).className = "tile ti" + tile; // box tile here
                document.getElementById("n" + current).className = "tile ti" + 10; // current tile will be empty
		}
	};
	var emptyTile = function(current){
        var tile = gameArea[current];
        tile = 14;
        gameArea[current] = 10;
        
		if (space === false){
                document.getElementById("n" + current).className = "tile t" + 10; // current tile will be empty
		}
		else if (space === true){
                document.getElementById("n" + current).className = "tile ti" + 10; // current tile will be empty
		}
	};
    var updateTiles = function(level){
        var currentLevel = [];
        switch(level) {
            case 0:
                currentLevel = level0;
                space = false;
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
			default:
				break;
		}
		//Redrawing the gameArea with the new level
        for(var i = 0; i < gameArea.length; i++){
            gameArea[i] = currentLevel[i];
            // emptyTile(i);            
            if (space === false){
				document.getElementById("n" + i).className = "tile t" + currentLevel[i]; // current tile will be empty
            }
            else if (space === true){
				document.getElementById("n" + i).className = "tile ti" + currentLevel[i]; // current tile will be empty
            }
        }
    };
	/** Turn baddie image right or left - transform handled in style.css */
	
	function turnRight() {
		baddie.classList.remove("baddie-left");
		baddie.classList.add("baddie-right");
	}
	function turnLeft() {
		baddie.classList.remove("baddie-right");
		baddie.classList.add("baddie-left");
	}

	/* ---- Run code ---- */
	init();
})();
