<?php
$mysqli = new mysqli("localhost", "root", "","actors-tom");  
if (mysqli_connect_errno())
 {
  echo "Failed to connect to MySQL: " . mysqli_connect_error();
}

  
$query = 'select * from `'.$_GET['table'].'`';
$nquery='';
if(count($_GET)>1){
	$query.=' where ';  
	foreach($_GET as $key => $value){
	  if($key!='table'){
		if ($key == 'password') {
			$query.='`password` = '.md5($value).' and ';
		 }else
		 {
		 $query.='`'.$key.'` ='.$value.' and ';
		 }				 
	  }
	}
  $nquery = substr($query, 0, -4);
}else
{
	$nquery=$query;
}

$rows = array();
if ($result = $mysqli->query($nquery)) {

    while($row = $result->fetch_array(MYSQL_ASSOC)) {
            $rows[] = $row;
    }
    echo json_encode($rows);
}

$result->close();
$mysqli->close();
?>