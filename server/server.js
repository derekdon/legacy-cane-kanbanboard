var app,
    express = require("express"),
    cb = require("couchbase"),
    cbUtils = require("./couchbase/utils"),
    _ = require("underscore"),
    avatarsIO = require("avatars.io"),
    morgan = require("morgan"),
    errorHandler = require("errorhandler"),
    cors = require("cors");

exports.start = function (config) {

    "use strict";

    var kanbanBucket,
        server;

    kanbanBucket = new cb.Connection(config, function (e) {
        if (e) {
            cbUtils.exitOnConnectionFail(config, e);
        } else {
            cbUtils.connectionSuccess(config);
        }
    });

    function getDocById(req, res, jsonType) {
        kanbanBucket.get(req.params.id, function (e, result) {

            var doc = result.value,
                resJson = {},
                data = {},
                FIELDS_SUFFIX = "Fields";

            try {
                if (doc === undefined) {
                    res.send(404);
                } else {
                    doc.id = req.params.id;
                    data[jsonType] = doc;
                    data[jsonType + FIELDS_SUFFIX] = _.map(doc, function (val, key) {
                        return {"key": key, "value": val};
                    });
                    resJson.status = "success";
                    resJson.data = data;
                    res.json(resJson);
                }
            } catch (err) {
                console.log(err);
                resJson.status = "error";
                resJson.data = {message: err.message};
                res.json(resJson);
            }
        });
    }

    app = express();
    app.use(cors());
    app.set("showStackError", true);
    if (process.env.NODE_ENV === "development") {
        app.use(morgan("dev"));
    }

    // Break each api area up into their own module
    app.route("/kanban/avatar/show/:id")
        .get(function (req, res, next) {
            getDocById(req, res, cbUtils.JSONTYPES.AVATAR);
        });

    app.route("/kanban/board/show/:id")
        .get(function (req, res, next) {
            getDocById(req, res, cbUtils.JSONTYPES.BOARD);
        });

    app.route("/kanban/stage/show/:id")
        .get(function (req, res, next) {
            getDocById(req, res, cbUtils.JSONTYPES.STAGE);
        });

    app.route("/kanban/ticket/show/:id")
        .get(function (req, res, next) {
            getDocById(req, res, cbUtils.JSONTYPES.TICKET);
        });

    if (process.env.NODE_ENV === "development") {
        app.use(errorHandler());
    }

    server = app.listen(3000, function () {
        console.log("Listening on port %d", server.address().port);
    });
};