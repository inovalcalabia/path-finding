

path =  function(c,x,y,size,color)
{
	c.beginPath();
	c.arc(x,y,size,0,2*Math.PI);
	c.fillStyle = color;
    c.fill();
    this.passable = true;
    this.checked = false;

    this.changeColor = function(color)
    {
    	c.beginPath();
		c.arc(x,y,size,0,2*Math.PI);
		c.fillStyle = color;
	    c.fill();
	    if(color == 'orange' || color == 'red' || color == 'blue'){
	    	this.checked = true;
	    }
    }
   	this.changePosition = function(_x,_y)
   	{
   		c.beginPath();
		c.arc(_x,_y,size,0,2*Math.PI);
		c.fillStyle = color;
	    c.fill();
   	}
   	this.changeSize = function(_size)
   	{
   		c.beginPath();
		c.arc(x,y,_size,0,2*Math.PI);
		c.fillStyle = color;
	    c.fill();
   	}
    this.redraw = function()
    {
    	c.beginPath();
		c.arc(x,y,size,0,2*Math.PI);
		c.fillStyle = color;
	    c.fill();
    }
    this.changeToUnpassable = function()
    {
    	c.beginPath();
		c.arc(x,y,size,0,2*Math.PI);
		c.fillStyle = 'black';
	    c.fill();
	    this.passable = false;
    }
    this.clear = function()
    {
    	ctx.clearRect(x-size, y-size,size *2  ,size *2);
    }

}


