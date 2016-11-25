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
	this.leftRightBool=true;
	this.leftright=0;
	this.leftrightAnim=320;

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
	this.incrAttackAnim=0;
	this.weaponAnim=0;			
	this.weaponAnimVal=396+132;

	/*Mobcoll*/
	this.monsterAnimColIncr=0;

	/*HeroSkill*/
	this.skillX = 0;
	this.skillY = 0;
	this.skillSpeed=10;
	this.skillDirection=true;
	this.skillDistanceMax;
	this.skillAnimX=0;/*Position horizontale du sprite*/

	/*Details visuels du skill du Perso*/
	this.skillWidth = 46;
	this.skillHeight = 38;

}
Perso.prototype = 
{
	draw : function (img,persoAnimValX,topbotAnim,width,height,x,y,width,height)
	{
		Self.ctx.drawImage(img,persoAnimValX,topbotAnim,width,height,x,y,width,height);
	},
	drawAttack : function (attack,img,weaponAnimVal,weaponAnimValVert,weaponWidth,weaponHeight,leftrightWeaponX,leftrightWeaponY) 
	{
		if(!attack)
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
			)
			this.attack();
		}
	},
	drawSkill : function (attack,img,weaponAnimVal,weaponAnimValVert,weaponWidth,weaponHeight,leftrightWeaponX,leftrightWeaponY) 
	{
		if(!attack)
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
			)
			this.skill();
		}
	},
	attack : function () 
	{		
		this.moveAnim();

		this.incrAttackAnim+=1;

		Self.Check.checkAttack(this.x,this.y,this.weaponWidth,this.weaponHeight,this.leftrightWeaponX,this.leftrightWeaponY);
		
		if(this.incrAttackAnim>=19)
		{
			Self.KeyboardKey.heroAttackBool = true;

			this.incrAttackAnim=0;

			Self.Check.checkAttackBool = true;
		}
	},
	skill : function ()
	{
		if(!this.skillDirection)
		{
			this.skillAnimX=184;

			this.skillX-=this.skillSpeed;

			console.log(this.skillX +"<"+ this.skillDistanceMax.right+"/");

			if( this.skillX < this.skillDistanceMax.left )
			{
				Self.Check.checkSkillBool = false;
				Self.KeyboardKey.heroSkillBool=true;
			}
		}
		else
		{
			this.skillAnimX=0;

			this.skillX+=this.skillSpeed;

			console.log(this.skillX +">"+ this.skillDistanceMax.right+"/"+(Self.Perso.x-Self.Map.x))

			if( this.skillX > this.skillDistanceMax.right )
			{
				Self.Check.checkSkillBool = false;
				Self.KeyboardKey.heroSkillBool=true;
			}		
		}

		Self.Check.checkSkill(this.skillX,this.skillY,this.skillWidth,this.skillHeight);
	},
	skillAnim : function ()
	{

	},
	drawLifeBar : function ()
	{
		var x=20;
		var y=20;

		var pourcent =  ((100 * this.life / this.lifeMax)/100)*184;

		/*barre de vie*/
        Self.ctx.fillStyle = "rgba(0, 255, 0, 1.0)";
		Self.ctx.fillRect(72+x,20+y,pourcent,24);

        Self.ctx.fillStyle = "rgba(0, 0, 255, 1.0)";
		Self.ctx.fillRect(64+x,46+y,192,26);

		Self.ctx.drawImage(
			Self.LoadImage.loadedImgList[5],
			0, 0,
			Self.LoadImage.loadedImgList[5].width,
			Self.LoadImage.loadedImgList[5].height,
			x,	y,
			Self.LoadImage.loadedImgList[5].width,
			Self.LoadImage.loadedImgList[5].height
		);

		Self.ctx.drawImage(
			Self.LoadImage.loadedImgList[1],
			0, 0,
			64, 48,
			8+x, 14+y,
			64, 48
		);
		Self.Texts.drawHeroLife(Self.Perso.life,Self.Perso.lifeMax,x,y);
	},
	jump : function (callback) 
	{
		self=this
		
		this.heroMoveJumpInter = setInterval(function()
		{
			Self.Check.checkObstacle();

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
		this.leftRightBool=true;
		this.moveAnim();
		this.x += this.vx;
	},
	left : function () 
	{
		this.leftRightBool=false;
		this.moveAnim();
		this.x -= this.vx;
	},
	monsterAnimColl : function ()
	{
		if(!Self.Check.monsterAnimColBool)
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
				Self.Check.monsterAnimColBool=true;
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
		if(this.leftRightBool)
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

			if(this.incrAttackAnim<4)
			{
				this.leftrightAnim=320;

				this.weaponAnim=0;				
			}
			else if(this.incrAttackAnim<10)
			{
				this.leftrightAnim=64;

				this.weaponAnim=132;				
			}
			else if(this.incrAttackAnim<15)
			{
				this.leftrightAnim=64;

				this.weaponAnim=132+132;
			}
			else if(this.incrAttackAnim<17)
			{
				this.leftrightAnim=64;

				this.weaponAnim=396;			
			}
			else if(this.incrAttackAnim>=17)
			{
				this.leftrightAnim=0;
				this.weaponAnim=396;		
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