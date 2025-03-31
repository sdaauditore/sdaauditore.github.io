document.addEventListener("DOMContentLoaded", function () {
    const counterFile = "counter.txt";

    // Check if user is a new visitor (not in localStorage)
    if (!localStorage.getItem("visited")) {
        localStorage.setItem("visited", "true");

        // Fetch current count and update
        fetch(counterFile)
            .then(response => response.text())
            .then(count => {
                let newCount = parseInt(count, 10) + 1;

                // Update the count file
                fetch("update_counter.php", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ count: newCount }),
                });

                // Update UI
                document.getElementById("visitor-counter").textContent = newCount;
            })
            .catch(error => console.error("Error fetching counter:", error));
    } else {
        // If returning visitor, just fetch and display count
        fetch(counterFile)
            .then(response => response.text())
            .then(count => {
                document.getElementById("visitor-counter").textContent = count;
            })
            .catch(error => console.error("Error fetching counter:", error));
    }
});
