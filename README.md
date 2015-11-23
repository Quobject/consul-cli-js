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
var consul = new Consul({
  
});

consul.command('create machinename').then(function (data) {
  console.log('data = ', data); 
});

//

```

With callback:

```js

consul.command('create machinename', function (err, data) {
  console.log('data = ', data);
});

```
