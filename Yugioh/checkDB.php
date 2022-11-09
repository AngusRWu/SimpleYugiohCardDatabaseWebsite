<?php
$servername = "localhost";
$username = "root";
$password = "Epicwu28074.";
$dbname = "Yugioh_Cards";
$searchValue = $_GET["name"];
try {
  $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
  $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

  $query = "SELECT * FROM Monster_Cards WHERE name = '" . $searchValue . "'";
  $data = $conn->query($query);
  $row = $data->fetch(PDO::FETCH_ASSOC);
  if ($row == false ) {
    echo false;
  }
  else {
    echo json_encode($row);
  }
}
catch(PDOException $e) {
  echo "Error: " . $e->getMessage();
}
?>
