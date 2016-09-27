
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

var gridX = 20;
var gridY = 16;
var circlesX = [];
var circlesY  = [];

var position = {x:0,y:0};
var destination = {x:0,y:0};

var checked = [{x:0,y:0}];
var spacing = 25;
checked.length = 0;


function createGrid()
{
	circlesY = [];
	circlesX = [];
	clear();
	for(i = 0;i<gridX;i++){
		for(j = 0;j<gridY;j++){
			var new_path = new path(ctx,(50 * i)+25,(40 * j) + 25,15,'gray');
			circlesY.push(new_path);
		}
		circlesX.push(circlesY);
		circlesY = [];
	}
	createObstacle();
	setHeroAndTarget();
}
function createObstacle()
{
	for(i = 0;i<120;i++)
	{
		_x = Math.floor(Math.random() * gridX);
		_y = Math.floor(Math.random() * gridY);
		circlesX[_x][_y].clear();
		circlesX[_x][_y].changeToUnpassable();
	}
}
function setHeroAndTarget()
{
	var col = ['blue','red']
	for(i = 0;i<2;i++)
	{
		var randX = Math.floor(Math.random() * gridX);
		var randY = Math.floor(Math.random() * gridY);
		circlesX[randX][randY].clear();
		circlesX[randX][randY].changeColor(col[i]);
		if(i == 0){
			position.x = /*(50 * randX)+25;*/ randX;
			position.y = /*(40 * randY) + 25;*/ randY;
			checked.push({x:randX,y:randY});
		}
		else if(i == 1){
			destination.x = /*(50 * randX)+25;*/ randX;
			destination.y = /*(40 * randY) + 25;*/ randY;
		}
	}
	getSurrounding();
}

function clear()
{
	ctx.clearRect(0, 0,c.width,c.height);
}

function getSurrounding()
{   
	var temp_data = [{x:0,y:0}];
	temp_data.length = 0;
	//left
	if(checkProperty(-1,0)!= undefined)
	{
		temp_data.push({x:getLast().x-1,y:getLast().y})
	}
	//top
	if(checkProperty(0,-1) != undefined)
	{
		temp_data.push({x:getLast().x,y:getLast().y-1})
	}
	//right
	if(checkProperty(+1,0) != undefined)
	{
		temp_data.push({x:getLast().x+1,y:getLast().y})
	}
	//down
	if(checkProperty(0,+1) != undefined)
	{
		temp_data.push({x:getLast().x,y:getLast().y+1})
	}
	//top left
	if(checkProperty(-1,-1)!= undefined)
	{
		temp_data.push({x:getLast().x-1,y:getLast().y-1})
	}
	//top right
	if(checkProperty(+1,-1)!= undefined)
	{
		temp_data.push({x:getLast().x+1,y:getLast().y-1})
	}
	//bottom left
	if(checkProperty(-1,+1)!= undefined)
	{
		temp_data.push({x:getLast().x-1,y:getLast().y+1})
	}
	//bottom right
	if(checkProperty(+1,+1)!= undefined)
	{
		temp_data.push({x:getLast().x+1,y:getLast().y+1})
	}

	var preComputedDistance = [];
	for(i = 0;i<temp_data.length;i++)
	{
		preComputedDistance.push(manhattan(getPixelPosition(temp_data[i].x,temp_data[i].y),getPixelPosition(destination.x,destination.y)));
	}
	circlesX[temp_data[findIndexInArray(getNearest(preComputedDistance),preComputedDistance)].x][temp_data[findIndexInArray(getNearest(preComputedDistance),preComputedDistance)].y].clear();
	circlesX[temp_data[findIndexInArray(getNearest(preComputedDistance),preComputedDistance)].x][temp_data[findIndexInArray(getNearest(preComputedDistance),preComputedDistance)].y].changeColor('orange');
	checked.push({x:temp_data[findIndexInArray(getNearest(preComputedDistance),preComputedDistance)].x,y:temp_data[findIndexInArray(getNearest(preComputedDistance),preComputedDistance)].y});
	if(getNearest(preComputedDistance) > 55){
		setTimeout(getSurrounding, 100);
	}
	else{
		checked.length = 0;
		//createGrid();
	}

}
function checkProperty(_x,_y)
{
	total_x = getLast().x + _x;
	total_y = getLast().y + _y;
	if(total_x > gridX-1 || total_y > gridY-1 || total_x < 0 || total_y < 0){
		return undefined;
	}
	else{
		if(circlesX[getLast().x + _x][getLast().y + _y].passable == true && circlesX[getLast().x + _x][getLast().y + _y].checked == false){
			return circlesX[getLast().x + _x][getLast().y + _y]; 
		}
		else{
			return undefined;	
		}
	}
}
function getPixelPosition(x,y)
{
	return {x:(50 * x)+25,y:(40 * y) + 25};
}
function getLast()
{
	return checked[checked.length-1]
}
function manhattan(p1,p2) {
	return Math.abs(p1.x-p2.x)+Math.abs(p1.y-p2.y);
}
function getNearest(array)
{
	selectedArr = array[0];
	for (i=0; i<array.length; i++) {
		if (array[i]<selectedArr) {
			selectedArr = array[i];
		}
	}
	return selectedArr;
}
function findIndexInArray(value, array)
{
	var index = 0;
	for(i = 0;i<array.length;i++)
	{
		if(value == array[i])
		{
			index = i;
			i = array.length
		}
	}
	return index;
}