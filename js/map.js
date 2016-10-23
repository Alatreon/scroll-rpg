function Map ()
{
	//Scroll de la map
	this.x=0;
	this.y=0;

	//Propriétés de la map
	this.floorVal=472;
	this.vx=3;
	this.width=2500;
	this.colBorderX;
	this.colBorderY;

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
		Self.ctx.drawImage(Self.LoadImage.loadedImgList[0],this.x,this.y,Self.c.width,Self.c.height,0,0,Self.c.width,Self.c.height);
	},
	drawMonster : function ()
	{
		console.log(Self.Partie.partie.monster.height);
		// Self.ctx.drawImage(Self.LoadImage.loadedImgList[4],Self.Partie.partie.monster.height,this.y,Self.c.width,Self.c.height,0,0,Self.c.width,Self.c.height);
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
	},
	checkObstacle : function ()
	{
		this.colBorderX=4/*Self.Perso.vx+1*/;
		this.colBorderY=3/*Self.Perso.vy+1*/;
		this.floorVal=472;
		// Self.Perso.JumpSize=2;
		if(!Self.Perso.surUnObstacle || Self.Perso.surUnObstacle && !Self.KeyboardKey.heroMoveJumpBool)
		{
			Self.Perso.surUnObstacle=false;
		}

		Self.Perso.surUnObstacle2=false;
		
		this.unBlockX();

		for(var i=0; i<this.mapObstacles.obstacles.length; i++)
		{
				
			/*Si la collision est a guche de l'obstacle*/
			if (Self.Perso.x + Self.Map.x + Self.Perso.width < this.mapObstacles.obstacles[i].x &&
				Self.Perso.x + Self.Map.x + Self.Perso.width + this.colBorderX > this.mapObstacles.obstacles[i].x &&
				Self.Perso.y < this.mapObstacles.obstacles[i].y + this.mapObstacles.obstacles[i].height &&
				Self.Perso.height + Self.Perso.y > this.mapObstacles.obstacles[i].y)
			{
	    		if(Self.Perso.leftrightBool)
	    		{
					this.blockX();
				}	
	    		else
	    		{	
					this.unBlockX();
				}	
			}
			/*Si la collision est a droite de l'obstacle*/
			else if (Self.Perso.x + Self.Map.x - this.colBorderX < this.mapObstacles.obstacles[i].x + this.mapObstacles.obstacles[i].width &&
				Self.Perso.x + Self.Map.x > this.mapObstacles.obstacles[i].x + this.mapObstacles.obstacles[i].width &&
				Self.Perso.y < this.mapObstacles.obstacles[i].y + this.mapObstacles.obstacles[i].height &&
				Self.Perso.height + Self.Perso.y > this.mapObstacles.obstacles[i].y)
			{
	    		if(Self.Perso.leftrightBool)
	    		{	
					this.unBlockX();
				}	
	    		else
	    		{	
					this.blockX();
				}			
			}
			/*Si la collision est en haut de l'obstacle*/
			else if (Self.Perso.x + Self.Map.x < this.mapObstacles.obstacles[i].x + this.mapObstacles.obstacles[i].width &&
				Self.Perso.x + Self.Map.x + Self.Perso.width > this.mapObstacles.obstacles[i].x &&
				Self.Perso.y + Self.Perso.height < this.mapObstacles.obstacles[i].y &&
				Self.Perso.height + Self.Perso.y + this.colBorderY > this.mapObstacles.obstacles[i].y)
			{
				Self.Perso.surUnObstacle=true;
				Self.Perso.surUnObstacle2=true;
				this.floorVal=(this.mapObstacles.obstacles[i].y-Self.Perso.height)-this.colBorderY/2;
			}
			/*Si la collision est en bas de l'obstacle*/
			else if (Self.Perso.x + Self.Map.x < this.mapObstacles.obstacles[i].x + this.mapObstacles.obstacles[i].width &&
				Self.Perso.x + Self.Map.x + Self.Perso.width > this.mapObstacles.obstacles[i].x &&
				Self.Perso.y - this.colBorderY < this.mapObstacles.obstacles[i].y + this.mapObstacles.obstacles[i].height &&
				Self.Perso.y > this.mapObstacles.obstacles[i].y + this.mapObstacles.obstacles[i].height)
			{
				Self.Perso.hautBas=false;
			}
			/*Si la collision est dans un des coins de l'obstacle (Traitements provisoires)*/
			else if (Self.Perso.x + Self.Map.x < this.mapObstacles.obstacles[i].x + this.mapObstacles.obstacles[i].width &&
					Self.Perso.x + Self.Map.x + Self.Perso.width > this.mapObstacles.obstacles[i].x &&
					Self.Perso.y < this.mapObstacles.obstacles[i].y + this.mapObstacles.obstacles[i].height &&
					Self.Perso.height + Self.Perso.y > this.mapObstacles.obstacles[i].y)
			{
				if((Self.Perso.x + Self.Map.x + Self.Perso.width) < ( this.mapObstacles.obstacles[i].x + this.mapObstacles.obstacles[i].width/2) && 
				   (Self.Perso.x + Self.Map.x) < ( this.mapObstacles.obstacles[i].x + this.mapObstacles.obstacles[i].width/2))
				{
		    		if(Self.Perso.leftrightBool)
		    		{
						this.blockX();	    		
					}	
		    		else
		    		{	
						this.unBlockX();
					}	
				}
				else if((Self.Perso.x + Self.Map.x + Self.Perso.width) > ( this.mapObstacles.obstacles[i].x + this.mapObstacles.obstacles[i].width/2) &&
						(Self.Perso.x + Self.Map.x) > ( this.mapObstacles.obstacles[i].x + this.mapObstacles.obstacles[i].width/2))
				{ 	
		    		if(Self.Perso.leftrightBool)
		    		{	
						this.unBlockX();
					} 
					else
		    		{	
						this.blockX();
					}
				}
			}
		}

		if(Self.Perso.surUnObstacle && !Self.Perso.surUnObstacle2 && Self.KeyboardKey.heroMoveJumpBool)
		{
			Self.KeyboardKey.heroMoveJumpBool=false;

			Self.Perso.surUnObstacle=false;

			Self.Perso.hautBas=false;

			Self.Perso.jump(function(){

				Self.KeyboardKey.heroMoveJumpBool=true;
				
				clearInterval(self.heroMoveJumpInter);
			});
		}
	},
	blockX : function ()
	{
		Self.Perso.vx=0;
		this.vx=0;
	},
	unBlockX : function ()
	{
		Self.Perso.vx=3;
		this.vx=3;
	}
}