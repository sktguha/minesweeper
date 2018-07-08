var PERCENTAGE = Number(localStorage['per']);
if(!Number.isInteger(PERCENTAGE) || PERCENTAGE < 0 || PERCENTAGE > 100){
	PERCENTAGE = 30;
}
document.getElementById("custPer").innerText += ". Curr : " + PERCENTAGE;

var ct = document.getElementById("cnt");

function setPer(per){
	if(!window.confirm("set percentage to " + per + " and reload ??"))
		return;
	
	localStorage['per'] = per;
	window.location.reload();
}

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
   				document.getElementById("gameoverdiv").style.display = "inline-block";
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
   			}
   			if(checkIfAllFlaggedProperly(arr)){
   				document.getElementById("gamewondiv").style.display = "inline-block";
   			}
   			e.preventDefault();
   		}
   	};
}

function checkIfAllFlaggedProperly(arr){
	var X = arr.length, Y = arr[0].length;
	for(var i = 0;i < X ;i++){
		for(var j = 0; j < Y; j++){
			var dataStar = arr[i][j] === "*";
			var btFlagged = document.getElementById(i + " " + j).dataset.flagged === "true"; 
			if((dataStar && !btFlagged) || (btFlagged && !dataStar)){
				return false;
			} 
		}
	}
	return true;
}

function getNeighboutCt(arr, x, y){
	var indexes = [
		[x-1,y-1],
		[x-1,y],
		[x-1,y+1],
		[x,y-1],
		// [x,y],
		[x,y+1],
		[x+1, y-1],
		[x+1, y],
		[x+1, y+1]
	];

	var ct = indexes.filter(function(idx){
		return arr[idx[0]] && arr[idx[0]][idx[1]] === "*";
	}).length;
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
	fillMines(dataMap, PERCENTAGE);
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