'use strict';

var app,
    express = require('express'),
    cbCRUD = require('./module/couchbase/crud'),
    morgan = require('morgan'),
    errorHandler = require('errorhandler'),
    cors = require('cors'),
    bodyParser = require('body-parser');

exports.start = function (config) {

    var server,
        JSONTYPES = {
            BOARD: 'board',
            STAGE: 'stage',
            TICKET: 'ticket',
            BRANCH: 'branch',
            AVATAR: 'avatar'
        };

    cbCRUD.connect(config);

    app = express();
    app.use(bodyParser());
    app.use(cors());
    app.set('showStackError', true);
    if (process.env.NODE_ENV === 'development') {
        app.use(morgan('dev'));
    }

    // Break each api area up into their own module

    // Boards
    app.route('/kanban/boards')
        .get(function (req, res) {
            cbCRUD.apiNotSupported(req, res);
        })
        .post(function (req, res) {
            cbCRUD.createDoc(req, res, JSONTYPES.BOARD);
        });
    app.route('/kanban/boards/:id')
        .get(function (req, res) {
            cbCRUD.getDoc(req, res, JSONTYPES.BOARD);
        })
        .put(function (req, res) {
            cbCRUD.updateDoc(req, res, JSONTYPES.BOARD);
        })
        .delete(function (req, res) {
            cbCRUD.deleteDoc(req, res, JSONTYPES.BOARD);
        });

    // Stages
    app.route('/kanban/stages')
        .get(function (req, res) {
            cbCRUD.apiNotSupported(req, res);
        })
        .post(function (req, res) {
            cbCRUD.createDoc(req, res, JSONTYPES.STAGE);
        });
    app.route('/kanban/stages/:id')
        .get(function (req, res) {
            cbCRUD.getDoc(req, res, JSONTYPES.STAGE);
        })
        .put(function (req, res) {
            cbCRUD.updateDoc(req, res, JSONTYPES.STAGE);
        })
        .delete(function (req, res) {
            cbCRUD.deleteDoc(req, res, JSONTYPES.STAGE);
        });

    // Tickets
    app.route('/kanban/tickets')
        .get(function (req, res) {
            cbCRUD.apiNotSupported(req, res);
        })
        .post(function (req, res) {
            cbCRUD.createDoc(req, res, JSONTYPES.TICKET);
        });
    app.route('/kanban/tickets/:id')
        .get(function (req, res) {
            cbCRUD.getDoc(req, res, JSONTYPES.TICKET);
        })
        .put(function (req, res) {
            cbCRUD.updateDoc(req, res, JSONTYPES.TICKET);
        })
        .delete(function (req, res) {
            cbCRUD.deleteDoc(req, res, JSONTYPES.TICKET);
        });

    // Avatars
    app.route('/kanban/avatars')
        .get(function (req, res) {
            cbCRUD.apiNotSupported(req, res);
        })
        .post(function (req, res) {
            cbCRUD.createDoc(req, res, JSONTYPES.AVATAR);
        });
    app.route('/kanban/avatars/:id')
        .get(function (req, res) {
            cbCRUD.getDoc(req, res, JSONTYPES.AVATAR);
        })
        .put(function (req, res) {
            cbCRUD.updateDoc(req, res, JSONTYPES.AVATAR);
        })
        .delete(function (req, res) {
            cbCRUD.deleteDoc(req, res, JSONTYPES.AVATAR);
        });

    if (process.env.NODE_ENV === 'development') {
        app.use(errorHandler());
    }

    server = app.listen(3000, function () {
        console.log('Listening on port %d', server.address().port);
    });
};