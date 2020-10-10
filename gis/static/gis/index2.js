function initMap() {
    var placeId = document.querySelector('#urlPlaces').value;
    var urlNearByPlaces = document.querySelector('#urlNearByPlaces').value;
    urlNearByPlaces = urlNearByPlaces.replace("touristPlaces", "nearByPlaces");
    var url = urlNearByPlaces + placeId + '/';
    document.querySelector('#spinning').style.display = "block";
 

    //fetch data from the server
    fetch(url)
    .then(result => {
        return result.json();

    })
    .then(data => {
      document.querySelector('#spinning').style.display = "none";
      var centerLat = data['coordinates'][0];
      var centerlng = data['coordinates'][1];
      centerLat = parseFloat(centerLat);
      centerlng = parseFloat(centerlng);
      const uluru = { lat: centerLat, lng: centerlng };
      const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 11,
        center: uluru
      });

      const marker = new google.maps.Marker({
        position: uluru,
        map,
        title: "Uluru (Ayers Rock)",
        });

        data = data['places'];

        for (var i = 0; i < data.length; i++){
            const innerArray = data[i];
            var wantedList =['restaurant', 'food', 'lodging', 'bar', 'spa']
            for (var m = 0; m < wantedList.length; m++) {
              var typeExist = innerArray['types'].includes(wantedList[m]);
              if (typeExist){
                var exists = true;
                break;
              }else{
                exists = false;
              }
            }
            if (exists === false ){
              continue;
            }
            //console.log(innerArray['name']);
            const lat = innerArray['geometry']['location']['lat']
            const lng = innerArray['geometry']['location']['lng']
            const locale = {lat: parseFloat(lat), lng: parseFloat(lng)};

            //rating star string
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
                  }else if(placeRating>0.35){
                    stars = stars + '<span class="fas fa-star-half-alt" style ="color:orange;"></span>';
                  }
                }

              }



            }
            if(Number.isNaN(placeRating)){
              stars = '<span>Not yet Rated</span>';
            }

            var typesPlace = innerArray['types'];
            var services ="";
            for (var k = 0; k < typesPlace.length; k++) {
              services = services + "<li>"+ typesPlace[k]+"</li>"

            }
            services = '<div><span><strong>Place Category</strong></span><ul style="margin-left:10px;">'+ services +'</ul><div>'

            var theRating = '';
            if(Number.isNaN(placeRating)){
              theRating = '';
            }else{
              theRating = innerArray['rating'];
            }
            
        
            const contentString = '<div id="infoWindow"><div><div id="infoHeading"><strong>'+ innerArray['name']+'</strong></div><div id="infoRating">'+ stars + ' '+ theRating +'</div></div></div>';
            
        
        
            const infowindow = new google.maps.InfoWindow({
              content: contentString,
              maxWidth: 250
              });
              
            const marker = new google.maps.Marker({
              position: locale,
              map,
              title: "Uluru (Ayers Rock)",
              icon: {
                url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
              }
              });
            marker.addListener("mouseover", () => {
              infowindow.open(map, marker);
              });
            marker.addListener("mouseout", () => {
              infowindow.close();
              });
            

            var starturl = 'http://127.0.0.1:8000/';
            var detailUrl = starturl + "gis/placesAround/" + innerArray['place_id'] + '/';

            //create tourist sites list
            var site = '<div class="row placeStyle" id = "tourPlace"><div class="col-lg-5"><img src='+ innerArray['icon']+' alt="Girl in a jacket"></div><div class="col-lg-7" id ="divName"><span><strong id ="nameOfPlace">' + innerArray['name'] + '</strong></span><br><span>' + stars+ ' '+ theRating + '</span><br><span style="margin-bottom: 3px;><a id ="'+ innerArray['place_id'] + '"><button type="button" class="btn btn-success btn-sm" data-toggle="modal" data-target="#exampleModal'+ i + '">View Details</button></a><!-- Modal --><div class="modal fade" id="exampleModal'+ i + '" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header"><h5 class="modal-title" id="exampleModalLabel"><strong>'+ innerArray['name']+'</strong></h5><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button></div><div class="modal-body"><span>Vicinity: '+ innerArray['vicinity'] +'</span><br><span>Current Status: '+ innerArray['business_status']+'</span><br><span>'+ services +'</span><br><span>'+ stars+'</span></div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button></div></div></div></div></span><br></div><hr>';
            document.querySelector('#listPlaces').insertAdjacentHTML('beforeend', site);


            function searchFunc(){
              var input, filter, listPlaces, allPlacesOnPage, txtValue, a,i ;
              input = document.getElementById('searchInput')
              filter = input.value.toUpperCase();
              listPlaces = document.getElementById('listPlaces')
              allPlacesOnPage = listPlaces.getElementById('tourPlace')
              
              for (i = 0; i < allPlacesOnPage.length; i++) {
                a = allPlacesOnPage[i].querySelector("#divName")[0].getElementsByTagName('span')[0];
                a = a.querySelector("#nameOfPlace")[0];
                txtValue = a.textContent || a.innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                  allPlacesOnPage[i].style.display = "";
                } else {
                  allPlacesOnPage[i].style.display = "none";
                }
              }

            }



        }

    })
  
  
    
    
  }

