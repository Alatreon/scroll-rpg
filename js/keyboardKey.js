function KeyboardKey ()
{
	this.heroMoveRightInter;
	this.heroMoveLeftInter;
	/**/
	this.heroMoveLeftBool=true;
	this.heroMoveRightBool=true;
	this.heroMoveJumpBool=true;
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
		console.log(evt.keyCode)
		switch(evt.keyCode)
		{
			case 90:
				if(evt.keyCode==90 && this.heroMoveJumpBool)
				{
					this.heroMoveJumpBool=false;
					Self.Perso.jump(function(){
						Self.KeyboardKey.heroMoveJumpBool=true;
					});
				}
			break;
			case 68:
				if(evt.keyCode==68 && this.heroMoveRightBool)
				{
					this.heroMoveRightBool = false;
					this.heroMoveRightInter = setInterval(function()
					{
						Self.Perso.left();
					},10);
				}
			break;
			case 81:
				if(evt.keyCode==81 && this.heroMoveLeftBool)
				{
					this.heroMoveLeftBool = false;
					this.heroMoveLeftInter = setInterval(function()
					{
						Self.Perso.right();	
					},10);
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