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
	this.Texts = new Texts;
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
			Self.Perso.checkMonsterColl();

			Self.Perso.monsterAnimColl();

			Self.ctx.clearRect(0, 0, Self.c.width, Self.c.height);

			Self.Map.setBackground();

			Self.drawOtherPlayer();

			Self.Perso.draw(
				Self.LoadImage.loadedImgList[1],
				Self.Perso.persoAnimValX,
				Self.Perso.persoAnimValY,
				Self.Perso.width,
				Self.Perso.height,
				Self.Perso.x,
				Self.Perso.y,
				Self.Perso.width,
				Self.Perso.height
			);

			Self.Map.createObstacle();
			
			Self.Map.drawMonster();

			Self.Perso.drawAttack(
				Self.Perso.attackBool,
				Self.LoadImage.loadedImgList[3],
				Self.Perso.weaponAnimVal,/*Position horizontale du sprite*/
				0,/*Position verticale du sprite*/
				Self.Perso.weaponWidth,
				Self.Perso.weaponHeight,
				Self.Perso.x-Self.Perso.leftrightWeaponX,
				Self.Perso.y-Self.Perso.leftrightWeaponY);
			
			Self.Texts.drawAllTexts();

			Self.Partie.transaction();

			Self.Perso.drawLifeBar();

		},25);
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
						Self.Partie.partie.players[i].perso.persoAnimValX,
						Self.Partie.partie.players[i].perso.persoAnimValY,
						Self.Partie.partie.players[i].perso.width,
						Self.Partie.partie.players[i].perso.height,
						Self.Partie.partie.players[i].perso.x-Self.Map.x,
						Self.Partie.partie.players[i].perso.y,
						Self.Partie.partie.players[i].perso.width,
						Self.Partie.partie.players[i].perso.height
					);
					Self.Perso.drawAttack(
						Self.Partie.partie.players[i].perso.attackBool,
						Self.LoadImage.loadedImgList[3],
						Self.Partie.partie.players[i].perso.weaponAnimVal,/*Position horizontale du sprite*/
						0,/*Position verticale du sprite*/
						Self.Partie.partie.players[i].perso.weaponWidth,
						Self.Partie.partie.players[i].perso.weaponHeight,
						(Self.Partie.partie.players[i].perso.x-Self.Map.x)-Self.Partie.partie.players[i].perso.leftrightWeaponX,
						Self.Partie.partie.players[i].perso.y-Self.Partie.partie.players[i].perso.leftrightWeaponY
					);
					// Self.drawOtherLifeBar()
				}
			}
		}
	},
	drawOtherLifeBar : function (life, lifeMax)
	{
		var pourcent =  ((100 * life / lifeMax)/100)*184;

        Self.ctx.fillStyle = "rgba(0, 255, 0, 1.0)";
		Self.ctx.fillRect(92,40,pourcent,24);

        Self.ctx.fillStyle = "rgba(0, 0, 255, 1.0)";
		Self.ctx.fillRect(84,66,192,26);

		Self.ctx.drawImage(
			Self.LoadImage.loadedImgList[5],
			0, 0,
			Self.LoadImage.loadedImgList[5].width,
			Self.LoadImage.loadedImgList[5].height,
			20,	20,
			Self.LoadImage.loadedImgList[5].width,
			Self.LoadImage.loadedImgList[5].height
		);

		Self.ctx.drawImage(
			Self.LoadImage.loadedImgList[1],
			0, 0,
			64, 48,
			28, 34,
			64, 48
		);
		Self.Texts.drawHeroLife();
	}

}

var Main = new Main;

Main.Partie.connection();