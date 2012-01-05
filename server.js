var http = require('http'),
	url = require('url'),
	util = require('util'),
	querystring = require('querystring'),
	express = require("express"),
	app = require("express").createServer();

app.configure(function(){
	app.use(express.methodOverride());
	app.use(express.bodyParser());
	app.use(app.router);
	app.use(express.static(__dirname+'/static',{maxAge:0}));
	app.set('views',__dirname+'/views');
	app.register('.html',require('ejs'));
	app.set("view engine","html");
	app.disable('view cache');
});


function start(port){
	app.get('/subject/:id',function(req,res){
//		console.log("id":req.params.id);i
		var id = req.params.id;
		if(id){
			res.render('./subject/subject.html',{layout:false});
			//res.send(id);
		}else{
			next();
		}
		//res.send("id:",req.params.id);
	
	});
	app.get('/api',function(req,res){
		var urlObject = url.parse(req.url),pathname,query,queryObject,callback,json;
		
		query = urlObject.query;
		
		if(query){
			queryObject = querystring.parse(urlObject.query);
			callback = queryObject['callback'];
			if(callback){
				res.send(callback+'({test:"333"})');
			}
		}
		
	});
	app.get('/subject_search/:keywords',function(req,res){
		var keywords = req.params.keywords;
		if(keywords){
			res.render('./subject_search/subject_search.html',{layout:false});
			//res.send("subject_search!");
		}else{
			next();
		}
	
	});
	app.get('/accounts/:loginid',function(req,res){
		var loginid = req.params.loginid;
		if(loginid){
			res.render('./accounts/accounts.html',{layout:false});
			//res.send('accounts!');
		}else{
			next();
		}
	});
	app.get('/',function(req,res){
		res.render('index.html',{layout:false});
	});
	
	app.get('/test',function(req,res){
		res.send("ok");
	});
	app.listen(port,function(){
		console.log("it works");
	});

}

exports.start = start;
