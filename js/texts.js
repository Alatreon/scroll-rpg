function Texts ()
{
	this.font="PixelPolice";
	this.dmgPlayerTab=[];
}
Texts.prototype=
{
	drawAllTexts : function ()
	{
		this.drawDmg();
		this.drawPlayerDmg();
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
	drawPlayerDmg : function ()
	{
		if(this.dmgPlayerTab.length>0)
		{

			for(var i = 0; i<this.dmgPlayerTab.length; i++)
			{
				var color = "";

				Self.ctx.font = "40px "+this.font;
				Self.ctx.textAlign = "center";
		        Self.ctx.fillStyle = "rgba(255, 0, 0, " + this.dmgPlayerTab[i].alpha + ")";
				Self.ctx.fillText("-"+this.dmgPlayerTab[i].dmg,
					Self.Perso.x+(Self.Perso.width/2),
					Self.Perso.y-this.dmgPlayerTab[i].positionY+(Self.Perso.height/2));

				this.dmgPlayerTab[i].alpha-=0.02;
				this.dmgPlayerTab[i].incr+=1;
				this.dmgPlayerTab[i].positionY+=2;

				if(this.dmgPlayerTab[i].alpha<0)
				{
					this.dmgPlayerTab.splice(i,1)
				}
			}
		}
	},
	drawHeroLife : function (life,lifeMax,x,y)
	{
		Self.ctx.font = "30px "+this.font;
		Self.ctx.textAlign = "center";
        Self.ctx.fillStyle = "rgba(0, 0, 0, 1.0)";
		Self.ctx.fillText(life+"/"+lifeMax, 158+x, 38+y);

		Self.ctx.font = "30px "+this.font;
		Self.ctx.textAlign = "center";
        Self.ctx.fillStyle = "rgba(0, 0, 0, 1.0)";
		Self.ctx.fillText(20+"/"+20, 158+x, 64+y);
	}
}