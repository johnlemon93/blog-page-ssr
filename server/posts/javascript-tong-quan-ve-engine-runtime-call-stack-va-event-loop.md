# JavaScript: Tổng quan về engine, runtime, call stack, single-threaded, concurrency, event loop...

<p><div class='published'><b>Published:</b> 2018-09-19 11:20:20</div></p>

**TL;DR:** Nếu bạn ngại đọc vì nó quá dài nhưng không ngại nghe Eng thì hãy xem video này. Bài viết của mình không gì hơn ngoài tổng hợp và giải thích những gì anh Philip Roberts đã trình bày.

<iframe class="center" width="700" height="394" src="https://www.youtube.com/embed/8aGhZQkoFbQ" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

Nay nhà nhà người người học JavaScript (JS). Từ front-end, back-end, mobile hay đến cả IoT vân vân, ta đều có thể bắt gặp JS.

Nhưng có lúc nào đó, giữa những mớ hỗn độn framework, tooling, bundler hay webpack, bạn có dừng lại một chút và tự hỏi Javascript hoạt động như thế nào?

Nếu có thì xin chúc mừng! Vì một khi quy mô project JS ngày càng lớn hơn, bạn cần phải tận dụng mọi thứ từ ngôn ngữ và hệ sinh thái với sự thấu hiểu sâu sắc về cấu trúc, cách vận hành bên trong... để có thể tối ưu sản phẩm của mình một cách tốt nhất.

Điều đó quyết định vị trí của bạn trong ngành phần mềm khốc liệt này, với tư cách là một developer hay chỉ là coder.

## Tổng quan

> Tôi là một ngôn ngữ **single-threaded**, **non-blocking**, **asynchronous** và **concurrent**. Tôi có một cái **call stack**, một **event loop**, một **callback queue**, vài **apis** và các thứ linh tinh khác.
>
> -- JavaScript

Okay, chúng ta sẽ cùng lần lượt tìm hiểu chi tiết các concept ấy và cách mà JS hoạt động.

Nếu bạn đơn giản chỉ tò mò về JS, bài viết này sẽ giúp bạn hiểu tại sao JS lại khá "kì cục" so với các ngôn ngữ khác.

Còn nếu bạn là một đồng đạo đã trải qua nhiều đau thương với JS, thì mình hi vọng rằng, những chia sẻ dưới đây sẽ cho bạn một cái nhìn sâu hơn về JS Runtime. Để tối ưu code bạn đã từng viết ra hay code của team member nào đó mà bạn ghét.

## JavaScript Engine

Từ khi NodeJS ra mắt năm 2009, cái tên V8 đã trở nên rất phổ biến. Đồng thời cũng trở thành ví dụ điển hình cho một JS Engine.

V8 JS Engine bao gồm hai thành phần chính:

![V8 JS Engine](/p/javascript-tong-quan-ve-engine-runtime-call-stack-va-event-loop/img/v8-engine.png "V8 JS Engine")

- Memory Heap: cấp phát bộ nhớ sẽ diễn ra ở đây.
- Call Stack: cấu trúc dữ liệu nơi chứa các lời gọi hàm khi code được thực thi.

## Call Stack

JavaScript đã giới thiệu nó là một ngôn ngữ đơn luồng, cũng có nghĩa là nó chỉ có một Call Stack và một lúc chỉ làm một việc thôi.

> Call Stack là một cấu trúc dữ liệu dạng ngăn xếp (stack) dùng để chứa thông tin về hoạt động của chương trình máy tính trong lúc thực thi.
>
> -- dịch từ [Wiki](https://en.wikipedia.org/wiki/Call_stack)

Nếu bạn đã từng debug code kiểu nhảy từng dòng lệnh, thường thì các IDE sẽ cung cấp luôn một giao diện để chúng ta xem call stack hiện tại. Nôm na là khi bạn debug/step đến một function A, thì A sẽ được ```push``` (on top) vào call stack. Sau khi A thực thi xong và trả về kết quả, A sẽ bị ```pop``` ra khỏi stack.

Call Stack của JS cũng vậy thôi. Hãy nhìn ví dụ sinh động trực quan dưới đây nhé.

![JS Call Stack](/p/javascript-tong-quan-ve-engine-runtime-call-stack-va-event-loop/img/js-call-stack.gif "JS Call Stack")

Call Stack ban đầu sẽ trống trơn khi engine bắt đầu thực thi đoạn code. Ngay sau đó, từng step sẽ giống như trên. Mỗi step bạn thấy trong hình là một entry hay một bản ghi trong Call Stack và được gọi là **Stack Frame**.

Cái **strack trace** bạn trông thấy khi ```console.log``` một exception cũng được xây dựng như thế.

![JS stack trace](/p/javascript-tong-quan-ve-engine-runtime-call-stack-va-event-loop/img/js-stack-trace.png "JS stack trace")

**Stack overflow** xảy ra khi chương trình vượt quá kích thước tối đa của Call Stack. Và nó rất dễ xảy ra, đặc biệt khi bạn hay ai đó trong team lỡ nghịch dại với đệ quy:

![Stack Overflow](/p/javascript-tong-quan-ve-engine-runtime-call-stack-va-event-loop/img/stack-overflow.png "Stack Overflow")

## JavaScript Runtime

Có thể bạn sẽ bất ngờ khi biết rằng, sự thật là các API như ```AJAX```, ```setTimeout``` hay ```DOM``` không nằm trong JS Engine.

**JS Runtime** là một bức tranh lớn và phức tạp hơn chứ không chỉ gói gọn trong JS Engine. Trong phạm vi bài viết chúng ta sẽ hiểu đầy đủ JS Runtime là **browser's JS runtime environment**. Và nó bao gồm những thành phần sau đây:

![JS Runtime](/p/javascript-tong-quan-ve-engine-runtime-call-stack-va-event-loop/img/js-runtime-big-picture.png "JS Runtime")

Chúng ta tạm gọi DOM, AJAX, setTimeout... được cung cấp bởi browser là **Web APIs**.

Còn **event loop** và **callback queue** là gì? Chúng đóng vai trò như thế nào trong JS Runtime? Mời các bạn đọc tiếp phần dưới.

## Concurrency và Event Loop và Callback queue

### Vấn đề của single-threaded

Nhìn chung, viết code đơn luồng (single-threaded) thường dễ thở hơn khi bạn chả cần quan tâm tới mấy vấn đề nhức đầu bên lập trình đa luồng (multi-threaded) như là deadlock.

Nhưng bù lại single-threaded cũng rất hạn chế. Như đã nói ở trên, JS chỉ có một Call Stack, chuyện gì sẽ xảy ra khi bạn viết những đoạn code xử lý các tác vụ nặng?

Như xử lý ảnh chẳng hạn.

```javascript
function resize() {
    console.log("starts resizing the image.. It may take 1 hour.");
    // user1: oops, okay lets wait
    // user2: or maybe I will go home and back on tomorrow
}
```

Khi hàm ```resize()``` được push vào trong Call Stack và bắt đầu thực thi, browser sẽ bị block, và các tác vụ khác kể cả **render** phải chờ hơn tiếng đồng hồ. Đây sẽ là một big problem với User Experience. Cơ mà thực tế thì với các browser hiện đại, như Chrome sẽ show warning này lên khi bị block (unresponsive) quá lâu.

![Page Unresponsive](/p/javascript-tong-quan-ve-engine-runtime-call-stack-va-event-loop/img/page_unresponsive.jpg "Page Unresponsive")

Vậy làm thế nào bây giờ?

Bình tĩnh, đây là lúc **Asynchronous callbacks** đến để giải cứu. Chúng là các **non-blocking** function trong browser hay trong NodeJS và chúng sẽ được chạy bất đồng bộ với sự hỗ trợ của Runtime environment.

### Do things concurrently by using Async Callbacks

Đầu tiên hãy xem xét ví dụ sau.

```javascript
function main() {
    console.log("Hi!");

    setTimeout(function timeout() {
        console.log("There!");
    }, 5000);

    console.log("Welcome to loupe!");
}
main();
```

Khi nhìn vào đoạn code trên, ta có thể dễ dàng hiểu là:

- ```console``` sẽ in "Hi!" ra đầu tiên.
- ```setTimeout``` được gọi với một async callback là ```timeout``` chứa dòng lệnh gọi ```console.log("There!")```.
- Nhưng ta sẽ expect là browser không chờ 5s sau mà in ra "Welcome to loupe!" ngay sau "Hi!". Rồi sau đó một tí thì "There!" mới xuất hiện.
- Và thực tế đúng là như vậy.

Bạn hãy quan sát Call Stack trong quá trình đoạn code được chạy.

![Async Callbacks & The Call Stack](/p/javascript-tong-quan-ve-engine-runtime-call-stack-va-event-loop/img/async-in-call-stack.gif "Async Callbacks & The Call Stack")

Bạn có thắc mắc tại sao hàm ```main``` chạy xong và ra khỏi Call Stack rồi, mà ```timeout``` với ```console.log("There!")``` lại ở đâu được đẩy vô hay vậy?

Hãy nhìn lại bức tranh bự ở phần Runtime, ý mình là **browser's JS runtime environment**. Bên cạnh JS Engine, browser còn cung cấp các **WebAPIs**, một **event loop** và một **callback queue**. Chúng chạy trên các thread riêng và được browser bảo trợ về concurrency.

Hoàn toàn tương tự với NodeJS, thay vì WebAPIs thì Node's Runtime Environment sẽ cung cấp **C++ APIs** và các thứ khác như event loop hay callback queue được implement bằng C++ ở phía dưới (behind the scene).

Tiếp theo mình sẽ giải thích concurrency được thực hiện như thế nào với hai thành phần sau đây.

### Event Loop và Callback queue

![Event loop and Callback Queue in action](/p/javascript-tong-quan-ve-engine-runtime-call-stack-va-event-loop/img/event-loop-and-callback-queue-in-action.gif "Event loop and Callback Queue in action")

Mình đã lấy lại ví dụ hồi nãy, nhưng thêm Event Loop (EL) và Callback Queue (CQ) vào bức tranh. Các hàm async callback sẽ được đưa vào hàng đợi CQ. Còn nhiệm vụ của EL là đợi cho Call Stack (CS) rỗng rồi sẽ soi CQ xem có gì không, nếu có thì bốc cái đầu tiên bỏ vào CS để chạy.

Nếu bạn để ý cái gif trên kĩ chút thì sẽ không thấy ```setTimeout``` xuất hiện trong khung **WebApis**, thì tại chúng ta đang để timeout=0 mà. Điều này khẳng định lại rằng, EL phải đợi cho CS rỗng thì mới đẩy tác vụ từ CQ vào. Nên cho dù bạn để ```setTimeout``` *zero* thì ```cantWait()``` cũng phải chờ và "Zero there!" sẽ được in ra sau cùng.

Yeah! Giờ mỗi khi muốn trì hoãn một tác vụ nào đó cho đến khi CS rỗng thì bạn chỉ việc ```setTimeout(cb(), 0)```. Lưu lại nhé, rồi lúc nào đó đem ra hù mấy thằng coder hay lòe các ứng viên mà bạn interview 😆.

Có thể rút ra thêm một điều nữa về bản chất của ```setTimeout```. Nó không ấn định thời gian khi nào tác vụ (callback truyền vào) được thực thi. Nó chỉ đảm bảo sau ít nhất *n* milliseconds thì thực thi tác vụ đó, giống như ví dụ ```setTimeout zero``` không chạy ```cantWait()``` ngay lập tức.

Tất nhiên ngoài ```setTimeout``` thì tất cả các API khác đều hoạt động tương tự với async callback. Ví dụ khi gọi một AJAX request ```myAjaxCall(cb())```, nó sẽ chạy trong cục **WebAPIs** thread riêng của browser chứ không phải JS Engine. Nên cho dù AJAX call đó có chạy mãi không xong, thì các tác vụ khác trong CS vẫn tiếp tục được bốc ra và thực thi.            
Và khi ```myAjaxCall``` xong rồi, ```cb``` lại được push vào CQ, EL dòm thấy CS rỗng thì bốc bỏ vào.

Okay, that's it! Hi vọng bạn đã hiểu Event Loop là cái quái gì rồi.

### Chờ chút, thế cứ callback là chạy async à?

```javascript
// Synchronous
[1,2,3,4].forEach(function(i) {
    console.log(i);
});

// Asynchronous
function asyncForeach(array, cb) {
    array.forEach(function() {
        setTimeout(cb, 0);
    });
}

asyncForEach([1,2,3,4], function(i) {
    console.log(i);
});
```

Okay, nói chung là tùy phạm vi và tùy đối tượng mà với mỗi người thì **callback** có thể là:

- Bất cứ function nào được truyền vào và được gọi trong một function khác.
- Ám chỉ **async** callback sẽ được đưa vào CQ và chờ cho CS rỗng để thực thi.

Trong đoạn code trên, ở phần đầu tiên, function bạn truyền vào ```forEach``` cũng gọi là callback nhưng nó sẽ chạy đồng bộ (sync) trong CS chứ không chờ ai cả. Ngược lại ```cb``` trong ```asyncForeach``` là một **async** callback và sẽ được đưa vào CQ và phải chờ cho đoạn synchronous kia chạy xong, CS rỗng rồi EL sẽ bốc các ```cb``` trong CQ ra để chạy.

Mình nhác tạo ```gif``` quá, mấy bạn [vô đây](http://latentflip.com/loupe/) để visualize ví dụ trên nhé.

### Chưa hết, còn nữa!

UI được browser render một cách mượt mà nhất với con số lý tưởng là 60 fps (như game vậy), tức là cứ khoảng 16.6ms thì vẽ lại màn hình một lần. Nhưng thực tế vì nhiều nguyên nhân khác nhau, render bị ảnh hưởng bởi việc chạy code JavaScript.

Browser không thể gọi ```render()``` nếu có code JS cần chạy trong CS. Kiểu như tự nó là async callback vậy, phải đợi cho CS rỗng mới chạy được. Chỉ khác một chút là ```render()``` được ưu tiên hơn so với các callback thông thường. Cứ mỗi 16ms, một lời gọi ```render()``` sẽ được đưa vào hàng đợi và đến khi CS rỗng thì mới được thực thi.

Nên nếu bạn block CS quá lâu thì UI sẽ bị đơ, user chẳng thể click lên button hay edit text được nữa. Rồi một lúc sau browser sẽ hiện warning [như trên kia](#v-n-c-a-single-threaded). Bùm! mất điểm hoặc thậm chí mất luôn user.

Điều này còn có thể áp dụng cho các platform khác như Windows, Android, iOS... Vì thực tế mọi Graphic hay UI Engine đều chạy single thread. Ta không nên chạy business code trên UI Thread nếu không muốn bị như sau.

![Windows GUI not responding](/p/javascript-tong-quan-ve-engine-runtime-call-stack-va-event-loop/img/ui-not-responding.png "UI not responding")

_Okay, vậy tôi chỉ cần xài async callback là được chứ gì!?_

Hãy suy nghĩ kĩ lại những gì chúng ta tìm hiểu nãy giờ. Async Callback thực tế rồi cũng sẽ đưa vào CS và chạy, và nó hoàn toàn có thể block UI nếu bạn không cẩn thận, đặc biệt là khi xử lý ảnh hay làm animation.

Một ví dụ điển hình là ```scroll handler```.

```javascript
function animateSomething() {
    // something slow
}

window.addEventListener('scroll', animateSomething);
```

Siêu điển hình luôn, mình đã từng bị nhiều lần rồi. Cái ```scroll``` event này được trigger cực nhiều, theo mình (và cả anh Philip Roberts) thì trigger mỗi frame hay 16ms. Nên nếu không xử lý cẩn thận thì UI sẽ giật tung chảo hoặc đơ luôn.

## Lời kết

Dù đã có rất nhiều video và blog cùng topic, nhưng mình hi vọng là sau bài viết này, bạn có thêm vài ý tưởng để optimize code của mình và của team.

Hơn nữa, giữa những rừng framework hay lib mỗi ngày ra vài trăm cái, ta nên dừng lại một chút và tìm về thời nguyên thủy (chứ giờ có Promise, async/await rồi) để hiểu JS hơn những lúc than thở "I hate JavaScript!" 😆.

## References

- [How JavaScript actually work](https://blog.sessionstack.com/how-does-javascript-actually-work-part-1-b0bacc073cf)
- [Philip Roberts: What the heck is Event Loop anyway?](https://www.youtube.com/watch?v=8aGhZQkoFbQ)
- [Loupe: a tool to visualize the JavaScript Runtime at Runtime](http://latentflip.com/loupe/)
- [5 tips on how to write optimized JS code](https://blog.sessionstack.com/how-javascript-works-inside-the-v8-engine-5-tips-on-how-to-write-optimized-code-ac089e62b12e)
- https://kipalog.com/posts/Event-driven-trong-Node-js
- https://www.quora.com/What-is-the-difference-between-javascript-engine-and-javascript-runtime