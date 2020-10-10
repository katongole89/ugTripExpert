function initMap() {
    const uluru = { lat: 0.347596, lng: 32.582520 };
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 7,
      center: uluru
    });

    var url = document.querySelector('#urlPlaces').value;
    document.querySelector('#spinning').style.display = "block";


    //fetch data from the server
    fetch(url)
    .then(result => {
        //console.log(result);
        return result.json();

    })
    .then(data => {
      document.querySelector('#spinning').style.display = "none";

        for (var i = 0; i < data.length; i++){
            const innerArray = data[i];
            //console.log(innerArray['name']);
            const lat = innerArray['lat']
            const lng = innerArray['lng']
            const locale = {lat: parseFloat(lat), lng: parseFloat(lng)};

            //rating star string
            var rate;
            var stars = "";
            var placeRating = parseFloat(innerArray['rating']);
            if (placeRating <= 0.99){
              stars = stars + '<span class="fas fa-star-half-alt" style ="color:orange;"></span>'
            }
            else{
              while (placeRating >=1){
                stars = stars + '<span class="fa fa-star checked"></span>';
                placeRating = placeRating - 1;
                if (placeRating < 1){
                  if(placeRating < 0.35){
                    stars = stars + '<span class="far fa-star" style ="color:orange;"></span>';
                  }else{
                    stars = stars + '<span class="fas fa-star-half-alt" style ="color:orange;"></span>';
                  }
                }

              }



            }

            
        
            const contentString = '<div id="infoWindow"><div><div id="infoHeading"><strong>'+ innerArray['name']+'</strong></div><div id="infoRating">'+ stars + ' '+ innerArray['rating']+'</div></div></div>';
            
        
        
            const infowindow = new google.maps.InfoWindow({
              content: contentString,
              maxWidth: 250
              });
            const marker = new google.maps.Marker({
              position: locale,
              map,
              title: "Uluru (Ayers Rock)",
              });
            marker.addListener("mouseover", () => {
              infowindow.open(map, marker);
              });
            marker.addListener("mouseout", () => {
              infowindow.close();
              });

            var starturl = url.replace("touristPlaces", "placesAround");
            var detailUrl = 'href="' + starturl + innerArray['place_id'] + '/"';
            console.log(detailUrl);

            //create tourist sites list
            var site = `<div class="row placeStyle" id = "tourPlace" class=""><div class="col-lg-12" id ="divName"><span><strong id ="nameOfPlace">${innerArray['name']}</strong></span><br><span>${stars} ${innerArray['rating']}</span><br><span style="margin-bottom: 3px;"><a ${detailUrl}><button type="button" class="btn btn-primary btn-sm" id = "viewPlaceInDetail" value =${innerArray['place_id']}>View Details</button></a></span><br></div><hr>`;
            document.querySelector('#listPlaces').insertAdjacentHTML('beforeend', site);






        }

    })
  
  
    
    
  }

