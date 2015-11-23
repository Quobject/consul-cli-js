/**
* Copyright 2015 Matthias Ludwig
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
**/

/*global describe, it, before */
var Consul = require('../lib/index.js');
var path = require('path');
var should = require('chai').should();
var assert = require('chai').assert;
var debug = require('debug')('Consul:test/index.js');


describe('Consul', function () {

  it('should merge opts', function () {

    var consul = new Consul({ 'rpc-addr': '127.0.0.1:8400' });
    assert.isNotNull(consul);
    assert.equal(consul.rpc_addr, '127.0.0.1:8400');
    debug('consul', Consul);
  });


  it('command ls should pass', function (done) {
    var consul = new Consul({
      rpc_addr: '127.0.0.1:8400'
    });

    assert.isNotNull(consul);
    var failed = false;
    var err = null;
    consul.command('members').then(function (data) {
      debug('data', data);
      assert.isNotNull(data);
    }).finally(function () {
      degub('finally');
      assert.isFalse(failed);
      assert.isNull(err);
      done();
    });
  });




});


