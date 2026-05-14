const games = [
    { title: "FINDE DEN\nIMPOSTER", desc: "Der geheime Verräter", badge: "🔥 Beliebt", type: "game", url: "https://awesomekrieger.github.io/Imposter/" },
    { title: "KINGS\nCUP", desc: "Party Karten Game", badge: "👑 Party", type: "game", url: "https://awesomekrieger.github.io/ReisTest/kingscup.html" },
    { title: "TEST\nCENTER", desc: "Alle Tests", badge: "🧠 Tests", type: "tests" },
    { title: "100%\nCHALLENGE", desc: "Challenge Modus", badge: "⭐ Neu", type: "game", url: "https://awesomekrieger.github.io/Imposter/" }
];

const tests = [
    { name: "Reis Test", url: "https://awesomekrieger.github.io/ReisTest/" },
    { name: "Finder", url: "https://awesomekrieger.github.io/ReisTest/finder.html" },
    { name: "Hardcore", url: "https://awesomekrieger.github.io/ReisTest/hardcore.html" },
    { name: "Reis Multi", url: "https://awesomekrieger.github.io/ReisTest/reismulti.html" }
];

const grid = document.getElementById("grid");
const overlay = document.getElementById("overlay");
const frame = document.getElementById("frame");

// --- NEU: Spieler Auswahl State ---
let currentPlayerCount = 2;

function createPlayerMenu() {
    const header = document.querySelector('.hero');
    const menuHtml = `
        <div class="player-select-container" style="margin-top: 20px;">
            <label style="color: #888; font-size: 14px; display: block; margin-bottom: 8px;">Spieleranzahl</label>
            <div class="player-chips" style="display: flex; gap: 10px;">
                ${[1, 2, 3, 4, 8].map(num => `
                    <button class="chip ${num === currentPlayerCount ? 'active' : ''}" 
                            onclick="setPlayers(${num}, this)"
                            style="padding: 8px 16px; border-radius: 20px; border: 1px solid #333; background: ${num === currentPlayerCount ? 'white' : '#222'}; color: ${num === currentPlayerCount ? 'black' : 'white'}; cursor: pointer;">
                        ${num}
                    </button>
                `).join('')}
            </div>
        </div>
    `;
    header.insertAdjacentHTML('beforeend', menuHtml);
}

function setPlayers(num, btn) {
    currentPlayerCount = num;
    // Visuelles Feedback für Chips
    document.querySelectorAll('.player-chips button').forEach(b => {
        b.style.background = '#222';
        b.style.color = 'white';
    });
    btn.style.background = 'white';
    btn.style.color = 'black';
}

// --- NEU: Prefetch Logik ---
function prefetchContent() {
    // Kombiniere alle URLs zum Vorladen
    const allUrls = [...games.filter(g => g.url).map(g => g.url), ...tests.map(t => t.url)];
    
    allUrls.forEach(url => {
        const link = document.createElement("link");
        link.rel = "prefetch"; // Weist den Browser an, die Seite im Leerlauf zu laden
        link.href = url;
        document.head.appendChild(link);
    });
}

// --- Grid Rendern ---
games.forEach(item => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
        <div class="badge">${item.badge}</div>
        <div>
            <h2>${item.title.replace(/\n/g, "<br>")}</h2>
            <p>${item.desc}</p>
        </div>
    `;

    card.onclick = () => {
        if (item.type === "tests") {
            openTests();
        } else {
            // Parameter anhängen
            const urlWithParams = `${item.url}${item.url.includes('?') ? '&' : '?'}players=${currentPlayerCount}`;
            openGame(urlWithParams);
        }
    };
    grid.appendChild(card);
});

function openGame(url) {
    overlay.classList.remove("hidden");
    frame.srcdoc = "";
    frame.src = url;
}

function closeGame() {
    overlay.classList.add("hidden");
    frame.src = "";
    frame.srcdoc = "";
}

function openTests() {
    overlay.classList.remove("hidden");
    
    // Buttons im Iframe bekommen ebenfalls die Spieler-Parameter
    const testButtons = tests.map(t => {
        const urlWithParams = `${t.url}${t.url.includes('?') ? '&' : '?'}players=${currentPlayerCount}`;
        return `<button onclick="window.location.href='${urlWithParams}'">${t.name}</button>`;
    }).join("");

    frame.srcdoc = `
        <html>
        <head>
            <style>
                body{ margin:0; background:#101010; font-family: sans-serif; color:white; padding:20px; }
                h1{ font-size:32px; font-weight: 800; margin-bottom: 24px; }
                button{ width:100%; padding:20px; margin-top:12px; border:none; border-radius:15px; background:#1c1c1e; color:white; font-size:18px; font-weight: 600; text-align: left; transition: transform 0.1s; }
                button:active { transform: scale(0.98); background: #2c2c2e; }
            </style>
        </head>
        <body>
            <h1>🧠 Test Auswahl</h1>
            ${testButtons}
        </body>
        </html>
    `;
}

// Initialisierung
createPlayerMenu();
prefetchContent();

if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("sw.js");
}
