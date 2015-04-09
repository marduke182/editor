/**
 * Created by jrqb182 on 3/15/15.
 */
(function () {

  angular.module('ngEditor')
    .directive('ngEditorToolbar', ngEditorToolbar);

  ngEditorToolbar.$inject = [];
  function ngEditorToolbar() {
    return {
      templateUrl: 'modules/ngEditor/angular/templates/toolbar.html',
      restrict: 'A',
      controller: ngEditorToolbarController,
      controllerAs: 'toolbar',
      transclude: true,
      link: function ($scope, $element, $attribute, toolbarCtrl) {

        $scope.$on('ngEditorShowToolbar', function (e, data) {
          console.log(data);
          $element[0].style['transform'] = 'translate3d(' + data.position.left + 'px, ' + data.position.top + 'px, 1px)';
          $element.css({
            opacity: '1'
          })
        });


        $scope.$on('ngEditorHideToolbar', function () {
          $element.css({
            opacity: '0'
          })
        });
      }
    };

    //  Controller
    ngEditorToolbarController.$inject = [];
    function ngEditorToolbarController() {
      this.actions = [
        {
          type: 'button',
          name: 'B',
          active: false,
          execute: function () {
            this.active = !this.active;
            document.execCommand('bold', this.active);

          }
        }, {
          type: 'button',
          name: 'I',
          active: false,
          execute: function () {
            this.active = !this.active;
            document.execCommand('italic', this.active);

          }
        }, {
          type: 'select',
          name: 'A',
          default: 'left',
          options: ['left','center', 'right'],
          execute: function (align) {
            var newSelection = window.getSelection();

            // get selection node
            var anchorNode = newSelection.anchorNode;

            // if nothing selected, hide the toolbar
            if (newSelection.toString().trim() === '' || !anchorNode) {

            }

            // check if selection is in the current editor/directive container
            var parentNode = anchorNode.parentNode;
            var newSelection = window.getSelection();

            // get selection node
            var anchorNode = newSelection.anchorNode;

            // check if selection is in the current editor/directive container
            var parentNode = anchorNode.parentNode;
            parentNode.style['text-align'] = align;
          }
        }, {
          type: 'button',
          name: 'Bold',
          execute: function () {
            console.log('testing toolbar action');
          }
        }, {
          type: 'button',
          name: 'Bold',
          execute: function () {
            console.log('testing toolbar action');
          }
        }
      ]
    }
  }


})
();
