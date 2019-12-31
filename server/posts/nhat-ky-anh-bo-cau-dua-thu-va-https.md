# Nhật ký anh bồ câu đưa thư và HTTPS

<p><div class='published'><b>Published:</b> 2018-08-19 17:20:20</div></p>

![the funny carrier pigeon](/p/nhat-ky-anh-bo-cau-dua-thu-va-https/img/carrier_pigeon_1.jpg "the funny carrier pigeon")

...except this book
![the funny carrier pigeon 2](/p/nhat-ky-anh-bo-cau-dua-thu-va-https/img/carrier_pigeon_2.jpg "the funny carrier pigeon 2")

Mã hóa luôn là một đề tài khó để tìm hiểu với vô vàn kiến thức toán học bên trong nó. Nhưng trừ khi bạn đang phải xây dựng một hệ thống mã hóa thực thụ, thì có thể bỏ qua những phần phức tạp đó để nhìn nhận và hiểu một cách tổng thể và khách quan.

Tôi phải nói trước rằng, nếu bạn đang tìm kiếm một bài phân tích đủ rõ ràng để bạn có thể sáng tạo một thứ cao siêu hơn cả HTTPS, thì tôi xin lỗi "nhật ký anh bồ câu" này là không đủ. Còn không thì ngả ghế ra, ăn miếng bánh, uống miếng nước và nhâm nhi câu chuyện hài hước nhảm nhí này.

## Một ngày u ám tháng 3 năm 2000

Alice muốn gửi thư cho người yêu của cô, Bob. Cô ấy mở cửa lồng và tóm lấy tôi, cột lá thư vào chân trái và không quên đút cho vài hạt đậu. Trao tôi một nụ hôn vào đỉnh đầu (riêng cái này tôi nghĩ tôi sẽ không chuyển cho tên Bob đâu), Alice dịu dàng tung kẻ đưa thư này lên không trung.

Sau hơn nửa ngày bay, tôi hơi mệt và ngó nghiêng tìm chỗ nghỉ. Tôi rẽ ngang công viên xem có gì ăn không và lại thấy một cô gái với bịch gì vàng vàng trên tay, hình như đang vẫy vẫy gọi mời.

Mallory đây mà, cô ta là bạn thân của Alice và có vẻ cũng "say" cha Bob. Sao dạo này cô siêng ra công viên vậy? Mà thôi có ăn là được rồi. Tôi sà xuống bịch thóc mặc kệ bàn tay Mallory sờ soạn gãi gãi...

Ê sao bữa nay cô chỉ khoái mỗi cặp giò thôi vậy. Hoặc chỉ là tôi nghĩ như thế.

Ăn no quá nên tôi bay chậm hơn mọi khi. Lúc hạ cánh xuống cửa sổ nhà Bob, hắn có vẻ bực bội vì phải đợi lâu. Oái nhẹ tay cái. Đọc lấy đọc để mẩu giấy xong hắn đứng hình hết 30 giây. Rồi bỗng dưng khóc rống lên đập bàn ghế phóng chén đũa tứ tung.

Sợ quá tôi ù té bay về nhà Alice.

>**Lời tác giả**: Đây là cách HTTP chuyền tải thông tin. Sợ chưa 😨? Đừng bao giờ gửi thông tin quan trọng như bank credential hay credit info qua HTTP. Rất có thể gói tin sẽ bị một Mallory đen tối nào đó chặn lại và sửa đổi trước khi đến trình duyệt của bạn và gây nên một thảm họa.

## Một ngày không mưa không nắng tháng 4 năm 2000

Tôi béo lên 3 lạng vì kể từ ngày ấy Bob và Alice không thư từ qua lại nữa. Hôm nay Alice quyết định đón xe ngựa đến nhà Bob.

Ơ thế cô ấy xách mình theo làm gì nhỉ!

Đến nơi chúng tôi thấy Bob say xỉn nằm giữa nhà và...Mallory(!) cũng nằm an ủi bên cạnh. Chẳng nói chẳng rằng Bob móc túi ra lá thư rồi vò lại ném về phía Alice.

Cô làm gì vậy Mallory(!!), sao lại bay người toan chụp lấy cục giấy đó vậy.

Alice đón lấy và mở ra. Ơ hay cô viết chứ ai mà đọc lại làm gì. Rồi Alice lườm tôi, rồi tôi lườm lại Mallory đang...định ù té chạy ra đường. "Em yêu anh, Bob!", rồi mất dạng luôn. Có vẻ hôm đó cô ta đã giở trò gì với mẩu giấy trong khi tôi bận ăn thóc.

Alice thở dài "Thảo nào dạo gần đây mình qua chơi mà cô ta không có nhà. Anh là đồ ngốc Bob, đến nét chữ của em mà không nhận ra sao.". Nói rồi cô ngồi xuống bàn, viết lại ý hệt lá thư hôm đó, tất nhiên lần này không có sự can thiệp của Mallory. Tôi không có thóc ăn, và không được gãi chân.

Nhưng Bob vẫn nghệch mồm khi cầm bức thư. Vẫn là những ký tự Latinh nhưng chả từ nào có nghĩa cả.

"Từ nay để che mắt cô ta, khi viết chúng ta sẽ dời mỗi chữ cái đi 3 lần".

Dù mồm vẫn nghệch ra nhưng Bob vẫn lắng nghe chăm chú.

"Ví dụ A --> D, B-->E, C-->F. Từ _stupid_ sẽ thành _vwxslg_. Nhưng không phải lần nào cũng dời 3 chữ cái, số lần dời sẽ được ghi góc trái bên dưới của lá thư. Vậy nhé!"

Alice hôn tạm biệt Bob lúc này đã tươi tỉnh hơn, rồi ra về. Trông cô có vẻ hí hửng với mánh khóe mình vừa nghĩ ra để lừa cô bạn thân. Và cũng là tình địch.

>**Lời tác giả**: Đây gọi là **mã hóa đối xứng** (symmetric key cryptography). Nghĩa là nếu bạn biết cách mã hóa (encrypt) thì cũng biết cách dịch ngược (decrypt) thành thông tin gốc ban đầu. Còn mánh khóe của Alice thật ra là một phương thức rất thông dụng: __Caesar cipher__, và số lần dịch chữ cái được gọi là __encryption key__. Trong thực tế, chúng ta hay dùng cách mã hóa hoành tráng hơn, nhưng nói chung ý tưởng là như nhau.
![Caear cipher 3](/p/nhat-ky-anh-bo-cau-dua-thu-va-https/img/caesar-cipher-3.png "Caear cipher 3")

## Một tuần sau chuyến thăm của Alice

..thì tới lược Bob phi trâu đến thăm Alice.

"Mallory lại giở trò trêu anh nữa rồi". Trêu thôi á hả!

Alice lại lườm...Tôi không nhớ là hôm qua có ăn thóc của bạn cô nha. Tôi chỉ ăn đậu đỏ thôi.

Alice lật bức thư Bob đưa ra đọc. Có vẻ cách của cô không qua mặt được Mallory quá lâu. Lần này cô ả thậm chí còn thay đổi số lần dịch chữ cái làm nội dung bức thư loạn cả lên.

>**Lời tác giả**: Màn "trêu đùa" của Mallory là một ví dụ điển hình của Man in the Middle Attack. Một lần nữa, cách duy nhất để tránh bị hack là thay đổi hệ thống mã hóa.

Alice, Bob...và tôi(!) cùng ngồi lại bàn bạc.

"Em sẽ cho anh một vài con bồ câu. Quản gia nhà em đã đồng ý cho đi hai con ông vừa huấn luyện tháng trước."

May quá, không bị chuyển công tác, qua nhà tên ngốc kia thì đói ăn đói uống lắm. Sau đó tôi nghe mang máng được quy trình gửi thư mà Alice đề ra:

- Mỗi lần Bob muốn gửi thư, anh ta sẽ thả một đồng nghiệp của tôi bay tới nhà Alice. Nhưng không đính kèm bức thư.
- Alice gửi trả con bồ câu kèm theo một cái hộp nhỏ có khóa. Nhưng hộp không bị khóa.
- Bob bỏ bức thư vào, khóa hộp lại và thả bồ câu đi.
- Alice nhận cái hộp, mở nó với chìa khóa mà cô giữ và đọc bức thư.

Tương tự như trên nếu Alice muốn gửi thư cho Bob. Tức là mỗi người sẽ có một cái hộp và tự giữ chìa của mình. Tôi thông minh quá.

>**Lời tác giả**: Với cách này Mallory không thể thay đổi nội dung bức thư cho dù vẫn dụ khị được con bồ câu xuống công viên 😁. Mánh lới này của Alice thuộc về **mã hóa bất đối xứng** (asymmetric key cryptography). Tức là kể cả khi bạn biết cách encrypt (Bob khóa cái hộp lại. Có thể liên tưởng rằng đây là loại khóa bấm không cần chìa vẫn khóa được) thì bạn cũng không thể decrypt mở nó (vì Alice giữ chìa). Nói một cách "mã hóa", cái hộp là __public key__ và chìa khóa để mở nó là __private key__.

## Một ngày mưa tháng 4 năm 2000

Lại xảy ra chuyện rồi. Lần này Alice đến gặp Bob rồi hai người đến một quán rượu bí mật để bàn bạc. Có vẻ như Mallory thuê người nằm vùng nghe lén ở nhà hai người họ.

Phương pháp mới của Alice có một lỗ hổng chết người.

Hôm qua tới phiên tôi chạy thư, và như một thói quen tôi lại sà vào túi bột của Mallory. Sao chỉ có mình tôi là bị dụ vậy. Cô ta không thử với mấy tên đồng nghiệp kia à.

Có vẻ Mallory đã tráo chiếc hộp. Teehee!

Cùng bàn chiến lược lần này còn có Ted, bạn thân của Bob và là một người chính trực. Nghe bảo Ted "say" Mallory nên có thể tin cậy người này 🤔.

"Ted làm cho một văn phòng công chứng rất có uy tín ở thành phố. Rất nhiều thương nhân và quý tộc đến xin chữ ký của anh ta trong các cuộc thương thảo và đàm phán."

Bob nhấn mạnh với Alice. Nhưng công chứng với chữ ký thì liên quan gì ở đây?

"Tôi hiểu rồi!". Ted gật đầu rồi cẩn thận lấy hộp mực đỏ từ trong hộp, đổ vào một ít dung dịch mà anh ta gọi là nước sương sớm lấy từ đóa hoa hồng vừa nở.

"Chậc, tôi quên mang theo cây bút lông ngỗng quý giá mất tiêu". Rồi Ted nhìn tôi với quả mặt rất đáng sợ.

Đừng, lông bồ câu không xài được đâu...

Khi tôi sắp cận kề cái chết thì Alice xin đẹp tới cứu "Dùng bút của tôi này".

"Ted chỉ ký và đóng dấu cho hai cái hộp này của chúng ta thôi. Nên Mallory không thể làm giả và thậm chí có tráo hộp thì cũng bị phát hiện ngay." Alice nói và lại lườm nguýt tôi. Tôi vô tội nha.

>**Lời tác giả**: Một câu hỏi nhỏ là tại sao Alice hay Bob không tự ký vào hộp của mình? Câu trả lời rất đơn giản, họ không chuyên nghiệp và xịn bằng Ted trong việc này. Hơn nữa, Mallory là bạn thân của Alice nên cô ta có thể giả chữ ký dễ dàng. Tóm lại, phải cần đến một bên thứ 3 đầy uy tín và tin tưởng để thực hiện việc xác thực. Ted làm việc này không công nhưng trong thực tế, bạn phải trả tiền cho việc duy trì chữ ký HTTPS cho website của mình. Trên đời làm gì có thứ vừa free mà vừa ngon lành đảm bảo. Nếu một ngày xấu trời, bạn thấy chữ HTTPS bị mờ kèm theo dấu chéo màu đỏ thì 96,69% bạn cần phải móc tiền để gia hạn đấy.

>Trong mã hóa, Ted được gọi là một Certification Authority (tạm dịch là Tổ chức chứng nhận). Và trình duyệt bạn đang dùng để đọc bài này được tích hợp sẵn chứng thực (chữ ký và đóng dấu) từ rất nhiều Certification Authorities khác nhau. Vậy, khi bạn connect tới một website lần đầu tiên, bạn  sẽ tin "cái hộp" của site đó. Vì Ted là một CA (Công An 😜), rất nhiều người biết Ted và tin Ted, bạn cũng tin tưởng Ted và Ted nói với bạn rằng "cái hộp" đó là hợp lệ. Nên bạn có thể yên tâm hơn khi nhập tài khoản hay thông tin thẻ tín dụng vào.

## Một ngày u ám cuối tháng 4 năm 2000. Tôi nghỉ hưu

Mallory bỏ cuộc, không thấy cô ta quấy phá nữa và yên phận về một nhà với Ted(!).

Khoan đã, cái này đáng lo đấy, lỡ cô ta chôm con dấu và cây bút gia truyền rồi giả chữ ký sao. Nhưng theo Alice thì quả thật cô ta đã thay đổi không làm phù thủy nữa. Nên có vẻ happy ending được rồi.

Cơ mà đời còn nhiều cái "nhưng" lắm.

Dù gì thì cái hộp cũng khá nặng so với chỉ có mẩu giấy. Và nó càng nặng khi tôi càng già đi 😢. Hôm qua là chuyến bay cuối cùng trước khi tôi về hưu và nằm bẹp trong lồng chờ cơm bưng nước rót thôi.

## Trời đẹp đầu tháng năm năm 2000. Tôi chưa nghỉ hưu được các bạn à

Alice và Bob nghĩ ra một cách để giảm tải cho tôi. Họ quyết định kết hợp 2 mánh khóe cùng một lúc. Tức là họ sẽ nhờ Ted ký vào một cái hộp nhỏ nhẹ hơn rất nhiều, và chỉ đựng trong đó một hạt gạo nhỏ ghi "số lần dịch chữ" để "làm mờ" nội dung bức thư.

Yayy! Vậy là tôi lại có thể tiếp tục hành nghề thêm vài năm nữa rồi.

>**Lời tác giả**: Kết thúc có hậu. Một sự kết hợp hoàn hảo giữa sự tin cậy của __mã hóa bất đối xứng__ và sự hiệu quả gọn nhẹ của __mã hóa đối xứng__. Tuy rắng trong thực tế không có con bồ câu (ý là mạng internet) nào già đi và chậm chạp, thông tin vẫn được truyền tải rất nhanh. Nhưng dù gì đi nữa, sử dụng mã hóa bất đối xứng cho toàn bộ bức thư vẫn chậm hơn so với chỉ cho "số lần dịch chữ cái" (the encryption key).

>HTTPS được công bố chính thức công bố và chỉ định bởi [RFC 2818](https://tools.ietf.org/html/rfc2818) tháng 5 năm 2000. Tức là lúc anh bồ câu viết đoạn cuối của phần nhật ký này 😝.

## Lời kết

Chắc trà bánh cũng đã hết rồi nhỉ, hi vọng các bạn đã hiểu được cách mà HTTPS vận hành (ở mức dễ hình dung). Bài viết được mình "lấy cảm hứng" (dịch kiểu tùy hứng) từ bài gốc [HTTPS explained with carrier pigeons](https://medium.freecodecamp.org/https-explained-with-carrier-pigeons-7029d2193351) khá nổi tiếng với gần 60k lượt claps trên Medium.

Xin chân thành cảm ơn các bạn đã chịu khó đọc đến đây dù câu chuyện mình vẽ ra có hơi nhảm chút so với bài gốc. Nếu một ngày ai đó thắc mắc tại sao có chữ https màu xanh xanh trên thanh url của trình duyệt, hãy đưa cho họ url của bài viết này nhé 😃!