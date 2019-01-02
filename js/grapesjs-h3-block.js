(function (Drupal, $, grapesjs) {
grapesjs.plugins.add ('h3Block', function(editor, options) {

  options = options || {};

  addBlock();

  function addBlock() {
    editor.BlockManager.add("h3Block", {
      label: "H3 Block",
      category: 'Text',
      content: '<h3>Insert your text here...</h3>',
      attributes: {
			  class:'gjs-fonts gjs-f-text',
     },
     activeOnRender: 1
    });
    
  };
  
  

});
})(Drupal, jQuery, grapesjs);