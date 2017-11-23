app.directive("searcher", function () {
    return {
        templateUrl: 'app/components/searcher/searcher.html',
        controller: 'searcherController',
        replace: true
    }
});