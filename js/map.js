function Map ()
{
	this.floorVal=470;
	this.y=-275;
	this.x=0;
	this.backgroundLenght;
	this.vx=3;
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
		this.x -= this.vx;
		Self.drawAll();
	},
	right : function () 
	{
		this.x += this.vx;		
		Self.drawAll();
	}
}