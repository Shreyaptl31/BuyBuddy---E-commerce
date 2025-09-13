// profile name
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (loggedInUser && loggedInUser.name) {
    const result =  document.getElementById('userNameDisplay')
      result.innerText = loggedInUser.name;
    } else {
      window.location.href = 'index.html';
    }
// product card 
    let products = [];
    let comments = [];

    fetch('https://dummyjson.com/products')
      .then(res => res.json())
      .then(data => {
        products = data.products;
        return fetch('https://dummyjson.com/comments');
      })
      .then(res => res.json())
      .then(data => {
        comments = data.comments;
        displayProducts();
      })
      .catch(err => console.error('Error loading data:', err));

    function displayProducts() {
      const container = document.getElementById('productContainer');
      container.innerHTML = "";

      products.forEach((product, index) => {
        const randomComment = comments[Math.floor(Math.random() * comments.length)];
        const reviewer = randomComment.user?.fullName || "Anonymous";
        const comment = randomComment.body;
        const qrCode = `https://api.qrserver.com/v1/create-qr-code/?size=80x80&data=${encodeURIComponent(product.title)}`;

        const card = `
          <div class="col">
            <div class="card h-100 border-0 shadow-lg rounded-4 overflow-hidden">
              <div class="position-relative">
                <img src="${product.thumbnail}" class="w-100" style="height: 180px; object-fit: contain; background-color: #E8FCE8;" alt="${product.title}">
                <span class="badge bg-success position-absolute top-0 end-0 m-2">$${product.price}</span>
              </div>
              <div class="card-body d-flex flex-column justify-content-between">
                <h5 class="card-title text-success fw-semibold">${product.title}</h5>
                <p class="text-muted small mb-2">${product.description.substring(0, 60)}...</p>
                <div class="d-flex justify-content-between align-items-center mb-3">
                  <span class="text-success fw-bold">⭐ ${product.rating}</span>
                </div> 
                <div class="d-flex flex-wrap gap-2">
                  <button class="btn btn-success btn-sm flex-grow-1" 
                    data-bs-toggle="modal" 
                    data-bs-target="#productModal"
                    onclick="showDetails('${product.thumbnail}', 
                      '${product.title.replace(/'/g, "\\'")}', 
                      '${reviewer.replace(/'/g, "\\'")}', 
                      '${comment.replace(/'/g, "\\'")}', 
                      '${qrCode}', 
                      ${product.price}, 
                      ${index})">Explore</button>
                  <button class="btn btn-success btn-sm flex-grow-1" onclick="addToCart(${index})">Add to Cart</button>
                  <button class="btn btn-outline-success btn-sm flex-grow-1">Buy Now</button>
                </div>
              </div>
            </div>
          </div>
        `;

        container.innerHTML += card;
      });
    }

    function addToCart(index) {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      cart.push(products[index]);
      localStorage.setItem('cart', JSON.stringify(cart));
      alert(`${products[index].title} added to cart!`);
      window.location.href = 'addtocart.html';
    }

    function showDetails(image, title, reviewer, comment, qr, price, index) {
      document.getElementById('modalImage').src = image;
      document.getElementById('modalTitle').innerText = title;
      document.getElementById('modalReviewer').innerText = reviewer;
      document.getElementById('modalComment').innerText = `"${comment}"`;
      document.getElementById('modalQR').src = qr;
      document.getElementById('modalPrice').innerText = `$${price}`;
      document.getElementById('modalAddToCart').onclick = () => addToCart(index);
    }

    function logout() {
      localStorage.removeItem('loggedInUser');
      window.location.href = 'index.html';
    }