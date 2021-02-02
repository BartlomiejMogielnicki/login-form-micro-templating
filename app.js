import './style/index.scss';
import { route } from './router';

const URL = 'https://zwzt-zadanie.netlify.app/api/login';

route('/', 'home', function () {
  this.username = '';
  this.password = '';
  this.errorMessage = '';

  this.$on('.username', 'change', (e) => {
    this.username = e.target.value;
  });

  this.$on('.password', 'change', (e) => {
    this.password = e.target.value;
  });

  this.$on('.loginForm', 'submit', (e) => {
    e.preventDefault();

    if (this.username === '' || this.password === '') {
      this.errorMessage = 'Enter username and password';
      this.username = '';
      this.password = '';
      this.$refresh();
      return;
    }

    const user = { username: this.username, password: this.password };

    fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then((response) => {
        if (!response.ok) {
          if (response.status === 401) {
            this.errorMessage = 'Invalid username or password';
            this.$refresh();
            throw new Error('Invalid username or password');
          } else {
            this.errorMessage = 'Something went wrong. Please try again';
            this.$refresh();
            throw new Error('Something went wrong');
          }
        }
        this.errorMessage = '';
        return response.json();
      })
      .then(() => (window.location.href = '#/success'))
      .catch((error) => error);
  });
});

route('/success', 'success', function () {
  this.title = 'Welcome back!';
});
