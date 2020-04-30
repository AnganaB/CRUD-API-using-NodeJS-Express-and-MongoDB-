let express = require('express');
let bodyParser = require('body-parser');

let mongoose = require('mongoose');
let app = express();

let apiRoutes = require('./api-routes');
// configure bodyparser to handle post requests 
app.use(bodyParser.urlencoded({
	extended: true
}));

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/resthub', 
	{ useNewUrlParser: true});
var db = mongoose.connection;
if (!db)
	console.log("Error connecting db");
else
	console.log("Db connected successfully!");

// set up server port
var port = process.env.PORT || 8080;


// send message to default url
app.get('/', (req, res) =>{
	res.send('Hello World with Express!');
	//console.log("Connected!");
}); 

app.use('/api', apiRoutes);

app.listen(port, function () {
	console.log("Running on port " + port);
});


