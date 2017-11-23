app.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'app/layouts/catalogue/catalogue.html',
            controller: 'catalogueController'
        })
        .when('/404', {
            templateUrl: 'app/layouts/404/404.html'
        })
        .otherwise({
            redirectTo: '/'
        });
});
