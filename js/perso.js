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

	this.color = 'blue';

	this.JumpSize = 86;
	this.jumpPos = 0;
}
Perso.prototype = 
{
	draw : function ()
	{	
		Self.ctx.drawImage(Self.LoadImage.loadedImgList[1],this.jumpanim+this.leftright,0,this.width,this.height,this.x,this.y,this.width,this.height);
	},
	jump : function (callback) 
	{
		self=this		
		/*Mise en place des variables qui vont determiner la position du saut*/
		var hautBas = true;

		/*animation du saut*/
		this.heroMoveJumpInter = setInterval(function()
		{
			self.jumpPos+=1;

			if( hautBas == true && self.jumpPos < self.JumpSize )
			{
				self.jumpanim=320;

				self.y -= self.vy;
			}
			if( hautBas == true && self.jumpPos == self.JumpSize )
			{
				self.jumpanim=0;

				hautBas = false;
			}
			if( hautBas == false && self.jumpPos < self.JumpSize*2 )
			{
				self.jumpanim=0;
				
				self.y += self.vy;
			}
			if( hautBas == false && self.jumpPos == self.JumpSize*2 )
			{
				self.jumpanim=0;
				
				self.jumpanim=false;
				hautBas = true;
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
	},
	right : function () 
	{
		this.x -= this.vx;
		this.leftright=1344;
	},
	stop : function (evt) 
	{
		Self.drawAll();
	}
}