app.directive("book", function () {
    return {
        templateUrl: 'app/components/book/book.html',
        restrict: "E",
        replace: true
    }
});