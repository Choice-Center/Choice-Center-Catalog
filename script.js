const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxFuMHDoRrP6S8zMAdMDR6Bv8WFSlnw0lKZrA2mQEL-M3qbfz8uGjjD1Gjf-y2ji0_i5A/exec";

let allItems = [];

document.addEventListener("DOMContentLoaded", () => {
    fetch(SCRIPT_URL)
        .then(response => response.json())
        .then(data => {
            if (data.error) return;
            allItems = data.items;
            createTabs(data.categories);
            displayItems("All");
        })
        .catch(err => console.error(err));
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

        let rawUrl = item.url;
        let fileId = rawUrl.split("id=")[1];
        let finalImgUrl = "https://docs.google.com/uc?export=view&id=" + fileId;

        const img = document.createElement("img");
        img.src = finalImgUrl;
        img.loading = "lazy";
        
        img.onerror = function() {
            this.src = "https://drive.google.com/thumbnail?authuser=0&sz=w600&id=" + fileId;
        };

        // 🎯 यहाँ क्लिक करने का जादुई ऑप्शन जोड़ा है, जिससे पूरी फोटो नए पेज पर खुलेगी
        card.addEventListener("click", () => {
            window.open("https://drive.google.com/file/d/" + fileId + "/view?usp=drivesdk", "_blank");
        });

        const name = document.createElement("div");
        name.classList.add("card-name");
        name.innerText = item.name.split('.')[0]; 

        card.appendChild(img);
        card.appendChild(name);
        grid.appendChild(card);
    });
}
