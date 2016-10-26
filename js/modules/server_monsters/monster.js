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
				Monster.monsJson[i].x+=Monster.monsJson[i].vx;
			}
			Monster.moveCalc();
			Monster.moveAnim();
		},100);
	},
	returnMonsterVal : function()
	{
		// console.log(Monster.monsJson.length)

		// for(var i = 0; Monster.monsJson.length>i; i++)
		// {
		// 	console.log(i+"eeee")
		// }

		var monster = Monster.monsJson;

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
			Monster.monsJson[i].animIncr+=1;

			if (Monster.monsJson[i].animIncr<=2)
			{
				Monster.monsJson[i].anim=0;
			}

			if (Monster.monsJson[i].animIncr>=2)
			{
				Monster.monsJson[i].anim=64;
			}

			if (Monster.monsJson[i].animIncr>=4)
			{
				Monster.monsJson[i].animIncr=0;
				Monster.monsJson[i].anim=0;
			}
		}
	},
	takeDmg : function (dmgMin,dmgMax,i)
	{
			var dmg = Math.floor(Math.random() * (dmgMax - dmgMin) + dmgMin);

			Monster.monsJson[i].life=Monster.monsJson[i].life-dmg;

			if(Monster.monsJson[i].life<=0)
			{
				Monster.monsJson[i].life="DEAD";
				Monster.monsJson[i].width=0;
				Monster.monsJson[i].height=0;
			}
		
		return dmg;
	}
}
var monsJson = [
		{
			id:0,
			life : 1000,
			lifeMax : 1000,
			width : 64,
			height : 64,
			x : 600,
			y : 536,
			vx:3,
			vy:2,
			anim : 0,
			animIncr:0,
			dmg : [5,10]
		},
		{
			id:1,
			life : 500,
			lifeMax : 500,
			width : 64,
			height : 64,
			x : 1700,
			y : 536,
			vx:3,
			vy:2,
			anim : 0,
			animIncr:0,
			dmg : [5,10]
		},
		{
			id:1,
			life : 50,
			lifeMax : 50,
			width : 64,
			height : 64,
			x : 1100,
			y : 536,
			vx:3,
			vy:2,
			anim : 0,
			animIncr:0,
			dmg : [5,10]
		}
		]

var Monster = new Monster(monsJson);

exports.MonsterStart = Monster.startAll;
exports.Monster = Monster.returnMonsterVal;
exports.MonsterTakeDmg = Monster.takeDmg;