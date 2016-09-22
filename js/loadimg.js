function LoadImage ()
{
	this.UrlImgList=[
		"img/backgroundmax.png", 
		"img/mariosprite.png",
		"img/brick.png"
	];
	this.loadedImgList=[];
	this.numberImgLoaded=0;

}
LoadImage.prototype=
{
	loader : function (callbackMain)
	{
		self=this;
		
		for(var i = 0; i<this.UrlImgList.length; i++)
		{
			img = new Image();

			img.src = this.UrlImgList[i];

			this.loadedImgList.push(img)

			this.loadedImgList[i].onload = function()
			{
				self.numberImgLoaded+=1

				self.addloadedImg(callbackMain);
			}
		}
	},
	addloadedImg : function (callbackMain)
	{

		if(this.UrlImgList.length==this.numberImgLoaded)
		{
			callbackMain();
		}

	}
}
