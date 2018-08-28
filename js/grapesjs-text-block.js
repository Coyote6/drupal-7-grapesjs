(function (Drupal, $, grapesjs) {
grapesjs.plugins.add ('txtBlock', function(editor, options) {

  options = options || {};

  addComponent();
  addBlock();

  function addComponent() {
    
    var txtType = editor.DomComponents.getType('text');
    var defaults = Object.assign({}, txtType.model.prototype.defaults, {
  		tagName: 'div',
  		name: 'Text Block',
      propagate: '["editable", "droppable"]',
      attributes: {
        'data-type':'text'
      }
		});

		
		// Text Block
  	editor.DomComponents.addType('txtBlock', {
  		model: txtType.model.extend({
  			defaults: defaults
  		}, {
  			isComponent: function(el) {
          if (
            typeof el.hasAttribute == "function" && 
            el.hasAttribute("data-type") && 
            $(el).attr('data-type') == 'text-block'
          ) {
  					return {
    					type: 'txtBlock',
    					attributes: {
    					  "data-type" : "text-block"
              }
    				};
  				}
  				return '';
  			},
  		}),
  		// Define the View
  		view: txtType.view
  	});
  
  };

  function addBlock() {
    editor.BlockManager.add("txtBlock", {
      label: "Text Block",
      category: 'Text',
      content: {
        type : "txtBlock",
        components: '<p>Insert your text here...</p>',
      },
      attributes: {
			  class:'gjs-fonts gjs-f-text',
        'data-type' : 'text'
     },
     activeOnRender: 1
    });
    
  };
  
  /*
    // Text Block
	comps.addType('txtBlock', {
		model: textModel.extend({
			defaults: Object.assign({}, textModel.prototype.defaults, {
				tagName: 'div',
				name: 'Text Block',
				editable: 1,
			  droppable: 1,
			  draggable: 1,
				classes: ['txt-block'],
  		  propagate: ['removable', 'draggable', 'droppable', 'selectable']
			})
		}, {
			isComponent: function(el) {
				if(el.tagName == 'div' && el.classList.contains('txt-block')){
					return {type: 'txtBlock'};
				}
				return '';
			},
		}),
		// Define the View
		view: textType.view
	});
	// Text
	bm.add('text', {
		label: 'Text Block',
		category: 'Text',
		attributes: {
			class:'gjs-fonts gjs-f-text'
		},
		content: {
			type: 'txtBlock',
 //     components: '<p class="paragraph-txt" contenteditable="true" data-gjs-name="Paragraph" data-gjs-selectable="1" data-gjs-removable="1" data-gjs-toolbar="1" data-gjs-draggable=".paragraph-txt" data-gjs-droppable="' + phrasingElsStr + '">Insert your text here...</p>',
        components: '<p>Insert your text here...</p>',
//      components: '<p class="paragraph-txt">Insert your text here...</p>'
			activeOnRender: 1
		},
	});*/

});
})(Drupal, jQuery, grapesjs);