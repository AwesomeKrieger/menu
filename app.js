
const games = [
{
title:"FINDE DEN\nIMPOSTER",
desc:"Der geheime Verräter",
badge:"🔥 Beliebt",
type:"game",
url:"https://awesomekrieger.github.io/Imposter/"
},
{
title:"KINGS\nCUP",
desc:"Party Karten Game",
badge:"👑 Party",
type:"game",
url:"https://awesomekrieger.github.io/ReisTest/kingscup.html"
},
{
title:"TEST\nCENTER",
desc:"Alle Tests",
badge:"🧠 Tests",
type:"tests"
},
{
title:"100%\nCHALLENGE",
desc:"Challenge Modus",
badge:"⭐ Neu",
type:"game",
url:"https://awesomekrieger.github.io/Imposter/"
}
];

const tests = [
{
name:"Reis Test",
url:"https://awesomekrieger.github.io/ReisTest/"
},
{
name:"Finder",
url:"https://awesomekrieger.github.io/ReisTest/finder.html"
},
{
name:"Hardcore",
url:"https://awesomekrieger.github.io/ReisTest/hardcore.html"
},
{
name:"Reis Multi",
url:"https://awesomekrieger.github.io/ReisTest/reismulti.html"
}
];

const grid = document.getElementById("grid");
const overlay = document.getElementById("overlay");
const frame = document.getElementById("frame");

games.forEach(item => {

const card = document.createElement("div");
card.className = "card";

card.innerHTML = `
<div class="badge">${item.badge}</div>
<div>
<h2>${item.title.replace(/\n/g,"<br>")}</h2>
<p>${item.desc}</p>
</div>
`;

card.onclick = () => {

if(item.type === "tests"){
openTests();
} else {
openGame(item.url);
}

};

grid.appendChild(card);

});

function openGame(url){
overlay.classList.remove("hidden");
frame.srcdoc = "";
frame.src = url;
}

function closeGame(){
overlay.classList.add("hidden");
frame.src = "";
frame.srcdoc = "";
}

function openTests(){

overlay.classList.remove("hidden");

frame.srcdoc = `
<html>
<head>
<style>
body{
margin:0;
background:#111;
font-family:Arial;
color:white;
padding:20px;
}
h1{
font-size:42px;
}
button{
width:100%;
padding:22px;
margin-top:16px;
border:none;
border-radius:20px;
background:#222;
color:white;
font-size:22px;
}
</style>
</head>
<body>

<h1>🧠 Test Auswahl</h1>

${tests.map(t => `
<button onclick="window.location.href='${t.url}'">
${t.name}
</button>
`).join("")}

</body>
</html>
`;

}

if("serviceWorker" in navigator){
navigator.serviceWorker.register("sw.js");
}
