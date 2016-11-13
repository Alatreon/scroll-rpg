function Check ()
{
	this.checkAttackBool = true;
	this.colBorderX=4/*Self.Perso.vx+1*/;
	this.colBorderY=3/*Self.Perso.vy+1*/;
}
Check.prototype=
{
	checkAttack : function (x,y,weaponWidth,weaponHeight,weaponX,weaponY)
	{
		for(var i = 0; Self.Partie.partie.monster.length>i; i++)
		{
			if ( Self.Partie.partie.monster[i].x-Self.Map.x < x-weaponX + weaponWidth &&
		   	 Self.Partie.partie.monster[i].x-Self.Map.x + Self.Partie.partie.monster[i].width > x-weaponX &&
		   	 Self.Partie.partie.monster[i].y < y-weaponY + weaponHeight &&
		   	 Self.Partie.partie.monster[i].height + Self.Partie.partie.monster[i].y > y-weaponY &&
			 Self.Map.checkAttackBool && Self.Partie.partie.monster[i].life>0)
			{
				Self.Map.checkAttackBool = false;
				Self.Partie.persoAttack(i);
			}
		}

	},
	checkObstacle : function ()
	{		
		/*this.colBorderX=Self.Perso.vx+1;
		this.colBorderY=Self.Perso.vy+1;*/

		if(!Self.Perso.surUnObstacle || Self.Perso.surUnObstacle && !Self.KeyboardKey.heroMoveJumpBool)
		{
			Self.Perso.surUnObstacle=false;
		}

		Self.Perso.surUnObstacle2=false;
		
		this.unBlockX();
		Self.Map.floorVal=472;

		for(var i=0; i<Self.Map.mapObstacles.obstacles.length; i++)
		{
				
			/*Si la collision est a guche de l'obstacle*/
			if (Self.Perso.x + Self.Map.x + Self.Perso.width < Self.Map.mapObstacles.obstacles[i].x &&
				Self.Perso.x + Self.Map.x + Self.Perso.width + this.colBorderX > Self.Map.mapObstacles.obstacles[i].x &&
				Self.Perso.y < Self.Map.mapObstacles.obstacles[i].y + Self.Map.mapObstacles.obstacles[i].height &&
				Self.Perso.height + Self.Perso.y > Self.Map.mapObstacles.obstacles[i].y)
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
			else if (Self.Perso.x + Self.Map.x - this.colBorderX < Self.Map.mapObstacles.obstacles[i].x + Self.Map.mapObstacles.obstacles[i].width &&
				Self.Perso.x + Self.Map.x > Self.Map.mapObstacles.obstacles[i].x + Self.Map.mapObstacles.obstacles[i].width &&
				Self.Perso.y < Self.Map.mapObstacles.obstacles[i].y + Self.Map.mapObstacles.obstacles[i].height &&
				Self.Perso.height + Self.Perso.y > Self.Map.mapObstacles.obstacles[i].y)
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
			else if (Self.Perso.x + Self.Map.x < Self.Map.mapObstacles.obstacles[i].x + Self.Map.mapObstacles.obstacles[i].width &&
				Self.Perso.x + Self.Map.x + Self.Perso.width > Self.Map.mapObstacles.obstacles[i].x &&
				Self.Perso.y + Self.Perso.height < Self.Map.mapObstacles.obstacles[i].y &&
				Self.Perso.height + Self.Perso.y + this.colBorderY > Self.Map.mapObstacles.obstacles[i].y)
			{
				Self.Perso.surUnObstacle=true;
				Self.Perso.surUnObstacle2=true;
				Self.Map.floorVal=(Self.Map.mapObstacles.obstacles[i].y-Self.Perso.height)-this.colBorderY/2;
			}
			/*Si la collision est en bas de l'obstacle*/
			else if (Self.Perso.x + Self.Map.x < Self.Map.mapObstacles.obstacles[i].x + Self.Map.mapObstacles.obstacles[i].width &&
				Self.Perso.x + Self.Map.x + Self.Perso.width > Self.Map.mapObstacles.obstacles[i].x &&
				Self.Perso.y - this.colBorderY < Self.Map.mapObstacles.obstacles[i].y + Self.Map.mapObstacles.obstacles[i].height &&
				Self.Perso.y > Self.Map.mapObstacles.obstacles[i].y + Self.Map.mapObstacles.obstacles[i].height)
			{
				Self.Perso.hautBas=false;
			}
			/*Si la collision est dans un des coins de l'obstacle (Traitements provisoires)*/
			else if (Self.Perso.x + Self.Map.x < Self.Map.mapObstacles.obstacles[i].x + Self.Map.mapObstacles.obstacles[i].width &&
					Self.Perso.x + Self.Map.x + Self.Perso.width > Self.Map.mapObstacles.obstacles[i].x &&
					Self.Perso.y < Self.Map.mapObstacles.obstacles[i].y + Self.Map.mapObstacles.obstacles[i].height &&
					Self.Perso.height + Self.Perso.y > Self.Map.mapObstacles.obstacles[i].y)
			{
				if((Self.Perso.x + Self.Map.x + Self.Perso.width) < ( Self.Map.mapObstacles.obstacles[i].x + Self.Map.mapObstacles.obstacles[i].width/2) && 
				   (Self.Perso.x + Self.Map.x) < ( Self.Map.mapObstacles.obstacles[i].x + Self.Map.mapObstacles.obstacles[i].width/2))
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
				else if((Self.Perso.x + Self.Map.x + Self.Perso.width) > ( Self.Map.mapObstacles.obstacles[i].x + Self.Map.mapObstacles.obstacles[i].width/2) &&
						(Self.Perso.x + Self.Map.x) > ( Self.Map.mapObstacles.obstacles[i].x + Self.Map.mapObstacles.obstacles[i].width/2))
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
				
				clearInterval(Self.Map.heroMoveJumpInter);
			});
		}
	},
	blockX : function ()
	{
		Self.Perso.vx=0;
		Self.Map.vx=0;
	},
	unBlockX : function ()
	{
		Self.Perso.vx=3;
		Self.Map.vx=3;
	}
}
