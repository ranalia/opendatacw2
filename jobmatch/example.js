var express = require('express');
var util = require('util'),
Calais = require('calais').Calais
var calais = new Calais('6y3r9gdczbruwtds4at7kupr')
calais.set('content', 'The Federal Reserve is the enemy of Ron Paul.')
//console.log(calais);
calais.fetch(function (err,result) {
	util.puts(util.inspect(result))
})