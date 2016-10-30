function Perso ()
{
	/*Position de Perso*/
	this.x = 50;
	this.y = Self.Map.floorVal;

	/*Vitesse de Perso*/
	/* -deplacement*/
	this.vx = 3;
	/* -saut*/
	this.vy = 2;

	this.lifeMax = 80;
	this.life = 80;

	/*Details visuels de Perso*/
	this.width = 64;
	this.height = 128;

	/*Details visuels de l'arme de Perso*/
	this.weaponWidth = 132;
	this.weaponHeight = 192;

	/*animation*/
	this.jumpanim=0;
	this.leftrightBool=true;
	this.leftright=0;
	this.leftrightAnim=0;

	this.leftrightWeapon=0;
	this.leftrightWeaponX=0;
	this.leftrightWeaponY=65;

	this.incrMoveAnim=0;
	this.persoAnimValX=0;
	this.persoAnimValY=0;
	this.persoAnimStop=false;

	/*Saut*/
	this.JumpSize = 86;
	this.jumpPos = 0;
	this.hautBas = true;
	this.surUnObstacle=false;

	/*Attack*/
	this.attackBool=false;
	this.weaponAnim=396+132;			
	this.weaponAnimVal=396+132;
	this.checkAttackBool = true;

	/*Mobcoll*/
	this.monsterAnimColIncr=0;
	this.monsterAnimColBool=true;

}
Perso.prototype = 
{
	draw : function (img,persoAnimValX,topbotAnim,width,height,x,y,width,height)
	{
		Self.ctx.drawImage(img,persoAnimValX,topbotAnim,width,height,x,y,width,height);
	},
	drawAttack : function (attack,img,weaponAnimVal,weaponAnimValVert,weaponWidth,weaponHeight,leftrightWeaponX,leftrightWeaponY) 
	{
		if(attack)
		{
			Self.ctx.drawImage(
				img,
				weaponAnimVal,/*Position horizontale du sprite*/
				weaponAnimValVert,/*Position verticale du sprite*/
				weaponWidth,
				weaponHeight,
				leftrightWeaponX,
				leftrightWeaponY,
				weaponWidth,
				weaponHeight
			);
		}
	},
	drawLifeBar : function ()
	{
		var pourcent =  ((100 * this.life / this.lifeMax)/100)*184;

		/*barre de vie*/
        Self.ctx.fillStyle = "rgba(0, 255, 0, 1.0)";
		Self.ctx.fillRect(92+30,40,pourcent,24);

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
	},
	jump : function (callback) 
	{
		self=this
		
		this.heroMoveJumpInter = setInterval(function()
		{
			Self.Map.checkObstacle();

			self.jumpPos+=1;

			if( self.hautBas && self.jumpPos < self.JumpSize )
			{
				self.moveAnim();

				self.y -= self.vy;
			}
			if( self.hautBas && self.jumpPos == self.JumpSize )
			{
				self.moveAnim();

				self.hautBas = false;
			}
			if( !self.hautBas && self.y<=Self.Map.floorVal)
			{
				self.moveAnim();
				
				self.y += self.vy;
			}
			if( !self.hautBas && self.y>=Self.Map.floorVal)
			{
				self.moveAnim();
				self.hautBas = true;
				self.jumpPos = 0;
				self.y=Self.Map.floorVal;
				callback();
			}
		
		},4);

	},
	right : function () 
	{
		this.leftrightBool=true;
		this.moveAnim();
		this.x += this.vx;
	},
	left : function () 
	{
		this.leftrightBool=false;
		this.moveAnim();
		this.x -= this.vx;
	},
	attack : function (callback) 
	{
		self=this;

		this.incrAttackAnim = 0;
		this.checkAttackBool = true;

		Self.KeyboardKey.heroAttackInter = setInterval(function()
		{
			self.moveAnim();

			self.attackBool=true;

			self.incrAttackAnim+=1;

			if(self.incrAttackAnim>=40)
			{
				self.attackBool=false;
				callback();
			}
			self.checkAttack();

		},8);
	},
	checkAttack : function ()
	{
		for(var i = 0; Self.Partie.partie.monster.length>i; i++)
		{
			if ( Self.Partie.partie.monster[i].x-Self.Map.x < this.x-this.leftrightWeaponX + this.weaponWidth &&
		   	 Self.Partie.partie.monster[i].x-Self.Map.x + Self.Partie.partie.monster[i].width > this.x-this.leftrightWeaponX &&
		   	 Self.Partie.partie.monster[i].y < this.y-this.leftrightWeaponY + this.weaponHeight &&
		   	 Self.Partie.partie.monster[i].height + Self.Partie.partie.monster[i].y > this.y-this.leftrightWeaponY &&
			 this.checkAttackBool && Self.Partie.partie.monster[i].life>0)
		{
			this.checkAttackBool = false;
			Self.Partie.persoAttack(i);
		}
	}

	},
	checkMonsterColl : function ()
	{
		for(var i = 0; Self.Partie.partie.monster.length>i; i++)
		{
			if (Self.Partie.partie.monster[i].x-Self.Map.x < this.x + this.width &&
			    Self.Partie.partie.monster[i].x-Self.Map.x + Self.Partie.partie.monster[i].width > this.x &&
			    Self.Partie.partie.monster[i].y < this.y + this.height &&
				Self.Partie.partie.monster[i].height + Self.Partie.partie.monster[i].y > this.y &&
				this.monsterAnimColBool && Self.Partie.partie.monster[i].life>0) 
			{
				this.monsterAnimColBool=false;

				var dmg = Math.floor(Math.random() *
				(Self.Partie.partie.monster[i].dmg[1] - Self.Partie.partie.monster[i].dmg[0]) + Self.Partie.partie.monster[i].dmg[0]);

				this.life=this.life-dmg;
				if(this.life<1){this.life=0}

			}
		}

	},
	monsterAnimColl : function ()
	{
		if(!this.monsterAnimColBool)
		{
			this.monsterAnimColIncr+=1;

			if(this.monsterAnimColIncr%2 == 1)
			{
				this.persoAnimValY=0;
			}
			if(this.monsterAnimColIncr%2 == 0)
			{
				this.persoAnimValY=-128;
			}
			if(this.monsterAnimColIncr>=40)
			{
				this.monsterAnimColIncr=0;
				this.persoAnimValY=0;
				this.monsterAnimColBool=true;
			}
		}
	},
	stop : function (evt) 
	{
		this.persoAnimStop=true;
		this.moveAnim();
		this.persoAnimStop=false;
	},
	moveAnim : function ()
	{
		if(this.leftrightBool)
		{
			this.leftright=0;
			this.leftrightWeapon=0;
			this.leftrightWeaponX=0;
		}
		else
		{
			this.leftright=1344;
			this.leftrightWeapon=132*4;
			this.leftrightWeaponX=70;
		}

		if(!Self.KeyboardKey.heroAttackBool)
		{
			this.jumpanim=0;

			if(this.incrAttackAnim<8)
			{
				this.leftrightAnim=320;

				this.weaponAnim=0;				
			}
			else if(this.incrAttackAnim<20)
			{
				this.leftrightAnim=64;

				this.weaponAnim=132;				
			}
			else if(this.incrAttackAnim<30)
			{
				this.leftrightAnim=64;

				this.weaponAnim=132+132;				
			}
			else if(this.incrAttackAnim<39)
			{
				this.leftrightAnim=64;

				this.weaponAnim=396;			
			}
			else if(this.incrAttackAnim>=39)
			{
				this.leftrightAnim=0;			
			}

			this.weaponAnimVal=this.weaponAnim+this.leftrightWeapon;	
		}

		else if(Self.KeyboardKey.heroMoveJumpBool)
		{
			if(!this.persoAnimStop)
			{
				this.incrMoveAnim+=1;
	
				if(this.incrMoveAnim>7)
				{
					this.incrMoveAnim=0;
	
					this.leftrightAnim+=64;
	
					if(this.leftrightAnim>192){this.leftrightAnim=64;}
	
				}
			}
			else
			{
				this.leftrightAnim=0;
			}
		}
		else if(!Self.KeyboardKey.heroMoveJumpBool)
		{
			this.leftrightAnim=0;

			if( self.hautBas)
			{
				self.jumpanim=320;
			}
			if( !self.hautBas)
			{
				self.jumpanim= 0;
			}
		}
		this.persoAnimValX=this.jumpanim+this.leftright+this.leftrightAnim;
	}
}