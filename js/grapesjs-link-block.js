(function (Drupal, $, grapesjs) {
grapesjs.plugins.add ('linkBlock', function(editor, options) {

  options = options || {};

  var placeholder = '<span class="gjs-placeholder">Drop your content...</span>';

  addEditor();
  addComponent(placeholder);
  addBlock(placeholder);
  
  editor.on('load', function(){
    addEditorStyles();
  });
 
  function addEditor() {
    editor.Commands.add("openLinkEditor", {
      run: function(editor, sender, data) {
        
        var component = editor.getSelected();
        var modalContent = document.createElement("div");
        
        var attrs = component.getAttributes();
        var href = attrs.href;
        var id = attrs.id;
        var classes = attrs.class;
        console.log(attrs);
        
        if (typeof href == 'undefined') {
          href = '';
        }
        if (typeof id == 'undefined') {
          id = '';
        }
        if (typeof classes == 'undefined') {
          classes = '';
        }
        
        classes = classes.replace('link-block', '').trim();

        var urlInput = document.createElement("input");
        urlInput.setAttribute('type', 'text');
        urlInput.setAttribute('name', 'url');
        urlInput.setAttribute('placeholder', 'URL');
        urlInput.value = href;
        
        var idInput = document.createElement("input");
        idInput.setAttribute('type', 'text');
        idInput.setAttribute('name', 'id');
        idInput.setAttribute('placeholder', 'Id');
        idInput.value = id;
        
        var classInput = document.createElement("input");
        classInput.setAttribute('type', 'text');
        classInput.setAttribute('name', 'class');
        classInput.setAttribute('placeholder', 'CSS Class(es)');
        classInput.value = classes;
        
        var saveButton = document.createElement("button");
        saveButton.innerHTML = "Save";
        saveButton.className = "gjs-btn-prim";
        saveButton.style = "margin-top: 8px;";
        saveButton.onclick = function() {
          var href = urlInput.value.trim();
          var id = idInput.value.trim();
          var classes = classInput.value.trim();
          classes += ' link-block';
          classes = classes.trim();
          component.addAttributes({href: href});
          component.setId(id);
          component.setClass(classes);
          component.view.render();
          editor.Modal.close();
        };
        
        var urlContainer = document.createElement("div");
        urlContainer.setAttribute('class', 'form-item');
        urlContainer.appendChild(urlInput);
        var idContainer = document.createElement("div");
        idContainer.setAttribute('class', 'form-item');
        idContainer.appendChild(idInput);
        var classContainer = document.createElement("div");
        classContainer.setAttribute('class', 'form-item');
        classContainer.appendChild(classInput);
        var actionsContainer = document.createElement("div");
        actionsContainer.setAttribute('class', 'form-item actions');
        actionsContainer.appendChild(saveButton);
        
        modalContent.appendChild(urlContainer);
        modalContent.appendChild(idContainer);
        modalContent.appendChild(classContainer);
        modalContent.appendChild(saveButton);

        editor.Modal
          .setTitle("Edit Link")
          .setContent(modalContent)
          .open();

      }
    });
  };
  
  function addComponent (placeholder) {
    
    var defaultType = editor.DomComponents.getType('link');
    var _initToolbar = defaultType.model.prototype.initToolbar;
    var defaults =  Object.assign({}, defaultType.model.prototype.defaults, {
			name: 'Link',
      editable: true,
      droppable: true,
		  draggable: true,
      attributes: {
        'data-type':'link-block'
      },
      classes : ['link-block']
		});


    editor.DomComponents.addType('linkBlock', {
      model: defaultType.model.extend({
        defaults: defaults,
        initToolbar(args) {
          _initToolbar.apply(this, args);

          var toolbar = this.get("toolbar");
          toolbar.push({
              attributes: { "class": "fa fa-gear" },
                command: "openLinkEditor"
          });
          this.set("toolbar", toolbar);
        }
      }, {
        isComponent: function(el) {
          if (
            typeof el.hasAttribute == "function" && 
            el.hasAttribute("data-type") && 
            $(el).attr('data-type') == 'link-block'
          ) {
  					return {
    					type: 'linkBlock',
              'data-type':'link-block'
    				};
  				}
  				return '';
        }
      }),
      view: defaultType.view.extend({
        events: {
          dblclick: function(){
            editor.runCommand("openLinkEditor");
          }
        },
      })
    });
    
    editor.on('component:update', component => {
      if (component.attributes.type == 'linkBlock') {
        var c = $(component.view.el).children('*:not(.gjs-placeholder)').length;
        if (c > 0) {
          $(component.view.el).children('.gjs-placeholder').remove();
        }
        else if ($(component.view.el).children('.gjs-placeholder').length == 0) {
          $(component.view.el).append(placeholder);
        }
      }
    });

  };

  function addBlock (placeholder) {

    editor.BlockManager.add('linkBlock', {
		  label: 'Link',
      category: 'Text',
  		attributes: {
		  	class:'fa fa-link'
  		},
  		content: '<a class="link-block" type="link-block">' + placeholder + '</a>',
  	});
  	
  };
  
  function addEditorStyles () {
    var s = document.createElement('style');
    s.innerHTML = '.link-block{padding:10px;min-width:30px;display:inline-block;}' +
                  '.link-block .placeholder{color:#dfdfdf !important;text-decoration:none;}';
    Drupal.grapesjs.instance.iframe.head.appendChild(s);
	}

});
})(Drupal, jQuery, grapesjs);