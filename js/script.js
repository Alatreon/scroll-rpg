function Main ()
{
	Self = this;
	this.c = document.getElementById("mon_canvas");
	this.ctx = Self.c.getContext("2d");

	this.addrServ="http://127.0.0.1";

	this.LoadImage = new LoadImage;
	
	this.KeyboardKey = new KeyboardKey;
	this.Map = new Map;
	this.Perso = new Perso;
	this.Partie = new Partie;
}
Main.prototype=
{
	launchKey : function ()
	{
		Self.LoadImage.loader(function(){		

			Self.KeyboardKey.actionKeys();
			
			/*Self.drawAll();*/
		});
	},
	drawAll : function ()
	{		
		setInterval(function()
		{
			Self.ctx.clearRect(0, 0, Self.c.width, Self.c.height);

			Self.Map.setBackground();

			Self.drawOtherPlayer();

			Self.Perso.draw(
				Self.LoadImage.loadedImgList[1],
				Self.Perso.jumpanim,
				Self.Perso.leftright,
				Self.Perso.leftrightAnim,
				0,
				Self.Perso.width,
				Self.Perso.height,
				Self.Perso.x,
				Self.Perso.y,
				Self.Perso.width,
				Self.Perso.height,
				Self.Perso.attackAnim
			);

			Self.Map.createObstacle();

		},15);
	},
	drawOtherPlayer : function ()
	{
		if (Self.Partie.partie.players.length>1) {
			for(var i = 0; i<Self.Partie.partie.players.length; i++)
			{
				if(!(Self.Partie.partie.players[i].playerId == Self.Partie.socketId))
				{
					Self.ctx.drawImage(
						Self.LoadImage.loadedImgList[1],
						Self.Partie.partie.players[i].perso.jumpanim+Self.Partie.partie.players[i].perso.leftright+Self.Partie.partie.players[i].perso.leftrightAnim,
						0,
						Self.Partie.partie.players[i].perso.width,
						Self.Partie.partie.players[i].perso.height,
						Self.Partie.partie.players[i].perso.x-Self.Map.x,
						Self.Partie.partie.players[i].perso.y,
						Self.Partie.partie.players[i].perso.width,
						Self.Partie.partie.players[i].perso.height
					);
				}
			}
		}
	}

}

var Main = new Main;

Main.Partie.connection();