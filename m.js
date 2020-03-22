var express=require("express");
var request=require("request");
var parse=require("body-parser");
var ejs=require("ejs");
var app=express();

app.get("/",function(req,res){
	request('http://starlord.hackerearth.com/movies',function(error,response,body){
	if(!error  && response.statusCode==200)
	{
		var a=JSON.parse(body);
		res.render("home.ejs",{a: a});
		console.log("imdb");}
	else 
		console.log("not found");
});
});
	app.get("/search",function(req,res){
		var movie= (req.query.fname);
		
		console.log(movie);
		
		request('http://starlord.hackerearth.com/movies',function(error,response,body){
	if(!error  && response.statusCode==200)
	{
		var a=JSON.parse(body);
		
		var k=1;
		a.forEach(function(c){
			if(k==1)
			{
			 if(c.movie_title.trim() == movie.trim())
					  {
						   k=2;
						  res.render("search.ejs",{c: c});

					  
					  }
			}
		
				  });
		if(k==1)
			{
				res.send("NOT FOUND");
			}
		
	
	}
			else
              console.log(error);
	});
	});

app.get("/sortby",function(req,res){
	var opt=req.query.option;
	console.log(opt);
	
	request('http://starlord.hackerearth.com/movies',function(error,response,body){
	if(!error  && response.statusCode==200)
	{
		var a=JSON.parse(body);
		
		if(opt.trim()==='budget')
			{
				a.sort(function(p,q){return p.budget - q.budget});
			}
				else if(opt.trim()==='year')
			{
				a.sort(function(p,q){return p.title_year - q.title_year});
			}
		        else if(opt.trim()==='rating')
			{
				a.sort(function(p,q){return  p.content_rating.localeCompare(q.content_rating)});
			}
		 res.render("home.ejs",{a: a});
		// console.log("imdb");
	}
	else 
		console.log("not found");
});
});


app.listen((process.env.PORT || 8000),() =>{
	console.log("The imdb app has started");
});