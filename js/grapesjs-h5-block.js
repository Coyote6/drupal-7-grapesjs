(function (Drupal, $, grapesjs) {
grapesjs.plugins.add ('h5Block', function(editor, options) {

  options = options || {};

  addBlock();

  function addBlock() {
    editor.BlockManager.add("h5Block", {
      label: "H5 Block",
      category: 'Text',
      content: '<h5>Insert your text here...</h5>',
      attributes: {
			  class:'gjs-fonts gjs-f-text',
     },
     activeOnRender: 1
    });
    
  };
  
  

});
})(Drupal, jQuery, grapesjs);