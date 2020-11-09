function CenterControl(controlDiv, map) {
  // Set CSS for the control border.
  const controlUI = document.createElement("div");
  controlUI.style.backgroundColor = "#fff";
  controlUI.style.border = "2px solid #fff";
  controlUI.style.borderRadius = "3px";
  controlUI.style.boxShadow = "0 2px 6px rgba(0,0,0,.3)";
  controlUI.style.cursor = "pointer";
  controlUI.style.marginBottom = "22px";
  controlUI.style.textAlign = "center";
  controlUI.title = "Click to recenter the map";
  controlDiv.appendChild(controlUI);
 

  var content = '<div><span  data-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample id="toggleBtn1"><i class="fa fa-plus" id="toggle1"></i> NFA Eco Tourism sites</span></div><div class="collapse" id="collapseExample"><div class="card card-body"><span><input type="checkbox" name="information_centre" id="information_centres"> <label for="vehicle1"> Information Centers <span id="testDiv" style="display:none;">nigga worked</span></label><br></span></div></div><div><span class="" data-toggle="collapse" href="#collapseExample2" role="button" aria-expanded="false" aria-controls="collapseExample"><i class="fa fa-plus"></i>Additional Resources</span></div><div class="collapse" id="collapseExample2"><div class="card card-body"><span><input type="checkbox" name="vehicle1" value="Bike"> <label for="vehicle1"> National parks and wild lie centres</label></span><span><input type="checkbox" name="vehicle1" value="Bike"> <label for="vehicle1">Restaurants and hotels</label><br></span><span><input type="checkbox" name="vehicle1" value="Bike"> <label for="vehicle1">Resorts and Eco lodges</label><br></span><span><input type="checkbox" name="vehicle1" value="Bike"> <label for="vehicle1">Hospitals</label><br></span><span><input type="checkbox" name="vehicle1" value="Bike"> <label for="vehicle1">Police stations</label><br></span></div></div>';
 
  var controlText = document.createElement('div');
  controlText.style.color = 'rgb(25,25,25)';
  controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
  controlText.style.fontSize = '16px';
  controlText.style.lineHeight = '38px';
  controlText.style.paddingLeft = '5px';
  controlText.style.paddingRight = '5px';
  controlText.style.textAlign = "left";
  controlText.innerHTML = content;
  //controlText.appendChild(inputCheck);
  //controlText.appendChild(ecoTourismSites);
  controlUI.appendChild(controlText);
  console.log(controlText);

  var toggleBtn1 = controlText.getElementsByTagName("div")[0].getElementsByTagName("span")[0]
  toggleBtn1.addEventListener('click', function(){
    var toggleName1= toggleBtn1.getElementsByTagName("i")[0];
    let toggleClassName = toggleName1.className;
    if(toggleClassName === 'fa fa-plus'){
      toggleName1.classList.remove('fa-plus');
      toggleName1.classList.add('fa-minus');

    }else{
      toggleName1.classList.remove('fa-minus');
      toggleName1.classList.add('fa-plus');

    }

  })


  var toggleBtn2 = controlText.getElementsByTagName("div")[3].getElementsByTagName("span")[0];
  toggleBtn2.addEventListener('click', function(){
    var toggleName2= toggleBtn2.getElementsByTagName("i")[0];
    let toggleClassName = toggleName2.className;
    if(toggleClassName === 'fa fa-plus'){
      toggleName2.classList.remove('fa-plus');
      toggleName2.classList.add('fa-minus');

    }else{
      toggleName2.classList.remove('fa-minus');
      toggleName2.classList.add('fa-plus');

    }

  })


  var information_centres = controlText.getElementsByTagName("div")[1].getElementsByTagName("div")[0].getElementsByTagName("span")[0].getElementsByTagName("input")[0];
  var national_parks = controlText.getElementsByTagName("div")[4].getElementsByTagName("div")[0].getElementsByTagName("span")[0].getElementsByTagName("input")[0];
  var restaurants = controlText.getElementsByTagName("div")[4].getElementsByTagName("div")[0].getElementsByTagName("span")[1].getElementsByTagName("input")[0];
  var ecoLodges = controlText.getElementsByTagName("div")[4].getElementsByTagName("div")[0].getElementsByTagName("span")[2].getElementsByTagName("input")[0];
  var hospitals = controlText.getElementsByTagName("div")[4].getElementsByTagName("div")[0].getElementsByTagName("span")[3].getElementsByTagName("input")[0];
  var police_stations = controlText.getElementsByTagName("div")[4].getElementsByTagName("div")[0].getElementsByTagName("span")[4].getElementsByTagName("input")[0];
  console.log(ecoLodges);


  const allPlacesInDb = document.querySelector('#allPlacesInDb').value;

  fetch(allPlacesInDb)
    .then(result => {
        return result.json();
    })
    .then(data => {
     
      //information centres
      var infoMarkers = [];
      information_centres.addEventListener('click', function(){
        if (information_centres.checked == true){
          //add markers for information centre
          data.forEach(addInfoCentre);
          function addInfoCentre(item, index){
            placeType = item['placeType'];
            if(placeType === 'information_centre'){
              const lat = item['lat']
              const lng = item['lng']
      
              const placeCord = {lat: parseFloat(lat), lng: parseFloat(lng)};

              var marker = new google.maps.Marker({
                position: placeCord,
                map,
                title:item["name"] ,
                labelOrigin: new google.maps.Point(9, 9),
                icon: {
                  url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
                }
              });
              var contentString = '<div>'+ item["name"] +'</div>'
              var infowindow = new google.maps.InfoWindow({
                content: contentString,
                maxWidth: 250
                });

                marker.addListener("mouseover", () => {
                  infowindow.open(map, marker);
                  });
                marker.addListener("mouseout", () => {
                  infowindow.close();
                  });

              infoMarkers.push(marker);
              console.log(infoMarkers);

            }

          }

  
        }else{
          //testDiv.style.display = "none";
          infoMarkers.forEach(removeInfoCentre);
          function removeInfoCentre(item, index){
            item.setMap(null);
          }
        }
      })


      //national parks
      var nationalParksMarkers = [];
      national_parks.addEventListener('click', function(){
        if (national_parks.checked == true){
          //add markers for information centre
          data.forEach(addInfoCentre);
          function addInfoCentre(item, index){
            placeType = item['placeType'];
            if(placeType === 'national_park'){
              const lat = item['lat']
              const lng = item['lng']
      
              const placeCord = {lat: parseFloat(lat), lng: parseFloat(lng)};

              var marker = new google.maps.Marker({
                position: placeCord,
                map,
                title: item["name"],
                label: {text: 'N', color: "white",fontWeight: "bold"},
                labelOrigin: new google.maps.Point(75, 32),
                icon: {
                  url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png"
                }
              });

              var contentString = '<div>'+ item["name"] +'</div>'
              var infowindow = new google.maps.InfoWindow({
                content: contentString,
                maxWidth: 250
                });

                marker.addListener("mouseover", () => {
                  infowindow.open(map, marker);
                  });
                marker.addListener("mouseout", () => {
                  infowindow.close();
                  });

              nationalParksMarkers.push(marker);
              console.log(infoMarkers);

            }

          }


          
        }else{
          //testDiv.style.display = "none";
          nationalParksMarkers.forEach(removeInfoCentre);
          function removeInfoCentre(item, index){
            item.setMap(null);
          }
        }
      })

      //restaurants and hotels
      var restaurantMarkers = [];
      restaurants.addEventListener('click', function(){
        if (restaurants.checked == true){
          //add markers for information centre
          data.forEach(addInfoCentre);
          function addInfoCentre(item, index){
            placeType = item['placeType'];
            if(placeType === 'restaurant'){
              const lat = item['lat']
              const lng = item['lng']
              const placeCord = {lat: parseFloat(lat), lng: parseFloat(lng)};
              var marker = new google.maps.Marker({
                position: placeCord,
                map,
                title: item["name"],
                icon: {
                  url: "http://maps.google.com/mapfiles/ms/icons/pink-dot.png"
                }
              });
              var contentString = '<div>'+ item["name"] +'</div>'
              var infowindow = new google.maps.InfoWindow({
                content: contentString,
                maxWidth: 250
                });

                marker.addListener("mouseover", () => {
                  infowindow.open(map, marker);
                  });
                marker.addListener("mouseout", () => {
                  infowindow.close();
                  });
              restaurantMarkers.push(marker);
            }
          }
        }else{
          //testDiv.style.display = "none";
          restaurantMarkers.forEach(removeInfoCentre);
          function removeInfoCentre(item, index){
            item.setMap(null);
          }
        }
      })
      
      //resorts and eco lodges
      var ecoLodgesMarkers = [];
      ecoLodges.addEventListener('click', function(){
        if (ecoLodges.checked == true){
          //add markers for information centre
          data.forEach(addInfoCentre);
          function addInfoCentre(item, index){
            placeType = item['placeType'];
            if(placeType === 'eco_lodge'){
              const lat = item['lat']
              const lng = item['lng']
              const placeCord = {lat: parseFloat(lat), lng: parseFloat(lng)};
              var marker = new google.maps.Marker({
                position: placeCord,
                map,
                title: item["name"],
                icon: {
                  url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png"
                }
              });
              var contentString = '<div>'+ item["name"] +'</div>'
              var infowindow = new google.maps.InfoWindow({
                content: contentString,
                maxWidth: 250
                });

                marker.addListener("mouseover", () => {
                  infowindow.open(map, marker);
                  });
                marker.addListener("mouseout", () => {
                  infowindow.close();
                  });
              ecoLodgesMarkers.push(marker);
            }
          }
        }else{
          //testDiv.style.display = "none";
          ecoLodgesMarkers.forEach(removeInfoCentre);
          function removeInfoCentre(item, index){
            item.setMap(null);
          }
        }
      })

      //hospitals
      var hospitalsMarkers = [];
      hospitals.addEventListener('click', function(){
        if (hospitals.checked == true){
          //add markers for information centre
          data.forEach(addInfoCentre);
          function addInfoCentre(item, index){
            placeType = item['placeType'];
            if(placeType === 'hospital'){
              const lat = item['lat']
              const lng = item['lng']
              const placeCord = {lat: parseFloat(lat), lng: parseFloat(lng)};
              var marker = new google.maps.Marker({
                position: placeCord,
                map,
                title: item["name"],
                icon: {
                  url: "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png"
                }
              });
              var contentString = '<div>'+ item["name"] +'</div>'
              var infowindow = new google.maps.InfoWindow({
                content: contentString,
                maxWidth: 250
                });

                marker.addListener("mouseover", () => {
                  infowindow.open(map, marker);
                  });
                marker.addListener("mouseout", () => {
                  infowindow.close();
                  });
              hospitalsMarkers.push(marker);
            }
          }
        }else{
          //testDiv.style.display = "none";
          hospitalsMarkers.forEach(removeInfoCentre);
          function removeInfoCentre(item, index){
            item.setMap(null);
          }
        }
      })


      //police stations
      var policeMarkers = [];
      police_stations.addEventListener('click', function(){
        if (police_stations.checked == true){
          //add markers for information centre
          data.forEach(addInfoCentre);
          function addInfoCentre(item, index){
            placeType = item['placeType'];
            if(placeType === 'police_station'){
              const lat = item['lat']
              const lng = item['lng']
              const placeCord = {lat: parseFloat(lat), lng: parseFloat(lng)};
              var marker = new google.maps.Marker({
                position: placeCord,
                map,
                title: item["name"],
                label: {text: 'P', color: "white",fontWeight: "bold"},
                icon: {
                  url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
                }
              });
              var contentString = '<div>'+ item["name"] +'</div>'
              var infowindow = new google.maps.InfoWindow({
                content: contentString,
                maxWidth: 250
                });

                marker.addListener("mouseover", () => {
                  infowindow.open(map, marker);
                  });
                marker.addListener("mouseout", () => {
                  infowindow.close();
                  });
              policeMarkers.push(marker);
            }
          }
        }else{
          //testDiv.style.display = "none";
          policeMarkers.forEach(removeInfoCentre);
          function removeInfoCentre(item, index){
            item.setMap(null);
          }
        }
      })








      
    })

 

    





}
function measureDistance(controlDiv,map){
  const controlUI = document.createElement("div");
  controlUI.style.backgroundColor = "#fff";
  controlUI.style.border = "2px solid #fff";
  controlUI.style.borderRadius = "3px";
  controlUI.style.boxShadow = "0 2px 6px rgba(0,0,0,.3)";
  controlUI.style.cursor = "pointer";
  controlUI.style.marginBottom = "22px";
  controlUI.style.textAlign = "center";
  controlUI.title = "Click to recenter the map";
  controlDiv.appendChild(controlUI);

  let content = '<button type="button" class="btn btn-success btn-sm customSearchColor">Add ruler</button>  <button type="button" class="btn btn-danger btn-sm ">remove ruler</button>';

  var controlText = document.createElement('div');
  controlText.style.color = 'rgb(25,25,25)';
  controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
  controlText.style.fontSize = '16px';
  controlText.style.lineHeight = '38px';
  controlText.style.paddingLeft = '5px';
  controlText.style.paddingRight = '5px';
  controlText.style.textAlign = "left";
  controlText.innerHTML = content;
  controlUI.appendChild(controlText);
  console.log(controlText);

  let addRule = controlText.getElementsByTagName('button')[0];
  console.log(addRule);
  addRule.addEventListener('click', addruler);
  let ruleMarks = [];
  let yellowMark = [];
  let removeRule = controlText.getElementsByTagName('button')[1];
  removeRule.addEventListener('click', removeRuler);

  function removeRuler(){
    ruleMarks.forEach(removeInfoCentre);
    function removeInfoCentre(item, index){
      item.setMap(null);
    }
    yellowMark.forEach(removeYellowMark);
    function removeYellowMark(item, index){
      item.onRemove();
    }

  }


  function addruler() {
 
    ruler1 = new google.maps.Marker({
        //position: map.getCenter() ,
        position:{ lat: -0.98876953, lng: 32.98095703 },
        map: map,
        draggable: true
    });

    let contentString = '<div>Drag to measure</div>'
    let infowindow = new google.maps.InfoWindow({
      content: contentString,
      maxWidth: 250
      });
 
    infowindow.open(map, ruler1);

    ruleMarks.push(ruler1);
 
    ruler2 = new google.maps.Marker({
        //position: map.getCenter() ,
        position:{ lat: -0.9876953, lng: 33.98095703 },
        map: map,
        draggable: true
    });

    contentString = '<div>Drag to measure</div>'
    infowindow = new google.maps.InfoWindow({
      content: contentString,
      maxWidth: 250
      });

    infowindow.open(map, ruler2);

    ruleMarks.push(ruler2)
 
    var ruler1label = new Label({ map: map });
    var ruler2label = new Label({ map: map });
    yellowMark.push(ruler1label);
    yellowMark.push(ruler2label);

    ruler1label.bindTo('position', ruler1, 'position');
    ruler2label.bindTo('position', ruler2, 'position');
 
    rulerpoly = new google.maps.Polyline({
        path: [ruler1.position, ruler2.position] ,
        strokeColor: "#FFFF00",
        strokeOpacity: .7,
        strokeWeight: 8
    });
    rulerpoly.setMap(map);
 
    ruler1label.set('text',"0m");
    ruler2label.set('text',"0m");
 
    google.maps.event.addListener(ruler1, 'drag', function() {
        rulerpoly.setPath([ruler1.getPosition(), ruler2.getPosition()]);
        ruler1label.set('text',distance( ruler1.getPosition().lat(), ruler1.getPosition().lng(), ruler2.getPosition().lat(), ruler2.getPosition().lng()));
        ruler2label.set('text',distance( ruler1.getPosition().lat(), ruler1.getPosition().lng(), ruler2.getPosition().lat(), ruler2.getPosition().lng()));
    });
 
    google.maps.event.addListener(ruler2, 'drag', function() {
        rulerpoly.setPath([ruler1.getPosition(), ruler2.getPosition()]);
        ruler1label.set('text',distance( ruler1.getPosition().lat(), ruler1.getPosition().lng(), ruler2.getPosition().lat(), ruler2.getPosition().lng()));
        ruler2label.set('text',distance( ruler1.getPosition().lat(), ruler1.getPosition().lng(), ruler2.getPosition().lat(), ruler2.getPosition().lng()));
    });
 
}


function distance(lat1,lon1,lat2,lon2) {
    var um = "km"; // km | ft (choose the constant)
    var R = 6371;
    if (um=="ft") {
        R = 20924640; // ft
    }
    var dLat = (lat2-lat1) * Math.PI / 180;
    var dLon = (lon2-lon1) * Math.PI / 180; 
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(lat1 * Math.PI / 180 ) * Math.cos(lat2 * Math.PI / 180 ) * 
        Math.sin(dLon/2) * Math.sin(dLon/2); 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c;
    console.log(d);

    return Math.round(d)+"km";

    /*
    if(um=="km") {
        if (d&amp;amp;amp;gt;1) return Math.round(d)+"km";
        elseif (d&amp;amp;amp;lt;=1) return Math.round(d*1000)+"m";
    }
    if(um=="ft"){
        if ((d/5280)&amp;amp;amp;gt;=1) return Math.round((d/5280))+"mi";
        elseif ((d/5280)&amp;amp;amp;lt;1) return Math.round(d)+"ft";
    }
  */
    //return d;
}
// Define the overlay, derived from google.maps.OverlayView
function Label(opt_options) {
	// Initialization
	this.setValues(opt_options);

	// Label specific
	var span = this.span_ = document.createElement('span');
	span.style.cssText = 'position: relative; left: 0%; top: -8px; ' +
			  'white-space: nowrap; border: 0px; font-family:arial; font-weight:bold;' +
			  'padding: 2px; background-color: #ddd; '+
				'opacity: .75; '+
				'filter: alpha(opacity=75); '+
				'-ms-filter: "alpha(opacity=75)"; '+
				'-khtml-opacity: .75; '+
				'-moz-opacity: .75;';

	var div = this.div_ = document.createElement('div');
	div.appendChild(span);
  div.style.cssText = 'position: absolute; display: none';
  
  
};
Label.prototype = new google.maps.OverlayView;

// Implement onAdd
Label.prototype.onAdd = function() {
	var pane = this.getPanes().overlayLayer;
	pane.appendChild(this.div_);

	
	// Ensures the label is redrawn if the text or position is changed.
	var me = this;
	this.listeners_ = [
		google.maps.event.addListener(this, 'position_changed',
		function() { me.draw(); }),
		google.maps.event.addListener(this, 'text_changed',
		function() { me.draw(); })
	];
	
};

// Implement onRemove
Label.prototype.onRemove = function() { this.div_.parentNode.removeChild(this.div_ );
	// Label is removed from the map, stop updating its position/text.
	for (var i = 0, I = this.listeners_.length; i < I; ++i) {
		google.maps.event.removeListener(this.listeners_[i]);
	}
};

// Implement draw
Label.prototype.draw = function() {
	var projection = this.getProjection();
	var position = projection.fromLatLngToDivPixel(this.get('position'));

	var div = this.div_;
	div.style.left = position.x + 'px';
	div.style.top = position.y + 'px';
	div.style.display = 'block';

	this.span_.innerHTML = this.get('text').toString();
};

}

function initMap() {
    const uluru = { lat: 0.347596, lng: 32.582520 };
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 7,
      center: uluru,
      scaleControl: true,
      streetViewControl: true,
    });

  const centerControlDiv = document.createElement("div");
  centerControlDiv.style.marginLeft = '6px';
  CenterControl(centerControlDiv, map);
  map.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(centerControlDiv);

  const centerRulerDiv = document.createElement("div");
  centerRulerDiv.style.marginLeft = '6px';
  measureDistance(centerRulerDiv, map);
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(centerRulerDiv);

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
      data.forEach(allForest);
      function allForest(item, index){
        const lat = item['lat']
        const lng = item['lng']

        const locale = {lat: parseFloat(lat), lng: parseFloat(lng)};

        //rating star string
        let stars = "";
        let placeRating = parseFloat(item['rating']);
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
        //end of star rating 

        const contentString = '<div id="infoWindow"><div><div id="infoHeading"><strong>'+ item['name']+'</strong></div><div id="infoRating">'+ stars + ' '+ item['rating']+'</div></div></div>';

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


        let starturl = url.replace("touristPlaces", "placesAround");
        let detailUrl = 'href="' + starturl + item['place_id'] + '/"';

        let favUrl = url.replace("touristPlaces", "makeFavourite");
        favUrl = favUrl + item['place_id'] + "/";            
         
        intI = index.toString();
        placeClass = 'place'+ intI;
        let favId = 'fav'+ intI;

        const favThePlace = '#'+ favId;

        //create tourist sites list
        let site = `<div class="row placeStyle tourPlace" id="${placeClass}"><div class="col-lg-12" id ="divName"><span><strong id ="nameOfPlace">${item['name']}</strong></span><br><span>${stars} ${item['rating']}</span><br><span style="margin-bottom: 3px;" id="fav"><a ${detailUrl}><button type="button" class="btn btn-success btn-sm customSearchColor" id = "viewPlaceInDetail" value =${item['place_id']}>View Details</button></a><button type="button" id=${favId} style="margin-left:8px;" class="btn btn-outline-primary btn-sm customColorFavBtn" value =${favUrl}><span class="customColorFav">Add to favourites</span> <i class="fas fa-heart" style ="color:red;"></i></button></span><br></div><hr>`;
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