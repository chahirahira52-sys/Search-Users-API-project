
const userslist=document.getElementById("users-list");
const status=document.getElementById("status");
const search=document.getElementById("search");
const searchbtn=document.getElementById("search-btn");
const filter=document.getElementById("filter");
let users=[];
const save=localStorage.getItem("users");
if(save){
    users=JSON.parse(save);
    displayUsers(users);
}
searchbtn.addEventListener("click",function(){

    let searchValue=search.value.toLowerCase();
    userslist.innerHTML="";
    status.textContent="";
    let searchField;
    users.forEach(function (user) {
        if (filter.value==="city"){
            searchField=user.address.city}
        else{searchField=user.company.name}

        if (searchField.toLowerCase().includes(searchValue)) {
            const li= document.createElement("li");
            li.textContent=`${user.name}`;
            userslist.appendChild(li)
        
}})

    if (userslist.children.length===0)
        {status.textContent="No user found";
            return;}
})
async function getUsers(){
status.textContent="Loading";
try{
let response=await fetch("https://jsonplaceholder.typicode.com/users")
if(response.ok===false){
    throw new Error()
}
let data=await response.json();
users=data;
if(data.length===0){
    status.textContent="No user found";
    return;
}
localStorage.setItem("users",JSON.stringify(users));
displayUsers(users)
status.textContent="";
}
catch(error){
    status.textContent="Failed to load users"
}}
if(users.length===0){getUsers()}


function displayUsers(users) {
userslist.innerHTML = "";
users.forEach(function(user) {
    const li = document.createElement("li");
    li.textContent = user.name;
    userslist.appendChild(li);
});
}
