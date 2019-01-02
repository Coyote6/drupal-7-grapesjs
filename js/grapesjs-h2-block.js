(function (Drupal, $, grapesjs) {
grapesjs.plugins.add ('h2Block', function(editor, options) {

  options = options || {};

  addBlock();

  function addBlock() {
    editor.BlockManager.add("h2Block", {
      label: "H2 Block",
      category: 'Text',
      content: '<h2>Insert your text here...</h2>',
      attributes: {
			  class:'gjs-fonts gjs-f-text',
     },
     activeOnRender: 1
    });
    
  };
  
  

});
})(Drupal, jQuery, grapesjs);