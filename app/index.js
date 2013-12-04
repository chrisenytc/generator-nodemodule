'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var NodemoduleGenerator = module.exports = function NodemoduleGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(NodemoduleGenerator, yeoman.generators.Base);

NodemoduleGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);

  var prompts = [
    {
      name: 'appName',
      message: 'What the project name?'
    },
    {
      name: 'appDescription',
      message: 'What the description?'
    },
    {
      name: 'appVersion',
      message: 'What the project version?',
      default: '0.1.0'
    },
    {
      name: 'authorName',
      message: 'What the author name?',
    },
    {
      name: 'authorEmail',
      message: 'What the author email?',
    },
    {
      name: 'userName',
      message: 'What the github username?',
    },
    {
      type: 'confirm',
      name: 'enableBin',
      message: 'Would you like to enable bin option?',
      default: false
    },
    {
      type: 'confirm',
      name: 'enableTravis',
      message: 'Would you like to enable travis support?',
      default: true
    }
  ];

  this.prompt(prompts, function (props) {
    this.appName = props.appName;
    this.appDescription = props.appDescription;
    this.appVersion = props.appVersion;
    this.authorName = props.authorName;
    this.authorEmail = props.authorEmail;
    this.userName = props.userName;
    this.enableBin = props.enableBin;
    this.enableTravis = props.enableTravis;

    cb();
  }.bind(this));
};

NodemoduleGenerator.prototype.app = function app() {

  var appName = this.appName;

  this.mkdir(appName);
  process.chdir(appName);

  this.mkdir('lib');
  this.template('lib/name.js', 'lib/' + appName + '.js');
  this.mkdir('test');
  this.template('test/name_test.js', 'test/' + appName + '_test.js');

};

NodemoduleGenerator.prototype.projectfiles = function projectfiles() {
  this.template('_package.json', 'package.json');
  this.template('_README.md', 'README.md');
  this.copy('editorconfig', '.editorconfig');
  this.copy('gitignore', '.gitignore');
  this.copy('Gruntfile.js', 'Gruntfile.js');
  this.copy('jshintrc', '.jshintrc');
  this.copy('npmignore', '.npmignore');
  this.template('_LICENSE', 'LICENSE');
  //Check if travis option is enabled
  if(this.enableTravis) {
    this.copy('travis.yml', '.travis.yml');
  }

};
