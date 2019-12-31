# Phỏng vấn JavaScript người ta hỏi gì? - Phần 1

<p><div class='published'><b>Published:</b> 2018-10-23 20:19:18</div></p>

![Are these questions relevant?](/p/javascript-interview-part-1/img/intro.png "Cha phỏng vấn mình hỏi toàn thứ gì đâu, ghét quá bỏ về!")

Hình trên mình lấy từ một video trên youtube. Cái background chỉ là minh họa cho [đoạn tweet](https://twitter.com/reiddraper/status/798913241476923392) mà anh speaker trong video đó thêm vào thôi.

Tác giả của tweet đó là anh Ried Draper (một kỹ sư ở GitHub) sau khi ngồi trơ mắt ngó một ứng viên bỏ dở buổi interview và bước đi không ngoảnh lại. Mình tạm dịch là:

> "Đoạn code Fizz Buzz ưa thích của tôi vừa bỏ ra ngoài [giữa] buổi phỏng vấn"

Nếu bạn biết về _Fizz Buzz problem_ thì có lẽ sẽ hiểu vì sao anh chàng đó bỏ về. Mình cùng đoán nhé. Anh ta là một Front-end developer với 5 năm kinh nghiệm, full tự học và không có bằng Computer Science gì. Hoặc cũng có thể anh ta chỉ là một Junior Developer 🤔?! Nhưng rất có thể hằng ngày anh ta chủ yếu chỉ làm việc với lib và framework, và tạo ra những tuyệt tác trong khi không hoàn toàn nắm rõ hay hiểu bản chất của đống tools đó. 

Giống như phần lớn dân dev chúng ta thôi. Nên gặp phải những câu hỏi khá là basic như thế, những vấn đề mà ta chẳng mấy lúc hoặc chả gặp trong khi hằng ngày vẫn code đẹp và app vẫn chạy mượt mà, thì phần đông ai cũng thấy hơi nản:  "Thằng cha này hỏi toàn ba thứ linh tinh!" 😂.

Phần 1 này sẽ tập trung vào những câu hỏi kiểu như vậy.

### Mục lục
1. [Fizz Buzz](#fizz-buzz)
2. [JavaScript Hoisting](#javascript-hoisting)
3. [== vs ===](#-vs-)
4. [Undeclared vs undefined vs null](#undeclared-vs-undefined-vs-null)
5. [Kiểm tra một array có tồn tại hoặc empty không](#ki-m-tra-m-t-array-c-t-n-t-i-ho-c-empty-kh-ng)
6. [Trình bày về Scope và Context trong JavaScript](#tr-nh-b-y-v-scope-v-context-trong-javascript)
7. [Closure là gì?](#closure-l-g-)
8. [Bind, Call và Apply](#bind-call-v-apply)
9. [Event Loop, Call Stack và Callback Queue là gì?](#event-loop-call-stack-v-callback-queue-l-g-) 
10. [Lời kết](#l-i-k-t)
11. [References](#references)

## Fizz Buzz

_Cho ```i``` chạy từ 1 tới 100. In **fizz** ra ```console``` nếu ```i``` chia hết cho 3, **buzz** nếu chia hết cho 5 và **fizzbuzz** nếu chia hết cho cả 3 và 5_

Solution có thể tham khảo ở đây: https://gist.github.com/jaysonrowe/1592432.

Vậy mục đích của người phỏng vấn là gì? Bạn thấy đấy, câu hỏi tuy đơn giản nhưng có quá trời đáp án khác nhau. Quan điểm ở đây là Software Development không chỉ có cắm đầu code, mà còn nhiều thứ khác: clean code, optimization và quan trọng là cách giải quyết vấn đề.

Dạng câu hỏi này sẽ là chưa đủ để nhận diện một developer giỏi, nhưng nó sẽ nhận diện được những kẻ yếu. Vậy nên xài câu này là một hướng đi đúng đắn của nhà tuyển dụng để phân loại ứng viên. Càng rõ hơn khi yêu cầu họ viết code ra giấy và giới hạn chỉ trong 2-3 phút.

```javascript
// cái này công nhận... ngắn triệt để
for(i=0; i<100; ) console.log((++i%3 ?'':'Fizz') + (i%5?'':'Buzz') || i)
```

- [Using FizzBuzz to Find Developers who Grok Coding](https://imranontech.com/2007/01/24/using-fizzbuzz-to-find-developers-who-grok-coding/)
- [Why I’m still using “Fizz Buzz” to hire Software-Developers](https://hackernoon.com/why-im-still-using-fizz-buzz-to-hire-software-developers-7e31a89a4bbf)

## JavaScript Hoisting

Về cơ bản, khi code được compile, tất cả variable khai báo sau từ khóa `var` sẽ được "hoiste" lên phía trên cùng của file .js (global) hay trên cùng của function (local). Bất kể bạn khai báo đống varibale đó ở đâu.

```javascript
// code của bạn
console.log(myName);
var myName = "Lemon'";

// sau khi biên dịch
var myName;
console.log(myName);
myName = "Lemon'";
```
Vậy, hỏi câu này làm gì? Nếu chăm đọc code người khác, bạn hẳn sẽ thấy nhiều người có thói quen declare biến trên cùng rồi phía dưới mới assign value sau. Đó là một best practice (maybe) trước cái concept "hoisting" này.

**Lưu ý** rằng "hoisting" cũng áp dụng cho cả `let` và `const`. Bạn có thể xem chi tiết [ở bài viết này](https://ponyfoo.com/articles/es6-let-const-and-temporal-dead-zone-in-depth).

## ```==``` vs ```===```

Javascript bà điên có hai kiểu so sánh bằng: `===` (`!==`) and the evil `==`(`!=`). `===` là toán tử so sánh rất bình thường và an toàn: cùng type cùng value thì `true` không thì `false`. `==` thì đôi lúc sẽ giết ta khi 2 toán hạng khác type, bằng cách cố gắng ép về cùng 1 type để so sánh.

```javascript
'' == '0'           // false
0 == ''             // true
0 == '0'            // true

false == 'false'    // false
false == '0'        // true

false == undefined  // false
false == null       // false
null == undefined   // true

' \t\r\n ' == 0     // true
```

Vậy làm sao cho nó an toàn? Theo mình thì nên xài `===` là an toàn nhất vì nó rõ ràng. Team đông thì nên xài một [linter](https://eslint.org/docs/rules/eqeqeq), thống nhất và đặt ra các rule để tránh các rủi ro chết chóc do JS si đa gây nên.

## Undeclared vs undefined vs null
### undeclared
Không khai báo trước khi xài
```javascript
const bar = foo + 5; // Uncaught ReferenceError: foo is not defined
```
### undefined
- Khai báo nhưng không có value nào cả (nhưng mà `const a;` thì báo lỗi chứ `a` không phải là `undefined` nhé).
- Function không trả về gì hết
- Truy xuất value của một property không có trong object hay tại một index vượt quá length của array.
```javascript
const foo = { xx: 1 };
foo.xxx; // undefined
const bars = [1,2];
bars[2]; // undefined
```

### null
`null` là một value. Value đó không là gì cả, nhưng nó là một value 😖.

### Kiểm tra undefined và null
```javascript
// ==========check for undefined==========
let foo;

console.log(typeof foo); // "undefined" as a string
console.log(typeof bar): // undeclared, but also returns "undefined" 😖

// preferred
console.log(foo === undefined); // true boolean

const baz = 'undefined';
console.log(baz === undefined); // false. Hooray, I guess.

// ==========check for null==========
const foo = null;

console.log(typeof foo); // object 😖

// preferred
console.log(foo === null); // true boolean

// ==========check for both null and undefined==========
if(!foo) { //do something } // false if foo is undefined or null
```

## Kiểm tra một array có tồn tại hoặc empty không
``` javascript
if (!Array.isArray(array) || !array.length) {
  // array does not exist, is not an array, or is empty
}
```

## Trình bày về Scope và Context trong JavaScript

### Scope

Scope trong JS cũng như các ngôn ngữ khác, có Global và Local scope. Global scope tồn tại cho đến khi ứng dụng bị tắt. Local scope tồn tại cho đến khi function chạy xong. ES6 giới thiệu `let` và `const` mang local scope đến với `block statement`.

```javascript```
if (true) {
    // this 'if' conditional block doesn't create a scope

    // name is in the global scope because of the 'var' keyword
    var name = 'Lemon';
    // likes is in the local scope because of the 'let' keyword
    let likes = 'Coding';
    // skills is in the local scope because of the 'const' keyword
    const skills = 'JavaScript and C#';
}

console.log(name); // logs 'Lemon'
console.log(likes); // Uncaught ReferenceError: likes is not defined
console.log(skills); // Uncaught ReferenceError: skills is not defined
```

### Context
**Context**! Hmm, là một khái niệm rất quan trọng cần phải nắm nếu không muốn sấp mặt với Javascript. Về cơ bản thì **context** là value của `this`. Trong "global scope" thì context luôn là `window` object.

```javascript
class User {
    logName() {
        console.log(this);
    }
}
(new User).logName(); // logs User {}

function logFunction() {
    console.log(this);
}
new logFunction(); // logs logFunction {}
```

Phải cẩn thận với [**arrow function**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions) nhé. 

```javascript
const foo = {
	a: function() { console.log(this); },
	b: () => { console.log(this); }
}

foo.a(); // logs foo object
foo.b(); // logs Window object
```

*Đọc thêm về Scope và Context [ở đây](https://scotch.io/tutorials/understanding-scope-in-javascript).*

## Closure là gì?
Hãy bắt đầu với một ví dụ (được lấy từ một bài viết trên [Kipalog](https://kipalog.com)), từ đó bạn sẽ dễ trình bày hơn với interviewer.

```javascript
function outer(x) {
  function inner(y) {
    return x + y;
  }
  return inner;
}
fn_inner = outer(3); 
result = fn_inner(5); // #=> 8

result1 = outer(3)(5); // #=> 8
```
Về cơ bản, sau khi execute xong, `outer()` trả về một function `fn_inner()` và đồng thời một bao đóng (closure) được tạo ra gói cái context bao gồm con số `3` đó lại. Hay nói cách khác là đóng gói biến `x` tại thời điểm `outer()` được gọi.

Vậy khi nào thì xài closure? Trường hợp tiêu biểu nhất là khi cần assign các hàm eventHandler cho nhiều element một lúc.

```javascript
const addHandlers = function (nodes) {
  const helper = function (i) {
    return function (e) {
      alert(i);
    };
  };
  
  for (let i = 0; i < nodes.length; ++i) {
    nodes[i].onclick = helper(i);
  }
};
```
Nói một cách hàn lâm hơn: Một trong những ứng dụng mạnh mẽ của closure là sử dụng hàm `outer()` như một "function factory".

## Bind, Call và Apply

[Tôi đi code dạo](https://toidicodedao.com/2016/03/08/series-javascript-sida-bind-call-va-apply-trong-javascript/) đã viết về 3 thứ đó khá là thú vị và sinh động dễ hiểu rồi. Mình chỉ muốn lưu ý một chút là cái ```bind``` đó rất quan trọng khi bạn code ReactJS. Nó đảm bảo value của `this` là đúng trong callback khi handle event, chi tiết [ở đây](https://reactjs.org/docs/handling-events.html).

## Event Loop, Call Stack và Callback Queue là gì?

Riêng câu này xứng đáng có một bài viết riêng. Và nó đây: [Javascript hoạt động như thế nào?](https://blogchanhday.com/p/javascript-tong-quan-ve-engine-runtime-call-stack-va-event-loop/)

## Lời kết

Dù bạn không thể trả lời hay chỉ trả lời được phần nào đó thôi trong mớ câu hỏi trên, thì mình tin rằng, những kiến thức đó rất bổ ích. Chúng sẽ giúp bạn tránh những lỗi ngớ ngẩn hay gặp và thiết kế chương trình được tốt hơn.

Phần 1 tới đây thôi. Mời các bạn ghé đọc tiếp [phần 2](https://blogchanhday.com/p/javascript-interview-part-2/).

## References
- [Russell Anderson: Answering Tricky JS Interview Questions](https://www.youtube.com/watch?v=MY0UBGX2FtA)
- [What is Hoisting in Javascript?](https://medium.com/javascript-in-plain-english/https-medium-com-javascript-in-plain-english-what-is-hoisting-in-javascript-a63c1b2267a1)
- [Closure và scope trong javascript](https://kipalog.com/posts/Closure-va-scope-trong-javascript)
