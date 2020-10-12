<?php
 
require __DIR__ . '/vendor/autoload.php';
// DataTables PHP library
include( "Editor-PHP-1.9.0/lib/DataTables.php" );
 
// Alias Editor classes so they are easy to use
use
    DataTables\Editor,
    DataTables\Editor\Field,
    DataTables\Editor\Format,
    DataTables\Editor\Mjoin,
    DataTables\Editor\Options,
    DataTables\Editor\Upload,
    DataTables\Editor\Validate;

// $servername = null;
// $username = "internship";
// $password = "nancy05141424";
// $dbname = "test";
// $dbport = null;

// $conn = new mysqli($servername, $username, $password, $dbname, $dbport, "/cloudsql/wise-karma-237519:us-central1:internship=tcp:3305");

// if ($conn->connect_error){
//     die("connetion failed: " . $conn->connect_error);
// }



$editor = Editor::inst( $db, 'internship1' )
    ->fields(
        Field::inst( 'id' ),
        Field::inst( 'realtime_start' ),
        Field::inst( 'realtime_end' ),
        Field::inst( 'name' ),
        Field::inst( 'press_release' ),
        Field::inst( 'link' ),
        Field::inst( 'notes' )
    )
    ->process( $_POST )
    ->json();

?>
