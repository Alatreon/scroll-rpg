function Main ()
{
	Self = this;
	this.c = document.getElementById("mon_canvas");
	this.ctx = Self.c.getContext("2d");

	this.LoadImage = new LoadImage;
	
	this.KeyboardKey = new KeyboardKey;
	this.Map = new Map;
	this.Perso = new Perso;
	this.socketId;
	this.partie;

	this.socket = io.connect('http://127.0.0.1:8089');
}
Main.prototype=
{
	connection : function ()
	{
		Self.socket.on('client_connected', function(socketId, partie) {

			Self.socketId=socketId;

			Self.partie=partie;

			Self.launchKey();

			Self.sendPerso();

			Self.socket.on('client_recept_partie', function(partie) {

				Self.partie=partie;
				
				console.log(Self.partie);

			    Self.drawAll();

			});

		});

		Self.socket.on('client_we_lose_a_player', function() {

			Self.sendPerso();

		});

	},
	sendPerso : function ()
	{
		Self.socket.emit('serv_perso_recept', Self.Perso, Self.Map.x, Self.socketId);
	},
	updatePerso : function ()
	{
		Self.socket.emit('serv_perso_update', Self.Perso, Self.Map.x, Self.socketId);
	},
	launchKey : function ()
	{
		Self.LoadImage.loader(function(){		

			Self.KeyboardKey.actionKeys();
			
			Self.drawAll();
		});
	},
	drawAll : function ()
	{
		Self.ctx.clearRect(0, 0, Self.c.width, Self.c.height);

		// Self.sendPerso();

		Self.Map.setBackground();

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
			Self.Perso.height
		);

		Self.drawOtherPlayer();

		Self.Map.createObstacle();
	},
	drawOtherPlayer : function ()
	{
		for(var i = 0; i<Self.partie.players.length; i++)
		{
			if(!(Self.partie.players[i].playerId == Self.socketId))
			{
				Self.ctx.drawImage(
					Self.LoadImage.loadedImgList[1],
					Self.partie.players[i].perso.jumpanim+Self.partie.players[i].perso.leftright+Self.partie.players[i].perso.leftrightAnim,
					0,
					Self.partie.players[i].perso.width,
					Self.partie.players[i].perso.height,
					Self.partie.players[i].perso.x-Self.Map.x,
					Self.partie.players[i].perso.y,
					Self.partie.players[i].perso.width,
					Self.partie.players[i].perso.height
				);
			}
		}
	}

}

var Main = new Main;

Main.connection();

setInterval(function()
{
	Main.updatePerso();
},1000);