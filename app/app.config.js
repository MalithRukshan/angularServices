var app = angular.module('book', [
        'ngRoute',
        'ngCookies',
        'ngResource',
    'book.controller',
    'book.services',
    'landing.controller'
]);

app.provider('booksll', ['constants',booksll ]);
       function booksll(constants){
        var includeVersionInTitle = false;
        this.setIncludeVersionInTitle = function (value) {
            includeVersionInTitle = value;
        };

        this.$get = function () {

            var appName = constants.APP_TITLE;
            var version = constants.APP_VERSION;

            if (includeVersionInTitle) {
                appName += ' ' + version;
            }

            var appDesc = constants.APP_DESCRIPTION;

            return {
                appName: appName,
                appDesc: appDesc
            };
        };

    }

    app.config(['booksllProvider', '$routeProvider', '$logProvider', '$httpProvider', '$provide', function (booksllProvider, $routeProvider, $logProvider, $httpProvider, $provide) {

        $provide.decorator('$log', ['$delegate', 'booksll', logDecorator]);

        booksllProvider.setIncludeVersionInTitle(true);
        $logProvider.debugEnabled(true);

        $httpProvider.interceptors.push('bookLoggerInterceptor');

        $routeProvider
            .when('/', {
                templateUrl: '/books/books.html',
                controller: 'BooksController',
                controllerAs: 'books'

            })
            .when('/AddBook', {
                templateUrl: '/books/addBook.html',
                controller: 'AddBookController',
                controllerAs: 'bookAdder'
            })
            .when('/EditBook/:bookID', {
                templateUrl: '/books/editBook.html',
                controller: 'EditBookController',
                controllerAs: 'bookEditor'


            })
            .otherwise('/');

    }]);

    app.run(['$rootScope', function($rootScope) {

        $rootScope.$on('$routeChangeSuccess', function(event, current, previous) {

            //console.log('successfully changed routes');

        });

        $rootScope.$on('$routeChangeError', function(event, current, previous, rejection) {

            console.log('error changing routes');

            console.log(event);
            console.log(current);
            console.log(previous);
            console.log(rejection);

        });

    }]);

    function logDecorator($delegate, books) {

        function log(message) {
            message += ' - ' + new Date() + ' (' + books.appName + ')';
            $delegate.log(message);
        }

        function info(message) {
            $delegate.info(message);
        }

        function warn(message) {
            $delegate.warn(message);
        }

        function error(message) {
            $delegate.error(message);
        }

        function debug(message) {
            $delegate.debug(message);
        }

        function awesome(message) {
            message = 'Awesome!!! - ' + message;
            $delegate.debug(message);
        }
        function awesomeInfo(message) {
            message = 'Awesome!!! - ' + message;
            $delegate.debug(message);
        }

        return {
            log: log,
            info: info,
            warn: warn,
            error: error,
            debug: debug,
            awesome: awesome,
            awesomeInfo:awesomeInfo
        };





}