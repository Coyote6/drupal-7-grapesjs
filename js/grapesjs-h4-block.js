(function (Drupal, $, grapesjs) {
grapesjs.plugins.add ('h4Block', function(editor, options) {

  options = options || {};

  addBlock();

  function addBlock() {
    editor.BlockManager.add("h4Block", {
      label: "H4 Block",
      category: 'Text',
      content: '<h4>Insert your text here...</h4>',
      attributes: {
			  class:'gjs-fonts gjs-f-text',
     },
     activeOnRender: 1
    });
    
  };
  
  

});
})(Drupal, jQuery, grapesjs);