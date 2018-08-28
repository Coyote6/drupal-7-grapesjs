(function (Drupal, $, grapesjs) {
grapesjs.plugins.add('htmlBlock', function(editor, options) {
  options = options || {};

  addEditor();
  addComponent();
  addBlock();

  function addEditor() {
    editor.Commands.add("openHtmlCodeEditor", {
      run: function(editor, sender, data) {
        var component = editor.getSelected();

        var codeViewer = editor.CodeManager.getViewer("CodeMirror").clone();
        codeViewer.set({
          codeName: "htmlmixed",
          theme: "hopscotch",
          readOnly: false
        });

        var modalContent = document.createElement("div");

        var editorTextArea = document.createElement("textarea");

        var saveButton = document.createElement("button");
        saveButton.innerHTML = "Save";
        saveButton.className = "gjs-btn-prim";
        saveButton.style = "margin-top: 8px;";
        saveButton.onclick = function() {
          component.set("content", "");
          component.components(codeViewer.editor.getValue());
          editor.Modal.close();
        };

        modalContent.appendChild(editorTextArea);
        modalContent.appendChild(saveButton);

        codeViewer.init(editorTextArea);

        var htmlContent = document.createElement("div");
        htmlContent.innerHTML = component.toHTML();
        htmlContent = htmlContent.firstChild.innerHTML;
        codeViewer.setContent(htmlContent);

        editor.Modal
          .setTitle("Edit HTML")
          .setContent(modalContent)
          .open();

        codeViewer.editor.refresh();
      }
    });
  };

  function addComponent() {
    var defaultType = editor.DomComponents.getType('default');

    var _initToolbar = defaultType.model.prototype.initToolbar;

    editor.DomComponents.addType('htmlCode', {
      model: defaultType.model.extend({
        initToolbar(args) {
          _initToolbar.apply(this, args);

          var toolbar = this.get("toolbar");
          toolbar.push({
              attributes: { "class": "fa fa-code" },
                command: "openHtmlCodeEditor"
          });
          this.set("toolbar", toolbar);
        }
      }, {
        isComponent: function(el) {
          if (typeof el.hasAttribute == "function" && el.hasAttribute("data-html-code")) {
            return {type: "html-code"};
          }
        }
      }),
      view: defaultType.view.extend({
        events: {
          dblclick: function(){
            editor.runCommand("openHtmlCodeEditor");
          }
        },
      })
    });

  };

  function addBlock() {
    editor.BlockManager.add("htmlCode", {
      attributes: {class: "fa fa-code"},
      label: "HTML Code",
      category: 'Advanced',
      content: '<div data-html-code>Double Click to Edit Code</div>'
    });
  };

});
})(Drupal, jQuery, grapesjs);