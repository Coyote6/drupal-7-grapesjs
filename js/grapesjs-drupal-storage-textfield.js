(function (Drupal, $, grapesjs) {

// Default storage plugin for a textfield.
grapesjs.plugins.add('drupalStorageTextfield', (editor, options) => {

	const sm = editor.StorageManager;

	//
	// Storage Manager
	//
	
	// Set the storage manager.
	sm.add('textarea', {
		load: function(keys, clb) {
			var defaultVal = $(options.element).val();
			res = {};
			if (typeof (clb) == 'function') {
				clb(res);
			}
		},
		store: function(data, clb) {

//
// Trying to prevent losing changes when element is still selected.
//
			$(document).click();
      // Make adjustments to the css
			var css = editor.getCss();
			css = css.replace('* { box-sizing: border-box; }','');
			css = css.replace('*{box-sizing:border-box;}','');
			css = css.replace('body {margin: 0;}', '');

			// Fix the JavaScript Parser for the background repeat.
			var noRepeat = /background-repeat-x:no-repeat;background-repeat-y:no-repeat;/g;
			var repeat = /background-repeat-x:repeat;background-repeat-y:repeat;/g;
			var repeatX = /background-repeat-x:repeat;background-repeat-y:no-repeat;/g;
			var repeatY = /background-repeat-x:no-repeat;background-repeat-y:repeat;/g;
			css = css.replace(noRepeat, 'background-repeat:no-repeat;');
			css = css.replace(repeat, 'background-repeat:repeat;');
			css = css.replace(repeatX, 'background-repeat:repeat-x;');
			css = css.replace(repeatY, 'background-repeat:repeat-y;');
			
			var html = editor.getHtml();
			
			
			// Get just the field we are working on if the full view is loaded.
			if (
			  typeof (Drupal.grapesjs.instance.field) == 'string' &&
			  typeof (Drupal.grapesjs.instance.delta) == 'string'
      ) {
        var doc = document.createElement('html');
        doc.innerHTML = html;
        var f = Drupal.grapesjs.instance.field;
        var d = Drupal.grapesjs.instance.delta;
        var selector = '.grapesjs-editable-field-item[data-grapesjs-field="' + f + '"][data-grapesjs-delta="' + d + '"]';

        if ($(selector, doc).length > 0) {
  			  html = $(selector, doc)[0];
  			  html = $(html).html();
  			}
        
      }
			
			css = css.trim();
			if (css != '') {
  		  html += '<style>' + css + '</style>';						
			}
			
			// Add used files.
      var ids = [];
      $.each(Drupal.grapesjs.usedAssets, function(i, v){
        ids.push(v.id);
      });
      if (ids.length > 0) {
        html += '<!--data-gjs-files=[' + ids.join(',') + ']-->'
			}
			
			$(options.element).val(html).attr('data-editor-value-is-changed', 'true');
			if (typeof (clb) == 'function') {
				clb();
			}
		},
	}); 
	sm.setAutosave = true;
	sm.setStepsBeforeSave = 1;

});
})(Drupal, jQuery, grapesjs);