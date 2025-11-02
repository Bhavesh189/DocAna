let ques = document.getElementById("q");
let se = document.getElementById("s");
se.addEventListener('click', snd);
ques.addEventListener('keypress', function (event) {
    if (event.key === "Enter") {
        snd();
    }
});

function typeReply(element, text) {
    let i = 0;
    const speed = 25;
    
    element.innerText = '';

    function typing() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            document.querySelector(".chats").scrollTop = document.querySelector(".chats").scrollHeight;
            setTimeout(typing, speed);
        }
    }
    
    typing();
}


async function snd() {
    const msg = ques.value.trim();
    if (msg === "") return;

    const chats = document.querySelector(".chats");

    const user = document.createElement("div");
    user.className = "u";
    user.innerText = msg;
    chats.appendChild(user);

    const bot = document.createElement("div");
    bot.className = "bo";
    bot.innerText = "Thinking...";
    chats.appendChild(bot);

    chats.scrollTop = chats.scrollHeight;
    ques.value = "";

    const VERCEL_BACKEND_URL = "backend-eta-dusky.vercel.app";
    
    try {
        const response = await fetch(`${VERCEL_BACKEND_URL}/ask`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ question: msg })
        });

        const data = await response.json();

        if (response.ok) {
            typeReply(bot, data.reply);
        } else {
            const errorMessage = data.details || data.error || "Unknown server error.";
            bot.innerText = `⚠️ Server Error (${response.status}): ${errorMessage}. Check your API Key!`;
            console.error("Backend returned an error:", data);
        }

    } catch (error) {
        bot.innerText = "⚠️ Network Error: Could not reach the Vercel backend. Check your URL or server status.";
        console.error("Network or parsing error:", error);
    }
}

let t = document.querySelector(".t");
let i = 2;
const bar = document.getElementById("bar");
bar.addEventListener('click', () => {
    if (i % 2 == 0) {
        i++;
        bar.style.transition = "0.5s";
        t.style.transition = "0.5s";
        t.style.left = "0%";
    } else {
        i--;
        t.style.left = "-100%";
    }
});

document.addEventListener('DOMContentLoaded', () => {
    document.querySelector(".chats").scrollTop = document.querySelector(".chats").scrollHeight;
});





