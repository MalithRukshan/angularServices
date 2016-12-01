

    angular.module('book.services')
        .factory('currentUser', currentUser);


    function currentUser() {

        return {
            lastBookEdited: lastBookEdited
        };

        var lastBookEdited = {};

    }

