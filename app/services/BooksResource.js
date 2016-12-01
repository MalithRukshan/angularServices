

    angular.module('book.services')
        .factory('BooksResource', ['$resource', BooksResource]);

    function BooksResource($resource) {

        return $resource('/api/books/:book_id', {book_id: '@book_id'},
            {
                'update': {method: 'PUT'}
            }
        );
    }

