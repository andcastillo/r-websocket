/* -----------------------------------------------------------------------------
| Copyright (c) 2014-2015, Jupyter Development Team.
|
| Distributed under the terms of the Modified BSD License.
|----------------------------------------------------------------------------*/
'use strict';

const services = require('@jupyterlab/services');
const Session = services.Session;
const SessionAPI = services.SessionAPI;


const sessionInfo = { "id": "b28bf645-e3a9-4710-b238-b99e41be5874", "path": "Documents/git/andcastillo/r-websocket/python/notebook.ipynb", "name": "", "type": "notebook", "kernel": { "id": "10649cd7-a869-414f-826f-834d38ae4d0a", "name": "python37664bitc19aeaa1b3c44a0185e775a55f3e087c", "last_activity": "2020-06-28T03:08:21.180501Z", "execution_state": "idle", "connections": 1 }, "notebook": { "path": "Documents/git/andcastillo/r-websocket/python/notebook.ipynb", "name": "" } }

const options2 = {
  "baseUrl": "http://localhost:8888/",
  "token": "928873ca57ab2295437f8ba1c634c0eacd01c6343d7c8379"
}
/* eslint-disable no-console */
console.log('Connecting to kernel');
const kernelManager = new services.KernelManager(options2);
const sessionManager = new services.SessionManager({ kernelManager });


console.log('Connect to a given session and execute a command');

const session = sessionManager.connectTo({ model: sessionInfo });
console.log(`Connected to ${session.kernel.name}`);

const future = session.kernel.requestExecute({ code: 'a = c + 1999' });
future.onReply = function (reply) {
  console.log('Got execute reply', reply);
};


