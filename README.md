GrapesJs Editor

# WARNING!
This is just a sandbox at the moment.  Security checks are not in place and things are probably not done the proper way.  Use at your own risk!

[Drupal 8 version can be found here](https://github.com/Coyote6/drupal-8-grapesjs)... it is not as up-to-date as this one at the time.  The JavaScripts and plugins on this Drupal 7 version are a bit more complete.

## To Install & Configure:
1. Place module in /sites/all/modules/custom folder or similar Drupal 7 module location.
2. Download [GrapesJs](https://github.com/artf/grapesjs/tree/master) and place it in the /sites/all/libraries/ director and name the folder grapesjs. Current GrapesJs version this was built using is 0.14.43.
3. Download [CKEditor 4](https://ckeditor.com/ckeditor-4/download/) and place it in the /sites/all/libraries/ directory and name it ckeditor. Current CKEditor version this was built using is 4.9.2.
4. Download [CKEditor 4 - Link Plugin](https://ckeditor.com/ckeditor-4/download/) and place it in the /sites/all/libraries/ckeditor/plugins directory and name it link.
5. Download [CKEditor 4 - Shared Space Plugin](https://ckeditor.com/ckeditor-4/download/) and place it in the /sites/all/libraries/ckeditor/plugins directory and name it sharedspace.
6. Install module from the modules page.
7. Make sure the "Overlay" module is shutoff, due to conflicting screen space.
8. Currently set to just work a text format with the machine name "visual\_editor", so you will need to create a new text format from the configs page /admin/config/content/formats/add and name it "Visual Editor" with the machine name of "visual\_editor".

## To use:
1. Go to an entity with text field and select the format you set GrapesJS to as the Text Editor "Visual Editor".
2. Click the "Open Editor" Button and enjoy!

## Quirks/Bugs
1. If you are editing an element and exit before clicking off of the element, the update:component event doesn't fire and the new changes are not sent to the text area to be saved.
2. Works best with custom responsive themes as Bartik is not responsive.
3. Theme needs to be set before using Drupal Blocks, otherwise they will need to be redone.
3. File uploads are very hackie (but functioning) and are not done the proper way I am sure.
4. Some settings are hard coded at the moment. 
5. And many more to come... lol

## Roadmap
1. Keep breaking apart the default plugin into smaller more manageable plugins.
2. Add in call to switch to an image style using traits.
3. Figure out what is the best way to load assets for Admins since they have access to all files. Currently it just loads assets added by that user.
4. Double check security to current features.
5. Add configuration page to allow customization, and to allow limiting of Drupal Blocks. This will also help loads when lots of blocks are available by the theme.
6. Add the ability to select a blank page template or use default one.
7. Clean up other found plugins to match the same programming patterns.
