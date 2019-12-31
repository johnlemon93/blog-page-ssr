# i++ và ++i
<p><div class='published'><b>Published:</b> 2018-06-22 20:20:20</div></p>

Mình nhớ hồi phỏng vấn vào cty, có một bài test code về vòng lặp, cái ```for``` nào mình cũng xài ```++i```. Sếp thắc mắc 2 3 lần sao không dùng ```i++``` nhưng mình cứ vòng vo là "it's faster but I forgot the reason". May sao lão sếp hình như cũng chả biết câu trả lời nên tự ái mà cho mình pass 😂. Cơ mà mãi đến bây giờ ngồi hồi tưởng lại mà mình cũng chưa nhớ ra cái nguyên nhân đó, nên tối về hỏi lại gugo-sama ngay và viết bài này.

## Điểm khác biệt
Khác biệt cơ bản này áp dụng cho hầu hết các ngôn ngữ và compiler hiện nay.
```C++
int a=0, b=0;
a++; // a = 1
++b; // b = 1
b = ++a; // b = a = 2
a = b++; // a = 2, b = 3
``` 
```++i``` tăng giá trị của **i** lên 1 và trả về giá trị mới đó.<br> 
```i++``` cũng tương tự nhưng giá trị trả về là giá trị ban đầu của **i** trước khi được tăng lên 1.

Một điểm đáng lưu ý ở đây, không nên nhầm lẫn là ```i++``` sẽ trả về giá trị **i** cho phép gán trước khi nó được tăng lên. Phép gán luôn thực hiện sau cùng, nên điều đó là không thể nhé.

Về bản chất chương trình sẽ tạo ra một biến tạm (temp) để lưu giá trị ban đầu của **i** và trả về giá trị đó cho phép gán sau khi phép toán ```i++``` thực hiện xong.
```C++
int MePlusPlus(int& me) 
{
    int temp = me;
    me = me + 1;
    return temp;
}
```
## Performance
Tuy phải tốn công tạo một biến temp cho ```i++``` nhưng thực tế sự khác biệt về performance là không lớn. Hầu như tất cả compiler hiện đại sẽ optimize phép toán đó. Bằng chứng là trong ví dụ [này](https://stackoverflow.com/questions/24886/is-there-a-performance-difference-between-i-and-i-in-c/24887#24887) trên stackoverflow, **gcc** cho kết quả biên dịch là như nhau cho hai file code chứa vòng lặp xài ```++i``` và ```i++```.

Nhưng riêng với ```C++```, sự chênh lệch có thể là đáng kể trong một số trường hợp. Cụ thể là với user-defined type, tức là ```class``` bạn tạo ra, vì ```operator++()``` là một hàm và compiler không biết làm cách nào để optimize việc tạo ra cái temp object trong đó cả. Sao nó biết được bạn define cái gì và sẽ bự cỡ nào trong class.
## Vậy nên xài cái nào trong vòng ```for```?
Riêng đối với mình thì ```++i``` đã trở thành một convention bất thành văn rồi. Dù chiến project nào mình cũng xài nó mà chả quan tâm performance gì cho mệt óc. Rất nhiều guru trong giới coder đều đưa ra lời khuyên:
>In any case, follow the guideline "prefer ++i over i++" and you won't go wrong 

(from many Khuyết Danh)
 
## Một chút về side effect và undefined behavior
### Ví dụ 1:
```C++
int add(int x, int y)
{
    return x + y;
}
 
int main()
{
    int x = 5;
    // tùy thuộc vào thứ tự evaluate các param của conmpiler
    // mà phép cộng này có thể là 5+6 hoặc 6+6
    int value = add(x, ++x); 
 
    std::cout << value; // 11 or 12?
    return 0;
}
```
### Ví dụ 2:
```C++
int main()
{
    int arr[3] = {0, 1, 2};
    int i = 0;

    arr[i++] = ++i;
    int x = ++i + ++i;

    std::cout << arr[i] << endl;
    std::cout << x; 
    return 0;
}
```

Mình sẽ không giải thích "Side effect hay UB là gì?" ở đây. Topic này cũng khá thú vị nên mình sẽ viết riêng một bài về nó. Nhưng qua hai ví dụ trên chắc bạn cũng thấy được sự nguy hiểm của chúng, nếu phép gán thứ nhất ở ví dụ 2 mà trong vòng lặp nữa thì 😨.

Hẹn gặp các bạn ở những bài viết sau!
