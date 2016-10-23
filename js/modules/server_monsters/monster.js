function Monster (width,height,x,y)
{
	this.width=width;
	this.height=height;
	this.life=1000;
	this.x=x;
	this.y=y;
	this.vx=3;
	this.vy=2;
	this.anim=0;
	this.animInter=0;
}
Monster.prototype = 
{
	startAll : function ()
	{
		Monster.animInter=setInterval(function()
		{
			Monster.x+=Monster.vx;
			Monster.moveCalc();

		},100);
	},
	returnMonsterVal : function()
	{
		var monster = 
		{
			width : Monster.width,
			height : Monster.height,
			x : Monster.x,
			y : Monster.y
		}
		return monster;
	},
	moveCalc : function ()
	{
		if (Monster.x<=0 || Monster.x>=2500)
		{
			Monster.vx=Monster.vx*(-1);
		}
	},
	takeDmg : function (dmg)
	{
		Monster.life=Monster.life-dmg;
		if(Monster.life<=0)
		{
			clearInterval(Monster.animInter);
			Monster.width=0;
			Monster.height=0;
		}
	}
}
var Monster =  new Monster(32,32,0,472);

exports.MonsterCons = Monster.startAll;
exports.Monster = Monster.returnMonsterVal;