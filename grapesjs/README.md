# WARNING!
This is just a sandbox at the moment.  Security checks are not in place and things are probably not done the proper way.  Use at your own risk!

[Drupal 8 version can be found here]()... it is not as up-to-date as this one at the time.  The JavaScripts and plugins on this Drupal 7 version are a bit more complete.

## To Install & Configure:
1. Place module in /sites/all/modules/custom folder or similar Drupal 7 module location.
2. Download [GrapesJs](https://github.com/artf/grapesjs/tree/master) and place it in the /sites/all/libraries/ director and name the folder grapesjs. Current GrapesJs version this was built using is 0.14.27.
3. Download [CKEditor 4](https://ckeditor.com/ckeditor-4/download/) and place it in the /sites/all/libraries/ directory and name it ckeditor. Current CKEditor version this was built using is 4.9.2.
4. Download [CKEditor 4 - Link Plugin](https://ckeditor.com/ckeditor-4/download/) and place it in the /sites/all/libraries/ckeditor/plugins directory and name it link.
5. Download [CKEditor 4 - Shared Space Plugin](https://ckeditor.com/ckeditor-4/download/) and place it in the /sites/all/libraries/ckeditor/plugins directory and name it sharedspace.
6. Install module from the modules page.
7. Currently set to just work a text format with the machine name "visual\_editor", so you will need to create a new text format from the configs page /admin/config/content/formats/add and name it "Visual Editor" with the machine name of "visual\_editor".

## To use:
1. Go to an entity with text field and select the format you set GrapesJS to as the Text Editor "Visual Editor".
2. Click the "Open Editor" Button and enjoy!

## Quirks/Bugs
1. If you are editing an element and exit before clicking off of the element, the update:component event doesn't fire and the new changes are not sent to the text area to be saved.
2. Works best with custom responsive themes as Bartik is not responsive.
3. Theme needs to be set before using Drupal Blocks, otherwise they will need to be redone.
3. File uploads are very hackie (but functioning) and are not done the proper way I am sure.
4. Theme and other settings are hard coded at the moment. 
5. Newly added display of the page is causing errors with drag and dropping, and editing tags are being ignored.
6. And many more to come... lol

## Roadmap
1. Currently working on showing the entire page... and preventing it from being editable
2. Finish drupal blocks and have the values set as a setting instead of ajaxed in.
3. Keep breaking apart the default plugin into smaller more manageable plugins.
4. Add in call to switch to an image style using traits.
5. Figure out what is the best way to load assets for Admins since they have access to all files.
6. Add security to current features.
7. Create new blocks to import views, blocks, and other entities and make sure they are secure.
8. Find a way to display an actual rendered page inside the editor with the header, footer, and other regions and make them non-editable. Then remove on header elements on store. (May only be available to saved entities.)
9. Add the ability to select a blank page template or use default one.
10. Clean up other found plugins to match the same programming patterns.
11. Move the grapesjs library to the proper location. Possibly the /vendors directory.