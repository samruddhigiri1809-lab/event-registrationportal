/* ---------------- PROFILE USERNAME ---------------- */

function saveUser(){

let username = document.getElementById("username").value.trim();

if(username==""){
alert("Enter Username");
return;
}

localStorage.setItem("user", username);
window.location="index.html";
}

let user = localStorage.getItem("user");

if(document.getElementById("profileName") && user){
document.getElementById("profileName").innerHTML = "Welcome, " + user;
}




/* ---------------- EVENT CLICK ---------------- */

function openEvent(type){
localStorage.setItem("eventType", type);
window.location="event.html";
}


/* ---------------- EVENT DATA ---------------- */

let eventType = localStorage.getItem("eventType");

if(document.getElementById("eventTitle")){

let data = {

tech:{
title:"Tech Fest",
desc:"Coding competitions and technical challenges.",
date:"10 March 2026",
venue:"Computer Lab",
img:"images/e1.jpg"
},

ai:{
title:"AI Workshop",
desc:"Learn Artificial Intelligence basics.",
date:"12 March 2026",
venue:"Seminar Hall",
img:"images/e2.jpg"
},

cultural:{
title:"Cultural Night",
desc:"Dance and music performances.",
date:"15 March 2026",
venue:"College Ground",
img:"images/e3.jpg"
}

};

let event = data[eventType];

if(event){
document.getElementById("eventTitle").innerHTML = event.title;
document.getElementById("eventDesc").innerHTML = event.desc;
document.getElementById("eventDate").innerHTML = event.date;
document.getElementById("eventVenue").innerHTML = event.venue;
document.getElementById("eventImg").src = event.img;
}

}


/* ---------------- GO REGISTER ---------------- */

function goRegister(){
window.location="register.html";
}


/* ---------------- SHOW SELECTED EVENT ---------------- */

let eventType2 = localStorage.getItem("eventType");

if(document.getElementById("selectedEvent") && eventType2){
document.getElementById("selectedEvent").innerHTML =
"Registering For: " + eventType2.toUpperCase();
}


/* ---------------- REGISTRATION + VALIDATION + TABLE ---------------- */

let form = document.getElementById("regForm");

if(form){

form.addEventListener("submit", function(e){

e.preventDefault();

let name = document.getElementById("name").value.trim();
let email = document.getElementById("email").value.trim();
let password = document.getElementById("password").value.trim();
let mobile = document.getElementById("mobile").value.trim();
let college = document.getElementById("college").value.trim();

/* required validation */
if(name=="" || email=="" || password=="" || mobile=="" || college==""){
alert("All fields required");
return;
}

/* email validation */
let emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

if(!email.match(emailPattern)){
alert("Enter valid email");
return;
}

/* password validation */
if(password.length < 6){
alert("Password must be at least 6 characters");
return;
}

/* mobile validation */
let mobilePattern = /^[0-9]{10}$/;

if(!mobile.match(mobilePattern)){
alert("Enter valid 10-digit mobile");
return;
}


/* ---------- SAVE DATA IN LOCAL STORAGE ---------- */

let users = JSON.parse(localStorage.getItem("users")) || [];

users.push({
name:name,
email:email,
mobile:mobile,
college:college,
event:eventType2
});

localStorage.setItem("users", JSON.stringify(users));


/* ---------- SUCCESS POPUP ---------- */

document.getElementById("popup").classList.add("active");

form.reset();

loadUsers();

});

}


/* ---------------- LOAD TABLE ---------------- */

function loadUsers(){

let tableBody = document.querySelector("#userTable tbody");

if(!tableBody) return;

tableBody.innerHTML="";

let users = JSON.parse(localStorage.getItem("users")) || [];

users.forEach(function(u){

tableBody.innerHTML += `
<tr>
<td>${u.name}</td>
<td>${u.email}</td>
<td>${u.mobile}</td>
<td>${u.college}</td>
<td>${u.event}</td>
</tr>
`;

});

}

loadUsers();


/* ---------------- POPUP CLOSE ---------------- */

function closePopup(){

document.getElementById("popup").classList.remove("active");
window.location="index.html";

}
/* Profile Image Upload */
let avatar = document.getElementById("avatar");

if(avatar){
avatar.addEventListener("change", function(){

let file = avatar.files[0];

if(file){
let reader = new FileReader();

reader.onload = function(e){
document.getElementById("preview").src = e.target.result;

/* save image in localStorage */
localStorage.setItem("profilePic", e.target.result);
}

reader.readAsDataURL(file);
}

});
}

/* Load Saved Profile Image */
let savedPic = localStorage.getItem("profilePic");

if(savedPic && document.getElementById("preview")){
document.getElementById("preview").src = savedPic;
}