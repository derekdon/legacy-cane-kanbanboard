'use strict';

var cb = require('couchbase'),
    bucket,
    cbUtils = require('./utils'),
    util = require('util'),
    JSON_STATUS = {
        ERROR: 'error',
        SUCCESS: 'success'
    };

// Create bucket connection

exports.connect = function (config) {
    bucket = new cb.Connection(config, function (e) {
        if (e) {
            cbUtils.exitOnConnectionFail(config, e);
        } else {
            cbUtils.connectionSuccess(config);
        }
    });
};

// Define helpers

function APIError(statusCode, message) {
    Error.call(this);
    this.statusCode = statusCode;
    this.message = message || '';
}
util.inherits(APIError, Error);

function checkDocJsonType(expected, doc) {
    if (doc === undefined) {
        throw new APIError(400, 'doc is undefined.');
    } else if (!doc.jsonType) {
        throw new APIError(400, 'doc.jsonType does not exist.');
    } else if (expected !== doc.jsonType) {
        throw new APIError(400, 'doc.jsonType was ' + doc.jsonType + ' when expected ' + expected + '.');
    }
}

function successResponse(data, res, resJson) {
    resJson = typeof resJson === 'object' ? resJson : {};
    resJson.status = JSON_STATUS.SUCCESS;
    resJson.data = data;
    res.json(resJson);
}

function errorResponse(err, res, resJson) {
    console.log(err);
    resJson = typeof resJson === 'object' ? resJson : {};
    resJson.status = JSON_STATUS.ERROR;
    resJson.message = err.message;
    res.json(err.statusCode || 500, resJson);
}

exports.apiNotSupported = function apiNotSupported(req, res) {
    errorResponse(new APIError(405, 'This API does not support this type of request.'), res);
};

// Define CRUD Methods

exports.createDoc = function (req, res, jsonType) {
    try {
        var doc = req.body,
            data = {};

        checkDocJsonType(jsonType, doc);

        doc._id = cbUtils.genDocId(jsonType);
        bucket.add(doc._id, doc, function (err, result) {
            try {
                if (err) {
                    throw new APIError(500, 'Unable to create document with id ' + doc._id + '.');
                } else {
                    data[jsonType] = doc;
                    data.cas = result.cas;
                    successResponse(data, res);
                }
            } catch (err) {
                errorResponse(err, res);
            }
        });
    } catch (err) {
        errorResponse(err, res);
    }
};

exports.readDoc = function (req, res, jsonType) {
    var id = req.params.id;
    bucket.get(id, function (err, result) {
        try {
            var doc = result.value,
                data = {};

            if (err || doc === undefined) {
                throw new APIError(404, 'Unable to find document with id ' + id + '.');
            } else {
                doc._id = id;
                data[jsonType] = doc;
                successResponse(data, res);
            }
        } catch (err) {
            errorResponse(err, res);
        }
    });
};
exports.getDoc = exports.readDoc;

exports.updateDoc = function (req, res, jsonType) {
    try {
        var doc = req.body;

        checkDocJsonType(jsonType, doc);

        doc._id = req.params.id;

        // TODO: Check if the doc exists first! Otherwise this will create a new doc.

        bucket.set(doc._id, doc, function (err, result) {
            try {
                if (err) {
                    throw new APIError(404, 'Unable to update document with id ' + doc._id + '.');
                } else {
                    successResponse({_id: doc._id, jsonType: jsonType, cas: result.cas}, res);
                }
            } catch (err) {
                errorResponse(err, res);
            }
        });
    } catch (err) {
        errorResponse(err, res);
    }
};

exports.deleteDoc = function (req, res, jsonType) {
    var id = req.params.id;
    bucket.remove(id, function (err, result) {
        try {
            if (err) {
                throw new APIError(404, 'Unable to delete document with id ' + id + '.');
            } else {
                successResponse({_id: id, jsonType: jsonType, cas: result.cas}, res);
            }
        } catch (err) {
            errorResponse(err, res);
        }
    });
}