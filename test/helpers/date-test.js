describe('Date filter testing', function () {
    'use strict';

    var filter;

    beforeEach(function () {
        module('libraryApp');

        inject(function(validDateFilter) {
            filter = validDateFilter;
        });
    });
    it('should return false if the format of the date is not valid', function () {
        var foo = '01/34/1518', result;
        result = filter(foo);
        expect(result).to.equal(false);
    });
    it('should return false if the date is later than today', function () {
        var foo = '01/04/2018', result;
        result = filter(foo);
        expect(result).to.equal(false);
    });
    it('should return true if the date is valid', function () {
        var foo = '01/04/1988', result;
        result = filter(foo);
        expect(result).to.equal(true);
    });
});