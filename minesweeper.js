var ct = document.getElementById("cnt");

function main(arr){
	var tab = document.createElement("table");
	var tr = document.createElement("tr");
	var tab = document.createElement("table");
	arr.forEach(function(trs, tri){
       var tr = document.createElement("tr");
       trs.forEach(function(td, tdi){
       		var td = document.createElement("td");
       		var bt = document.createElement("button");
       		bt.id = tri + " " + tdi;
       		bt.innerText = " ";
       		td.appendChild(bt);
       		tr.appendChild(td);
       });
       tab.appendChild(tr);
	})
	ct.appendChild(tab);
	addClickList(arr);
}

function addClickList(arr){
   var onCntClick = function(e){
   		if(e.target.nodeName === "BUTTON"){
   			var bt = e.target;
   			if(bt.dataset.flagged === "true") return;

   			var x = +bt.id.split(" ")[0];
   			var y = +bt.id.split(" ")[1];
   			if(arr[x][y] === "*"){
   				document.getElementById("gameoverdiv").style.display = "block";
				arr.forEach(function(trs,x){
					trs.forEach(function(td,y){
						if(td === "*"){
							document.getElementById(x + " " + y).innerText = "*";
						}
					});
				});				
   			} else {
   				var ct = getNeighboutCt(arr, x,y);
   				bt.innerText = ct;
   			}
   		}
   };

   cnt.onclick = onCntClick;

   //for mobile devices
   cnt.addEventListener('long-press', onCntClick);

   cnt.oncontextmenu = function(e){
   		if(e.target.nodeName === "BUTTON"){
   			var bt = e.target;
   			if(bt.dataset.flagged === "true"){
   				bt.dataset.flagged = "false";
   				bt.innerText = " ";
   			} else {
   			    bt.dataset.flagged = "true";
   				bt.innerText = "F";
   				if(checkIfAllFlagged(arr)){
   					document.getElementById("gamewondiv").style.display = "block";
   				}
   			}
   			e.preventDefault();
   		}
   	};
}

function checkIfAllFlagged(arr){
	var X = arr.length, Y = arr[0].length;
	for(var i = 0;i < X ;i++){
		for(var j = 0; j < Y; j++){
			if(arr[i][j] === "*" && document.getElementById(i + " " + j).dataset.flagged !== "true"){
				return false;
			}
		}
	}
	return true;
}

function getNeighboutCt(arr, x, y){
	var ct = 0;
   				if(arr[x-1] && arr[x-1][y] === "*") ct++;
   				if(arr[x] && arr[x][y-1] === "*") ct++;
   				if(arr[x+1] && arr[x+1][y] === "*") ct++;
   				if(arr[x] && arr[x][y+1] === "*") ct++;
   	return ct;
}

function fillMines(arr,per){
   var X = arr.length;
   var Y = arr[0].length;
   var len = X * Y;
   var ntf = len*(per/100);
   while(ntf > 0 ){
   	  var x = Math.floor(Math.random() * (X -1) ) ;
   	  var y = Math.floor(Math.random() * (Y-1) ) ;
   	  var ct = getNeighboutCt(arr,x,y);
   	  if(ct < 3){
   	  	  ntf -- ;
   	  	  arr[x][y] = "*";
   	  }
   }
}

setTimeout(function(){
	var dataMap = dataMapOld;
	fillMines(dataMap, 1);
	console.log("generated map\n", dataMap);
	main(dataMap);
},1);

var dataMapOld = [
	[" "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "],
	[" "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "],
	[" "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "],
	[" "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "],
	[" "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "],
	[" "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "],
	[" "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "],
	[" "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "],
	[" "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "],
	// [" "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "],
	// [" "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "],
	// [" "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "],
	// [" "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "],
	// [" "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "],
];