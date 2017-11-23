app.controller('catalogueController', function ($scope, $location, catalogueService, toTimestampFilter, validDateFilter) {
    $scope.books = [];
    $scope.users = [];

    catalogueService.getBooks()
        .then(function (response) {
            $scope.books = response.books;
            $scope.books.forEach(function (book) {
                book.users.forEach(function (user) {
                    if (!(user.id in $scope.users)) {
                        $scope.users.push(user.name);
                    }
                })
            });
        })
        .catch(function () {
            $location.path('/404');
        });

    catalogueService.getThemes()
        .then(function (response) {
            $scope.themes = response;
        });


    window.addEventListener("beforeunload", function (e) {
        var isEditedButNotSaved = false;
        $scope.books.forEach(function (book) {
            if (book.edited && !book.saved) {
                isEditedButNotSaved = true;
            }
        });
        if (isEditedButNotSaved) {
            var confirmationMessage = "\o/";
            (e || window.event).returnValue = confirmationMessage;
            return confirmationMessage;
        }
        return true;
    });

    $scope.isvalidBook = function (book) {
        if (book.title == "" || book.author == "" ||
            book.date == "" || book.theme == "" ||
            book.isbin == "") {
            return "Revisa que no haya ninguno vacio";
        }
        if (book.title.length < 5 || book.author.length < 5) {
            return "Título o autor demasiado corto";
        }
        if (book.title.length > 50 || book.author.length > 50) {
            return "Título o autor demasiado largo";
        }
        if (!validDateFilter(book.date)) {
            return "La fecha no es valida";
        }
        var regex = "[0-9]{3}-[0-9]-[0-9]{3}-[0-9]{5}-[0-9]";
        var match = book.isbin.match(regex);
        if (!(match != null && book.isbin == match[0])) {
            return "El ISBIN no es valido xxx-x-xxx-xxxxx-x";
        }
        if (book.theme.length == "") {
            return "Debes seleccionar una tematica";
        }
        return true;
    };

    $scope.saveBook = function (book) {
        var isValid = $scope.isvalidBook(book)
        if (isValid == true) {
            book.metadata = this.generateMetadata(book);
            catalogueService.saveBook(book);
            book.saved = true;
            return false;
        }
        document.getElementById("errorMessage").innerHTML = isValid;
        book.valid = false;
        return true;
    };
    $scope.generateMetadata = function (selectedBook) {
        var paddingTheme = new Array(13).join(' ').substring(selectedBook.theme.length);
        var timestamp = toTimestampFilter(selectedBook.date) + "";
        var paddingTimestamp = new Array(16).join('0').substring(timestamp.length);
        return "L" +
            selectedBook.isbin +
            selectedBook.theme + paddingTheme +
            new Array(21).join(' ') +
            paddingTimestamp + timestamp;
    };
    $scope.deleteBook = function (book, $index) {
        $scope.books.splice($index, 1);
        catalogueService.deleteBook(book);
    };

    $scope.addBook = function () {
        var book = {
            title: "Nuevo libro",
            author: "Autor",
            metadata: "L000-0-000-00000-0                                000000000000000",
            users: []
        };
        $scope.books.unshift(book);
    };
})