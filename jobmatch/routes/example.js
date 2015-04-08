exports.calais=function(req,res){
	var calais = new Calais('6y3r9gdczbruwtds4at7kupr')
calais.set('content', req.params.content);
console.log(calais);
calais.fetch(function (err,result) {
	var param={
		"result":result
	};
	console.log(param);
	//res.render('match_module',param);
	res.send(param);
});
};
