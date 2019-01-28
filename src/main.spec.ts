/* tslint:disable:no-shadowed-variable */
/* tslint:disable:no-unused-variable */
import * as path from 'path';
import * as util from 'util';
import { Options, Consul } from './main';

const httpAddr = '0.0.0.0:8500';

describe('consul', () => {
  it('info', () => {
    const options = new Options(
      /* httpAddr */ httpAddr,
      /* currentWorkingDirectory */ null,
    );

    const consul = new Consul(options);

    return consul.command('info').then( (data) => {
      //console.log('data = ', util.inspect(data, { depth: 10 }));
      expect(data).toBeDefined();
    });
  });

  it('info with callback', () => {
    const options = new Options(
      /* httpAddr */ httpAddr,
      /* currentWorkingDirectory */ null,
    );

    const consul = new Consul(options);

    return consul.command('info', '', (err, data) => {
      //console.log('data = ', util.inspect(data, { depth: 10 }));
      expect(data).toBeDefined();
    });

  });

  it('members', () => {
    const options = new Options(
      /* httpAddr */ httpAddr,
      /* currentWorkingDirectory */ null,
    );

    const consul = new Consul(options);

    return consul.command('members').then( (data) => {
      //console.log('data = ', util.inspect(data, { depth: 10 }));
      expect(data).toBeDefined();
      expect(data.members).toBeDefined();
    });
  });

  // it('join', () => {
  //   const options = new Options(
  //     /* httpAddr */ httpAddr,
  //     /* currentWorkingDirectory */ null,
  //   );

  //   const consul = new Consul(options);

  //   return consul.command('join', '0.0.0.0').then( (data) => {
  //     console.log('data = ', util.inspect(data, { depth: 10 }));
  //     expect(data).toBeDefined();
  //   });
  // });



});
