function Perso ()
{
	/*Position de Perso*/
	this.x = 50;
	this.y = Self.Map.floorVal;

	/*Vitesse de Perso*/
	/* -deplacement*/
	this.vx = 3;
	/* -saut*/
	this.vy = 2;

	/*Details visuels de Perso*/
	this.width = 64;
	this.height = 128;

	/*Details visuels de l'arme de Perso*/
	this.weaponWidth = 132;
	this.weaponHeight = 192;

	/*animation*/
	this.jumpanim=0;
	this.leftrightBool=true;
	this.leftright=0;
	this.leftrightAnim=0;
	this.incrMoveAnim=0;
	this.persoAnimVal=0;
	this.persoAnimStop=false;

	/*Saut*/
	this.JumpSize = 86;
	this.jumpPos = 0;
	this.hautBas = true;
	this.surUnObstacle=false;

	/*Attack*/
	this.attackAnim=false;
	this.weaponAnimVal=396+132;

}
Perso.prototype = 
{
	draw : function (img,persoAnimVal,topbotAnim,width,height,x,y,width,height,attack)
	{
		Self.ctx.drawImage(img,persoAnimVal,topbotAnim,width,height,x,y,width,height);
		Self.Perso.drawAttack(attack);
	},
	drawAttack : function (attack) 
	{
		if(attack)
		{
			Self.ctx.drawImage(
				Self.LoadImage.loadedImgList[3],
				this.weaponAnimVal,/*Position horizontale du sprite*/
				0,/*Position verticale du sprite*/
				this.weaponWidth,
				this.weaponHeight,
				Self.Perso.x,
				Self.Perso.y-65,
				this.weaponWidth,
				this.weaponHeight
			);

		}
	},
	jump : function (callback) 
	{
		self=this
		
		this.heroMoveJumpInter = setInterval(function()
		{
			Self.Map.checkObstacle();

			self.jumpPos+=1;

			if( self.hautBas && self.jumpPos < self.JumpSize )
			{
				self.moveAnim();

				self.y -= self.vy;
			}
			if( self.hautBas && self.jumpPos == self.JumpSize )
			{
				self.moveAnim();

				self.hautBas = false;
			}
			if( !self.hautBas && self.y<=Self.Map.floorVal)
			{
				self.moveAnim();
				
				self.y += self.vy;
			}
			if( !self.hautBas && self.y>=Self.Map.floorVal)
			{
				self.moveAnim();
				self.hautBas = true;
				self.jumpPos = 0;
				self.y=Self.Map.floorVal;
				callback();
			}
		
		},4);

	},
	right : function () 
	{
		this.leftrightBool=true;
		this.moveAnim();
		this.x += this.vx;
	},
	left : function () 
	{
		this.leftrightBool=false;
		this.moveAnim();
		this.x -= this.vx;
	},
	attack : function (callback) 
	{
		self=this;
		this.incrAttackAnim = 0;
		Self.KeyboardKey.heroAttackInter = setInterval(function()
		{
			self.moveAnim();

			self.attackAnim=true;

			self.incrAttackAnim+=1;

			if(self.incrAttackAnim>=40)
			{
				self.attackAnim=false;
				callback();
			}

		},10);
	},
	stop : function (evt) 
	{
		this.persoAnimStop=true;
		this.moveAnim();
		this.persoAnimStop=false;
	},
	moveAnim : function ()
	{
		if(this.leftrightBool)
		{
			this.leftright=0;
		}
		else
		{
			this.leftright=1344;
		}
		if(!Self.KeyboardKey.heroAttackBool)
		{
			this.jumpanim=0;

			if(this.incrAttackAnim<8)
			{
				this.leftrightAnim=320;

				this.weaponAnimVal=0;				
			}
			else if(this.incrAttackAnim<20)
			{
				this.leftrightAnim=64;

				this.weaponAnimVal=132;				
			}
			else if(this.incrAttackAnim<30)
			{
				this.leftrightAnim=64;

				this.weaponAnimVal=132+132;				
			}
			else if(this.incrAttackAnim<39)
			{
				this.leftrightAnim=64;

				this.weaponAnimVal=396;				
			}
			else if(this.incrAttackAnim>=39)
			{
				this.leftrightAnim=0;				
			}
		}
		else if(Self.KeyboardKey.heroMoveJumpBool)
		{
			if(!this.persoAnimStop)
			{
				this.incrMoveAnim+=1;
	
				if(this.incrMoveAnim>7)
				{
					this.incrMoveAnim=0;
	
					this.leftrightAnim+=64;
	
					if(this.leftrightAnim>192){this.leftrightAnim=64;}
	
				}
			}
			else
			{
				this.leftrightAnim=0;
			}
		}
		else if(!Self.KeyboardKey.heroMoveJumpBool)
		{
			this.leftrightAnim=0;

			if( self.hautBas)
			{
				self.jumpanim=320;
			}
			if( !self.hautBas)
			{
				self.jumpanim= 0;
			}
		}
		this.persoAnimVal=this.jumpanim+this.leftright+this.leftrightAnim;
	}
}