function Partie ()
{
	this.socketId;
	this.partie;
	this.socket = io.connect(Self.addrServ+":8000");
}
Partie.prototype=
{
	connection : function ()
	{
		Self.Partie.socket.on('client_connected', function(socketId, partie) {

			Self.Partie.socketId=socketId;

			Self.partie=partie;

			Self.launchKey();

			Self.drawAll();

			Self.Partie.sendPerso();

			Self.Partie.socket.on('client_recept_partie', function(partie) {

				Self.Partie.partie=partie;
			});

		});

		Self.Partie.socket.on('client_we_lose_a_player', function() {

			Self.Partie.sendPerso();

		});
		
		this.transaction();

	},
	sendPerso : function ()
	{
		Self.Partie.socket.emit('serv_perso_recept', Self.Perso, Self.Map.x);
	},
	updatePerso : function ()
	{
		Self.Partie.socket.emit('serv_perso_update', Self.Perso, Self.Map.x);
	},
	transaction : function ()
	{
		setInterval(function()
		{
			if(Self.Perso.leftrightAnim!=0 || Self.Perso.jumpPos>0)
			{
				Self.Partie.updatePerso();
			}
			
		},40);
		
	}
}