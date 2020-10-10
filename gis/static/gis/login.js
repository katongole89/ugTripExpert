document.querySelector('#loginSubmit').addEventListener('click', function(){
    var email =document.querySelector('#emailValue').value;
    var password = document.querySelector('#passwordValue').value;
    var data = {
        'email': email,
        'password': password
    }
    document.querySelector('#buttonSubmit').innerHTML = '<i class="fa fa-spinner fa-spin">';
    
    var loginUrl  = document.querySelector('#loginUrl').value;
    var mainPage  = document.querySelector('#mainPage').value;

    fetch(loginUrl, {
        method: 'POST', // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
          },
        body: JSON.stringify(data),
}).then(response => response.json())
.then(data => {
    document.querySelector('#buttonSubmit').innerHTML = 'Login';
    if(data['status'] === 'success'){
        document.querySelector('#loginFailed').style.display = "none";
        window.location.href = mainPage;
    }else{
        document.querySelector('#loginFailed').style.display = "block";
    }
  
})

})