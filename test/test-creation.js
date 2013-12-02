/*global describe, beforeEach, it*/
'use strict';

var path    = require('path');
var helpers = require('yeoman-generator').test;


describe('nodemodule generator', function () {
  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) {
        return done(err);
      }

      this.app = helpers.createGenerator('nodemodule:app', [
        '../../app'
      ]);
      done();
    }.bind(this));
  });

  it('creates expected files', function (done) {
    var expected = [
      // add files you expect to exist here.
      'lib',
      'lib/bella.js',
      'test',
      'test/bella_test.js',
      'LICENSE',
      'package.json',
      'README.md',
      '.editorconfig',
      '.gitignore',
      'Gruntfile.js',
      '.jshintrc',
      '.travis.yml'
    ];

    helpers.mockPrompt(this.app, {
      'appName': 'bella',
      'appDescription': 'The best project ever',
      'appVersion': '0.1.0',
      'authorName': 'Christopher EnyTC',
      'authorEmail': 'chrisenytc@gmail.com',
      'userName': 'chrisenytc',
      'eableBin': true,
      'enableTravis': true
    });
    this.app.options['skip-install'] = true;
    this.app.run({}, function () {
      helpers.assertFiles(expected);
      done();
    });
  });
});
