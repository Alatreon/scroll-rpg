function Map ()
{
	this.floorVal=470;
	this.y=-275;
	this.x=0;
	this.backgroundLenght;
	this.vx=3;
	this.width=2500;
}
Map.prototype=
{
	setBackground : function ()
	{
		this.backgroundLenght=Self.LoadImage.loadedImgList[0].width;

		

		for( var i=0; this.backgroundLenght<Self.c.width+Self.c.width; i+=Self.LoadImage.loadedImgList[0].width)
		{
			
			this.backgroundLenght += Self.LoadImage.loadedImgList[0].width;

			Self.ctx.drawImage(Self.LoadImage.loadedImgList[0], this.x+i, this.y); 

			
		}
	},
	left : function () 
	{
		if(Self.Perso.x+Self.Perso.width*2>Self.c.width/2)
		{
			this.x -= this.vx;
			Self.Perso.x -= Self.Perso.vx;
		}
	},
	right : function () 
	{
		if(Self.Perso.x+Self.Perso.width*2<Self.c.width/2 && this.x<0)
		{
			this.x += this.vx;
			Self.Perso.x += Self.Perso.vx;
		}
	}
}