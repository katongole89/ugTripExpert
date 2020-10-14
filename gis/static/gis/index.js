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

            var favUrl = url.replace("touristPlaces", "makeFavourite");
            favUrl = favUrl + innerArray['place_id'] + "/";            
           
            intI = i.toString();
            placeClass = 'place'+ intI;
            var favId = 'fav'+ intI;

            const favThePlace = '#'+ favId;

            //create tourist sites list
            var site = `<div class="row placeStyle tourPlace" id="${placeClass}"><div class="col-lg-12" id ="divName"><span><strong id ="nameOfPlace">${innerArray['name']}</strong></span><br><span>${stars} ${innerArray['rating']}</span><br><span style="margin-bottom: 3px;" id="fav"><a ${detailUrl}><button type="button" class="btn btn-success btn-sm" id = "viewPlaceInDetail" value =${innerArray['place_id']}>View Details</button></a><button type="button" id=${favId} style="margin-left:8px;" class="btn btn-outline-primary btn-sm" value =${favUrl}>Add to favourites <i class="fas fa-heart" style ="color:red;"></i></button></span><br></div><hr>`;
            document.querySelector('#listPlaces').insertAdjacentHTML('beforeend', site);

            var hoverDiv = '#'+ placeClass;

            document.querySelector(hoverDiv).addEventListener('mouseover', function(){
              infowindow.open(map, marker);
            })
            document.querySelector(hoverDiv).addEventListener('mouseout', function(){
              infowindow.close();
            })


        }
		
        listPlaces = document.getElementById('listPlaces')
        allPlacesOnPage = listPlaces.querySelectorAll('.tourPlace')
  

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
					if(data['status']=== 'success'){
						a.innerHTML = 'Add to favourites <i class="fas fa-heart" style ="color:red;"></i>';
						let dispFaved = document.querySelector('#faved')
						dispFaved.style.display = 'block';
						setTimeout(function () {
							dispFaved.style.display = "none";
						}, 3000);
					}else{
						a.innerHTML = 'Add to favourites <i class="fas fa-heart" style ="color:red;"></i>';
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