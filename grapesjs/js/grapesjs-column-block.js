(function (Drupal, $, grapesjs) {
grapesjs.plugins.add ('columnBlock', function(editor, options) {

  options = options || {};
  
  addComponent();
  addBlock();
  
  editor.on('load', function(){
    addEditorStyles();
  });
    
  var placeholder = '<span class="placeholder">Drop column items here...</span>';
  
  function addComponent () {
    
    var defaultType = editor.DomComponents.getType('default');
    var defaults =  Object.assign({}, defaultType.model.prototype.defaults, {
			tagName: 'div',
			name: 'Column',
      editable: true,
      droppable: true,
		  draggable: ".row-block",
      attributes: {
        'data-type':'column-block'
      }
		});

    editor.DomComponents.addType('column', {
    	model: defaultType.model.extend (
      	{
    			defaults: defaults,
        }, {
      		isComponent: function(el) {
    				if (
              typeof el.hasAttribute == "function" && 
              el.hasAttribute("data-type") && 
              $(el).attr('data-type') == 'column-block'
            ) {
    					return {
      					type: 'div',
                'data-type':'column-block'
      				};
    				}
    				return '';
    			},
    		}
      ),
		  // Define the View
		  view: defaultType.view
    });
    
    editor.on('component:update', component => {
      if (component.attributes.type == 'column') {
        $(component.view.el).addClass('column-block');
        var c = component.view.childrenView.collection.length;
        if (c > 0) {
          $(component.view.el).children('.placeholder').remove();
        }
        else if ($(component.view.el).children('.placeholder').length == 0) {
          $(component.view.el).append(placeholder);
        }
      }
    });
        
	}
  
  function addBlock () {
    editor.BlockManager.add('column', {
  		label: 'Column',
  		category: 'Layout',
  		attributes: {
  			class:'gjs-fonts gjs-f-b1',
        'data-type':'column-block'
  		},
  		content: {
  			type: 'column',
  			content: '<div class="column-block" data-type="column-block"></div>'
      }
  	});
	}
	
	function addEditorStyles () {
    var s = document.createElement('style');
    s.innerHTML = '.column-block{margin: 5px;padding:10px;word-wrap:break-whitespace;}' +
                  '.column-block .placeholder{color:#dfdfdf;}';
    Drupal.grapesjs.instance.iframe.head.appendChild(s);
	}
	
});
})(Drupal, jQuery, grapesjs);