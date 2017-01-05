function KeyboardKey ()
{
	this.heroMoveRightInter;
	this.heroMoveLeftInter;
	/**/
	this.heroMoveLeftBool = true;
	this.heroMoveRightBool = true;
	this.heroMoveJumpBool = true;
	this.heroAttackBool = true;
	this.heroSkillBool = true;
}
KeyboardKey.prototype=
{
	actionKeys : function () 
	{
		var self=this;
		
		document.addEventListener('keydown', function(evt)
		{
			self.keyDown(evt);
		});
		document.addEventListener('keyup', function(evt)
		{
			self.keyUp(evt);
		});

	},
	keyDown : function (evt)
	{
		// console.log(evt.keyCode);

		// console.log((Self.Perso.x+Self.Map.x))

		switch(evt.keyCode)
		{
			case 90:
				if(evt.keyCode==90 && Self.Perso.jumpPos<1)
				{
					this.heroMoveJumpBool=false;
					Self.Perso.jump(function(){
						Self.KeyboardKey.heroMoveJumpBool=true;
						clearInterval(self.heroMoveJumpInter);
					});
				}
			break;
			case 68:
				if(evt.keyCode==68 && this.heroMoveRightBool)
				{
					this.heroMoveRightBool = false;
					this.heroMoveRightInter = setInterval(function()
					{
						Self.Check.checkObstacle();
						Self.Perso.right();
						Self.Map.right();

					},10);
				}
			break;
			case 81:
				if(evt.keyCode==81 && this.heroMoveLeftBool)
				{
					this.heroMoveLeftBool = false;
					this.heroMoveLeftInter = setInterval(function()
					{
						Self.Check.checkObstacle();
						Self.Perso.left();	
						Self.Map.left();

					},10);
				}
			break;
			case 32:
				if(evt.keyCode==32 && this.heroAttackBool)
				{
					this.heroAttackBool = false;
				}
			break;
			case 49:
				if(evt.keyCode==49 && this.heroSkillBool)
				{
					Self.Perso.skill.y=Self.Perso.y+Self.Perso.height/2;

					Self.Perso.skill.direction=Self.Perso.leftRightBool;

					Self.Perso.skill.distanceMax={
						left: Self.Perso.x - 300,
						right: Self.Perso.x + 300};

					if(Self.Perso.leftRightBool)
					{
						Self.Perso.skill.x=Self.Perso.x+Self.Perso.width*1.2;
						Self.Perso.skill.xSend=Self.Perso.x+Self.Map.x+Self.Perso.width*1.2;
					}
					else
					{
						Self.Perso.skill.x=Self.Perso.x-Self.Perso.width;
						Self.Perso.skill.xSend=Self.Perso.x-Self.Map.x-Self.Perso.width;
					}

					this.heroSkillBool = false;
					Self.Check.checkSkillBool = true;
				}
			break;
		}
	},
	keyUp : function (evt)
	{
		if(evt.keyCode==68)
		{
			this.heroMoveRightBool = true;
			clearInterval(this.heroMoveRightInter);
			Self.Perso.stop(evt);
		}
		if(evt.keyCode==81)
		{
			this.heroMoveLeftBool = true;
			clearInterval(this.heroMoveLeftInter);
			Self.Perso.stop(evt);
		}
	}
}