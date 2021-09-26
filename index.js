const birthDate = document.getElementById("birthdate");
const checkButton = document.getElementById("check-button");
const outputBox = document.getElementById("output-box");

checkButton.addEventListener("click", ()=> {
    outputBox.innerText = "clicked";
}); 

