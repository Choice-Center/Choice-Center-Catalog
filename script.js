// दीपक जी, यह आपका कूरियर लिंक है
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxFuMHDoRrP6S8zMAdMDR6Bv8WFSlnw0lKZrA2mQEL-M3qbfz8uGjjD1Gjf-y2ji0_i5A/exec";

let allItems = [];

document.addEventListener("DOMContentLoaded", () => {
    fetch(SCRIPT_URL)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                console.error("त्रुटि:", data.error);
                return;
            }
            allItems = data.items;
            createTabs(data.categories);
            displayItems("All");
        })
        .catch(err => console.error("डेटा लोड करने में समस्या:", err));
});

function createTabs(categories) {
    const tabsContainer = document.getElementById("category-tabs");
    tabsContainer.innerHTML = "";

    categories.forEach(cat => {
        const btn = document.createElement("button");
        btn.classList.add("tab-btn");
        if (cat === "All") btn.classList.add("active");
        btn.innerText = cat;
        
        btn.addEventListener("click", (e) => {
            document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
            e.target.classList.add("active");
            displayItems(cat);
        });
        
        tabsContainer.appendChild(btn);
    });
}

function displayItems(category) {
    const grid = document.getElementById("catalog-images");
    grid.innerHTML = "";

    const filtered = allItems.filter(item => item.category === category);

    filtered.forEach(item => {
        const card = document.createElement("div");
        card.classList.add("card");

        const img = document.createElement("img");
        
        // 🎯 दीपक जी, यहाँ हमने फोटो लोड करने का तरीका बदला है जो प्राइवेसी को बाईपास करेगा
        let rawUrl = item.url;
        let fileId = rawUrl.split("id=")[1];
        img.src = "https://lh3.googleusercontent.com/d/" + fileId;
        
        img.loading = "lazy";
        
        // अगर फोटो लोड न हो तो यह एरर को संभाल लेगा
        img.onerror = function() {
            this.src = "https://docs.google.com/uc?export=view&id=" + fileId;
        };

        const name = document.createElement("div");
        name.classList.add("card-name");
        name.innerText = item.name.split('.')[0]; 

        card.appendChild(img);
        card.appendChild(name);
        grid.appendChild(card);
    });
}
