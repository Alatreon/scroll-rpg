function Map ()
{
	this.floorVal=472;
	this.x=0;
	this.y=0;
	this.backgroundLenght;
	this.vx=3;
	this.width=2500;
	this.mapObstacles={
		obstacles:[
			{width:32, height:32, x:500, y:400},
			{width:32*3, height:32, x:200, y:300},
			{width:512, height:32, x:1640, y:300},
			{width:128, height:32, x:64*40, y:64*7},
			{width:32*5, height:32, x:64*20, y:64*5},
			{width:32*2, height:32, x:64*35, y:200},
			{width:32*2, height:32, x:600, y:100}
		]
	};
}
Map.prototype=
{
	setBackground : function ()
	{
		Self.ctx.drawImage(Self.LoadImage.loadedImgList[0],this.x,this.y,Self.c.width,Self.c.height,0,0,Self.c.width,Self.c.height);
	},
	left : function () 
	{
		if(Self.Perso.x+Self.Perso.width>Self.c.width/2 && (Self.Perso.x+Self.Map.x) < this.width )
		{
			this.x += this.vx;

			Self.Perso.x -= Self.Perso.vx;
		}
	},
	right : function () 
	{
		if(Self.Perso.x+Self.Perso.width<Self.c.width/2 && this.x>0)
		{
			this.x -= this.vx;

			Self.Perso.x += Self.Perso.vx;
		}
	},
	createObstacle : function ()
	{
		for(var i=0; i<this.mapObstacles.obstacles.length; i++){
			for(var y=1; y<this.mapObstacles.obstacles[i].width; y+=32){
				Self.ctx.drawImage(
					Self.LoadImage.loadedImgList[2],

					0,0,		
					32,32,
		
					((this.x+(this.mapObstacles.obstacles[i].x*-1))*-1)+y-1,
					this.y+this.mapObstacles.obstacles[i].y,
		
					32,32
				);
			}
		}
	}
}