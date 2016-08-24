'use strict'

// ##
// #   --production    ) for production run   -------------------------     || default false
// #   --npm-install   ) for 'npm install'   ------------------------       || default false
// #   --bower-install ) for 'bower install'      -----------------         || default false
// #   --git-branch    ) for 'git pull origin {{branch}}'      ----------   || default master
// #   --git-pull      ) for 'git pull origin {{"master" || branch}}'  ---  || default true
// ##


require('shelljs/global');
var argv = require('minimist')(process.argv.slice(2));
const execStrings = {
  production: {
    run: false,
    exec: `NODE_ENV=production port=80 gulp serve:dist`,
    order: ''
  },
  development: {
    run: true,
    exec: this,
    order: ''
  },
  docker: {
    run: false,
    arguments: `DOCKER=true `
  },
  npm: {
    run: false,
    exec: `npm intsall`,
    order: ''
  },
  bower: {
    run: false,
    exec: `bower install`,
    order: ''
  },
  gitPull: {
    run : true,
    arguments: {
      branch: 'master'
    },
    exec: 'git pull origin ' + this,
    order: ''
  }
}

console.log(execStrings.development.exec);
