(function(window, ngEditor) {


  var editor = [];
  var Selection = {
    registerEditor: registerEditor,
    checkSelection: checkSelection,
    getContainerSelection: getContainerSelection,
    getPosition: getPosition
  };

  function registerEditor($element, $contentEditable, editor) {
    editor = editor || 0;
    editors[editor] = {
      $element: $element,
      $contentEditable: $contentEditable
    }
  }

  function getContainerSelection() {
    var newSelection = window.getSelection();

    // get selection node
    var anchorNode = newSelection.anchorNode;

    // if nothing selected, hide the toolbar
    if (newSelection.toString().trim() === '' || !anchorNode) {
      return false;
    }

    return anchorNode.parentNode;
  }

  function checkSelection(e, editor) {
    editor = editor || 0;

    // if you click something from the toolbar
    // don't do anything
    if (e && e.target && toolbar.find(e.target).length) {
      return false;
    }
    var parentNode = getContainerSelection();
    if(parentNode) {
      return false;
    }

    // check if selection is in the current editor/directive container
    parentNode = anchorNode.parentNode;
    while (parentNode.tagName !== undefined && parentNode !== editor.$element[0]) {
      parentNode = parentNode.parentNode;
    }

    // if the selection is in the current editor
    if (parentNode === editor.$element[0]) {

      return true;
    } else {

      return false;

    }
  }

  function getPosition() {

  }



  window.ngEditor = {
    Selection: Selection
  };
})(window);
