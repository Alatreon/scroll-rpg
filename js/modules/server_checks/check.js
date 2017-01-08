function Monster (monsJson)
{
	this.animInter;
	this.monsJson=monsJson;
}
Monster.prototype = 
{
	startAll : function ()
	{
		Monster.animInter=setInterval(function()
		{
			for(var i = 0; Monster.monsJson.length>i; i++)
			{
				if(Monster.monsJson[i].life>0)
				{
					Monster.monsJson[i].x+=Monster.monsJson[i].vx;
				}
				Monster.deadAnim(i);
			}
			Monster.moveCalc();
			Monster.moveAnim();
		},100);
	},
	returnMonsterVal : function()
	{
		var monster = []

		for(var i = 0; Monster.monsJson.length>i; i++)
		{
			monster.push(
				{
					life : Monster.monsJson[i].life,
					lifeMax : Monster.monsJson[i].lifeMax,
					width : Monster.monsJson[i].width,
					height : Monster.monsJson[i].height,
					x : Monster.monsJson[i].x,
					y : Monster.monsJson[i].y,
					animX : Monster.monsJson[i].animX,
					animY : Monster.monsJson[i].animY,
					dmg : Monster.monsJson[i].dmg
				}
			);
		}

		return monster;
	
	},
	moveCalc : function ()
	{
		for(var i = 0; Monster.monsJson.length>i; i++)
		{
			if (Monster.monsJson[i].x<=0 || Monster.monsJson[i].x>=2500-64)
			{
				Monster.monsJson[i].vx=Monster.monsJson[i].vx*(-1);
			}
		}
	},
	moveAnim : function ()
	{
		for(var i = 0; Monster.monsJson.length>i; i++)
		{
			if(Monster.monsJson[i].life>0)
			{
				Monster.monsJson[i].animIncr+=1;

				if (Monster.monsJson[i].animIncr<=2)
				{
					Monster.monsJson[i].animX=0;
				}

				if (Monster.monsJson[i].animIncr>=2)
				{
					Monster.monsJson[i].animX=64;
				}

				if (Monster.monsJson[i].animIncr>=4)
				{
					Monster.monsJson[i].animIncr=0;
					Monster.monsJson[i].animX=0;
				}
			}
		}
	},
	takeDmg : function (dmgMin,dmgMax,i)
	{
			var dmg = Math.floor(Math.random() * (dmgMax - dmgMin) + dmgMin);

			Monster.monsJson[i].life=Monster.monsJson[i].life-dmg;
			Monster.monsJson[i].takeDmg=true;

			if(Monster.monsJson[i].life<=0)
			{
				Monster.monsJson[i].animIncr=0;
				Monster.monsJson[i].life=0;
			}
		
		return dmg;
	},
	deadAnim : function (i)
	{

			if(Monster.monsJson[i].life<=0)
			{
				Monster.monsJson[i].animX=128;
				Monster.monsJson[i].animIncr+=1;
				if(Monster.monsJson[i].animIncr>5){Monster.monsJson.splice(i,1)}
			}
	}
}
var monsJson = [
		{
			life : 50,
			lifeMax : 50,
			width : 64,
			height : 64,
			x : 600,
			y : 536,
			vx:3,
			vy:2,
			animX : 0,
			animY : 64,
			takeDmg : false,
			animIncr:0,
			dmg : [5,10]
		},
		{
			life : 500,
			lifeMax : 500,
			width : 64,
			height : 64,
			x : 1100,
			y : 536,
			vx:3,
			vy:2,
			animX : 0,
			animY : 64,
			takeDmg : false,
			animIncr:0,
			dmg : [5,10]
		},
		{
			life : 1000,
			lifeMax : 1000,
			width : 64,
			height : 64,
			x : 1700,
			y : 536,
			vx:3,
			vy:2,
			animX : 0,
			animY : 64+128,
			takeDmg : false,
			animIncr:0,
			dmg : [5,10]
		}
		]

var Monster = new Monster(monsJson);

exports.MonsterStart = Monster.startAll;
exports.Monster = Monster.returnMonsterVal;
exports.MonsterTakeDmg = Monster.takeDmg;