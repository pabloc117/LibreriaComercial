app.directive('button', function () {
    return {
        replace: true,
        restrict: 'E',
        scope: {
            text: '@',
            classname: '@'
        },
        template: '<div class="buttonItem {{ classname }}">' +
        '    <div class="display_table">' +
        '        <div class="display_table_cell">' +
        '            <span class="icon icon_base"></span>' +
        '            <span class="text"> {{ text }} </span>' +
        '        </div>' +
        '    </div>' +
        '</div>'
    };
});