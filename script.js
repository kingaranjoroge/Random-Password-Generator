const lengthSlider = document.querySelector(".pass-length input");
generateBtn = document.querySelector(".generate-btn");
copyIcon = document.querySelector(".input-box span");
passwordInput = document.querySelector(".input-box input");
passIndicator = document.querySelector(".pass-indicator");
options = document.querySelectorAll(".option input");

const characters = {
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    numbers: "0123456789",
    symbols: "!@#$%^&()-~+-*<>:;,.{}[]|"
}

const generatePassword = () => {
    let staticPassword = "", 
    randomPassword = "",
    excludeDuplicate = false, 
    passLength = lengthSlider.value;

    options.forEach(option => {
        if(option.checked){
            if(option.id !== "exc-duplicate" && option.id !== "spaces"){
                staticPassword += characters[option.id];
            }
            else if(option.id === "spaces"){
                staticPassword += ` ${staticPassword} `;
            }
            else{
                excludeDuplicate = true;
            }
        }
    })
    
    for(let i = 0; i < passLength; i++){
        randomChar = staticPassword[Math.floor(Math.random()*staticPassword.length)]
        if(excludeDuplicate){
            !randomPassword.includes(randomChar) || randomChar == "" ? randomPassword += randomChar : i-- ;
        }
        else{
            randomPassword += randomChar;
        }
    }
    passwordInput.value = randomPassword; 

}

const updatePassIndicator = () => {
    passIndicator.id = lengthSlider.value <= 8 ? "weak" : lengthSlider.value <= 16 ? "medium" : "strong" ;
}

const updateSlider = () => {
    document.querySelector(".pass-length span").innerText = lengthSlider.value;
    generatePassword()
    updatePassIndicator();
}
updateSlider();

const copyPassword = () => {
    navigator.clipboard.writeText(passwordInput.value);
    copyIcon.innerText = "check";

    setTimeout(() => {
        copyIcon.innerText = "copy_all";
    }, 1500)
}

copyIcon.addEventListener("click", copyPassword);
lengthSlider.addEventListener("input", updateSlider);
generateBtn.addEventListener("click", generatePassword);