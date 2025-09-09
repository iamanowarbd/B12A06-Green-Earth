**1. var, let, const**

<br>

var → function-scoped, hoisted, re-declare & re-assign allowed.

let → block-scoped, TDZ, re-assign allowed but no re-declare.

const → block-scoped, cannot re-declare or re-assign.

```var x = 10;

let y = 20;

const z = 30;
```

**2. map(), forEach(), filter()**

map() → transforms each element → returns new array.

forEach() → executes function → returns nothing.

filter() → keeps elements that match condition → returns new array.

```let nums = [1,2,3,4];
nums.map(n => n*2);     // [2,4,6,8]

nums.forEach(n => n*2); // undefined

nums.filter(n => n%2);  // [1,3]
```

**3. Arrow Functions**

Arrow functions provide a shorter syntax for writing functions.

Do not have their own this, they use the enclosing scope’s this.

Cleaner and often used in callbacks.
```
/*normal*/
function add(a,b) { return a+b; }

/*arrow*/
const add = (a,b) => a+b;
```

**4. Destructuring**

Destructuring lets you unpack values from arrays and objects into variables.

```
/*array*/
const [first, second] = ["apple", "banana"];

/*object*/
const {name, age} = {name:"Ali", age:20};
```

**5. Template literals are strings enclosed in backticks (`).**

Allow string interpolation with ${expression}.

Support multi-line strings without \n.

More readable than concatenation.

```
let user = "Ali";

let score = 95;

let msg = `Hello ${user}, your score is ${score}.`;

console.log(msg);
```
