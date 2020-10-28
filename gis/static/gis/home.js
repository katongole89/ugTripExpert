var urlAllForests= document.querySelector('#urlAllForests').value;
/*
fetch(urlAllForests)
    .then(result => {
        return result.json();
    })
    .then(data => {
        let imageHTML = '<div class="row">';
        let count = 1;
        theForests = data['forests'];
        console.log(data);
        
        theForests.forEach(allForest);
        function allForest(item, index){
            //addition of row
            if(count%4 === 0){
                imageHTML = imageHTML + '</div><div class="row">';
            }
            let newImage = '<div class="col-xl-3 col-lg-4"><fieldset><legend>'+ item[1] +'</legend><img src="'+ item[2][0] + '" alt="Italian Trulli"></fieldset></div>'
            imageHTML = imageHTML+ newImage;
            
            count = count +1;

            //determination of end of loop
            var last = theForests.pop();
            if(item === last){
                imageHTML = imageHTML+ '</div>'
            }

        }
        document.querySelector('#forestsMain').innerHTML = imageHTML;



    })
*/
async function displayForests(){
    const result = await fetch(urlAllForests);
    const data = await result.json();
    let imageHTML = '<div class="row">';
    let count = 0;
    let theForests = data['forests'];
    console.log(data);
    
    allImagesArr = [];
    theForests.forEach(allForest);
    function allForest(item, index){
        let newImage = '<div class="col-xl-3 col-lg-3 col-md-2-5 imgOther"><fieldset><legend>'+ item[1] +'</legend><img src="'+ item[2][0] + '" alt="Italian Trulli"><a href="/gis/reserveDetailed/'+ item[0] +'/"><button type="button" class="btn btn-primary btn-sm greenBtn">View Details</button></a></fieldset></div>'
        allImagesArr.push(newImage)

    }

    colHTML= '';
    colArr =[];
    allImagesArr.forEach(addImageHTML);
    function addImageHTML(item, index){
        if(index !=0 && index%4 === 0){
            colArr.push(colHTML)
            colHTML = '';
        }
        colHTML = colHTML+ item;

        if(index == (allImagesArr.length - 1)){
            colArr.push(colHTML);
        }

    }
    colArr.forEach(addcolArr);
    function addcolArr(item, index){
        let row = '<div class="row">'+ item + '</div>';
        document.querySelector('#forestsMain').insertAdjacentHTML('beforeend', row);

    }


}

displayForests();
