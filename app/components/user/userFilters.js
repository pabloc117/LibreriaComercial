app.filter('getIcon', function () {
    return function (str) {
        var name = str.split(" ");
        return name[0].charAt(0) + name[1].charAt(0);
    }
})