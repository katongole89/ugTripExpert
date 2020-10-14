document.querySelector('#loginSubmit').addEventListener('click', function(){
    //reset
    document.querySelector('#emailWrong').style.display = 'none';
    document.querySelector('#loginFailed').style.display = "none";



    var email =document.querySelector('#emailValue').value;
    var password = document.querySelector('#passwordValue').value;
    document.querySelector('#buttonSubmit').innerHTML = '<i class="fa fa-spinner fa-spin">';

    email = email.trim();
    password = password.trim();

    var checkEmail1 = email.includes("@");
    var checkEmail2 = email.includes(".com");
    var checkEmail13 =email.includes(" ");
    if(checkEmail1 && checkEmail2 && checkEmail13 === false){
        var emailCheck = true;
        
    }else{
        document.querySelector('#emailWrong').style.display = 'block';
        document.querySelector('#buttonSubmit').innerHTML = 'Login';
        return
    }

    var checkpassword = password.includes(" ");
    if( checkpassword || password === ""){
        document.querySelector('#passwordWrong').style.display = 'block';
        document.querySelector('#buttonSubmit').innerHTML = 'Register Account';
        return
    }




    var data = {
        'email': email,
        'password': password
    }
    
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