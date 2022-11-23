// URL for api Yugioh cards
var URL="https://db.ygoprodeck.com/api/v7/cardinfo.php?";

// Checks if a specified Yugioh cards is in my database
function checkDB() {
        // gets the searched name from the html client side
        var searchValue = {"name" : document.getElementById("search").value};
        // call ajax to the checkDB.php file and pass in the searched value to the php file
        a = $.ajax({
                url: "checkDB.php",
                method: "GET",
                data: searchValue

                // retrieves data which either gets the card information from checkDB.php
                // or calls another function which will pull info of the card and add to
                // my database. Card info will be update on the html client side.
        }).done(function(data) {

                if (data == false) {
                        getApiCardInfo();
                }
                else {
                        
                        // gets the data from ajax call and store in variable
                        var parsed = JSON.parse(data);
                        
                        // Assign the data values to each id on the HTML client side
                        $("#id")[0].innerHTML = parsed["id"];
                        $("#name")[0].innerHTML = parsed["name"];
                        $("#type")[0].innerHTML = parsed["type"];
                        $("#description")[0].innerHTML = parsed["description"];
                        $("#atk")[0].innerHTML = parsed["atk"];
                        $("#def")[0].innerHTML = parsed["def"];
                        $("#level")[0].innerHTML = parsed["level"];
                        $("#race")[0].innerHTML = parsed["race"];
                        $("#attribute")[0].innerHTML = parsed["attribute"];
                        
                        // console.log("from CheckDB\t" + parsed["image_link"]);
                        $("img").attr("src", parsed["image_link"]);
                        $("img").show();
                        $(".textInfo").show();
                        
                }
        }).fail(function(error) {
                console.log("error", error.statusText);
        });

}

// Gets Yugioh card info from the API then adds it to my personal database
function getApiCardInfo() {
        // gets the searched name from the html client side
        var searchValue = {"name" : document.getElementById("search").value};
        // call ajax to the yugioh API and pass in the searched value to the API call
        a = $.ajax({
                url: URL + "name=" + searchValue.name,
                method: "GET"

                // retrieves data which gets the card information from Yugioh API
                // Card info will be update on the html client side.
        }).done(function(data) {
                // console.log(data.data[0]);

                // gets the data from ajax call and store in variable
                var dataValues = data.data[0];
                // console.log(insertCardInfo(dataValues));
                
                // Assign the data values to each id on the HTML client side
                $("#id")[0].innerHTML = dataValues.id;
                $("#name")[0].innerHTML = dataValues.name;
                $("#type")[0].innerHTML = dataValues.type;
                $("#description")[0].innerHTML = dataValues.desc;
                $("#atk")[0].innerHTML = dataValues.atk;
                $("#def")[0].innerHTML = dataValues.def;
                $("#level")[0].innerHTML = dataValues.level;
                $("#race")[0].innerHTML = dataValues.race;
                $("#attribute")[0].innerHTML = dataValues.attribute;

                // The set timeout function is her because when I change the source of the img, it gives me
                // 404 Not Found error. This is due to the img set source finishing faster before my images 
                // is stored properly in my server.
                setTimeout(function() {
                        $("img").attr("src", "images/" + dataValues.id + ".jpg");
                        $("img").show();
                        $(".textInfo").show(); 
                }, 1000);
        }).fail(function(error) {
                console.log("Not a valid card");
        });
}

// A function to insert new card information to my database
function insertCardInfo(dataValues) {
        // console.log(dataValues);

        // calls ajax to insertCard.php and inserts data
        a = $.ajax({
                url: "insertCard.php",
                method: "POST",
                data: dataValues
        }).done(function(data) {
                console.log(data);
                
        }).fail(function(error) {
                console.log(error);
        });
}
