<?php
  
  
// Menu callback for ajax pages.
function grapesjs_ajax ($arg) {
  
  if (is_string ($arg) && $arg != '') {
    switch ($arg) {
      
      case 'get-upload-form':
        return _grapesjs_get_upload_form();
        break;
        
      case 'upload':
        return _grapesjs_ajax_upload();
        break;
      
      case 'assets':
        return _grapesjs_get_ajax_assets();
        break;
        
      default:
        drupal_access_denied();
        return;
    }   
  }
  
  drupal_access_denied();
  return;
  
}


// Helper function to return the grapesjs upload validation
function _grapesjs_ajax_upload () {

  $form = drupal_get_form ('grapesjs_upload_form');

  $json = [
    'success' => true,
    'files' => _grapesjs_get_assets()
  ];
  print drupal_json_encode($json);
  return;
  
}


function _grapesjs_get_upload_form () {

  if (!isset ($_POST['fid']) || $_POST['fid'] != 'upload') {
    drupal_access_denied();
    return;
  }

  $form = drupal_get_form ('grapesjs_upload_form');
  $html = drupal_render ($form);

  $javascript = drupal_add_js(NULL, NULL);
  $settings = FALSE;
  
  if (isset ($javascript['settings'])) {
    $settings = '<script type="text/javascript">jQuery.extend(Drupal.settings, ' .
      drupal_json_encode(call_user_func_array('array_merge_recursive', $javascript['settings']['data'])) .
      ');</script>';
  }
  
  //Add the settings to the form
  $html .= $settings;  
  $json = [
    'form' => $html,
  ];
  
  print drupal_json_encode($json);
  return;
  
}


function _grapesjs_get_ajax_assets () {
  $json = [
    'files' => _grapesjs_get_assets()
  ];
  print drupal_json_encode($json);
  return;
}