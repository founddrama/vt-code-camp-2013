/*globals angular:true */
(function(ng, booksModule) {
  booksModule = ng.module('books', []);

  booksModule.controller('BookListController', [
    '$scope', '$window',
    function($scope, $window) {
      $scope.books = $window.BOOKS;

      $scope.getStarClass = function(rating, compare) {
        return 'glyphicon glyphicon-star' + ((rating > compare) ? '' : '-empty');
      };

      $scope.hideCovers = false;
      $scope.toggleCovers = function() {
        $scope.hideCovers = !$scope.hideCovers;
      };

      $scope.readFilter = false;
      $scope.toggleReadFilter = function() {
        $scope.readFilter = !$scope.readFilter;
      };

      $scope.isReadAndFiltered = function(book) {
        if (!$scope.readFilter) {
          return true;
        } else {
          return book.finished !== null;
        }
      };

      $scope.helpedFilter = false;
      $scope.toggleHelpedFilter = function() {
        $scope.helpedFilter = !$scope.helpedFilter;
      };

      var helpedRx = /Functional|Object\-Oriented|Professional|PhantomJS/;
      $scope.isEditedByMe = function(book) {
        if (!$scope.helpedFilter) {
          return true;
        } else {
          return helpedRx.test(book.title);
        }
      };
    }
  ]);
}(angular));