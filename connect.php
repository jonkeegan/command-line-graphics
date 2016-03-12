<?php

$server = $_SERVER["SERVER_NAME"];

switch ($server) {
  case "localhost":
    //require_once '/connections/idiorm_public_production.php';
    require_once '/connections/idiorm_connection_wsj.php';
    break;
  case "graphicsdev.dowjones.net":
    require_once '/var/www/cgi-bin/idiorm_public_staging.php';
    break;
  case "graphics.wsj.com":
  case "graphicsweb.wsj.com":
  case "djsp-wsjgraphics-phpwap-prod-819515987.us-east-1.elb.amazonaws.com":
    require_once '/var/www/cgi-bin/idiorm_public_production.php';
    break;
  default:
    echo "not sure where i am";
}
