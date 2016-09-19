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

}
Perso.prototype = 
{
	draw : function ()
	{	
		Self.ctx.drawImage(Self.LoadImage.loadedImgList[1],this.jumpanim+this.leftright+this.leftrightAnim,0,this.width,this.height,this.x,this.y,this.width,this.height);
	},
	jump : function (callback) 
	{
		self=this		
		/*Mise en place des variables qui vont determiner la position du saut*/

		/*animation du saut*/
		this.heroMoveJumpInter = setInterval(function()
		{
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
			if( self.hautBas == false && self.jumpPos < self.JumpSize*2 )
			{
				self.jumpanim=0;
				
				self.y += self.vy;
			}
			if( self.hautBas == false && self.jumpPos == self.JumpSize*2 )
			{
				self.jumpanim=0;

				self.hautBas = true;
				self.jumpPos = 0;
				self.y=Self.Map.floorVal;
				callback();
			}
			
			Self.drawAll();		
		
		},6);

	},
	left : function () 
	{
		this.x += this.vx;
		this.leftright=0;
		this.moveAnim();
	},
	right : function () 
	{
		this.x -= this.vx;
		this.leftright=1344;
		this.moveAnim();
	},
	stop : function (evt) 
	{
		this.leftrightAnim=0;
		Self.drawAll();
	},
	moveAnim : function ()
	{
		this.incrMoveAnim+=1;

		if(this.incrMoveAnim==1 || this.incrMoveAnim>this.vx*5)
		{
			this.moveAnimIncr();

			if(this.incrMoveAnim>this.vx*5){this.incrMoveAnim=0}			
		}

	},
	moveAnimIncr : function ()
	{
		if(this.leftrightAnim<192 && this.jumpPos == 0)
		{
			this.leftrightAnim+=64;
			this.incrMoveAnim=10;
		}
		else
		{
			this.leftrightAnim=0;

		}
	}
}