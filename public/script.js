const API_URL=""

const form=document.getElementById("userForm")

form.addEventListener("submit",async function(e){

e.preventDefault()

const name=document.getElementById("name").value
const email=document.getElementById("email").value
const age=document.getElementById("age").value

await fetch(API_URL+"/saveUser",{

method:"POST",
headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({name,email,age})

})

form.reset()

loadUsers()

})

async function loadUsers(){

const res=await fetch(API_URL+"/users")

const users=await res.json()

const table=document.querySelector("#userTable tbody")

table.innerHTML=""

users.forEach(user=>{

table.innerHTML+=`
<tr>
<td>${user.name}</td>
<td>${user.email}</td>
<td>${user.age}</td>
<td>
<button onclick="deleteUser('${user._id}')">Delete</button>
</td>
</tr>
`

})

}

async function deleteUser(id){

await fetch(API_URL+"/deleteUser/"+id,{
method:"DELETE"
})

loadUsers()

}

loadUsers()