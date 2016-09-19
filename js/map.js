function Map ()
{
	this.floorVal=460;
	this.y=275;
	this.x=0;
	this.backgroundLenght;
	this.vx=3;
	this.width=2500;
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
	}
}