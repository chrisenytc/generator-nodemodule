/*
 * <%= _.slugify(appName) %>
 * https://github.com/<%= userName %>/<%= _.slugify(appName) %>
 *
 * Copyright (c) 2013 <%= authorName %>
 * Licensed under the MIT license.
 */

'use strict';

var chai = require('chai');
chai.expect();
chai.should();

var <%= _.slugify(appName) %> = require('../lib/<%= _.slugify(appName) %>.js');

describe('<%= _.slugify(appName) %> module', function(){
  describe('#awesome()', function(){
    it('should return a hello', function(){
      <%= _.slugify(appName) %>.awesome('livia').should.equal("hello livia");
    });
  });
});
