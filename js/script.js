function Main ()
{
	Self = this;
	this.c = document.getElementById("mon_canvas");
	this.ctx = Self.c.getContext("2d");

	this.LoadImage = new LoadImage;
	this.KeyboardKey = new KeyboardKey;
	this.Map = new Map;
	this.Perso = new Perso;

}
Main.prototype=
{
	launchKey : function ()
	{
		Self.LoadImage.loader(function(){		

			Self.KeyboardKey.actionKeys();
			Self.drawAll();
		});
	},
	drawAll : function ()
	{
		Self.ctx.clearRect(0,0, Self.c.width, Self.c.height);
		
		Self.Map.setBackground();
		Self.Perso.draw();

	}

}

var Main = new Main;

Main.launchKey();

// var c = document.getElementById("mon_canvas");
// var ctx = c.getContext("2d");
// var imgt = new Image();
// imgt.src = 'https://www.mozaweb.com/fr/partner_images/3D_crop_Structure.png';
// imgt.onload = function() {
// 	ctx.drawImage(imgt,0,0);
// }