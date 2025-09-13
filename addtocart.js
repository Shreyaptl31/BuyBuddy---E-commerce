      const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
      if (loggedInUser && loggedInUser.name) {
        document.getElementById("userNameDisplay").innerText =
          loggedInUser.name;
      } else {
        window.location.href = "index.html";
      }

      const cartContainer = document.getElementById("cart-container");
      const cartSummary = document.getElementById("cart-summary");

      function loadCart() {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        cartContainer.innerHTML = "";
        let total = 0;

        if (cart.length === 0) {
          cartContainer.innerHTML =
            '<p class="text-center">Your cart is empty.</p>';
          cartSummary.innerHTML = "";
          return;
        }

        cart.forEach((item, index) => {
          total += item.price;
          const itemDiv = document.createElement("div");
          itemDiv.className = "cart-item row align-items-center mb-3";

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
            <span class="badge bg-success">$${item.price}</span>
          </div>
          <div class="col-md-3 text-end">
            <button class="btn btn-success me-2" onclick="removeFromCart(${index})">Remove</button>
            <button class="btn btn-danger" onclick="deleteFromCart(${index})"> Delete</button>
          </div>
        `;

          cartContainer.appendChild(itemDiv);
        });

        cartSummary.innerHTML = `Total: $${total.toFixed(2)}`;
      }

      function removeFromCart(index) {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        const removedItem = cart.splice(index, 1)[0];

        // Save to history
        const history = JSON.parse(localStorage.getItem("history")) || [];
        history.push({ ...removedItem, removedAt: new Date().toISOString() });
        localStorage.setItem("history", JSON.stringify(history));

        // Update cart
        localStorage.setItem("cart", JSON.stringify(cart));
        loadCart();
      }

      function deleteFromCart(index) {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        cart.splice(index, 1); // Permanently delete without saving to history
        localStorage.setItem("cart", JSON.stringify(cart));
        loadCart();
      }

      // Display username
      const username = localStorage.getItem("username");
      if (username) {
        document.getElementById("userNameDisplay").textContent = username;
      }

      // Load cart on page load
      document.addEventListener("DOMContentLoaded", loadCart);

      function logout() {
        localStorage.removeItem("loggedInUser");
        window.location.href = "index.html";
      }