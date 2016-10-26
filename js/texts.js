function Texts ()
{
	this.font="PixelPolice";
}
Texts.prototype=
{
	drawAllTexts : function ()
	{
		this.drawDmg();
	},
	drawMonsterLife : function ()
	{
		for(var i = 0; Self.Partie.partie.monster.length>i; i++)
		{
			Self.ctx.font = "30px "+this.font;
			Self.ctx.textAlign = "center";
	        Self.ctx.fillStyle = "rgba(0, 0, 0, 1.0)";
			Self.ctx.fillText(Self.Partie.partie.monster[i].life+"/"+Self.Partie.partie.monster[i].lifeMax,
			Self.Partie.partie.monster[i].x-Self.Map.x+64/2,
			Self.Partie.partie.monster[i].y-5);
		}
	},
	drawDmg : function ()
	{
		if(Self.Partie.dmgs.length>0)
		{

			for(var i = 0; i<Self.Partie.dmgs.length; i++)
			{
				var color = "255, 255, 255";

				if(!Self.Partie.dmgs[i].player){color = "51, 153, 255";}

				Self.ctx.font = "35px "+this.font;
				Self.ctx.textAlign = "center";
		        Self.ctx.fillStyle = "rgba("+color+", " + Self.Partie.dmgs[i].alpha + ")";
				Self.ctx.fillText("-"+Self.Partie.dmgs[i].dmg,
				Self.Partie.partie.monster[Self.Partie.dmgs[i].monsterId].x-Self.Map.x+64/2,
				Self.Partie.partie.monster[Self.Partie.dmgs[i].monsterId].y+10-Self.Partie.dmgs[i].positionY);

				Self.Partie.dmgs[i].alpha-=0.1;
				Self.Partie.dmgs[i].incr+=1;
				Self.Partie.dmgs[i].positionY+=2;

				if(Self.Partie.dmgs[i].alpha<0)
				{
					Self.Partie.dmgs.splice(i,1)
				}
			}
		}
	},
	drawHeroLife : function ()
	{
		Self.ctx.font = "30px "+this.font;
		Self.ctx.textAlign = "center";
        Self.ctx.fillStyle = "rgba(0, 0, 0, 1.0)";
		Self.ctx.fillText(Self.Perso.life+"/"+Self.Perso.lifeMax, 178, 58);

		Self.ctx.font = "30px "+this.font;
		Self.ctx.textAlign = "center";
        Self.ctx.fillStyle = "rgba(0, 0, 0, 1.0)";
		Self.ctx.fillText(20+"/"+20, 178, 84);
	}
}