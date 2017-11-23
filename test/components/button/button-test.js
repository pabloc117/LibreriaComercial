describe('Button directive testing', function () {
    'use strict';

    beforeEach(function () {
        module('libraryApp');
    });

    var element;
    var outerScope;
    var innerScope;

    beforeEach(inject(function($rootScope, $compile) {
        element = angular.element('<button text="Texto del boton" classname="add"></button>');
        outerScope = $rootScope;
        $compile(element)(outerScope);
        innerScope = element.isolateScope();
        outerScope.$digest();
    }));

    describe('Adding a button directive with add class and text', function() {
        it('should have and add class', function() {
            expect(element[0].className).to.equal("buttonItem add");
        });
        it('should have the same text passed as parameter', function() {
            var expectedHTML = '<span class="icon icon_base"></span>            <span class="text ng-binding"> Texto del boton </span>';
            expect(element[0].children[0].children[0].innerHTML.trim()).to.equal(expectedHTML);
        });
    });
});