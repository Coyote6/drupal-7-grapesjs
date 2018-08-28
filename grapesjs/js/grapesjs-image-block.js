(function (Drupal, $, grapesjs) {
grapesjs.plugins.add ('imageBlock', function(editor, options) {

  options = options || {};

  addBlock();

  function addBlock() {
    editor.BlockManager.add('image', {
		  label: 'Image',
      category: 'Media',
  		attributes: {
  			class:'gjs-fonts gjs-f-image'
  		},
  		content: {
  			type:'image',
  			activeOnRender: 1
  		},
  	});
  };

});
})(Drupal, jQuery, grapesjs);