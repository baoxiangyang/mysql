var http = require('http'),
work = require('./lib/timetrack'),
mysql = require('mysql');
var db = mysql.createConnection({
	host:"127.0.0.1",
	user:"test",
	password:"123456",
	database:"timetrack"
})
db.query(
	"CREATE TABLE IF NOT EXISTS WORK ("
	+"id INT(10) NOT NULL AUTO_INCREMENT, "
	+"hours DECIMAL(5,2) DEFAULT 0, "
	+ "date DATE, "
	+"archived Int(1) DEFAULT 0, "
	+"description LONGTEXT,"
	+"PRIMARY KEY(id))",
	function(err){
		if(err) throw err;
		console.log('Server started...');
		server.listen(3000,"127.0.0.1")
	}
)
var  server = http.createServer(function(req,res){
	if(req.method == "POST"){
		switch(req.url){
			case '/':
				work.add(db,req,res)
				break;
			case '/archive':
				work.archive(db,req,res)
				break;
			case '/delete':
				work.delete(db,req,res)
			default:
				console.log(req.url)
				break;
		}
	}else if(req.method == 'GET'){
		switch(req.url){
			case '/':
				work.show(db,res)
				break;
			case '/archived':
				work.showArchived(db,res)
			default:
				console.log(req.url)
				break;
		}
	}
})
