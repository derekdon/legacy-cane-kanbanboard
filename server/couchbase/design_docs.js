/**
 * This sets up the required Couchbase design documents and their views for the application.
 */

var couchbase = require('couchbase'),
    cbUtils = require("./utils"),
    kanbanBucket;

exports.setup = function (config) {

    "use strict";

    kanbanBucket = new couchbase.Connection(config, function (e) {

        if (e) {
            cbUtils.exitOnConnectionFail(config, e);
        } else {
            cbUtils.connectionSuccess(config);
        }

        kanbanBucket.getDesignDoc("board", function (e, ddoc, meta) {

            var board_by_id = {
                    map: [ 'function(doc, meta) {',
                                'if (doc.jsonType && doc.jsonType == "board") { ',
                                    'emit(doc.id, doc);',
                                '}',
                            '}'
                        ].join('\n')
                },
                board_design;

            if (e) {
                console.log("Creating the 'board' design doc");

                board_design = { views: {by_id: board_by_id} };

                kanbanBucket.setDesignDoc("board", board_design, function (e, res) {
                    if (e) {
                        console.log("ERROR" + e);
                    } else if (res && res.ok) {
                        console.log("Updated " + res.id);
                    }
                    cbUtils.exitWithCode(0);
                });

            } else if (!ddoc.views.hasOwnProperty("by_id")) {

                console.log("Updating the 'board' design doc");

                ddoc.views.by_id = board_by_id;

                kanbanBucket.setDesignDoc("board", ddoc, function (e, res) {
                    if (e) {
                        console.log("ERROR" + e);
                    } else if (res && res.ok) {
                        console.log("Updated " + res.id);
                    }
                    cbUtils.exitWithCode(0);
                });

            } else {
                console.log("Couchbase 'board' 'by_id' already setup");
                cbUtils.exitWithCode(0);
            }
        });
    });
};

exports.reset = function (config) {

    "use strict";

    kanbanBucket = new couchbase.Connection(config, function (e) {

        if (e) {
            cbUtils.exitOnConnectionFail(config, e);
        } else {
            cbUtils.connectionSuccess(config);
        }

        kanbanBucket.removeDesignDoc("board", function (e) {
            if (e) {
                console.log(e);
            } else {
                console.log("Couchbase 'board' design doc has been removed");
            }
            cbUtils.exitWithCode(0);
        });
    });
};

// Add the rest...