'use strict';

var shortId = require('shortid');

exports.genDocId = function (jsonType) {
    var DELIM = '::',
        generatedDocId = jsonType + DELIM + shortId.generate();
    console.log(generatedDocId);
    return generatedDocId;
};

exports.exitWithCode = function (code) {
    console.log('Application terminating with exit code: ' + code);
    process.exit(code);
};

exports.exitOnConnectionFail = function (config, e) {
    console.log('Unable to connect to the couchbase cluster, check the config:');
    console.log(config);
    console.log(e);
    exports.exitWithCode(1);
};

exports.connectionSuccess = function (config) {
    console.log('Connected to the "' + config.bucket + '" bucket in the "' + config.host + '" couchbase cluster');
};