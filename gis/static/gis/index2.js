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
		label: { color: '#FFFFFF', fontWeight: 'bold', fontSize: '14px', text: data['name']  }
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
			
			
            var favUrl = urlNearByPlaces.replace("nearByPlaces", "makeFavourite");
            favUrl = favUrl + innerArray['place_id'] + "/";            
           
			intI = i.toString();
			var placeClass = 'place'+ intI;
            var favId = 'fav'+ intI;

            const favThePlace = '#'+ favId;

            //create tourist sites list
            var site = '<div class="row placeStyle tourPlace" id ="'+ placeClass +'"><div class="col-sm-3"><img src='+ innerArray['icon']+' alt="Girl in a jacket" style="width:100%; height:100%;"></div><div class="col-sm-9" id ="divName"><span><strong id ="nameOfPlace">' + innerArray['name'] + '</strong></span><br><span>' + stars+ ' '+ theRating + '</span><br><span style="margin-bottom: 3px;" id="fav"><a id ="'+ innerArray['place_id'] + '"><button type="button" class="btn btn-success btn-sm" data-toggle="modal" data-target="#exampleModal'+ i + '">View Details</button></a><button type="button" id="'+ favId +'" style="margin-left:8px;" class="btn btn-outline-primary btn-sm" value ="'+ favUrl +'">Add favourite <i class="fas fa-heart" style ="color:red;"></i></button><!-- Modal --><div class="modal fade" id="exampleModal'+ i + '" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header"><h5 class="modal-title" id="exampleModalLabel"><strong>'+ innerArray['name']+'</strong></h5><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button></div><div class="modal-body"><span>Vicinity: '+ innerArray['vicinity'] +'</span><br><span>Current Status: '+ innerArray['business_status']+'</span><br><span>'+ services +'</span><br><span>'+ stars+'</span></div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button></div></div></div></div></span><br></div><hr>';
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
			let a = item.getElementsByTagName("div")[1].querySelectorAll('#fav')[0].getElementsByTagName("button")[1];
			console.log(a);
			let buttonValue = a.value;
			a.addEventListener('click', function(){
			  a.innerHTML = '<i class="fa fa-spinner fa-spin" style="color:blue;">';
			  fetch(buttonValue)
			  .then(result => {
				return result.json();
			  })
			  .then(data => {
				if(data['status']=== 'success'){
				  a.innerHTML = 'Add favourite <i class="fas fa-heart" style ="color:red;"></i>';
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

