'use strict';

var _ = require('underscore');

exports = angular.module('kanbanboard.common.services', [
        require('../config').name
    ])
    .service('CBDocService', function ($http, API) {
        var service = this,
            baseTemplateText = API + '<%= jsonType %>s',
            itemsTemplate = _.template(baseTemplateText),
            singleItemTemplate = _.template(baseTemplateText + '/<%= id %>');

        service.createItem = function (item) {
            if (item._id) {
                return service.updateItem(item);
            }
            return $http.post(itemsTemplate({jsonType: item.jsonType}), item);
        };

        service.getItem = function (id, jsonType) {
            return $http.get(singleItemTemplate({jsonType: jsonType, id: id}));
        };
        service.showItem = service.getItem;

        service.updateItem = function (item) {
            if (!item._id) {
                return service.createItem(item);
            }
            return $http.put(singleItemTemplate({jsonType: item.jsonType, id: item._id}), item);
        };

        service.deleteItem = function (item) {
            return $http.delete(singleItemTemplate({jsonType: item.jsonType, id: item._id}));
        };
    });