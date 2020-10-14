document.querySelector('#registerButton').addEventListener('click', function(){
    //reset
    document.querySelector('#emailWrong').style.display = 'none';
    document.querySelector('#firstNameWrong').style.display = 'none';
    document.querySelector('#lastNameWrong').style.display = 'none';
    document.querySelector('#passwordWrong').style.display = 'none';
    document.querySelector("#matchFailed").style.display = "none";
    document.querySelector('#passwordRepeatWrong').style.display = 'none';
    document.querySelector("#matchFailed").style.display = "none";
    document.querySelector("#emailExists").style.display = "none";





    document.querySelector('#registerButton').innerHTML = '<i class="fa fa-spinner fa-spin">';
    var firstName = document.querySelector('#firstNameValue').value;
    var lastName = document.querySelector('#lastNameValue').value;
    var email = document.querySelector('#emailValue').value;
    var password = document.querySelector('#passwordValue').value;
    var passwordRepeat = document.querySelector('#passwordRepeatValue').value;

    //Trim
    firstName = firstName.trim();
    lastName = lastName.trim();
    email = email.trim();
    password = password.trim();
    passwordRepeat = passwordRepeat.trim();

    //check firstName
    var checkFirstName = firstName.includes(" ");
    if( checkFirstName || firstName === ""){
        document.querySelector('#firstNameWrong').style.display = 'block';
        document.querySelector('#registerButton').innerHTML = 'Register Account';
        return
    }

    var checkLastName = lastName.includes(" ");
    if( checkLastName || lastName === ""){
        document.querySelector('#lastNameWrong').style.display = 'block';
        document.querySelector('#registerButton').innerHTML = 'Register Account';
        return
    }

    var checkpassword = password.includes(" ");
    if( checkpassword || password === ""){
        document.querySelector('#passwordWrong').style.display = 'block';
        document.querySelector('#registerButton').innerHTML = 'Register Account';
        return
    }

    var checkpasswordRepeat = passwordRepeat.includes(" ");
    if( checkpasswordRepeat || passwordRepeat === ""){
        document.querySelector('#passwordRepeatWrong').style.display = 'block';
        document.querySelector('#registerButton').innerHTML = 'Register Account';
        return
    }


    var checkEmail1 = email.includes("@");
    var checkEmail2 = email.includes(".com");
    var checkEmail13 =email.includes(" ");
    if(checkEmail1 && checkEmail2 && checkEmail13 === false){
        var emailCheck = true;
        
    }else{
        document.querySelector('#emailWrong').style.display = 'block';
        document.querySelector('#registerButton').innerHTML = 'Register Account';
        return
    }

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
                    var loginUrl  = document.querySelector('#loginUrl').value;
                    window.location.href = loginUrl;
                }, 3000);
            }
            else if(data['status'] === 'failed'){
                document.querySelector('#registerButton').innerHTML = 'Register Account';
                document.querySelector("#emailExists").style.display = "block";
                

            }
        })
    }else{
        document.querySelector('#registerButton').innerHTML = 'Register Account';
        document.querySelector("#matchFailed").style.display = "block";

    }


})