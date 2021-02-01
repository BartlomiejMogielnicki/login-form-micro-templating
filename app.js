import './style/index.scss';
import { route } from './router';

const URL = 'https://zwzt-zadanie.netlify.app/api/login';

route('/', 'home', function () {
  this.username = '';
  this.password = '';

  this.$on('.username', 'change', (e) => {
    this.username = e.target.value;
  });

  this.$on('.password', 'change', (e) => {
    this.password = e.target.value;
  });

  this.$on('.loginForm', 'submit', (e) => {
    e.preventDefault();
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
          throw new Error('Something went wrong');
        }
        return response.json();
      })
      .then((data) => (window.location.href = '#/success'))
      .catch((error) => console.log(error));
  });
});

route('/success', 'success', function () {
  this.title = 'Success Page';
});

route('*', '404', function () {});
