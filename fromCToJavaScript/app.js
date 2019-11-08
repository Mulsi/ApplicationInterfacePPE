
var test = 1;
var exec = require('child_process').exec;
exec('./test'+test, function callback(error, stdout, stderr){console.log(stdout)});
