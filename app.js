import { route } from './router';

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
    console.log(`Form submitted with
    username: ${this.username}
    password: ${this.password}`);
  });
});

route('/success', 'success', function () {
  this.title = 'Success Page';
});

route('/ex2', 'example2', function () {
  this.title = 'Example 2';
  this.counter = 0;
  this.$on('.my-button', 'click', () => {
    this.counter += 1;
    this.$refresh();
  });
});

route('*', '404', function () {});
