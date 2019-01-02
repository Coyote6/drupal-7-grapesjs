(function (Drupal, $, grapesjs) {
grapesjs.plugins.add ('h1Block', function(editor, options) {

  options = options || {};

  addBlock();

  function addBlock() {
    editor.BlockManager.add("h1Block", {
      label: "H1 Block",
      category: 'Text',
      content: '<h1>Insert your text here...</h1>',
      attributes: {
			  class:'gjs-fonts gjs-f-text',
     },
     activeOnRender: 1
    });
    
  };
  
  

});
})(Drupal, jQuery, grapesjs);