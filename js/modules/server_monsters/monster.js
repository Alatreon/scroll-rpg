function Monster (life,width,height,x,y,anim)
{
	this.width=width;
	this.height=height;
	this.lifeMax=life;
	this.life=life;
	this.x=x;
	this.y=y;
	this.vx=3;
	this.vy=2;
	this.anim=anim;
	this.animIncr=0;
	this.animInter=0;
	this.dmg=[5,10];
}
Monster.prototype = 
{
	startAll : function ()
	{
		Monster.animInter=setInterval(function()
		{
			Monster.x+=Monster.vx;
			Monster.moveCalc();
			Monster.moveAnim();
		},100);
	},
	returnMonsterVal : function()
	{
		var monster = 
		{
			life : Monster.life,
			lifeMax : Monster.lifeMax,
			width : Monster.width,
			height : Monster.height,
			x : Monster.x,
			y : Monster.y,
			anim : Monster.anim,
			dmg : Monster.dmg
		}
		return monster;
	},
	moveCalc : function ()
	{
		if (Monster.x<=0 || Monster.x>=2500-64)
		{
			Monster.vx=Monster.vx*(-1);
		}
	},
	moveAnim : function ()
	{
		Monster.animIncr+=1;

		if (Monster.animIncr<=2)
		{
			Monster.anim=0;
		}

		if (Monster.animIncr>=2)
		{
			Monster.anim=64;
		}

		if (Monster.animIncr>=4)
		{
			Monster.animIncr=0;
			Monster.anim=0;
		}
	},
	takeDmg : function (dmgMin,dmgMax)
	{
		var dmg = Math.floor(Math.random() * (dmgMax - dmgMin) + dmgMin);

		Monster.life=Monster.life-dmg;

		if(Monster.life<=0)
		{
			clearInterval(Monster.animInter);
			Monster.life=0;
			Monster.width=0;
			Monster.height=0;
		}
		return dmg;
	}
}
var Monster =  new Monster(1000,64,64,400,536,0);

exports.MonsterStart = Monster.startAll;
exports.Monster = Monster.returnMonsterVal;
exports.MonsterTakeDmg = Monster.takeDmg;