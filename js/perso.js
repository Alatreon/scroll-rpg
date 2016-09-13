function Perso ()
{
	/*Position de Perso*/
	this.x = 50;
	this.y = Self.Map.floorVal;


	/*Vitesse de Perso*/
	/*deplacement*/
	this.vx= 3;
	/*saut*/
	this.vy= 2;


	/*Details visuels de Perso*/
	this.width = 64;
	this.height = 128;

	this.color = 'blue';

	this.JumpSize = 128;
}
Perso.prototype = 
{
	draw : function () 
	{
		/*dessin de Perso sur le canvas*/
	  	Self.ctx.beginPath();

		Self.ctx.moveTo(this.x,this.y); 
		Self.ctx.lineTo(this.x+this.width,this.y+this.height);
		Self.ctx.moveTo(this.x+this.width,this.y); 
		Self.ctx.lineTo(this.x,this.y+this.height);

		Self.ctx.closePath();

		Self.ctx.stroke();	
	},
	jump : function (callback) 
	{
		self=this		
		/*Mise en place des variables qui vont determiner la position du saut*/
		var hautBas = true;
		var i = 0;

		/*animation du saut*/
		this.heroMoveJumpInter = setInterval(function()
		{
			i+=1;

			if( hautBas == true && i < self.JumpSize/2 )
			{
				self.y -= self.vy;
			}
			if( hautBas == true && i == self.JumpSize/2 )
			{
				hautBas = false;
			}
			if( hautBas == false && i < self.JumpSize )
			{
				self.y += self.vy;
			}
			if( hautBas == false && i == self.JumpSize )
			{
				hautBas = true;
				i = 0;
				self.y=Self.Map.floorVal;
				clearInterval(self.heroMoveJumpInter);
				callback();
			}
			
			Self.drawAll();		
		
		},6);

	},
	left : function () 
	{
		this.x += this.vx;
		Self.drawAll();
	},
	right : function () 
	{
		this.x -= this.vx;		
		Self.drawAll();
	},
	stop : function (evt) 
	{
		Self.drawAll();
	}
}