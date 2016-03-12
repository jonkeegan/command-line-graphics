<?php

require_once("idiorm.php");

$hostName = "localhost";
$database = "XXX_YOUR_DB_NAME_HERE_XXX";
$username = "root";
$password = "root";

define("DB_HOST", $hostName);
define("DB_USER", $username);
define("DB_PASS", $password);
define("DB_NAME", $database);

ORM::configure('mysql:host='.$hostName.';dbname='.$database);
ORM::configure('username',$username);
ORM::configure('password',$password);
ORM::configure('driver_options', array(PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8'));

$table = 'pillbox';
 
if (isset($_GET['filter']) && $_GET['filter'] != "undefined" )  {
	$filter_field = $_GET['filter'];
} else {
	$filter_field = 'splshape_new';
}

if (isset($_GET['value']) && $_GET['value'] != "undefined" ) {
	$filter_val = $_GET['value'];
} else {
	$filter_val = 'C48336';
}

function filterData($field, $val){
	$results_array = array();

	$results = ORM::for_table('pillbox')->select_many('splimage', 'rxstring', 'author', 'ingredients_new', 'spl_inactive_ing_new', 'splshape_text', 'splcolor_text', 'splcolor_new', 'splimprint_new','dea_schedule_code')->where(array(
	$field => $val,
	'has_image' => 'true'
	))->find_array();

	$results_array = array(
	//'totalRecords' => $results_count,
	'data' => $results
	);
		
	$res = json_encode($results_array);
	return $res;
}

$call = filterData($filter_field, $filter_val);
echo $call;