(function (Drupal, $, grapesjs) {
grapesjs.plugins.add ('test', function(editor, options) {

  options = options || {};

  addComponent();
  addBlock();

  function addComponent() {
    
    var defaultType = editor.DomComponents.getType('default');
    var defaults = Object.assign({}, defaultType.model.prototype.defaults, {
      editable: false,
      droppable: false,
      propagate: '["editable", "droppable"]',
      attributes: {
        'data-test':'true'
      }
		});

    editor.DomComponents.addType ('myType', {
      model: defaultType.model.extend({
        defaults: defaults,
        toHTML: function() {
    			return '<div data-test="true">Test</div>';
    		},
      },{ 
        isComponent: function(el) {
          if (typeof el.hasAttribute == "function" && el.hasAttribute("data-test")) {
           var id = $(el).attr('data-test');
            return {
              type: "myType",
              attributes: {
                'data-test' : 'true'
              }
            };
          }
        }

      }),
      view: defaultType.view.extend({
        render: function () {
          defaultType.view.prototype.render.apply(this, arguments);
          
          this.el.innerHTML = '<div data-test="true"><ul><li><p>List Item 1</p></li><li><p>List Item 1</p></li></ul></div>';
          return this;
        }
      }) 
    });
  
  };

  function addBlock() {
    editor.BlockManager.add("myType", {
      label: "Test Type",
      category: 'Advanced',
      content: {
        type : "myType",
        content : '<div data-test="true"><ul><li><p>List Item 1</p></li><li><p>List Item 1</p></li></ul></div>'         
      },
      attributes: {
        class : "fa gjs-f-hero",
      }
    });
  };

});
})(Drupal, jQuery, grapesjs);