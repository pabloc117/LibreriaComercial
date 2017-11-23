describe('Library tests', function () {

    var scope;
    var books = [
        {
            "title": "Cien años de soledad",
            "author": "Gabriel García Márquez",
            "metadata": "L978-3-598-21500-1novela                          000000221184000",
            "users": [{"id": 1, "name": "Isidro Pérez"}, {"id": 2, "name": "José Manuel Santos"}, {
                "id": 3,
                "name": "Trinidad Alonso"
            }]
        },
        {
            "title": "Las Aventuras de Huckleberry Finn",
            "author": "Mark Twain",
            "metadata": "L978-3-598-21501-8aventura                        000000477619200",
            "users": [{"id": 4, "name": "Jose Miguel Sanchez"}, {"id": 5, "name": "Beatriz Reyes"}, {
                "id": 6,
                "name": "Rosario Garcia"
            }]
        }
    ];

    beforeEach(module('libraryApp'));

    beforeEach(inject(function ($rootScope, $controller) {
        scope = $rootScope.$new();
        $controller("catalogueController", {$scope: scope});
        scope.books = books;
    }));

    describe("catalogueController IsValid function", function () {
        it('IsValid book should error message if the title or author are not correct in length', function () {
            var book = {
                title: "Nue"
            };
            var result = scope.isvalidBook(book);
            expect(result).to.equal("Título o autor demasiado corto");

            book['title'] = "Harry Potter";
            book['author'] = "JK";
            result = scope.isvalidBook(book);
            expect(result).to.equal("Título o autor demasiado corto");

            book['title'] = "Harry Potter y la piedra filosofal y la piedra filosofal y la piedra filosofal";
            book['author'] = "JK Rowling";
            result = scope.isvalidBook(book);
            expect(result).to.equal("Título o autor demasiado largo");
        });
        it('IsValid book should error message if the date is not correct', function () {
            var book = {
                title: "Harry Potter y la piedra filosofal",
                author: "JK Rowling",
                date: "Tue Jan 04 2018 01:00:00 GMT+0100 (CET)"
            };
            var result = scope.isvalidBook(book);
            expect(result).to.equal("La fecha no es valida");
        });
        it('IsValid book should error message if the isbn  is not correct', function () {
            var book = {
                title: "Harry Potter y la piedra filosofal",
                author: "JK Rowling",
                date: "Tue Jan 04 2017 01:00:00 GMT+0100 (CET)",
                isbin: "978-33-598-21500-1"
            };
            var result = scope.isvalidBook(book);
            expect(result).to.equal("El ISBIN no es valido xxx-x-xxx-xxxxx-x");
            book['isbin'] = "978-3-598-21500-1";
        });
        it('IsValid book should return true if all parameters are correct', function () {
            var book = {
                title: "Harry Potter y la piedra filosofal",
                author: "JK Rowling",
                date: "Tue Jan 04 2017 01:00:00 GMT+0100 (CET)",
                isbin: "978-3-598-21500-1",
                theme: "aventura"
            };
            var result = scope.isvalidBook(book);
            expect(result).to.equal(true);
        });
    });

    describe("catalogueController books manipulation functions", function () {
        it('savebook should return true if the fields are not valid as is assigned to the variable editing', function () {
            document.body.innerHTML += '<div id="errorMessage" class="errorMessage"></div>';
            var book = {
                title: "Harry Potter y la piedra filosofal",
                author: "JK Rowling",
                date: "Tue Jan 04 2017 01:00:00 GMT+0100 (CET)",
                isbin: "978-3-598-21500-1",
                theme: ""
            };
            var result = scope.saveBook(book);
            expect(result).to.equal(true);
        });
        it('savebook should return false if the fields are correct as is assigned to the variable editing', function () {
            document.body.innerHTML += '<div id="errorMessage" class="errorMessage"></div>';
            var book = {
                title: "Harry Potter y la piedra filosofal",
                author: "JK Rowling",
                date: "Tue Jan 04 2017 01:00:00 GMT+0100 (CET)",
                isbin: "978-3-598-21500-1",
                theme: "aventura"
            };
            var result = scope.saveBook(book);
            expect(result).to.equal(false);
        });
        it('generateMetadata should generate a valid string with the desired structure', function () {
            var book = {
                title: "Harry Potter y la piedra filosofal",
                author: "JK Rowling",
                date: "Tue Jan 04 1977 01:00:00 GMT+0100 (CET)",
                isbin: "978-3-598-21500-1",
                theme: "novela"
            };
            var result = scope.generateMetadata(book);
            expect(result).to.equal("L978-3-598-21500-1novela                          000000221184000");

        });
        it('deletebook should remove one item of the books array', function () {
            var book = {
                title: "Cien años de soledad",
                author: "Gabriel García Márquez",
                date: "Tue Jan 04 2017 01:00:00 GMT+0100 (CET)",
                isbin: "978-3-598-21500-1",
                theme: "novela"
            };
            scope.deleteBook(book, 0);
            expect(scope.books.length).to.equal(1);
        });
        it('add should add one item of the books array with the fields empty or default values', function () {
            scope.addBook();
            expect(scope.books.length).to.equal(2);
            expect(books[0].title).to.equal("Nuevo libro");
        });
    });
});
