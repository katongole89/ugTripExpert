function initMap() {
    var placeId = document.querySelector('#urlPlaces').value;
    var urlNearByPlaces = document.querySelector('#urlNearByPlaces').value;
    urlNearByPlaces = urlNearByPlaces.replace("touristPlaces", "nearByPlaces");
    var url = urlNearByPlaces + placeId + '/';
    var fetchFavs = document.querySelector('#fetchFavs').value;
    console.log(fetchFavs);
    document.querySelector('#spinning').style.display = "block";

    var fetchFavs = document.querySelector('#fetchFavs').value;
    console.log(fetchFavs);
 

    //fetch data from the server
    fetch(fetchFavs)
    .then(result => {
        return result.json();

    })
    .then(data => {
      document.querySelector('#spinning').style.display = "none";
      const uluru = { lat:0.347596, lng:32.582520 };
      const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 7,
        center: uluru
      });

        data = data['favs'];

        for (var i = 0; i < data.length; i++){
            const innerArray = data[i];
           
            //console.log(innerArray['name']);
            const lat = innerArray[5]
            const lng = innerArray[6]
            const locale = {lat: parseFloat(lat), lng: parseFloat(lng)};

            //rating star string
            var stars = "";
            var placeRating = parseFloat(innerArray[3]);
           
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

            var typesPlace = innerArray[7];
            var services ="";
            for (var k = 0; k < typesPlace.length; k++) {
              services = services + "<li>"+ typesPlace[k]+"</li>"

            }
            services = '<div><span><strong>Place Category</strong></span><ul style="margin-left:10px;">'+ services +'</ul><div>'

            
              theRating = innerArray[3];
            
        
            const contentString = '<div id="infoWindow"><div><div id="infoHeading"><strong>'+ innerArray[0]+'</strong></div><div id="infoRating">'+ stars + ' '+ theRating +'</div></div></div>';
            
        
        
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
			
			
            var favUrl = urlNearByPlaces.replace("nearByPlaces", "removeFav");
            favUrl = favUrl + innerArray[8] + "/";            
           
			intI = i.toString();
			var placeClass = 'place'+ intI;
            var favId = 'fav'+ intI;

            const favThePlace = '#'+ favId;

            //create tourist sites list
            var site = '<div class="row placeStyle tourPlace" id ="'+ placeClass +'"><div class="col-lg-12" id ="divName"><span><strong id ="nameOfPlace">' + innerArray[0] + '</strong></span><br><span>' + stars+ ' '+ theRating + '</span><br><span style="margin-bottom: 3px;" id="fav"><a id ="'+ innerArray[1] + '"><button type="button" class="btn btn-success btn-sm" data-toggle="modal" data-target="#exampleModal'+ i + '">View Details</button></a><button type="button" id="'+ favId +'" style="margin-left:8px;" class="btn btn-outline-primary btn-sm" value ="'+ favUrl +'">Remove favourite <i class="fas fa-heart-broken" style ="color:black;"></i></button><!-- Modal --><div class="modal fade" id="exampleModal'+ i + '" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header"><h5 class="modal-title" id="exampleModalLabel"><strong>'+ innerArray[0]+'</strong></h5><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button></div><div class="modal-body"><br><span>Current Status: '+ innerArray[4]+'</span><br><span>'+ services +'</span><br><span>'+ stars+'</span></div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button></div></div></div></div></span><br></div><hr>';
			document.querySelector('#listPlaces').insertAdjacentHTML('beforeend', site);
			
			var hoverDiv = '#'+ placeClass;

            document.querySelector(hoverDiv).addEventListener('mouseover', function(){
              infowindow.open(map, marker);
            })
            document.querySelector(hoverDiv).addEventListener('mouseout', function(){
              infowindow.close();
            })

		
		}

		var listPlaces = document.getElementById('listPlaces')
        var allPlacesOnPage = listPlaces.querySelectorAll('.tourPlace')
  

		allPlacesOnPage.forEach(addFavToButtons);
		function addFavToButtons(item, index){
			let a = item.getElementsByTagName("div")[0].querySelectorAll('#fav')[0].getElementsByTagName("button")[1];
			console.log(a);
			let buttonValue = a.value;
			a.addEventListener('click', function(){
			  a.innerHTML = '<i class="fa fa-spinner fa-spin" style="color:blue;">';
			  fetch(buttonValue)
			  .then(result => {
				return result.json();
			  })
			  .then(data => {
				if(data['detail']=== 'deleted'){
                  //a.innerHTML = 'Add favourite <i class="fas fa-heart" style ="color:red;"></i>';
                  item.style.display = "none";
				  let dispFaved = document.querySelector('#faved')
				  dispFaved.style.display = 'block';
				  setTimeout(function () {
					dispFaved.style.display = "none";
				  }, 3000);
				}else{
				  a.innerHTML = 'Add favourite <i class="fas fa-heart" style ="color:red;"></i>';
				  let dispNotFaved = document.querySelector('#alreadyFaved');
				  dispNotFaved.style.display = 'block';
				  setTimeout(function () {
					dispNotFaved.style.display = "none";
				  }, 3000);
				}
			  })
			})
		  }

    })
  
  
    
    
  }

