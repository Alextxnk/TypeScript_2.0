const user = {
   firstName: 'Alex',
   sayHi() {
      console.log(this.firstName);
   }
};

function greeting(fn) {
   fn();
}

greeting(user.sayHi);
