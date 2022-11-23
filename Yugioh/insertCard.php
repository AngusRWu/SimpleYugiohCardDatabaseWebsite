<?php
// The credentials for my mySql database and the dbname to where the info is being inserted
$servername = "localhost";
$username = "root";
$password = "Epicwu28074.";
$dbname = "Yugioh_Cards";
$searchValue = $_POST;
$cardImgUrl = $searchValue["card_images"];

try {
  // gets the value from Post data and stores it in a variable
  $id = $searchValue["id"];
  $name = $searchValue["name"];
  $type = $searchValue["type"];
  $desc = $searchValue["desc"];
  $atk = $searchValue["atk"];
  $def = $searchValue["def"];
  $level = $searchValue["level"];
  $race = $searchValue["race"];
  $attribute = $searchValue["attribute"];
  $imgLink = "images/" .  $id . ".jpg";

  // stores the the image associated with the card by get the image path from API
  $imgUrl = 'https://images.ygoprodeck.com/images/cards/' . $id . '.jpg';
  // the directory location to be stored
  $imgPath = $_SERVER["DOCUMENT_ROOT"] . '/Yugioh/images/' . $id . '.jpg';
  // the method to store the image onto local linux server
  file_put_contents($imgPath, file_get_contents($imgUrl));

  
  // connects to the mySQL database
  $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
  $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  // the query that is used to insert into the database
  $query = $conn->prepare("INSERT INTO Monster_Cards (id, name, type, description, atk, def, level, race, attribute, image_link) VALUES (:id, :name, :type, :desc, :atk, :def, :level, :race, :attribute, :imgLink)");
  $query->bindParam(':id', $id);
  $query->bindParam(':name', $name);
  $query->bindParam(':type', $type);
  $query->bindParam(':desc', $desc);
  $query->bindParam(':atk', $atk);
  $query->bindParam(':def', $def);
  $query->bindParam(':level', $level);
  $query->bindParam(':race', $race);
  $query->bindParam(':attribute', $attribute);
  $query->bindParam(':imgLink', $imgLink);
  $query->execute();
  // $query = "INSERT INTO Monster_Cards (id, name) VALUES ('$id', '$name')" ;
  // $data = $conn->query($query);
  // $row = $data->fetch(PDO::FETCH_ASSOC);
  // if ($row == false ) {
  //  echo false;
  // }
  // else {
  //   echo json_encode($row);
  // }
  echo "finished";
}
catch(PDOException $e) {
  echo "Error: " . $e->getMessage();
}
?>