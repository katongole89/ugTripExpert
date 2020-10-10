document.querySelector('#registerButton').addEventListener('click', function(){
    document.querySelector('#registerButton').innerHTML = '<i class="fa fa-spinner fa-spin">';
    var firstName = document.querySelector('#firstNameValue').value;
    var lastName = document.querySelector('#lastNameValue').value;
    var email = document.querySelector('#emailValue').value;
    var password = document.querySelector('#passwordValue').value;
    var passwordRepeat = document.querySelector('#passwordRepeatValue').value;

    if (password === passwordRepeat){
        var data = {
            'email': email,
            'password': password,
            'firstName': firstName,
            'lastName': lastName
        }
        var registerUrl  = document.querySelector('#registerUrl').value;
        fetch(registerUrl, {
        method: 'POST', // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
          },
        body: JSON.stringify(data),
        }).then(response => response.json())
        .then(data => {
            console.log(data);
            document.querySelector("#matchFailed").style.display = "none";
            document.querySelector("#emailExists").style.display = "none";
            document.querySelector('#registerButton').innerHTML = 'Register Account';
            if (data['status'] === 'success'){
                document.querySelector("#accountCreated").style.display = "block";
                setTimeout(function () {
                    document.querySelector("#accountCreated").style.display = "none";
                    window.location.href = "http://127.0.0.1:8000/gis/login/";
                }, 3000);
            }
            else if("email" in data){
                document.querySelector('#registerButton').innerHTML = 'Register Account';
                document.querySelector("#emailExists").style.display = "block";
                

            }
        })
    }else{
        document.querySelector('#registerButton').innerHTML = 'Register Account';
        document.querySelector("#matchFailed").style.display = "block";
        console.log('password didnot match')

    }


})