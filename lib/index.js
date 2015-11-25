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
'use strict';

var Promise = require("bluebird");
var exec = Promise.promisify(require('child_process').exec);
var os = require('os');
var cliTable2Json = require('cli-table-2-json');
var util = require('util');
var _ = require('lodash');

var Consul = function (opts) {
  if (!(this instanceof Consul)) {
    return new Consul(opts);
  }

  _.merge(this, opts); 
};

Consul.prototype.command = function (command, command2, callback) {
  var debug = require('debug')('consul-cli-js:lib/index.js command');
  var self = this;
  var exec_command = 'consul ';
  var last_command_part = '';

  if (typeof command2 === 'string' || command2 instanceof String) {
    last_command_part = command2;
  } else {
    callback = command2;
  }


  return Promise.resolve().then(function () {
    var params = _.reduce(self, function (result, value, key) {
      result += util.format('-%s %s ', key, value);
      return result;
    }, '');

    exec_command += command + ' ' + params + ' ' + last_command_part;
    debug('exec_command', exec_command);

    var exec_options = {
      env: {
        HOME: process.env.HOME,
        PATH: process.env.PATH,
        DEBUG: ''
      }
    };
    if (self.cwd) {
      exec_options.cwd = self.cwd;
    }
    //console.log('exec options =', exec_options);

    return exec(exec_command, exec_options);

  }).then(function (data) {

    var result = {
      command: exec_command,
      raw: JSON.stringify(data)
    };
    return extractResult(result);

  }).nodeify(callback);
};

module.exports = Consul;

var extractResult = function (result) {

  var extracterArray = [
  {
    re: / members /,
    run: function (resultp) {
      var obj = JSON.parse(resultp.raw);
      var lines = obj[0].split(os.EOL);
      resultp.members = cliTable2Json(lines);
      resultp.allMembersAlive = true;

      resultp.members.forEach(function (member) {
        if (member.status !== 'alive') {
          resultp.allMembersAlive = false;
        }
      });

      return resultp;
    }
  },
  {
    re: / join /,
    run: function (resultp) {
      var obj = JSON.parse(resultp.raw);
      var line = obj[0].trim();
      resultp.line = line;
      resultp.success = _.startsWith(line, 'Successfully');

      return resultp;
    }
  },
  {
    re: / info /,
    run: function (resultp) {
      var obj = JSON.parse(resultp.raw);
      var lines = obj[0].split(os.EOL);
      resultp.lines = lines;
      resultp.info = infoLines2Json(lines);

      return resultp;
    }
  }


  ];


  extracterArray.forEach(function (extracter) {
    var re = extracter.re;
    var str = result.command;
    var m;

    if ((m = re.exec(str)) !== null) {
      if (m.index === re.lastIndex) {
        re.lastIndex++;
      }
      // View your result using the m-variable.
      // eg m[0] etc.
      return extracter.run(result);
    }
  });

  return result;
};


var infoLines2Json = function (lines) {
  var debug = require('debug')('consul-cli-js:lib/index.js infoLines2Json');
  var result = {};

  var header = false;

  lines.forEach(function (line) {
    //debug(line);
    if (_.endsWith(line, ':')) {
      header = line.substring(0, line.length - 1);
      //debug('header', header);
      result[header] = {};
    } else if (header !== false) {
      //debug('not header');
      var parts = line.trim().split('=');
      var key = parts[0].trim();
      var value = parts[1] ? parts[1].trim() : '';
      if (key.length > 0) {
        if (value === 'true') {
          value = true;
        } else if (value === 'false') {
          value = false;
        } else if (value !== '' && !isNaN(value)) {
          value = parseInt(value);
        }
        result[header][key] = value;
      }
    }

  });
  return result;

};
