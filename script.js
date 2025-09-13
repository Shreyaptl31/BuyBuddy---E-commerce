document.getElementById('showRegister').addEventListener('click', function (e) {
            e.preventDefault();
            document.getElementById('loginForm').classList.remove('active');
            document.getElementById('registerForm').classList.add('active');
        });

        document.getElementById('showLogin').addEventListener('click', function (e) {
            e.preventDefault();
            document.getElementById('registerForm').classList.remove('active');
            document.getElementById('loginForm').classList.add('active');
        });

        // Register form submission
        document.getElementById('registerForm').addEventListener('submit', function (e) {
            e.preventDefault();

            const name = document.getElementById('regName').value;
            const email = document.getElementById('regEmail').value;
            const password = document.getElementById('regPassword').value;

            let users = JSON.parse(localStorage.getItem('users')) || [];

            const isExistingUser = users.some(user => user.email === email);
            if (isExistingUser) {
                alert('This email is already registered. Please use a different email.');
                return;
            }

            const newUser = { name, email, password };
            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));
            alert('Registration successful!');

            document.getElementById('regName').value = '';
            document.getElementById('regEmail').value = '';
            document.getElementById('regPassword').value = '';

            document.getElementById('registerForm').classList.remove('active');
            document.getElementById('loginForm').classList.add('active');
            document.getElementById('loginEmail').value = email;
        });

        // Login form submission
        document.getElementById('loginForm').addEventListener('submit', function (e) {
            e.preventDefault();

            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;

            const users = JSON.parse(localStorage.getItem('users')) || [];

            const matchedUser = users.find(user => user.email === email && user.password === password);

            if (matchedUser) {
                alert(`Login successful! Welcome, ${matchedUser.name}`);
                localStorage.setItem('loggedInUser', JSON.stringify(matchedUser));
                window.location.href = 'dashboard.html';
            } else {
                alert('Invalid email or password. Please try again.');
            }

            document.getElementById('loginPassword').value = '';
        });