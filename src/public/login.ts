

async function login_verification(){
    let email_input = (<HTMLInputElement>document.getElementById("email_input")).value
    let password_input = (<HTMLInputElement>document.getElementById("password_input")).value
    try{
        const response = await fetch('/login/verification', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email_input,
                password: password_input
            })
        })
        if (response.status == 200){
            const token = await response.json()
            localStorage.setItem("auth_token", token["token"])
            window.location.href = "/"
        }
    } catch (err){
        console.error(err)
    }
}
document.addEventListener("DOMContentLoaded", async () => {
    let button = document.getElementById("login_button");
    if (button){
        button.addEventListener("click", () => {
            login_verification()
        })
    }
})