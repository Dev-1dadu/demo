const API_URL = window.location.origin

const form = document.getElementById("userForm")
const message = document.getElementById("message")

form.addEventListener("submit", async function(e){

e.preventDefault()

const name = document.getElementById("name").value
const email = document.getElementById("email").value
const age = document.getElementById("age").value

try{

const res = await fetch(API_URL + "/saveUser",{

method:"POST",
headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({name,email,age})

})

const data = await res.json()

message.innerText = data.message
message.classList.add("show")

form.reset()

setTimeout(()=>{
message.classList.remove("show")
},3000)

}catch(error){

message.innerText="Error saving user"
message.classList.add("show")

}

})
