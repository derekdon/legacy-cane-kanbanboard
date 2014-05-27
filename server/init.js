'use strict';

var appServer = require('./server'),
    cbDesignDocs = require('./module/couchbase/design_docs'),
    cbConfig = {
        host: ['localhost:8091'],
        bucket: 'kanbanboard'
    },
    argv;

if (require.main === module) {
    argv = process.argv.splice(2);
    if (argv[0] === '--setup') { // Create the required design documents
        cbDesignDocs.setup(cbConfig);
    } else if (argv[0] === '--reset') {  // Reset what was done by -d option
        cbDesignDocs.reset(cbConfig);
    } else {
        appServer.start(cbConfig);
    }
}