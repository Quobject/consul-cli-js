# consul-cli-js
A node.js wrapper for the [consul](https://www.consul.io/) command line tool

[![NPM](https://nodei.co/npm/consul-cli-js.png?downloads=true&downloadRank=true)](https://nodei.co/npm/consul-cli-js/)
[![NPM](https://nodei.co/npm-dl/consul-cli-js.png?months=6&height=3)](https://nodei.co/npm/consul-cli-js/)

## Installation

### Step 1: Prerequisites

The consul binary must be installed and accessible in the path [e.g. Installing Consul](https://www.consul.io/intro/getting-started/install.html)

### Step 2: Installation
    
    npm install consul-cli-js
    
Then:

```js
var Consul = require('consul-cli-js');
```

## Usage

With promise

```js
var consul = new Consul({ 'rpc-addr': '52.91.162.186:8400' });


consul.command('members').then(function (data) {
  console.log('data = ', data); 
});

//data =  { command: 'consul members -rpc-addr 52.91.162.186:8400  ',
//  raw: '["Node     Address          Status  Type    Build  Protocol  DC\\nconsul1  10.0.0.90:8301   alive   server  0.5.2  2
//      dc1\\nconsul2  10.0.0.99:8301   alive   server  0.5.2  2         dc1\\nconsul3  10.0.0.213:8301  alive   server  0.5.2  2
//dc1\\n",""]',
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
//    dc: 'dc1' } ] }

```

With callback:

```js

consul.command('members', function (err, data) {
  console.log('data = ', data);
});

```

* join

consul.command('join', '54.86.97.135').then(function (data) {
  console.log('data = ', data); 
});

//data = {
//  command: 'consul join -rpc-addr 52.91.162.186:8400  54.86.97.135',
//  raw: '["Successfully joined cluster by contacting 1 nodes.\\n",""]',
//  line: 'Successfully joined cluster by contacting 1 nodes.',
//  success: true
//}

