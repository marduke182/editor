(function() {
  angular
    .module('ngEditor')
    .factory('ngEditorToolbarDelegate', ngEditorToolbarDelegate);

  ngEditorToolbarDelegate.$inject = [];

  /* @ngInject */
  function ngEditorToolbarDelegate() {
    var service = {
      showToolbar: showToolbar
    };

    return service;

    ////////////////

    function showToolbar() {
    }


  }

})();
