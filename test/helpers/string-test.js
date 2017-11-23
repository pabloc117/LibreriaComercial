describe('String filter testing', function () {
    'use strict';

    var capitalize;
    var removeAccents;

    beforeEach(function () {
        module('libraryApp');
    });

    beforeEach(function () {
        inject(function(capitalizeFilter) {
            capitalize = capitalizeFilter;
        });
    });
    it('should return same word with the first letter in capital letter', function () {
        var foo = 'library', result;
        result = capitalize(foo);
        expect(result).to.equal("Library");
    });
    it('should return same input if the input is not an string', function () {
        var foo = 1, result;
        result = capitalize(foo);
        expect(result).to.equal(1);
    });
    it('should return same input if the input is empty', function () {
        var foo = '', result;
        result = capitalize(foo);
        expect(result).to.equal("");
    });

    beforeEach(function () {
        inject(function(removeAccentsFilter) {
            removeAccents = removeAccentsFilter;
        });
    });
    it('should return same word without accents', function () {
        var foo = 'fantasía á qué sí', result;
        result = removeAccents(foo);
        expect(result).to.equal("fantasia a que si");
    });
    it('should return same input if the input is empty', function () {
        var foo = '', result;
        result = removeAccents(foo);
        expect(result).to.equal("");
    });
});