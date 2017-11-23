describe('Library tests', function () {

    var scope;
    var ctrl;
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
        $controller("searcherController", {$scope: scope});
        scope.books = books;
    }));

    describe("searcherController Initialization", function () {
        it('displaySearch should have as default value false', function () {
            expect(scope.displaySearch).to.equal(false);
        });
        it('restore search should set vars to empty', function () {
            scope.searchType = "";
            scope.searchParams['title'] = "text";
            scope.searchParams['author'] = "text";
            scope.restoreSearch();
            expect(scope.searchType).to.equal("title");
            expect(scope.searchParams['title']).to.equal("");
            expect(scope.searchParams['author']).to.equal("");
        });
        it('search user should show only books that the user have read', function () {
            scope.searchParams.user = "Beatriz Reyes";
            scope.searchUser();
            expect(scope.books[1].display).to.equal(true);
            expect(scope.books[0].display).to.equal(false);
        });
        it('Search by title should NOT be compatible with other searches', function () {
            var book = scope.books[1];
            var searchParams = {
                title: "Huck",
                author: "",
                ISBIN: "",
                theme: "Aventura",
                user: ""
            };
            var result = scope.getSearchParams("title", book, searchParams);
            assert.lengthOf(result[1], 1);
            expect(result[0][0]).to.equal("Las Aventuras de Huckleberry Finn");
            expect(result[1][0]).to.equal("huck");
        });
        it('GetSearchParams should return an array with length of 2 (matchParams and searchParams)', function () {
            var book = scope.books[1];
            var result = scope.getSearchParams("title", book, {
                title: "Huck"
            });
            assert.lengthOf(result, 2);
            assert.typeOf(result, "array");
        });
        it('Search by theme or author are compatible between them', function () {var book = scope.books[1];
            var result = scope.getSearchParams("theme", book,  {
                author: "mark",
                theme: "aventura"
            });
            assert.lengthOf(result[1], 2);
            assert.lengthOf(result[0], 2);
            expect(result[0][0]).to.equal("mark twain");
            expect(result[0][1]).to.equal("aventura");
            expect(result[1][0]).to.equal("mark");
            expect(result[1][1]).to.equal("aventura");
        });
        it('Search by title should display the books that contains the word searched', function () {var book = scope.books[1];
            scope.restoreSearch();
            scope.searchParams = {
                title: "Huck",
                author: "",
                ISBIN: "",
                theme: "",
                user: ""
            };
            scope.searchType = "title";
            scope.searchBook();
            expect(scope.books[0].display).to.equal(false);
            expect(scope.books[1].display).to.equal(true);
        });
    });
});
