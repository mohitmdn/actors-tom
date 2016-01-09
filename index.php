<!doctype html>
<html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>Actors</title>
        <meta name="description" content="">
        <meta name="keywords" content="">
        <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1">
        <link rel="stylesheet" href="styles/_.css">
    </head>
    <body data-ng-app="app" id="app" class="app" data-custom-page
          data-off-canvas-nav data-ng-controller="AppCtrl" data-ng-class="'layout-boxed'">
        <!--[if lt IE 9]>
            <div class="lt-ie9-bg">
                <p class="browsehappy">You are using an <strong>outdated</strong> browser.</p>
                <p>Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
            </div>
        <![endif]-->
        <header data-ng-include="'views/template/header.html'" id="header"
                class="header-container" data-ng-class="'header-fixed bg-white'">
	    </header>
        <div class="main-container" data-ng-class="'app-nav-horizontal'">
            <aside data-ng-include="'views/template/sidebar.html'" id="nav-container"
                   class="nav-container" data-ng-class="'nav-horizontal bg-dark'"></aside>
            <div id="content" class="content-container">
                <section data-ng-view class="view-container animate-fade-up"></section>
            </div>
        </div>

        
        <!-- build:js scripts/vendor.js -->
        <script src="lib/jquery/dist/jquery.min.js"></script>
        <script src="lib/angular/angular.min.js"></script>
        <script src="lib/angular-route/angular-route.min.js"></script>
        <script src="lib/angular-aria/angular-aria.min.js"></script>
        <script src="lib/angular-animate/angular-animate.min.js"></script>
        <!-- endbuild -->

        <!-- build:js scripts/ui.js -->
        <script src="lib/angular-bootstrap/ui-bootstrap-tpls.min.js"></script>
        <script src="lib/toastr/toastr.min.js"></script>
        <script src="lib/jquery.slimscroll/jquery.slimscroll.min.js"></script>
        <script src="lib/angular-loading-bar/build/loading-bar.min.js"></script>
        <script src="lib/angular-scroll/angular-scroll.min.js"></script>

        <script src="lib/flot/jquery.flot.js"></script>
        <script src="lib/flot/jquery.flot.resize.js"></script>
        <script src="lib/flot/jquery.flot.pie.js"></script>
        <script src="scripts/vendors/jquery.flot.orderBars.js"></script>
        <script src="lib/flot/jquery.flot.stack.js"></script>
        <script src="lib/flot.curvedlines/curvedLines.js"></script>
        <script src="lib/flot.tooltip/js/jquery.flot.tooltip.min.js"></script>
        <script src="lib/flot/jquery.flot.time.js"></script>
        <script src="lib/jquery.easy-pie-chart/dist/angular.easypiechart.min.js"></script>
        <script src="scripts/vendors/jquery.sparkline.min.js"></script>

        <script src="lib/ngmap/build/scripts/ng-map.min.js"></script>
        <script src="scripts/vendors/jquery-jvectormap-1.2.2.min.js"></script>
        <script src="scripts/vendors/jquery-jvectormap-world-mill-en.js"></script>

        <script src="lib/textAngular/dist/textAngular-rangy.min.js"></script>
        <script src="lib/textAngular/dist/textAngular.min.js"></script>
        <script src="lib/textAngular/dist/textAngular-sanitize.min.js"></script>

        <script src="lib/moment/min/moment.min.js"></script>
        <script src="lib/fullcalendar/dist/fullcalendar.min.js"></script>
        <script src="lib/angular-ui-calendar/src/calendar.js"></script>

        <script src="lib/angular-translate/angular-translate.min.js"></script>
        <script src="lib/angular-translate-loader-static-files/angular-translate-loader-static-files.min.js"></script>

        <script src="lib/ng-tags-input/ng-tags-input.min.js"></script>
        <script src="lib/angular-ui-tree/dist/angular-ui-tree.min.js"></script>
        <script src="lib/jquery-spinner/dist/jquery.spinner.min.js"></script>
        <script src="lib/seiyria-bootstrap-slider/dist/bootstrap-slider.min.js"></script>
        <script src="lib/jquery-steps/build/jquery.steps.min.js"></script>
        <script src="lib/bootstrap-file-input/bootstrap.file-input.js"></script>
        <script src="lib/fancybox/source/jquery.fancybox.pack.js"></script>
        <script src="lib/jquery-ui/jquery-ui.min.js"></script>
        <!-- endbuild -->

        <!-- build:js({.tmp,client}) scripts/app.js -->
        <script src="scripts/app.js"></script>
        <script src="scripts/core/controllers/AppCtrl.js"></script>
        <script src="scripts/core/filters/common.filters.js"></script>
        <script src="scripts/core/services/api.service.js"></script>
        <script src="scripts/core/i18n/i18n.js"></script>
        <script src="scripts/core/config/routes.js"></script>

        <script src="scripts/chart/chart.module.js"></script>
        <script src="scripts/chart/chart.controller.js"></script>
        <script src="scripts/chart/chart.directive.js"></script>

        <script src="scripts/form/form.module.js"></script>
        <script src="scripts/form/form.controller.js"></script>
        <script src="scripts/form/form.directive.js"></script>
        <script src="scripts/form/formValidation.module.js"></script>
        <script src="scripts/form/formValidation.controller.js"></script>
        <script src="scripts/form/formValidation.directive.js"></script>

        <script src="scripts/layout/nav.module.js"></script>
        <script src="scripts/layout/nav.directive.js"></script>

        <script src="scripts/page/page.module.js"></script>
        <script src="scripts/page/page.controller.js"></script>
        <script src="scripts/page/page.directive.js"></script>

        <script src="scripts/table/table.module.js"></script>
        <script src="scripts/table/table.controller.js"></script>

        <script src="scripts/app/task/task.module.js"></script>
        <script src="scripts/app/task/task.controller.js"></script>
        <script src="scripts/app/task/task.directive.js"></script>
        <script src="scripts/app/task/task.service.js"></script>

        <script src="scripts/app/calendar/calendar.module.js"></script>
        <script src="scripts/app/calendar/calendar.controller.js"></script>

        <script src="scripts/ui/ui.module.js"></script>
        <script src="scripts/ui/ui.controller.js"></script>
        <script src="scripts/ui/ui.directive.js"></script>
        <script src="scripts/ui/ui.service.js"></script>
        <script src="scripts/ui/map.module.js"></script>
        <script src="scripts/ui/map.controller.js"></script>
        <script src="scripts/ui/map.directive.js"></script>
        <!-- endbuild -->

    </body>
</html>
