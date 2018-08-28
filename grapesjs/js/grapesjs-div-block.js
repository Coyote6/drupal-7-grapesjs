(function (Drupal, $, grapesjs) {
grapesjs.plugins.add ('divBlock', function(editor, options) {

  options = options || {};
  
  addComponent();
  addBlock();
  
  editor.on('load', function(){
    addEditorStyles();
  });
    
  var placeholder = '<span class="placeholder">Drop items here...</span>';
                
  function addComponent () {
    var defaultType = editor.DomComponents.getType('default');
    var defaults =  Object.assign({}, defaultType.model.prototype.defaults, {
			tagName: 'div',
			name: 'Container (Div)',
      editable: true,
      droppable: true,
		  draggable: ["body", "article", "aside", "blockquote","div", "dd", "fieldset", "figcaption", "figure", "footer", "form", "header", "li", "main", "nav", "noscript", "output", "pre", "section", "th", "td"],
      attributes: {
        'data-type':'div-block',
        'class' : 'container-block'
      },
		});

    editor.DomComponents.addType('div', {
    	model: defaultType.model.extend (
      	{
    			defaults: defaults,
        }, {
      		isComponent: function(el) {
    				if (
              typeof el.hasAttribute == "function" && 
              el.hasAttribute("data-type") && 
              $(el).attr('data-type') == 'div-block'
            ) {
    					return {
      					type: 'div',
                'data-type':'div-block',
                attributes : {
                  'class' : 'container-block'                
                }
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
      if (component.attributes.type == 'div') {
        $(component.view.el).addClass('container-block');
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
    editor.BlockManager.add('div', {
  		label: 'Container (Div)',
  		category: 'Layout',
  		attributes: {
  			class:'gjs-fonts gjs-f-b1',
        'data-type':'div-block',
  		},
  		content: {
  			type:'div',
      },
      activeOnRender: 1
  	});
	}
	
	function addEditorStyles () {
    var s = document.createElement('style');
    s.innerHTML = '.container-block{padding: 10px;}' +
                  '.container-block .placeholder{color:#dfdfdf;}';
    Drupal.grapesjs.instance.iframe.head.appendChild(s);
	}
	
});
})(Drupal, jQuery, grapesjs);