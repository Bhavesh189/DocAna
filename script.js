let ques = document.getElementById("q");
let se = document.getElementById("s");
se.addEventListener('click', snd);
ques.addEventListener('keypress', function (event) {
    if (event.key === "Enter") {
        snd();
    }
});

/**
 * Typewriter effect ke liye function.
 * @param {HTMLElement} element - Woh element jismein text type karna hai.
 * @param {string} text - Jo text type karna hai.
 */
function typeReply(element, text) {
    let i = 0;
    // Har 25 milliseconds mein ek character type karein
    const speed = 25; 
    
    // Purana text (jaise "Thinking...") hata dein
    element.innerText = ''; 

    function typing() {
        if (i < text.length) {
            // Har character ko add karein
            element.textContent += text.charAt(i);
            i++;
            // Agla character type karne ke liye wait karein
            setTimeout(typing, speed); 
        } else {
            // Typing khatam hone par, scroll ko bottom tak le jaein
            document.querySelector(".chats").scrollTop = document.querySelector(".chats").scrollHeight;
        }
    }
    
    typing();
}


async function snd() {
    const msg = ques.value.trim();
    if (msg === "") return;

    const chats = document.querySelector(".chats");

    // user message show karo
    const user = document.createElement("div");
    user.className = "u";
    user.innerText = msg;
    chats.appendChild(user);

    // bot "Thinking..." placeholder
    const bot = document.createElement("div");
    bot.className = "bo";
    // bot.innerText = "Thinking..."; // Ab seedhe typeReply se change hoga
    bot.innerText = "Thinking..."; 
    chats.appendChild(bot);

    // scroll to bottom
    chats.scrollTop = chats.scrollHeight;
    ques.value = "";

    // Gemini API call backend ke through
    try {
        const response = await fetch("http://localhost:5000/ask", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ question: msg })
        });

        const data = await response.json();

        // Check for success status (200-299)
        if (response.ok) { 
            // Ab seedha innerText set karne ki jagah, typeReply function ka upyog karein
            typeReply(bot, data.reply); 
        } else {
            // Agar backend se 400 ya 500 error aaya toh handle hoga
            const errorMessage = data.details || data.error || "Unknown server error.";
            // Error message ko turant dikha dein, ismein typing effect ki zaroorat nahi hai
            bot.innerText = `⚠️ Server Error: ${errorMessage}. Check your API Key!`; 
            console.error("Backend returned an error:", data);
        }

    } catch (error) {
        // Network error (Server chalu nahi hai ya URL galat hai)
        bot.innerText = "⚠️ Network Error: Could not connect to the backend server. Is your Node.js server running on port 5000?";
        console.error("Network or parsing error:", error);
    }

    // Note: chats.scrollTop = chats.scrollHeight; ab typeReply function ke andar call ho raha hai,
    // taaki typing khatam hone ke baad hi scroll ho.
}

// Sidebar code (tera same)
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
        i++;
        t.style.left = "-100%";
    }
});
