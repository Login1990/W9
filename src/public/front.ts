async function sendToBackEnd(){
    let email_input = (<HTMLInputElement>document.getElementById("email_input")).value
    let password_input = (<HTMLInputElement>document.getElementById("password_input")).value
    try{
        const response = await fetch("/register/registration",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email_input,
                password: password_input
            })
        })
        if (response.status == 302){
            window.location.href = "/login.html"
        }
    } catch(e){
        console.error(e)
    }
}
document.addEventListener("DOMContentLoaded", () => {
    let button = document.getElementById("register_button");
    if (button){
        button.addEventListener("click", () => {
            sendToBackEnd()
        })
    }
})