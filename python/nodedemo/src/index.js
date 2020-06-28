/* -----------------------------------------------------------------------------
| Copyright (c) 2014-2015, Jupyter Development Team.
|
| Distributed under the terms of the Modified BSD License.
|----------------------------------------------------------------------------*/
'use strict';

const services = require('@jupyterlab/services');

// Start a new session.
/*const options = {
    path: 'foo.ipynb',
    type: 'notebook',
    name: 'foo.ipynb',
    kernel: {
        name: 'python'
    }
};*/

const options = {
    "id": "60d376e6-4bf8-43cb-b445-fd5666ef8e92",
    "path": "python/notebook.ipynb",
    "name": "",
    "type": "notebook",
    "kernel": {
        "id": "cec6d5d3-c981-410d-80aa-84e497104acb",
        "name": "python37664bitc19aeaa1b3c44a0185e775a55f3e087c",
        "last_activity": "2020-06-26T17:36:41.657610Z",
        "execution_state": "idle",
        "connections": 1
    }
}

/* eslint-disable no-console */
console.log('Starting session...');
const kernelManager = new services.KernelManager();
const sessionManager = new services.SessionManager({ kernelManager });

console.log(sessionManager);

let session;
sessionManager
    .startNew(options)
    .then(function (s) {
        // Rename the session.
        session = s;
        return session.setPath('example.ipynb');
    })
    .then(function () {
        console.log('Session renamed to', session.path);
        // Execute and handle replies on the kernel.
        const future = session.kernel.requestExecute({ code: 'a = 1' });
        future.onReply = function (reply) {
            console.log('Got execute reply', reply);
        };
        return future.done;
    })
    .then(function () {
        console.log('Future is fulfilled');
        // Shut down the session.
        return session.shutdown();
    })
    /* .then(function () {
         console.log('Session shut down');
         process.exit(0);
     })*/
    .catch(function (err) {
        console.error(err);
        process.exit(1);
    });