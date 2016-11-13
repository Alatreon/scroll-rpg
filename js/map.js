function Map ()
{
	//Scroll de la map
	this.x=0;
	this.y=0;

	//Propriétés de la map
	this.floorVal=472;
	this.vx=3;
	this.width=2500;

	//Elements de la map
	this.mapObstacles={
		obstacles:[
			{width:32, height:32, x:750, y:400},
			{width:32*3, height:32, x:200, y:500},
			{width:32*3, height:32, x:200, y:200},
			{width:32*3, height:32, x:400, y:350},
			{width:512, height:32, x:1640, y:300},
			{width:128, height:32, x:64*16, y:450},
			{width:32*5, height:32, x:64*20, y:64*5},
			{width:32*2, height:32, x:64*35, y:500},
			{width:32*2, height:32, x:600, y:100}
		]
	};
}
Map.prototype=
{
	setBackground : function ()
	{
		Self.ctx.drawImage(Self.LoadImage.loadedImgList[0], this.x, this.y,Self.c.width,Self.c.height,0,0,Self.c.width,Self.c.height);
	},
	drawMonster : function ()
	{
		for(var i = 0; Self.Partie.partie.monster.length>i; i++)
		{
				Self.ctx.drawImage(
					Self.LoadImage.loadedImgList[4],
					Self.Partie.partie.monster[i].animX,
					Self.Partie.partie.monster[i].animY,
					Self.Partie.partie.monster[i].width,
					Self.Partie.partie.monster[i].height,
					Self.Partie.partie.monster[i].x-Self.Map.x,
					Self.Partie.partie.monster[i].y,
					Self.Partie.partie.monster[i].width,
					Self.Partie.partie.monster[i].height
				);

				Self.Texts.drawMonsterLife();
		}
	},
	right : function () 
	{
		if(Self.Perso.x+Self.Perso.width>Self.c.width/2 && (Self.Perso.x+Self.Map.x) < this.width-Self.Perso.width-(Self.c.width/2))
		{
			this.x += this.vx;

			Self.Perso.x -= Self.Perso.vx;
		}
	},
	left : function () 
	{
		if(Self.Perso.x+Self.Perso.width<Self.c.width/2 && this.x>0)
		{
			this.x -= this.vx;

			Self.Perso.x += Self.Perso.vx;
		}
	},
	createObstacle : function ()
	{
		for(var i=0; i<this.mapObstacles.obstacles.length; i++)
		{
			for(var y=1; y<this.mapObstacles.obstacles[i].width; y+=32)
			{
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