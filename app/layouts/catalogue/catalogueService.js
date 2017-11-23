app.service('catalogueService', function ($q, $http) {
    this.getBooks = function () {
        var defered = $q.defer();
        var promise = defered.promise;

        $http.get('https://gist.githubusercontent.com/finizen/6f5d574cec11112342c552fe6fa64a8a/raw/68c755db1a3c255edc258b54176b98bb2b2e8d49/booksV1.json').then(
            function (data) {
                defered.resolve(data.data);
            },
            function (err) {
                defered.reject(err)
            }
        );

        return promise;
    };
    this.getThemes = function () {
        var defered = $q.defer();
        var promise = defered.promise;

        $http.get('assets/mock/themes.json').then(
            function (data) {
                defered.resolve(data.data);
            },
            function (err) {
                defered.reject(err)
            }
        );
        return promise;
    };
    this.deleteBook = function (book) {
        console.log("the " + book.title + " " + book.author + " " + book.metadata + " has been deleted");
        // todo add the comunication with the api to delete the item
        return true;
    };
    this.saveBook = function (book) {
        console.log("the " + book.title + " " + book.author + " " + book.metadata + " has been edited and saved");
        // todo add the comunication with the api to save the item
        return true;
    }
});