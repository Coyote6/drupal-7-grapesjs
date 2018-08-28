<?php
     
// Configs
define ('GRAPESJS_PATH', drupal_get_path ('module', 'grapesjs'));
define ('GRAPESJS_AJAX_URL', 'editor/grapesjs');

// Get additional includes.
require_once GRAPESJS_PATH . DIRECTORY_SEPARATOR . 'grapesjs.ajax.inc';
require_once GRAPESJS_PATH . DIRECTORY_SEPARATOR . 'grapesjs.forms.inc';
