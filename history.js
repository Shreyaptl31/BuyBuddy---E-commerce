  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
      if (loggedInUser && loggedInUser.name) {
        document.getElementById("userNameDisplay").innerText =
          loggedInUser.name;
      } else {
        window.location.href = "index.html";
      }

      const historyContainer = document.getElementById("history-container");

      function loadHistory() {
        const history = JSON.parse(localStorage.getItem("history")) || [];
        historyContainer.innerHTML = "";

        if (history.length === 0) {
          historyContainer.innerHTML =
            '<p class="text-center">No purchase history available.</p>';
          return;
        }

        history.forEach((item, index) => {
          const itemDiv = document.createElement("div");
          itemDiv.className = "history-item row align-items-center mb-4";

          itemDiv.innerHTML = `
          <div class="col-md-3">
            <img src="${item.thumbnail}" alt="${
            item.title
          }" class="img-fluid rounded">
          </div>
          <div class="col-md-6">
            <h5>${item.title}</h5>
            <p class="text-muted mb-2">${
              item.description || "No description available."
            }</p>
            <span class="badge bg-success">$${item.price.toFixed(2)}</span>
            <p class="text-muted">Removed at: ${new Date(
              item.removedAt
            ).toLocaleString()}</p>
          </div>
          <div class="col-md-3 text-end">
            <button class="btn btn-success" onclick="restoreItem(${index})">Restore</button>
          </div>
        `;

          historyContainer.appendChild(itemDiv);
        });
      }

      function restoreItem(index) {
        const history = JSON.parse(localStorage.getItem("history")) || [];
        const cart = JSON.parse(localStorage.getItem("cart")) || [];

        const itemToRestore = history.splice(index, 1)[0];

        cart.push(itemToRestore);
        localStorage.setItem("cart", JSON.stringify(cart));
        localStorage.setItem("history", JSON.stringify(history));

        loadHistory();
      }

      function logout() {
        localStorage.removeItem("username");
        window.location.href = "login.html";
      }
      loadHistory();