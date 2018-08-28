(function (Drupal, $, grapesjs) {
grapesjs.plugins.add('drupalBlocks', function(editor, options) {
  options = options || {};

  addComponent();
  addBlock();
    
  
  function addComponent() {
    
    var defaultType = editor.DomComponents.getType('default');
    var _initToolbar = defaultType.model.prototype.initToolbar;
    var defaults =  Object.assign({}, defaultType.model.prototype.defaults, {
			name: 'Drupal Block',
      editable: false,
      droppable: false,
      propagate: '["editable", "droppable"]'
		});

    editor.DomComponents.addType ('drupalBlock', {
      model: defaultType.model.extend({
        defaults: defaults,
        toHTML: function() {
          var id = '';
          if (
            typeof (this.attributes) == 'object' && 
            typeof (this.attributes['data-drupal-block']) == 'string'
          ) {
            id = this.attributes['data-drupal-block'];
          }
    			return '<div data-drupal-block="' + id + '">[block]' + id + '[/block]</div>';
    		},
        initToolbar(args) {
          _initToolbar.apply(this, args);
        }
      },{
        isComponent: function(el) {
          if (typeof el.hasAttribute == "function" && el.hasAttribute("data-drupal-block")) {
            var id = $(el).attr('data-drupal-block');
            return {
              type: "drupalBlock",
              'data-drupal-block' : id
            };
          }
        }
      }),
      view: defaultType.view.extend({
        render: function () {
          
          const comps = this.model.get('components');
          var id = '';
          if (
            typeof (comps.parent) == 'object' && 
            typeof (comps.parent.attributes) == 'object' && 
            typeof (comps.parent.attributes['data-drupal-block']) == 'string'
          ) {
            id = comps.parent.attributes['data-drupal-block'];
          }
          defaultType.view.prototype.render.apply(this, arguments);

          var html = 'The selected Drupal block is currently unable to be selected.';
          if (typeof (options.blocks[id]) != 'undefined') {
            html = options.blocks[id].rendered;
          }
          
          this.el.innerHTML = html;
                  
          return this;
        }
      })  
    });

  };

  function addBlock() {
    
    $.each(options.blocks, function (k, v) {

      editor.BlockManager.add("drupalBlock" + v.bid, {
        label: v.info,
        category: 'Drupal Blocks',
        content: {
          type : "drupalBlock",
          "data-drupal-block" : v.bid,
          content : v.rendered
        },
        attributes: {
          "data-drupal-block" : v.bid,
          class : "fa gjs-f-hero",
        }
      });
    }); 
    
  };

});
})(Drupal, jQuery, grapesjs);