var http = require('http');
var fs = require('fs');

var server = http.createServer(function(req, res) {
    fs.readFile('./index.html', 'utf-8', function(error, content) {
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end(content);
    });
});

var partie = {players : []};

var io = require('socket.io').listen(server);

io.sockets.on('connection', function (socket) {

	console.log("Connection de "+socket.id);

	socket.emit('client_connected', socket.id,partie);

    socket.on('serv_perso_recept', function(perso, mappos) {

    	perso.x=perso.x+mappos;

		partie.players.push({playerId : socket.id, perso : perso});

		socket.emit('client_recept_partie', partie);

		socket.broadcast.emit('client_recept_partie', partie);

    });
    
    socket.on('serv_perso_update', function(perso, mappos) {

    	console.log(partie.players.length);


		for(var i = 0; i<partie.players.length; i++)
		{
    		// console.log(partie.players[i].perso.x);
			if(partie.players[i].playerId == socket.id)
			{
    			perso.x=perso.x+mappos;

				partie.players[i].perso=perso

				socket.broadcast.emit('client_recept_partie', partie);
			}
		}		
    });

	socket.on('disconnect', function() {

		partie.players=[];

		socket.broadcast.emit('client_we_lose_a_player');

		console.log("Deconnection de "+socket.id);
	});
});

server.listen(8089);