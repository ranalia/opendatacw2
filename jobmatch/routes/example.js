exports.calais=function(req,res){

var calais = new Calais('6y3r9gdczbruwtds4at7kupr');
calais.set('content', req.params.content);
//console.log(calais);

var sess = req.session;

//if(sess){
	  // cannot access session here	  
	  sess.match = 0;
	  res.session = sess;
	  console.log("session calais:"+sess.match);
//}


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