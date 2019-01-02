(function (Drupal, $, grapesjs) {
grapesjs.plugins.add ('h6Block', function(editor, options) {

  options = options || {};

  addBlock();

  function addBlock() {
    editor.BlockManager.add("h6Block", {
      label: "H6 Block",
      category: 'Text',
      content: '<h6>Insert your text here...</h6>',
      attributes: {
			  class:'gjs-fonts gjs-f-text',
     },
     activeOnRender: 1
    });
    
  };
  
  

});
})(Drupal, jQuery, grapesjs);