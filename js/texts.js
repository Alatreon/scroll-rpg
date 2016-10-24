function Texts ()
{
	this.font="PixelPolice";
}
Texts.prototype=
{
	drawMonsterLife : function ()
	{

		Self.ctx.font = "30px "+this.font;
		Self.ctx.textAlign = "center";
        Self.ctx.fillStyle = "rgba(0, 0, 0, 1.0)";
		Self.ctx.fillText(Self.Partie.partie.monster.life+"/"+Self.Partie.partie.monster.lifeMax,
		Self.Partie.partie.monster.x-Self.Map.x+64/2,
		Self.Partie.partie.monster.y-5);
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
				Self.Partie.partie.monster.x-Self.Map.x+64/2,
				Self.Partie.partie.monster.y+10-Self.Partie.dmgs[i].positionY);

				Self.Partie.dmgs[i].alpha-=0.1;
				Self.Partie.dmgs[i].incr+=1;
				Self.Partie.dmgs[i].positionY+=2;

				if(Self.Partie.dmgs[i].alpha<0)
				{
					Self.Partie.dmgs.splice(i,1)
				}
			}
		}
	}
}