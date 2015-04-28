var session = require('express-session');

exports.calais=function(req,res){
	var calais = new Calais('6y3r9gdczbruwtds4at7kupr')
calais.set('content', req.params.content);
//console.log(calais);
req.session.destroy(function(err) {
  // cannot access session here
  sess = req.session;
  sess.match = 0;
  console.log(err);
});

calais.fetch(function (err,result) {
/*	var len=result.length;
	for(i=0; i<len; i++){
		console.log(result[i]._typeGroup);
		if(result[i]._typeGroup=="topics"){
			console.log(result[i].categoryName);
		}else if (result[i]._typeGroup=="socialTag"){
			console.log(result[i].name)
		}else if (result[i]._typeGroup=="entities"){
			console.log(result[i]._type);
			console.log(result[i].name);
		}
	}*/
	//console.log(result);
	res.send(result);
});
};
