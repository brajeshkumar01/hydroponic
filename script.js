document.addEventListener("DOMContentLoaded", function () {
    const dataContainer = document.getElementById("data-container");
    const darkModeToggle = document.getElementById("toggle-dark-mode");
    const API_URL = "https://aaaa-72efa-default-rtdb.asia-southeast1.firebasedatabase.app/.json";

    async function fetchData() {
        try {
            const response = await fetch(API_URL);
            if (!response.ok) throw new Error("Network response was not ok");
            const data = await response.json();
            displayData(data);
        } catch (error) {
            console.error("Fetch error:", error);
            dataContainer.innerHTML = "<p class='error-message'>Error fetching data.</p>";
        }
    }

    function displayData(data) {
        dataContainer.innerHTML = "";
        if (data) {
            for (const key in data) {
                const itemDiv = document.createElement("div");
                itemDiv.className = "sensor-card";
                itemDiv.innerHTML = `
                    <h3>${key.replace(/_/g, ' ').toUpperCase()}</h3>
                    <p>${JSON.stringify(data[key])}</p>
                `;
                dataContainer.appendChild(itemDiv);
            }
        } else {
            dataContainer.innerHTML = "<p class='no-data'>No data found.</p>";
        }
    }

    if (darkModeToggle) {
        darkModeToggle.addEventListener("click", function () {
            document.body.classList.toggle("dark-mode");
        });
    }

    if (window.location.pathname.includes("sensor-data.html")) {
        fetchData();
        setInterval(fetchData, 5000); // Fetch data every 5 seconds
    }
});