const kernel = API.cache('kernel');

console.log('Executing:', code);
// Execute and handle replies on the kernel.
const future = kernel.requestExecute({ code: code });
// record each IOPub message
future.onIOPub = function (msg) {
    console.log('Got IOPub:', msg);
    $('#output').append(
        $('<pre>').text('msg_type: ' + msg.header.msg_type)
    );
    $('#output').append($('<pre>').text(JSON.stringify(msg.content)));
};

future.onReply = function (reply) {
    console.log('Got execute reply', reply);
};

future.done.then(function () {
    console.log('Future is fulfilled');
    $('#output').append($('<pre>').text('Done!'));
});