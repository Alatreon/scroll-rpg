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
	this.weaponHeight = 144;

	/*animation*/
	this.jumpanim=0;
	this.leftright=0;
	this.leftrightAnim=0;
	this.incrMoveAnim=0;

	/*Saut*/
	this.JumpSize = 86;
	this.jumpPos = 0;
	this.hautBas = true;
	this.surUnObstacle=false;

	/*Attack*/
	this.attackAnim=false;

}
Perso.prototype = 
{
	draw : function (img,jumpanim,leftright,leftrightAnim,topbotAnim,width,height,x,y,width,height,attack)
	{
		Self.ctx.drawImage(img,jumpanim+leftright+leftrightAnim,topbotAnim,width,height,x,y,width,height);
		Self.Perso.drawAttack(attack);
	},
	drawAttack : function (attack) 
	{
		if(attack)
		{
			Self.ctx.drawImage(
				Self.LoadImage.loadedImgList[3],
				396+132,/*Position horizontale du sprite*/
				0,/*Position verticale du sprite*/
				this.weaponWidth,
				this.weaponHeight,
				Self.Perso.x,
				Self.Perso.y-50,
				this.weaponWidth,
				this.weaponHeight
			);

		}
	},
	jump : function (callback) 
	{
		self=this

		/*animation du saut*/
		this.leftrightAnim=0;
		
		this.heroMoveJumpInter = setInterval(function()
		{
			Self.Map.checkObstacle();

			self.jumpPos+=1;

			if( self.hautBas && self.jumpPos < self.JumpSize )
			{
				self.jumpanim=320;

				self.y -= self.vy;
			}
			if( self.hautBas && self.jumpPos == self.JumpSize )
			{
				self.jumpanim=0;

				self.hautBas = false;
			}
			if( !self.hautBas && self.y<=Self.Map.floorVal)
			{
				self.jumpanim=0;
				
				self.y += self.vy;
			}
			if( !self.hautBas && self.y>=Self.Map.floorVal)
			{
				self.jumpanim= 0;
				self.hautBas = true;
				self.jumpPos = 0;
				self.y=Self.Map.floorVal;
				callback();
			}
		
		},4);

	},
	right : function () 
	{
		this.x += this.vx;
		this.leftright=0;
		this.moveAnim();
	},
	left : function () 
	{
		this.x -= this.vx;
		this.leftright=1344;
		this.moveAnim();
	},
	attack : function (callback) 
	{
		self=this;
		var i = 0;
		Self.KeyboardKey.heroAttackInter = setInterval(function()
		{
			self.attackAnim=true;
			i+=1;
			console.log(i+'eeeezeerzefzefzefze');

			if(i>=50)
			{
				self.attackAnim=false;
				callback();
			}

		},10);
	},
	stop : function (evt) 
	{
		this.leftrightAnim=0;
	},
	moveAnim : function ()
	{
		if(Self.KeyboardKey.heroMoveJumpBool)
		{
			this.incrMoveAnim+=1;

			if(this.incrMoveAnim>7)
			{
				this.incrMoveAnim=0;

				this.leftrightAnim+=64;

				if(this.leftrightAnim>192){this.leftrightAnim=64;}

			}
		}	
	}
}