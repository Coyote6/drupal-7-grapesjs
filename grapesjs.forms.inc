<?php
  
  
function grapesjs_upload_form ($form, &$form_state) {
  $form['files'] = [
    '#type' => 'file',
    '#title' => t('Upload Images'),
    '#name' => 'files[]',
    '#autoupload' => TRUE,
    '#upload_location' => 'public://editor/grapesjs/',
    '#attributes' => ['multiple' => 'multiple'], 
    '#description' => t('Allowed extensions: gif png jpg jpeg'),
    '#upload_validators' => [
      'file_validate_is_image' => [],
      'file_validate_extensions' => ['gif png jpg jpeg'],
      'file_validate_size' => [25600000]
    ],

  ];

  $form['submit'] = [
    '#type' => 'submit',
    '#value' => t('Submit'),
    '#ajax' => array(
      'callback' => 'grapesjs_upload_form_submit',
    ),
  ];

  return $form;
}


function grapesjs_upload_form_submit ($form, &$form_state) {
  
  //Save multiple files
  $num_files = count($_FILES['files']['name']);
  for ($i = 0; $i < $num_files; $i++) {
    $file = file_save_upload ($i, $form['files']['#upload_validators'], $form['files']['#upload_location'], FILE_EXISTS_RENAME); 
  }
  $json = [
    'success' => true
  ];
  print drupal_json_encode($json);
  return;
}