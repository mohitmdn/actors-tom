(function () {
    'use strict';

    angular.module('app.page')
        .controller('invoiceCtrl', ['$scope', '$window', invoiceCtrl])
        .controller('authCtrl', ['$scope', '$rootScope', '$window', '$location', 'ApiService', authCtrl]);

    function invoiceCtrl($scope, $window) {
        var printContents, originalContents, popupWin;

        $scope.printInvoice = function() {
            printContents = document.getElementById('invoice').innerHTML;
            originalContents = document.body.innerHTML;
            popupWin = window.open();
            popupWin.document.open();
            popupWin.document.write('<html><head><link rel="stylesheet" type="text/css" href="styles/main.css" /></head><body onload="window.print()">' + printContents + '</html>');
            popupWin.document.close();
        }
    }

    function authCtrl($scope, $rootScope, $window, $location, ApiService) {

        var s = $scope,
            rs = $rootScope;

        s.login = function() {
            ApiService.get('users', s.user).then(function(res){
                if (res[0]) {
                    rs.user = res[0];
                    localStorage.setItem('user', JSON.stringify(rs.user));
                    $location.path('/dashboard')
                } else {
                    s.alert = {
                        show: 1,
                        class: 'alert alert-danger',
                        message: '* Invalid credentials, please try again !'
                    }
                }
            });
        };

        $scope.signup = function() {
            $location.url('/')
        };

        $scope.reset =  function() {
            $location.url('/')
        };

        $scope.unlock =  function() {
            $location.url('/')
        }
    }

})();



