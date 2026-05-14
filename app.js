
const games = [
  {
    title: "FINDE DEN\nIMPOSTER",
    badge: "🔥 Beliebt",
    url: "https://awesomekrieger.github.io/Imposter/"
  },
  {
    title: "WER IST\nVERDÄCHTIG?",
    badge: "⭐ Neu",
    url: "https://awesomekrieger.github.io/Imposter/"
  },
  {
    title: "TEAM\nMISSION",
    badge: "❤️ Community",
    url: "https://awesomekrieger.github.io/Imposter/"
  },
  {
    title: "100%\nCHALLENGE",
    badge: "⭐ Neu",
    url: "https://awesomekrieger.github.io/Imposter/"
  }
];

const grid = document.getElementById("gameGrid");
const overlay = document.getElementById("overlay");
const frame = document.getElementById("gameFrame");

games.forEach(game => {
  const card = document.createElement("div");
  card.className = "card";

  card.innerHTML = `
    <div class="badge">${game.badge}</div>
    <h2>${game.title.replace(/\n/g, "<br>")}</h2>
  `;

  card.onclick = () => openGame(game.url);

  grid.appendChild(card);
});

function openGame(url) {
  overlay.classList.remove("hidden");
  frame.src = url;
}

function closeGame() {
  overlay.classList.add("hidden");
  frame.src = "";
}

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js");
}
