async function clearLocalStorageAndRefreshThePage(){
    localStorage.clear();
    location.reload();
}



document.addEventListener("DOMContentLoaded", async () => {
    const token = localStorage.getItem("auth_token")
    console.log("Token is: "+ token)
    const div = document.getElementById("fun")
    if( token ){
        console.log("Token found!")
        console.log("Token verification...")
        try{
            const response = await fetch("/login/authentification", {
                method: "GET",
                headers: {
                    "authorization": token
                },
            })
            if (response.ok){
                const body = await response.json()
                console.log("Token is vaild")
                const button = document.createElement("button")
                button.setAttribute("id", "logout")
                button.innerHTML = "Logout"
                const p = document.createElement("p")
                p.innerHTML = body["email"]
                div?.appendChild(button)
                div?.appendChild(p)
                button.addEventListener("click", () => {
                    clearLocalStorageAndRefreshThePage()
                })
            } else {
                console.log("Token was not verified. Create an account or log in.")
                const login = document.createElement("a")
                const register = document.createElement("a")
                login.innerHTML = "Login"
                register.innerHTML = "Register"
                login.href = "/login.html"
                register.href = "/register.html"
                div?.appendChild(login)
                div?.appendChild(document.createElement("br"))
                div?.appendChild(register)
            }
        } catch(err){
            console.log(err)
        }

    } else {
        const login = document.createElement("a")
        const register = document.createElement("a")
        login.innerHTML = "Login"
        register.innerHTML = "Register"
        login.href = "/login.html"
        register.href = "/register.html"
        div?.appendChild(login)
        div?.appendChild(document.createElement("br"))
        div?.appendChild(register)
    }
})