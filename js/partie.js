function Partie ()
{
	this.socketId;
	this.partie;
	this.socket = io.connect(Self.addrServ+":8000");
	this.dmgs=[];
}
Partie.prototype=
{
	connection : function ()
	{
		self=this;

		Self.Partie.socket.on('client_connected', function(socketId, partie) {

			Self.Partie.socketId=socketId;

			Self.launchKey();

			Self.drawAll();

			Self.Partie.sendPerso();

			Self.Partie.socket.on('client_recept_partie', function(partie) {

				Self.Partie.partie=partie;
			});

			Self.Partie.socket.on('client_recept_dmgs_monster', function(dmg,i) {
				if(dmg.socketId == Self.Partie.socketId)
				{
					dmg = 
					{
						monsterId:i,
						dmg:dmg.dmg,
						player:true,
						positionY:0,
						alpha:1.0,
						incr:0
					}
				}
				else
				{
					dmg = 
					{
						monsterId:i,
						dmg:dmg.dmg,
						player:false,
						positionY:0,
						alpha:1.0,
						incr:0
					}

				}
				
				Self.Partie.dmgs.push(dmg);
			});

		});

		Self.Partie.socket.on('client_we_lose_a_player', function() {

			Self.Partie.sendPerso();

		});
		
		this.transaction();

	},
	sendPerso : function ()
	{
		var perso = 
		{
			persoAnimValX:Self.Perso.persoAnimValX,
			persoAnimValY:Self.Perso.persoAnimValY,
			width:Self.Perso.width,
			height:Self.Perso.height,
			x:Self.Perso.x,
			y:Self.Perso.y,
			life:Self.Perso.life,
			lifeMax:Self.Perso.lifeMax,
			attackBool:Self.KeyboardKey.heroAttackBool,
			weaponAnimVal:Self.Perso.weaponAnimVal,
			weaponWidth:Self.Perso.weaponWidth,
			weaponHeight:Self.Perso.weaponHeight,
			leftrightWeaponX:Self.Perso.leftrightWeaponX,
			leftrightWeaponY:Self.Perso.leftrightWeaponY
		}
		console.log(Self.KeyboardKey.heroAttackBool)

		Self.Partie.socket.emit('serv_perso_recept', perso, Self.Map.x);
	},
	updatePerso : function ()
	{
		Self.Partie.socket.emit('serv_perso_update', Self.Perso, Self.Map.x);
	},
	persoAttack : function (i)
	{
		Self.Partie.socket.emit('serv_perso_attack',i);
	},
	transaction : function ()
	{
		Self.Partie.updatePerso();		
	}
}