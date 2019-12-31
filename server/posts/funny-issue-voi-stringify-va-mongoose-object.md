# Funny issue với JSON.stringify và Mongoose object

<p><div class='published'><b>Published:</b> 2018-10-28 19:19:18</div></p>

![Intro pic!](/p/funny-issue-voi-stringify-va-mongoose-object/img/intro.png "Intro pic!")

Thật ra `Mongooose object` cũng có lúc cầm bó hoa, nhưng phần lớn thời gian hắn chỉ cầm cục gạch thôi. Cho nên cũng không phải là không may mà thằng cu H team tôi mới bị phang gạch vào đầu.

## Mở đầu

Tôi, một thằng mới chuyển từ .NET sang NodeJS, đang bù đầu với cái bug thì thằng cu trong team vác mặt qua nhờ:

- "Anh ơi xem giúp em với, sao data debug trên server với data trả về ở client lại khác nhau thế này?!"

### object `result` debug trên server trước khi gọi `res.json(result)`

```json
[
    {
        "_id": "121qwdas151asd123",
        "name": "The coffee house",
        "address": "Tran Phu, Hai Chau, Da Nang",
        "phone": "0905246357",
        ...
        "views": "55",
        "likes": "90",
        "comments": "22",
        "conversionRate": "0.4"
    }
]
```

### data trả về dưới webview sau khi gửi `get` request

```json
[
    {
        ...
        "views": "55",
        "likes": "90",
        "comments": "22"
        ??? 404 conversionRate mất tiêu
    }
]
```

Sau 30s debug bên Node tôi quở nó:

- "Mày coi lại bên webview có filter hay xử lý data sai chỗ nào không?"

## Nửa tiếng sau

Xong task rồi quay qua thấy nó vẫn làm mặt 😢 thiểu não.

- "Chưa ra luôn hả cu. Thôi xê ra để anh coi cho!!".

### Đầu tiên tôi bật Postman lên, test xem bên service trả về đúng không.

Ủa vẫn miss cái field nó cần.

```js
[
    {
        ...
        ??? 404 conversionRate vẫn mất tiêu
    }
]
```

### OK sorry thằng em, code bên Node của mày có vấn đề

```js
route.get("/providers/:category", (req, res, next) => {
    const category = req.params.category;
    ProviderService.getProvidersByCategory(category)
        .then(result => {
            const data = calculateConversionRate(result.data);
            res.json(data);
        });
});

function calculateCoversionRate(providers) {
    providers.foreach(provider => {
        const {visits, views, comments} = provider;
        provider.conversionRate = 
            visits / (views + comments) * Constants.factor;
    });

    return providers;
}
```

Ủa có vấn đề gì đâu ta?? Tôi bắt đầu thử:

1. Copy content của `data` ra một biến string, rồi `res.json()`. Chạy đúng, OK vậy chả có ký tự gì đặc biệt đến nỗi không serialize được.
2. Nhìn mãi chả biết lỗi ở đâu. Tôi đổi tên `conversionRate` thành `stupidRate`. Failed!
3. Sau 5 phút suy nghĩ, thay vì add field mới, tôi update field `phone` của object thành giá trị của `conversionRate` rồi gọi `res.json()`. Thấy trên Postman lẫn browser đều có giá trị đó trong field `phone` 😵.

Ngẫm nghĩ một hồi... Từ lúc query database đến chỗ `res.json()` thì mọi thứ vẫn đúng. Tôi dừng debug, tìm official doc của **Express** đọc.

> ### res.json([body])
>Sends a JSON response. This method sends a response (with the correct content-type) that is the parameter converted to a JSON string using [JSON.stringify()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify).

### Ok ta đã có manh mối mới: `JSON.stringify()`

Tôi thử lại 3 cases trên với hàm `JSON.stringify()`. Kết quả vẫn thế.

Hmm, lên đọc doc của nó thôi 😣.

>`JSON.stringify()` converts a value to JSON notation representing it:
>- If the value has a `toJSON()` method, it's responsible to define what data will be serialized.

À THÔI ĐÚNG RỒI! Chính nó. Mà khoan, không nên mừng vội, thử phát.

![toJSON spot!](/p/funny-issue-voi-stringify-va-mongoose-object/img/toJSON-spot.png "toJSON spot!")

## Giờ mừng được rồi!

Vậy sau gần tiếng rưỡi mò mẫm ngu người do không chịu coi docs sớm, thủ phạm đã lòi đuôi.

Thằng cu H nó return thẳng object của Mongoose 😫. Nên khi serialize để trả về client:

- `res.json()` convert object thành chuỗi JSON đó bằng `JSON.stringify()`
- Thằng stringify thấy object đó của Mongoose có define hàm `toJSON()`
- Có vẻ hàm `toJSON()` của Mongoose chỉ trả về những field đã define lúc tạo model bằng `mongoose.Schema`.
- Nên có debug với thử trời đi nữa thì cái field `conversionRate` vẫn mất tiêu.

OK! Thằng cu H ăn nguyên cục gạch như vậy đấy.

## Giải pháp

Best practice là chỉ trả về những thứ mà client cần thôi. Không phải tự nhiên mà người ta khuyên nên dùng **dto** tức *data transfer object*.

```js
    class ProviderDTO {
        constructor(provider) {
            this.id = provider._id_;
            this.name = provider.name;
            // ...
            this.conversionRate = calculateConversionRate(provider);
        }
    }

    route.get("/providers/:category", (req, res, next) => {
        const category = req.params.category;
        ProviderService.getProvidersByCategory(category)
            .then(result => {
                const data = result.data.map(provider =>
                    new ProviderDTO(provider));
                res.json(data);
            });
    });
```

## Lời kết

Bài học rút ra:

- Follow best practices sẽ giúp ta tránh những lỗi ngớ ngẩn trên.
- Nên đọc docs và hiểu bản chất vấn đề trước khi bay vào debug và thử này kia một cách bâng quơ như tui.
- Javascript si đa thật, nhưng không liên quan gì đến issue này.

Thằng cu H trả lại a hơn tiếng rưỡi cuộc đời mau 😤!

p/s: Thêm 1 tiếng đồng hồ ngồi viết bài này nữa.