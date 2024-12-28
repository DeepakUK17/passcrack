var inputname= document.getElementById("input-name")
var inputdob= document.getElementById("input-dob")
var inputnumber= document.getElementById("input-number")
var inputpassword= document.getElementById("input-password")
var output= document.querySelector(".output")
var submitbutton= document.getElementById("submit-button")
var foms= document.querySelector(".forms")
var resetbutton= document.getElementById("reset-button")



submitbutton.addEventListener('click', function(event){
  event.preventDefault()
})

resetbutton.addEventListener('click', function(event) {
  event.preventDefault()
  foms.style.display="block";
  output.style.display="none";
  resetForm();
});

function resetForm() {
  inputname.value = '';
  inputdob.value = '';
  inputnumber.value = '';
  inputpassword.value = '';
  output.innerHTML = '';
}

function check_input(){
  const isPhoneValid = /^\d{10}$/.test(inputnumber.value);
  if (inputname.value && inputdob.value && isPhoneValid && inputpassword.value) {
    foms.style.display="none"
    output.style.display="block"
    program();
  }
  else {
  alert("PLEASE ENTER CORRECT DETAILS");
  }
 
}



function program() {
  function checkPasswordStrength() {
    password = inputpassword.value;
    var strength = 0;
    var crack1 = 0, crack2 = 0, crack3 = 0, crack4 = 0;
    var crack = 0;
    const length = password.length;
    var remarks = '';
    var note = '';
    var lowerCount = 0, upperCount = 0, numCount = 0, wspaceCount = 0, specialCount = 0;

    for (let char of password) {
      if (/[a-z]/.test(char)) {
        lowerCount++;
      } else if (/[A-Z]/.test(char)) {
        upperCount++;
      } else if (/\d/.test(char)) {
        numCount++;
      } else if (/\s/.test(char)) {
        wspaceCount++;
      } else {
        specialCount++;
      }
    }

    if (lowerCount >= 1) strength++;
    if (upperCount >= 1) strength++;
    if (numCount >= 1) strength++;
    if (wspaceCount >= 1) strength++;
    if (specialCount >= 1) strength++;

    if (strength == 1) {
      remarks = "That's a very bad password. Change it as soon as possible.";
    } else if (strength == 2) {
      remarks = "That's a weak password. You should consider using a tougher password.";
    } else if (strength == 3) {
      remarks = "Your password is okay, but it can be improved.";
    } else if (strength == 4) {
      remarks = "Your password is hard to guess. But you could make it even more secure.";
    } else if (strength == 5) {
      remarks = "Now that's one hell of a strong password!!! Hackers don't have a chance guessing that password!";
    }

    if (inputpassword.value.includes(inputname.value)) {
      note += "* Your password should not contain your name or any part of it. It's too easy to guess.<br>";
    }
    if (inputpassword.value.includes(inputdob.value.split('-')[0])) {
      note += "* Your password should not contain your birth year. It's too easy to guess.<br>";
    }
    if (inputpassword.value.includes(inputdob.value.split('-')[1])) {
      note += "* Your password should not contain your birth month. It's too easy to guess.<br>";
    }
    if (inputpassword.value.includes(inputdob.value.split('-')[2])) {
      note += "* Your password should not contain your birth date. It's too easy to guess.<br>";
    }

    if (inputpassword.value.includes(inputnumber.value)) {
      note += "* Your password should not contain your phone number. It's too easy to guess.<br>";
    }
    for (let i = 0; i <= inputnumber.value.length - 4; i++) {
      let substring = inputnumber.value.substring(i, i + 4);
      if (inputpassword.value.includes(substring)) {
        note += "* Your password should not contain any 4-digit sequence from your phone number. It's too easy to guess.<br>";
        break;
      }
    }

    for (let i = 0; i <= inputnumber.value.length - 5; i++) {
      let substring = inputnumber.value.substring(i, i + 5);
      if (inputpassword.value.includes(substring)) {
        note += "* Your password should not contain any 5-digit sequence from your phone number. It's too easy to guess.<br>";
        break;
      }
    }

    output.innerHTML += '<span style="color:orange; text-decoration: underline;text-align: left;">Your password has:-<br>';
    output.innerHTML += `${lowerCount} lowercase letters<br>`;
    output.innerHTML += `${upperCount} uppercase letters<br>`;
    output.innerHTML += `${numCount} digits<br>`;
    output.innerHTML += `${wspaceCount} whitespaces<br>`;
    output.innerHTML += `${specialCount} special characters<br>`;
    output.innerHTML += `<span style="color:orange; text-decoration: underline;text-align: left;">Password Score:<br>`;
    output.innerHTML += `${strength / 5}<br>`;
    output.innerHTML += `<span style="color:orange; text-decoration: underline;text-align: left;">Remarks: <br>`;
    output.innerHTML += `${remarks}<br>`;
    output.innerHTML += `<span style="color:orange; text-decoration: underline;text-align: left;">Note:<br>`;
    output.innerHTML += `${note}<br>`;

    for (let i of password) {
      if (/[a-z]/.test(i)) {
        crack1 += 26;
      } else if (/[A-Z]/.test(i)) {
        crack2 += 26;
      } else if (/\d/.test(i)) {
        crack3 += 10;
      } else if ("!@#$%^&*()_+-=[]{}|;:',.<>?/".includes(i)) {
        crack4 += 32;
      }
    }

    if (lowerCount >= 1) {
      crack += crack1 / lowerCount;
    } else {
      crack += crack1;
    }
    if (upperCount >= 1) {
      crack += crack2 / upperCount;
    } else {
      crack += crack2;
    }
    if (numCount >= 1) {
      crack += crack3 / numCount;
    } else {
      crack += crack3;
    }
    if (specialCount >= 1) {
      crack += crack4 / specialCount;
    } else {
      crack += crack4;
    }

    const attempts = Math.pow(crack, length);
    const timeToCrackSeconds = attempts / 1e12;

    const minutes = timeToCrackSeconds / 60;
    const hours = minutes / 60;
    const days = hours / 24;
    const weeks = days / 7;
    const months = days / 30;
    const years = days / 365;

    if (timeToCrackSeconds < 60) {
      output.innerHTML+=`<span style="color:orange; text-decoration: underline;text-align: left;">Time to crack your password:<br>`;
      output.innerHTML+=`${timeToCrackSeconds} seconds<br>`;
    } else if (timeToCrackSeconds < 3600) {
      output.innerHTML+=`<span style="color:orange; text-decoration: underline;text-align: left;">Time to crack your password:<br>`;
      output.innerHTML+=`${Math.round(minutes)} minutes<br>`;
    } else if (timeToCrackSeconds < 86400) {
      output.innerHTML+=`<span style="color:orange; text-decoration: underline;text-align: left;">Time to crack your password:<br>`;
      output.innerHTML+=`${Math.round(hours)} hours<br>`;
    } else if (timeToCrackSeconds < 604800) {
      output.innerHTML+=`<span style="color:orange; text-decoration: underline;text-align: left;">Time to crack your password:`;
      output.innerHTML+=`${Math.round(days)} days<br>`;
    } else if (timeToCrackSeconds < 2419200) {
      output.innerHTML+=`<span style="color:orange; text-decoration: underline;text-align: left;">Time to crack your password:`;
      output.innerHTML+=`${Math.round(weeks)} weeks<br>`;
    } else if (timeToCrackSeconds < 18144000) {
      output.innerHTML+=`<span style="color:orange; text-decoration: underline;text-align: left;">Time to crack your password:<br>`;
      output.innerHTML+=`${Math.round(months)} months<br>`;
    } else {
      output.innerHTML+=`<span style="color:orange; text-decoration: underline;text-align: left;">Time to crack your password:<br>`;
      output.innerHTML+=`${Math.round(years)} years<br>`;
    }

    // Exit the program after checking the password
    console.log('Exiting...');
  };
  output.innerHTML+='===== Welcome to Password Strength Checker =====<br>';
  checkPasswordStrength()
  };
