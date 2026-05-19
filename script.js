// दीपक जी, यह आपका असली और नया कूरियर लिंक है
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxFuMHDoRrP6S8zMAdMDR6Bv8WFSlnw0lKZrA2mQEL-M3qbfz8uGjjD1Gjf-y2ji0_i5A/exec";

let allItems = [];

// पेज खुलते ही डेटा लोड करना
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

// श्रेणियों के बटन (Tabs) बनाना
function createTabs(categories) {
    const tabsContainer = document.getElementById("category-tabs");
    tabsContainer.innerHTML = ""; // पुराना लोडिंग टेक्स्ट हटाना

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

// चुनी हुई श्रेणी के अनुसार तस्वीरें दिखाना
function displayItems(category) {
    const grid = document.getElementById("catalog-images");
    grid.innerHTML = ""; // पुरानी तस्वीरें साफ करना

    const filtered = allItems.filter(item => item.category === category);

    filtered.forEach(item => {
        const card = document.createElement("div");
        card.classList.add("card");

        const img = document.createElement("img");
        img.src = item.url;
        img.loading = "lazy"; // जिससे पेज जल्दी खुले

        const name = document.createElement("div");
        name.classList.add("card-name");
        // फाइल के नाम से .png या .jpg हटाकर दिखाना
        name.innerText = item.name.split('.')[0]; 

        card.appendChild(img);
        card.appendChild(name);
        grid.appendChild(card);
    });
}
