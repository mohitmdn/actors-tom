(function () {
    'use strict';

    angular.module('app')
        .controller('AppCtrl', [ '$scope', '$rootScope', '$document', '$location', 'ApiService', '$routeParams', AppCtrl]);


    function AppCtrl($scope, $rootScope, $document, $location, ApiService, $routeParams) {

        var s = $scope,
            rs = $rootScope;

        //s.init = function() {
        //    if (!rs.user) {
        //        $location.path('/pages/signin');
        //    }
        //};
        //s.init();

        var getExtraActorDetails = function(table, column) {
            ApiService.get(table).then(function(res){
                rs[table] = res;
                angular.forEach(rs[table], function(elem){
                    if (!rs.actors[elem.actor_id][column]) {
                        rs.actors[elem.actor_id][column] = [];
                    }
                    rs.actors[elem.actor_id][column].push(elem);
                });
            });
        };

        if (!rs.actors) {
            rs.actors = {};
            ApiService.get('actors').then(function(actors){

                angular.forEach(actors, function(actor){
                    rs.actors[actor.id] = actor;
                });

                getExtraActorDetails('actors_photos', 'photos');
                getExtraActorDetails('actors_reel', 'reel');
                getExtraActorDetails('actors_resume', 'resume');
                getExtraActorDetails('actors_resume_extra', 'resume_extra');

                if ($routeParams.actorId) {
                    rs.actor = rs.actors[$routeParams.actorId]
                }
            });
        } else {
            if ($routeParams.actorId) {
                rs.actor = rs.actors[$routeParams.actorId]
            }
        }

        s.color = {
            primary: '#7992BF',
            success: '#A9DC8E',
            info: '#6BD5C3',
            infoAlt: '#A085E4',
            warning: '#ECD48B',
            danger: '#ED848F',
            gray: '#DCDCDC'
        };

        rs.$on("$routeChangeSuccess", function (event, currentRoute, previousRoute) {
            $document.scrollTo(0, 0);
        });

        $('.fancybox').fancybox();
        $('.datepicker').datepicker();
    }

})();
