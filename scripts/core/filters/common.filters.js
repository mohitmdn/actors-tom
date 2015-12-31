(function () {
    'use strict';

    angular.module('app')
        .filter('array', [arrayFilter]);

    function arrayFilter() {
        return function(items) {
            var filtered = [];
            angular.forEach(items, function(item, item_id) {
                filtered.push(item);
            });
            return filtered;
        };
    }

})();
