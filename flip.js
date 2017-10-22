const MIN_SZ = 3;
const MAX_SZ = 9;
const PERC_OF_SQR = 75.0;
var COLOR = ["#FFFFFF", "#000000"];
var CELL = 90.0;
var LFT = 99.0 - CELL;
var curSz = 3;
var curArray;

var gamearray;

function movefunction(n) {
	var z = 3*n*n;
	//var z = 2;
	if (z%2 == 0) z++;
	return z;
}

function randint(n) { /* return random number between [0,n) */
	return Math.floor(Math.random() * n);
}

function create2d(n) {
	var array = new Array(n);
	for (var i = 0; i < n; i++) {
		array[i] = new Array(n);
		for (var j = 0; j < n; j++) {
			array[i][j] = 0;
		}
	}
	return array;
}

function move(array, x, y) {
	for (var i = 0; i < array.length; i++) {
		array[x][i] = 1 - array[x][i];
		array[i][y] = 1 - array[i][y];
	}
	array[x][y] = 1 - array[x][y];
}

function generate(n) {
	var array = create2d(n);
	var moves = movefunction(n);

	for (var i = 0; i < moves; i++) {
		var px = randint(n), py = randint(n);
		move(array, px, py); 
	}

	return array;
}

function go() {
	var elem = document.getElementById("controls"); elem.innerHTML = "";
	for (var i = MIN_SZ; i <= MAX_SZ; i++) {
		if (i == curSz) {
			elem.innerHTML += "<a href = '#' class = 'small-button current' onclick = 'new_game("+i+")'><span id = 'link'>"+i+"</span></a>";
		} else {
			elem.innerHTML += "<a href = '#' class = 'small-button' onclick = 'new_game("+i+")'><span id = 'link'>"+i+"</span></a>";
		}
	}	
}

function process() {
	new_game(curSz);
}

function getid(x, y) {
	return "cell"+x+"x"+y;
}

function show(x, y) {
	document.getElementById(getid(x,y)).innerHTML = gamearray[x][y];
}

function new_game(n) {
	curSz = n; go(); curScore = 0; var elem = document.getElementById("gamespace");	

	gamearray = generate(n);

	elem.innerHTML = "";

	curArray = gamearray;			

	var str = "<table id = 'gametable'>";

	for (var i = 0; i < n; i++) {
		str += "<tr>";
		for (var j = 0; j < n; j++) {
			str += "<td id = 'td"+getid(i,j)+"'><div id = '"+getid(i,j)+"' class = 'flipper' onclick = 'domove("+i+","+j+")'></div></td>";
		}
		str += "</tr>";
	}

	str += "</table>"; elem.innerHTML = str;

	for (var i = 0; i < n; i++) {
		for (var j = 0; j < n; j++) {
			var elem = document.getElementById("td"+getid(i,j));
			var perc = (CELL)/n;
			elem.style.height = "" + perc + "%";
			elem.style.width  = "" + perc + "%";
			elem.style["padding-top"] = "" + (LFT/n) + "%";
			elem.style["padding-left"] = "" + (LFT/n) + "%";
		}
	}
		

	for (var i = 0; i < n; i++) {
		for (var j = 0; j < n; j++) {
			
			var t = gamearray[i][j], cl = "color"+t;
			var elem = document.getElementById(getid(i,j));
			elem.classList.add(cl);

			//show(i,j);
		}
	}
}


function domove(x, y) {
	
	n = gamearray.length;

	for (var i = 0; i < n; i++) {
		var elem1 = document.getElementById(getid(x,i));
		var elem2 = document.getElementById(getid(i,y));
		var curc1 = 'color' + gamearray[x][i];
		var curc2 = 'color' + gamearray[i][y];
		if (elem1.classList.contains(curc1)) {
			elem1.classList.remove(curc1);
		}
		if (elem2.classList.contains(curc2)) {
			elem2.classList.remove(curc2);
		}
		
	}

	move(gamearray, x,y);

	for (var i = 0; i < n; i++) {

		var elem1 = document.getElementById(getid(x,i));
		var elem2 = document.getElementById(getid(i,y));
		var curc1 = 'color' + gamearray[x][i];
		var curc2 = 'color' + gamearray[i][y];
		if (!elem1.classList.contains(curc1)) {
			elem1.classList.add(curc1);
		}
		if (!elem2.classList.contains(curc2)) {
			elem2.classList.add(curc2);
		}

		//show(x,i); show(i,y);
		
	}

	checkdone();
		
}

function checkdone() {
	var n = gamearray.length;
	for (var i = 0; i < n; i++) {
		for (var j = 0; j < n; j++) {
			if (gamearray[i][j] == 1) return;
		}
	}
	
	document.getElementById("congrats").style.display = "block";
}	

function off() {
	document.getElementById("congrats").style.display = "none";
	process();
}

function off2() {
	document.getElementById("instructions").style.display = "none";
	process();
}

function off3() {
	document.getElementById("about").style.display = "none";
}


function intro() {
	document.getElementById("instructions").style.display = "block";
}

function about() {
	document.getElementById("about").style.display = "block";
}
