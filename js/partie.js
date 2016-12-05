function Partie ()
{
	this.socketId;
	this.partie;
	this.socket = io.connect(Self.addrServ+":8000");
	this.dmgs=[];
	this.perso;
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
		Self.Partie.setThisPerso();
		Self.Partie.socket.emit('serv_perso_recept', Self.Partie.perso, Self.Map.x);
	},
	updatePerso : function ()
	{
		Self.Partie.setThisPerso();
		Self.Partie.socket.emit('serv_perso_update', Self.Partie.perso, Self.Map.x);
	},
	setThisPerso : function()
	{
		Self.Partie.perso = 
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
			leftrightWeaponY:Self.Perso.leftrightWeaponY,
			skill:{
				heroSkillBool:Self.KeyboardKey.heroSkillBool,
				animX:Self.Perso.skill.animX,
				width:Self.Perso.skill.width,
				height:Self.Perso.skill.height,
				x:Self.Perso.skill.x,
				y:Self.Perso.skill.y
			}
		};
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