
/*var test = 1;
var exec = require('child_process').exec;
exec('./test'+test, function callback(error, stdout, stderr){console.log(stdout)});*/

const { exec } = require('child_process');

var options = {
    timeout: 100,
    stdio: 'inherit',
    shell: true,
}

exec('gcc teste.c -o teste', (error, stdout, stderr) => {
    exec('./teste', options, (error,stdout,stderr)=>{
        console.log(`stdout: ${stdout}`);
 //       console.log(`stderr: ${stderr}`);

   //     if (error) {
            //console.error(`exec error: ${error}`);
     //       return;
      //    }
    });  
});


