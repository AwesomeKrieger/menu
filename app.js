
const data = [
  {
    title:"FINDE DEN\nIMPOSTER",
    desc:"Der geheime Verräter",
    badge:"🔥 Beliebt",
    url:"https://awesomekrieger.github.io/Imposter/"
  },
  {
    title:"KINGS\nCUP",
    desc:"Party Karten Game",
    badge:"👑 Party",
    url:"https://awesomekrieger.github.io/ReisTest/kingscup.html"
  },
  {
    title:"TEST\nCENTER",
    desc:"Mehrere Test Modi",
    badge:"🧠 Tests",
    subgames:[
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
    ]
  },
  {
    title:"100%\nCHALLENGE",
    desc:"Mutproben & Spaß",
    badge:"⭐ Neu",
    url:"https://awesomekrieger.github.io/Imposter/"
  }
];

const games = document.getElementById("games");
const overlay = document.getElementById("overlay");
const frame = document.getElementById("frame");

function createCard(item){
  const card = document.createElement("div");
  card.className = "card";

  card.innerHTML = `
    <div>
      <div class="badge">${item.badge || "🎮 Spiel"}</div>
      <h2>${item.title.replace(/\n/g,"<br>")}</h2>
      <p>${item.desc}</p>
    </div>
  `;

  card.onclick = () => {
    if(item.subgames){
      openTestMenu(item.subgames);
    }else{
      openGame(item.url);
    }
  };

  games.appendChild(card);
}

function openGame(url){
  overlay.classList.remove("hidden");
  frame.src = url;
}

function closeGame(){
  overlay.classList.add("hidden");
  frame.src = "";
}

function openTestMenu(list){
  overlay.classList.remove("hidden");

  frame.srcdoc = `
    <html>
    <head>
      <style>
        body{
          margin:0;
          background:#111;
          color:white;
          font-family:Arial;
          padding:20px;
        }

        h1{
          font-size:42px;
        }

        .btn{
          width:100%;
          border:none;
          margin-top:16px;
          padding:22px;
          border-radius:20px;
          background:#222;
          color:white;
          font-size:22px;
        }
      </style>
    </head>
    <body>
      <h1>🧠 Test Auswahl</h1>

      ${list.map(g => `
        <button class="btn" onclick="window.parent.postMessage('${g.url}','*')">
          ${g.name}
        </button>
      `).join("")}
    </body>
    </html>
  `;
}

window.addEventListener("message", (e)=>{
  frame.src = e.data;
});

data.forEach(createCard);

if("serviceWorker" in navigator){
  navigator.serviceWorker.register("sw.js");
}
