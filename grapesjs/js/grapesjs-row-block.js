(function (Drupal, $, grapesjs) {
grapesjs.plugins.add ('rowBlock', function(editor, options) {

  options = options || {};
  
  addComponent();
  addBlock();
  
  editor.on('load', function(){
    addEditorStyles();
  });
    
  var placeholder = '<span class="placeholder">Drop columns here...</span>';

  function addComponent () {
    
    var defaultType = editor.DomComponents.getType('default');
    var defaults =  Object.assign({}, defaultType.model.prototype.defaults, {
			tagName: 'div',
			name: 'Row',
      editable: true,
      droppable: true,//"div.column-block",
		  draggable: ["body", "article", "aside", "blockquote","div:not(.row-block)", "dd", "fieldset", "figcaption", "figure", "footer", "form", "header", "li", "main", "nav", "noscript", "output", "pre", "section", "th", "td"],
      attributes: {
        'data-type':'row-block'
      }
		});

    editor.DomComponents.addType('row', {
    	model: defaultType.model.extend (
      	{
    			defaults: defaults,
        }, {
      		isComponent: function(el) {
    				if (
              typeof el.hasAttribute == "function" && 
              el.hasAttribute("data-type") && 
              $(el).attr('data-type') == 'row-block'
            ) {
    					return {
      					type: 'div',
                'data-type':'row-block'
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
      if (component.attributes.type == 'row') {
        $(component.view.el).addClass('row-block');
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
    editor.BlockManager.add('row', {
  		label: 'Row',
  		category: 'Layout',
  		attributes: {
  			class:'gjs-fonts gjs-f-b1',
        'data-type':'row-block'
  		},
  		content: {
  			type: 'row'
      }
  	});
	}
	
	function addEditorStyles () {
    var s = document.createElement('style');
    s.innerHTML = '.row-block{padding:10px;display:flex;align-items:flexstart;flex-wrap:no-wrap;}' +
                  '.row-block .placeholder{color:#dfdfdf;}';
    Drupal.grapesjs.instance.iframe.head.appendChild(s);
	}
	
});
})(Drupal, jQuery, grapesjs);