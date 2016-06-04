# consul-cli-js
A node.js wrapper for the [consul](https://www.consul.io/) command line tool

[![NPM](https://nodei.co/npm/consul-cli-js.png?downloads=true&downloadRank=true)](https://nodei.co/npm/consul-cli-js/)
[![NPM](https://nodei.co/npm-dl/consul-cli-js.png?months=6&height=3)](https://nodei.co/npm/consul-cli-js/)

[![NPM version][npm-image]][npm-url]
[![NPM downloads][downloads-image]][downloads-url]

## Installation

### Step 1: Prerequisites

The consul binary must be installed and accessible in the path [e.g. Installing Consul](https://www.consul.io/intro/getting-started/install.html)

### Step 2: Installation
    
    npm install consul-cli-js
    
Then:

```js
var consulCli = require('consul-cli-js');
var Options = consulCli.Options;
var Consul = consulCli.Consul;
```

## Usage

With promise

```js
var options = new Options(
  /* rpcAddr    */ '0.0.0.0:8400',
  /* currentWorkingDirectory */ null
);

var consul = new Consul(options);

consul.command('members').then(function (data) {
  console.log('data = ', data); 
});

//data =  { command: 'consul members -rpc-addr 52.91.162.186:8400  ',
//  raw: 'Node     Address          Status  Type    Build  Protocol  DC\\nconsul1  10.0.0.90:8301   alive   server  0.5.2  2
//      dc1\\nconsul2  10.0.0.99:8301   alive   server  0.5.2  2         dc1\\nconsul3  10.0.0.213:8301  alive   server  0.5.2  2
//dc1\\n',
//members:
//[ { node: 'consul1',
//  address: '10.0.0.90:8301',
//  status: 'alive',
//  type: 'server',
//  build: '0.5.2',
//  protocol: '2',
//  dc: 'dc1' },
//  { node: 'consul2',
//    address: '10.0.0.99:8301',
//    status: 'alive',
//    type: 'server',
//    build: '0.5.2',
//    protocol: '2',
//    dc: 'dc1' },
//  { node: 'consul3',
//    address: '10.0.0.213:8301',
//    status: 'alive',
//    type: 'server',
//    build: '0.5.2',
//    protocol: '2',
//    dc: 'dc1' } ],
//  allMembersAlive: true }

```

With callback:

```js

consul.command('members', '', function (err, data) {
  console.log('data = ', data);
});

```


Typescript

```js
import { Consul, Options } from './index';

const options = new Options(
  /* rpcAddr */ '0.0.0.0:8400',
  /* currentWorkingDirectory */ null
);

const consul = new Consul(options);

return consul.command('info', '', function (err, data) {
  console.log('data = ', data);
});

```






* join

```js
consul.command('join', '54.86.97.135').then(function (data) {
  console.log('data = ', data); 
});

//data = {
//  command: 'consul join -rpc-addr 52.91.162.186:8400  54.86.97.135',
//  raw: 'Successfully joined cluster by contacting 1 nodes.\\n',
//  line: 'Successfully joined cluster by contacting 1 nodes.',
//  success: true
//}

```


* info

```js
consul.command('info').then(function (data) {
  console.log('data = ', data); 
});

//data = {
//  command: 'consul info -rpc-addr 54.165.211.120:8400  ',
//  raw: 'WARNING: It is highly recommended to set GOMAXPROCS higher than 1\\n\\nagent:\\n\\tcheck_monitors = 0\\n\\tcheck_ttls = 0\\n\\tchecks = 0\\n\\tservices = 1\\nbuild:\\n\\tprerelease = \\n\\trevision = 9a9cc934\\n\\tversion = 0.5.2\\nconsul:\\n\\tbootstrap = true\\n\\tknown_datacenters = 1\\n\\tleader = true\\n\\tserver = true\\nraft:\\n\\tapplied_index = 192\\n\\tcommit_index = 192\\n\\tfsm_pending = 0\\n\\tlast_contact = never\\n\\tlast_log_index = 192\\n\\tlast_log_term = 1\\n\\tlast_snapshot_index = 0\\n\\tlast_snapshot_term = 0\\n\\tnum_peers = 0\\n\\tstate = Leader\\n\\tterm = 1\\nruntime:\\n\\tarch = amd64\\n\\tcpu_count = 1\\n\\tgoroutines = 54\\n\\tmax_procs = 1\\n\\tos = linux\\n\\tversion = go1.4.2\\nserf_lan:\\n\\tencrypted = false\\n\\tevent_queue = 1\\n\\tevent_time = 2\\n\\tfailed = 0\\n\\tintent_queue = 0\\n\\tleft = 0\\n\\tmember_time = 1\\n\\tmembers = 1\\n\\tquery_queue = 0\\n\\tquery_time = 1\\nserf_wan:\\n\\tencrypted = false\\n\\tevent_queue = 0\\n\\tevent_time = 1\\n\\tfailed = 0\\n\\tintent_queue = 0\\n\\tleft = 0\\n\\tmember_time = 1\\n\\tmembers = 1\\n\\tquery_queue = 0\\n\\tquery_time = 1\\n',
//  lines:
//   ['WARNING: It is highly recommended to set GOMAXPROCS higher than 1',
//     '',
//     'agent:',
//     '\tcheck_monitors = 0',
//     '\tcheck_ttls = 0',
//     '\tchecks = 0',
//     '\tservices = 1',
//     'build:',
//     '\tprerelease = ',
//     '\trevision = 9a9cc934',
//     '\tversion = 0.5.2',
//     'consul:',
//     '\tbootstrap = true',
//     '\tknown_datacenters = 1',
//     '\tleader = true',
//     '\tserver = true',
//     'raft:',
//     '\tapplied_index = 192',
//     '\tcommit_index = 192',
//     '\tfsm_pending = 0',
//     '\tlast_contact = never',
//     '\tlast_log_index = 192',
//     '\tlast_log_term = 1',
//     '\tlast_snapshot_index = 0',
//     '\tlast_snapshot_term = 0',
//     '\tnum_peers = 0',
//     '\tstate = Leader',
//     '\tterm = 1',
//     'runtime:',
//     '\tarch = amd64',
//     '\tcpu_count = 1',
//     '\tgoroutines = 54',
//     '\tmax_procs = 1',
//     '\tos = linux',
//     '\tversion = go1.4.2',
//     'serf_lan:',
//     '\tencrypted = false',
//     '\tevent_queue = 1',
//     '\tevent_time = 2',
//     '\tfailed = 0',
//     '\tintent_queue = 0',
//     '\tleft = 0',
//     '\tmember_time = 1',
//     '\tmembers = 1',
//     '\tquery_queue = 0',
//     '\tquery_time = 1',
//     'serf_wan:',
//     '\tencrypted = false',
//     '\tevent_queue = 0',
//     '\tevent_time = 1',
//     '\tfailed = 0',
//     '\tintent_queue = 0',
//     '\tleft = 0',
//     '\tmember_time = 1',
//     '\tmembers = 1',
//     '\tquery_queue = 0',
//     '\tquery_time = 1',
//     ''],
//  info:
//   {
//     agent: { check_monitors: 0, check_ttls: 0, checks: 0, services: 1 },
//     build: { prerelease: '', revision: '9a9cc934', version: '0.5.2' },
//     consul:
//      {
//        bootstrap: true,
//        known_datacenters: 1,
//        leader: true,
//        server: true
//      },
//     raft:
//      {
//        applied_index: 192,
//        commit_index: 192,
//        fsm_pending: 0,
//        last_contact: 'never',
//        last_log_index: 192,
//        last_log_term: 1,
//        last_snapshot_index: 0,
//        last_snapshot_term: 0,
//        num_peers: 0,
//        state: 'Leader',
//        term: 1
//      },
//     runtime:
//      {
//        arch: 'amd64',
//        cpu_count: 1,
//        goroutines: 54,
//        max_procs: 1,
//        os: 'linux',
//        version: 'go1.4.2'
//      },
//     serf_lan:
//      {
//        encrypted: false,
//        event_queue: 1,
//        event_time: 2,
//        failed: 0,
//        intent_queue: 0,
//        left: 0,
//        member_time: 1,
//        members: 1,
//        query_queue: 0,
//        query_time: 1
//      },
//     serf_wan:
//      {
//        encrypted: false,
//        event_queue: 0,
//        event_time: 1,
//        failed: 0,
//        intent_queue: 0,
//        left: 0,
//        member_time: 1,
//        members: 1,
//        query_queue: 0,
//        query_time: 1
//      }
//   }
//}

```

## License

MIT

[npm-image]: https://img.shields.io/npm/v/consul-cli-js.svg?style=flat
[npm-url]: https://npmjs.org/package/consul-cli-js
[downloads-image]: https://img.shields.io/npm/dm/consul-cli-js.svg?style=flat
[downloads-url]: https://npmjs.org/package/consul-cli-js

