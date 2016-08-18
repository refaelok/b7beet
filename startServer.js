'use strict'

require('shelljs/global');
var argv = require('minimist')(process.argv.slice(2));
var branch = argv.branch || 'master';

exec('git pull origin ' + branch, runPm2)

runPm2(){
	exec('pm2 start runServer.sh', savePm2)
}

savePm2(){
	exec('pm2 save');
}