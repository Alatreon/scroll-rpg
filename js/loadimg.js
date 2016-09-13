function LoadImage ()
{
	this.UrlImgList=[
		"img/backgroundmin.png", 
		/*"https://www.mozaweb.com/fr/partner_images/3D_crop_Structure.png"*/
	];
	this.imgSrc='';
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
			var img =[]
			img = new Image();
			img.src = this.UrlImgList[i];
			img.onload = function()
			{
				self.numberImgLoaded+=1
				self.addloadedImg(img,callbackMain);
			}	
		}
	},
	addloadedImg : function (img,callbackMain)
	{
		this.loadedImgList.push(img);
		if(this.UrlImgList.length==this.numberImgLoaded)
		{
			callbackMain();
		}
	}
}
