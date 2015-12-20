window.onload = function(){
    getPhotoAlbums();
};

function getPhotoAlbums(){

    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function(){
        if(xhttp.readyState == 4 && xhttp.status == 200){
            console.log(xhttp.responseText);
            var data = JSON.parse(xhttp.responseText);
            //console.log(data);
            populatePage(data);
        }
    };


    xhttp.open('GET', '/photoAlbumList', true);
    xhttp.send();


}


function populatePage(data){


    console.log(data);

    var container = document.getElementById('album-container')

    data.forEach(function(picture){
        if(picture.name !== "Cover Photos"){
            var a = document.createElement('a');

            var div = document.createElement("div");
            div.className = "lb-photo-album";

            var img = new Image(200,200);
            img.src = picture.url;

            div.appendChild(img);

            container.appendChild(div);
        }

    });
}
