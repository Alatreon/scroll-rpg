function Perso ()
{
	/*Position de Perso*/
	this.x = 50;
	this.y = Self.Map.floorVal;

	/*Vitesse de Perso*/
	/*deplacement*/
	this.vx = 3;
	/*saut*/
	this.vy = 2;

	/*Details visuels de Perso*/
	this.width = 64;
	this.height = 128;

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

}
Perso.prototype = 
{
	draw : function (img,jumpanim,leftright,leftrightAnim,topbotAnim,width,height,x,y,width,height)
	{	
		Self.ctx.drawImage(img,jumpanim+leftright+leftrightAnim,topbotAnim,width,height,x,y,width,height);
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

			if( self.hautBas == true && self.jumpPos < self.JumpSize )
			{
				self.jumpanim=320;

				self.y -= self.vy;
			}
			if( self.hautBas == true && self.jumpPos == self.JumpSize )
			{
				self.jumpanim=0;

				self.hautBas = false;
			}
			if( self.hautBas == false && self.y<=Self.Map.floorVal )
			{
				self.jumpanim=0;
				
				self.y += self.vy;
			}
			if( self.hautBas == false && self.y>=Self.Map.floorVal  )
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