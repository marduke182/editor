/* ngEditor directive
 */
(function () {
  'use strict';
  angular.module('ngEditor')
    .directive('ngEditor', meditor);


  meditor.$inject = ['ngEditorToolbarDelegate', '$timeout'];
  function meditor(toolbarDelegate, $timeout) {

    return {
      require: 'ngModel',
      restrict: 'E',
      templateUrl: 'modules/ngEditor/angular/templates/editor.html',
      link: function ($scope, $element, $attributes, ngModelCtrl) {
        document.execCommand('defaultParagraphSeparator', false, 'p');

        //TODO: Test if really need this
        ngModelCtrl.$formatters.push(function (modelValues) {
          return modelValues;
        });

        ngModelCtrl.$render = function () {
          $scope.model = {
            ngModel: ngModelCtrl.$viewValue
          };
        };

        var contentEditable = angular.element($element[0].getElementsByClassName('editor-content')),
            toolbar = angular.element($element[0].getElementsByClassName('.editor-toolbar'));


        contentEditable.css({
          outline: '0px solid transparent'
        });


        contentEditable.on('blur focus keyup mouseup', function (e) {
          checkSelection(e)
        });

        if ($attributes.placeholder) {


          addPlaceholder();
          contentEditable.on('blur', function (e) {
            if (contentEditable.html() === '') {
              {
                addPlaceholder();

              }
            }
          })
        }




        function addPlaceholder() {
          contentEditable.append($attributes.placeholder);

          contentEditable.on('focus', function () {
            contentEditable.empty();
            contentEditable.off('focus');
            console.log('focus must remove the placeholder');
          });

        }


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
          if(boundary.top < (toolbarHeight + spacing)) {
            position.top = topPosition + boundary.height + spacing;
            // tell me if it's above or below the selection
            // used in the template to place the triangle above or below
            position.below = true;
          } else {
            position.top = topPosition;
            position.below = false;
          }

          // center toolbar above selected text
          position.left = leftPosition - (toolbarWidth/2) + (boundary.width/2);

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
    };
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
