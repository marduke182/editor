/* ngEditor directive
 */
(function () {
  'use strict';
  var TITTLE_TEMPLATE = '' +
    '<div> <h1>Introduce el Titulo</h1> </div>';
''
  angular.module('ngEditor')
    .directive('mkEditor', mkEditor)
    .controller('mkEditorController', mkEditorController);


  mkEditor.$inject = ['$compile'];
  function mkEditor($compile) {

    return {
      require: ['mkEditor','ngModel'],
      restrict: 'E',
      scope:{}, //Must be isolated if is reusable
      controller: 'mkEditorController as mk',
      templateUrl: '/src/components/editor/editor.html',
      link: function ($scope, $element, $attributes, ctrls) {
        var mkEditorController = ctrls[0],
          ngModelCtrl = ctrls[1];



        ngModelCtrl.$render = function () {
          $scope.model = {
            ngModel: ngModelCtrl.$viewValue
          };
        };

        var contentEditable = angular.element($element[0].getElementsByClassName('editor-content')),
          toolbar = angular.element($element[0].getElementsByClassName('editor-toolbar'));

        var tittle = $compile(TITTLE_TEMPLATE)($scope);
        contentEditable.append(tittle);

        contentEditable.css({
          outline: '0px solid transparent'
        });


        contentEditable.on('blur focus keyup mouseup', function (e) {
          checkSelection(e)
        });

        contentEditable.on('keydown', function(e){
          if(e.keyCode === 13) {
            //e.preventDefault();
          }
        });
      }
    };
  }

  function mkEditorController() {
    var vm = this;
    vm.getToolbarPosition = getToolbarPosition;




    function getToolbarPosition() {
      var position = {};
      var toolbarHeight = toolbar[0].offsetHeight;
      var toolbarWidth = toolbar[0].offsetWidth;
      var spacing = 5;
      var selection = window.getSelection();
      var range = selection.getRangeAt(0);
      var boundary = range.getBoundingClientRect();


      var topPosition = boundary.top - contentEditable[0].offsetTop;
      var leftPosition = boundary.left - contentEditable[0].offsetLeft;

      // if there isn't enough space at the top, place it at the bottom
      // of the selection
      if (boundary.top < (toolbarHeight + spacing)) {
        position.top = topPosition + boundary.height + spacing;
        // tell me if it's above or below the selection
        // used in the template to place the triangle above or below
        position.below = true;
      } else {
        position.top = topPosition;
        position.below = false;
      }

      // center toolbar above selected text
      position.left = leftPosition - (toolbarWidth / 2) + (boundary.width / 2);

      // cross-browser window scroll positions
      var scrollLeft = (window.pageXOffset !== undefined) ? window.pageXOffset : (document.documentElement || document.body.parentNode || document.body).scrollLeft;
      var scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;

      // add the scroll positions
      // because getBoundingClientRect gives us the position
      // relative to the viewport, not to the page
      position.top += scrollTop;
      position.left += scrollLeft;

      return position;
    }
  }
})();


//
//
//function checkState() {
//  var newSelection,
//    selectionElement;
//
//  if (!this.base.preventSelectionUpdates) {
//    newSelection = this.options.contentWindow.getSelection();
//    if ((!this.options.updateOnEmptySelection && newSelection.toString().trim() === '') ||
//      (this.options.allowMultiParagraphSelection === false && this.multipleBlockElementsSelected()) ||
//      Selection.selectionInContentEditableFalse(this.options.contentWindow)) {
//      if (!this.options.staticToolbar) {
//        this.hideToolbarActions();
//      } else {
//        this.showAndUpdateToolbar();
//      }
//
//    } else {
//      selectionElement = Selection.getSelectionElement(this.options.contentWindow);
//      if (!selectionElement || selectionElement.getAttribute('data-disable-toolbar')) {
//        if (!this.options.staticToolbar) {
//          this.hideToolbarActions();
//        }
//      } else {
//        this.checkSelectionElement(newSelection, selectionElement);
//      }
//    }
//  }
//}
//
//
//handleDocumentMouseup: function (event) {
//  // Do not trigger checkState when mouseup fires over the toolbar
//  if (event &&
//    event.target &&
//    Util.isDescendant(this.getToolbarElement(), event.target)) {
//    return false;
//  }
//  this.checkState();
//},
//
//handleEditableClick: function (event) {
//  // Delay the call to checkState to handle bug where selection is empty
//  // immediately after clicking inside a pre-existing selection
//  setTimeout(function () {
//    this.checkState();
//  }.bind(this), 0);
//},
//
//handleEditableKeyup: function (event) {
//  this.checkState();
//},
//
//handleEditableBlur: function (event) {
//  // Do not trigger checkState when bluring the editable area and clicking into the toolbar
//  if (event &&
//    event.relatedTarget &&
//    Util.isDescendant(this.getToolbarElement(), event.relatedTarget)) {
//    return false;
//  }
//  this.checkState();
//},
