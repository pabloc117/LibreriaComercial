app.controller('searcherController', function ($scope) {

    const THEME_TYPE = "theme";
    const AUTHOR_TYPE = "author";

    $scope.displaySearch = false;
    $scope.searchType = "";
    $scope.searchParams = {
        title: "",
        author: "",
        ISBIN: "",
        theme: "",
        user: ""
    };

    $scope.closeSearch = function () {
        $scope.searchType == "";
        $scope.restoreSearch();
    };
    $scope.restoreSearch = function () {
        if ($scope.searchType == "") {
            $scope.searchType = "title"
        }
        $scope.books.forEach(function (book) {
            book.display = true;
        });
        $scope.searchParams = {
            title: "",
            author: "",
            ISBIN: "",
            theme: "",
            user: ""
        };
    };
    $scope.searchUser = function () {
        var display = false;
        $scope.books.forEach(function (book) {
            book.users.forEach(function (user) {
                if (user.name == $scope.searchParams.user) {
                    display = true;
                }
            });
            book.display = display;
            display = false;
        });
    };
    $scope.searchBook = function () {
        var display = true, matchTexts, searchTexts, result, searchType = $scope.searchType.toLowerCase();
        $scope.books.forEach(function (book) {
            result = $scope.getSearchParams(searchType, book, $scope.searchParams);
            matchTexts = result[0];
            searchTexts = result[1];
            matchTexts.forEach(function (matchText, k) {
                if (matchText == undefined || searchTexts[k] == undefined ||
                    (searchTexts[k] != "" && matchText.toLowerCase().indexOf(searchTexts[k]) == -1)) {
                    display = false;
                }
            });
            book.display = display;
            display = true;
            matchTexts = [];
            searchTexts = [];
        });
    };
    $scope.getSearchParams = function(searchType, book, searchParams){
        var matchTexts = [], searchTexts = [];
        if (searchType == AUTHOR_TYPE) {
            matchTexts.push(book.metadata.substr(18, 20).toLowerCase().trim());
            searchTexts.push(searchParams[THEME_TYPE].toLowerCase().trim());
            matchTexts.push(book[searchType.toLowerCase()]);
            searchTexts.push(searchParams[searchType].toLowerCase().trim());
        } else if (searchType == THEME_TYPE) {
            searchTexts.push(searchParams[AUTHOR_TYPE].toLowerCase().trim());
            matchTexts.push(book['author'].toLowerCase().trim());
            matchTexts.push(book.metadata.substr(18, 20).toLowerCase().trim());
            searchTexts.push(searchParams[THEME_TYPE].toLowerCase().trim());
        } else{
            matchTexts.push(book[searchType.toLowerCase()]);
            searchTexts.push(searchParams[searchType].toLowerCase().trim());
        }
        return [matchTexts, searchTexts]
    }
});