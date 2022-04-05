console.log("Moodle+ successfully loaded!");
const login_element = document.querySelector("#login"); 
let login_text = login_element.innerText;
let question = login_text.split(" "); 

var ans = "0";
if(question[5] == "enter"){
    if(question[6] == "first")
        ans = question[8]
    else
        ans = question[10] 
}
else if (question[5] == "add"){
    ans = parseInt(question[6])+parseInt(question[8]) 
}
else if(question[5] == "subtract"){
    ans = parseInt(question[6]) - parseInt(question[8]) 
}

let answer = ans; 

const captcha_input_element = document.querySelector("#valuepkg3"); 
captcha_input_element.value = answer;

//TODO - remove below lines and submit the final

document.querySelector("#username").value = "ee3200577"
document.querySelector("#password").value = "696dfe18"

document.querySelector("#loginbtn").click();
