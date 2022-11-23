

<?php
// The credentials for my mySql database and the dbname to where the info is being retrieved
$servername = "localhost";
$username = "root";
$password = "Epicwu28074.";
$dbname = "Yugioh_Cards";
$searchValue = $_GET["name"];
try {

  // connects to the mySQL database
  $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
  $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

  // the query to the database where it will search the card name
  $query = "SELECT * FROM Monster_Cards WHERE name = '" . $searchValue . "'";
  // process the query
  $data = $conn->query($query);
  $row = $data->fetch(PDO::FETCH_ASSOC);
  // if the card is not in database return false
  if ($row == false ) {
    echo false;
  }
  // send data back to be processed
  else {
    echo json_encode($row);
  }
}
catch(PDOException $e) {
  echo "Error: " . $e->getMessage();
}
?>
