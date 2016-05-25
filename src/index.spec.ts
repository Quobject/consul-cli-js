/* tslint:disable:no-shadowed-variable */
/* tslint:disable:no-unused-variable */
import test = require('blue-tape');
import * as path from 'path';
import * as util from 'util';
import { Consul, Options } from './index';

test('Consul', t => {

  t.test('info', t => {
    const options = new Options(
      /* rpcAddr */ '0.0.0.0:8400',
      /* currentWorkingDirectory */ null
    );

    const consul = new Consul(options);

    return consul.command('info').then(function (data) {
      //console.log('data = ', util.inspect(data, { depth: 10 }));
      t.ok(data);
      //t.ok(data.object.ok);
    });

  });

  t.test('info with callback', t => {
    const options = new Options(
      /* rpcAddr */ '0.0.0.0:8400',
      /* currentWorkingDirectory */ null
    );

    const consul = new Consul(options);

    return consul.command('info', '', function (err, data) {
      //console.log('data = ', util.inspect(data, { depth: 10 }));
      t.ok(data);
      t.ok(data.info);
    });

  });

  t.test('members', t => {
    const options = new Options(
      /* rpcAddr */ '0.0.0.0:8400',
      /* currentWorkingDirectory */ null
    );

    const consul = new Consul(options);

    return consul.command('members').then(function (data) {
      //console.log('data = ', util.inspect(data, { depth: 10 }));
      t.ok(data);
      t.ok(data.members);
    });

  });

  t.test('join', t => {
    const options = new Options(
      /* rpcAddr */ '0.0.0.0:8400',
      /* currentWorkingDirectory */ null
    );

    const consul = new Consul(options);

    return consul.command('join', '0.0.0.0').then(function (data) {
      //console.log('data = ', util.inspect(data, { depth: 10 }));
      t.ok(data);
    });

  });


});
