'use strict'

require('shelljs/global');
var argv = require('minimist')(process.argv.slice(2));
var branch = argv.branch || 'master';
var usenpm = argv.npm || false;

exec('git pull origin ' + branch, npmInstall)

function npmInstall(){
	usenpm ?  killPm2() : exec('npm install', killPm2) ;
}

function killPm2(){
	exec('pm2 kill', runPm2)
}

function runPm2(){
	exec('pm2 start runServer.sh', savePm2)
}

function savePm2(){
	exec('pm2 save');
}
