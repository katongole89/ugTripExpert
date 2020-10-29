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
        zoom: 7,
        center: uluru
      });

      const centerRulerDiv = document.createElement("div");
  centerRulerDiv.style.marginLeft = '6px';
  measureDistance(centerRulerDiv, map);
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(centerRulerDiv);

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
            var site = '<div class="row placeStyle tourPlace" id ="'+ placeClass +'"><div class="col-sm-3"><img src='+ innerArray['icon']+' alt="Girl in a jacket" style="width:100%; height:100%;"></div><div class="col-sm-9" id ="divName"><span><strong id ="nameOfPlace">' + innerArray['name'] + '</strong></span><br><span>' + stars+ ' '+ theRating + '</span><br><span style="margin-bottom: 3px;" id="fav"><a id ="'+ innerArray['place_id'] + '"><button type="button" class="btn btn-success btn-sm" data-toggle="modal" data-target="#exampleModal'+ i + '">View Details</button></a><button type="button" id="'+ favId +'" style="margin-left:8px;" class="btn btn-outline-primary btn-sm customColorFavBtn" value ="'+ favUrl +'"><span class="customColorFav">Add favourite</span> <i class="fas fa-heart" style ="color:red;"></i></button><!-- Modal --><div class="modal fade" id="exampleModal'+ i + '" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header"><h5 class="modal-title" id="exampleModalLabel"><strong>'+ innerArray['name']+'</strong></h5><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button></div><div class="modal-body"><span>Vicinity: '+ innerArray['vicinity'] +'</span><br><span>Current Status: '+ innerArray['business_status']+'</span><br><span>'+ services +'</span><br><span>'+ stars+'</span></div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button></div></div></div></div></span><br></div><hr>';
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

