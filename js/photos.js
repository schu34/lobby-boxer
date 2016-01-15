window.addEventListener("load", getPhotoAlbums);

function getPhotoAlbums(){

    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function(){
        if(xhttp.readyState == 4 && xhttp.status == 200){
            //console.log(xhttp.responseText);
            var data = JSON.parse(xhttp.responseText);
            console.log(data);
            addPhotos(data.data);
        }
    };


    xhttp.open('GET', '/photos', true);
    xhttp.send();


}


function addPhotos(data){


    console.log(data);

    var container = document.getElementById('album-container');

    data.forEach(function(photo){

        var minDiff = 1000000;//bigger than any possible image
        var minDiffIndex = 0;

        var biggest = 0;
        var biggestIndex = 0;

        for(var i = 0; i < photo.images.length; i++){
            var diff = photo.images[i].height - 300;
            //get thumbnail size image
            if (diff < minDiff && diff > 0){
                minDiff = diff;
                minDiffIndex = i;
            }
            //get biggest image
            if(photo.images[i].height > biggest){
                biggest = photo.images[i].height;
                biggestIndex = i;
            }
        }

        picture = photo.images[minDiffIndex];


        //create image wrapped in link
        var a = document.createElement('a');

        a.href = photo.images[biggestIndex].source;
        a.setAttribute("data-lightbox", "photos");
        a.className = "photo-album-link";

        var div = document.createElement("div");
        div.className = "lb-photo-album";

        var img = new Image();
        img.src = picture.source;
        img.className = "album-thumbnail";

        div.appendChild(img);

        a.appendChild(div);

        container.appendChild(a);
    });
}
