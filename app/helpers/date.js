app.filter('toDate', function () {
    return function (unix_timestamp) {
        return new Date(unix_timestamp * 1000);
    }
})
.filter('toTimestamp', function () {
    return function (str) {
        return new Date(str).getTime() / 1000;
    }
})
.filter('validDate', function () {
    return function (date) {
        return (new Date(date) !== "Invalid Date") && !isNaN(new Date(date)) &&
            new Date(date) < new Date();
    }
});
