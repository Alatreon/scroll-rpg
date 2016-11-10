function Check ()
{
	this.checkAttackBool = true;
}
Check.prototype=
{
	checkAttack : function (x,y,weaponWidth,weaponHeight,weaponX,weaponY)
	{
		for(var i = 0; Self.Partie.partie.monster.length>i; i++)
		{
			if ( Self.Partie.partie.monster[i].x-Self.Map.x < x-weaponX + weaponWidth &&
		   	 Self.Partie.partie.monster[i].x-Self.Map.x + Self.Partie.partie.monster[i].width > x-weaponX &&
		   	 Self.Partie.partie.monster[i].y < y-weaponY + weaponHeight &&
		   	 Self.Partie.partie.monster[i].height + Self.Partie.partie.monster[i].y > y-weaponY &&
			 this.checkAttackBool && Self.Partie.partie.monster[i].life>0)
			{
				this.checkAttackBool = false;
				Self.Partie.persoAttack(i);
			}
		}

	}
}
