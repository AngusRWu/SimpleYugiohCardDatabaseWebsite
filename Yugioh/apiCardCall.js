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
                        // console.log(data);
                        var parsed = JSON.parse(data);
                        // console.log(parsed["id"]);
                        $("#id")[0].innerHTML = parsed["id"];
                        // $("#id").append(parsed["id"]);
                        $("#name")[0].innerHTML = parsed["name"];
                        // $("#name").append(parsed["name"]);
                        $("#type")[0].innerHTML = parsed["type"];
                        // $("#type").append(parsed["type"]);
                        $("#description")[0].innerHTML = parsed["description"];
                        // $("#description").append(parsed["description"]);
                        $("#atk")[0].innerHTML = parsed["atk"];
                        // $("#atk").append(parsed["atk"]);
                        $("#def")[0].innerHTML = parsed["def"];
                        // $("#def").append(parsed["def"]);
                        $("#level")[0].innerHTML = parsed["level"];
                        // $("#level").append(parsed["level"]);
                        $("#race")[0].innerHTML = parsed["race"];
                        //$("#race").append(parsed["race"]);
                        $("#attribute")[0].innerHTML = parsed["attribute"];
                        //$("#attribute").append(parsed["attribute"]);
                        console.log("from CheckDB\t" + parsed["image_link"]);
                        $("img").attr("src", parsed["image_link"]);
                        $("img").show();
                        $(".textInfo").show();
                        
                }
                // var json = JSON.parse(data);
                // var length = Object.keys(json).length;
                // for (var i = 0; i < length; i++) {
                //         console.log(json[i]);
                // }

        }).fail(function(error) {
                console.log("error", error.statusText);
        });

}

function getApiCardInfo() {
        var searchValue = {"name" : document.getElementById("search").value};
        alert(searchValue.name);
        a = $.ajax({
                url: URL + "name=" + searchValue.name,
                method: "GET"
        }).done(function(data) {
                // console.log(data.data[0]);
                var dataValues = data.data[0];
                console.log(insertCardInfo(dataValues));

                // $("#id").append(dataValues.id);
                // $("#name").html = "";
                // $("#name").append(dataValues.name);
                // $("#type").html = "";
                // $("#type").append(dataValues.type);
                // $("#description").html = "";
                // $("#description").append(dataValues.desc);
                // $("#atk").html = "";
                // $("#atk").append(dataValues.atk);
                // $("#def").html = "";
                // $("#def").append(dataValues.def);
                // $("#level").html = "";
                // $("#level").append(dataValues.level);
                // $("#race").html = "";
                // $("#race").append(dataValues.race);
                // $("#attribute").html = "";
                // $("#attribute").append(dataValues.attribute);

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

function insertCardInfo(dataValues) {
        // console.log(dataValues);
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
