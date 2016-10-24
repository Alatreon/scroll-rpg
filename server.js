var express = require('express');
var http = require('http');
var fs = require('fs');
var monster = require('./js/modules/server_monsters/monster');
var app = express();
var port = process.env.PORT || 8000;

app.use('/css', express.static('css'));
app.use('/img', express.static('img'));
app.use('/js', express.static('js'));

app.get('/', function(req, res) 
{
  fs.readFile('./index.html', 'utf-8', function(error, content) {
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end(content);
    });
});

var server = http.createServer(app);

var io = require('socket.io').listen(server);

var partie = {players : [], monster:monster.Monster()};

monster.MonsterCons();

io.sockets.on('connection', function (socket) {

	console.log("Connection de "+socket.id);

	socket.emit('client_connected', socket.id, partie);

    socket.on('serv_perso_recept', function(perso, mappos) {

    	perso.x=perso.x+mappos;

		partie.players.push({playerId : socket.id, perso : perso});
		console.log(monster.Monster());
		socket.emit('client_recept_partie', partie);

		socket.broadcast.emit('client_recept_partie', partie);

    });
    
    socket.on('serv_perso_update', function(perso, mappos) {

    	console.log(partie.players.length);

		partie.monster=monster.Monster();

		for(var i = 0; i<partie.players.length; i++)
		{
			if(partie.players[i].playerId == socket.id)
			{
    			perso.x=perso.x+mappos;

				partie.players[i].perso=perso
    			
    			socket.broadcast.emit('client_recept_partie', partie);
			}
		}

		socket.emit('client_recept_partie', partie);		
    });

	socket.on('disconnect', function() {

		partie.players=[];

		socket.broadcast.emit('client_we_lose_a_player');

		// console.log("Deconnection de "+socket.id);
	});
});

server.listen(port);