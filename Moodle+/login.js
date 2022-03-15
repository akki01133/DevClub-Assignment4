console.log("Moodle+ successfully loaded!");
const login_element = document.querySelector("#login"); // Fill the selector for the login element in ""
let login_text = login_element.innerText;

let question = login_text.split(" "); // Use split and array operations on the login_text string to extract the question

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

let answer = ans; // Use if conditions to parse the question and calculate the answer. Make cases for all types of captcha asked

const captcha_input_element = document.querySelector("#valuepkg3"); // Fill the selector for the captcha input element in ""
captcha_input_element.value = answer;
