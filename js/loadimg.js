function LoadImage ()
{
	this.UrlImgList=[
		"img/backgroundmax.png", 
		"img/mariosprite.png"
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
			// console.log(this.loadedImgList[i].src)
		}
		// console.log(this.loadedImgList[0].src+"/"+this.loadedImgList[1].src)
	},
	addloadedImg : function (callbackMain)
	{

		// console.log(this.UrlImgList.length+"/"+this.numberImgLoaded)

		if(this.UrlImgList.length==this.numberImgLoaded)
		{
			callbackMain();
		}

	}
}
