# Git cherry pick

<p><div class='published'><b>Published:</b> 2018-09-22 16:40:02</div></p>

Đôi khi chúng ta đơn giản chỉ muốn bốc một hai commit từ branch bỏ vào master, hoặc commit một lúc lên hai branch. Thì mình nghĩ ```git merge``` hay ```git rebase``` đôi khi quá thừa, đôi khi không áp dụng được và đôi khi hơi rắc rối cho những case đó.

Okay, đó là lý do ```git cherry-pick``` ra đời.

Ví dụ khi mình muốn pick một commit để fix một bug trên **branch**, và bỏ vào **master** để fix luôn cho những ai clone project mình về xài.

```armasm
; đang ở branch, view log để tìm id của các commit cần pick
git log --pretty="%h - %s" --since=1.weeks
1. de75952 - + new post: javascript-overview.md
2. 0f3abd0 - ! fixed publish commands
3. af2efd5 - ! fixed deloy commands
4. a2385f0 - Update README.md

; switch sang master
git checkout master

; và cherry-pick thôi
git cherry-pick 0f3abd0 af2efd5

; sau đó push lên server là xong
git push
```

Còn khi muốn commit một lúc cho cả hai branch thì sao.

```armasm
; Đang ở branch experiment1, thực hiện commit
git add -A
git commit -m "Fitch a buck 😆"

; switch qua branch experiment2 và cherry-pick
git checkout experiment2
git cherry-pick experiment1
git push
```

```cherry-pick``` sẽ lấy commit cuối cùng ở branch **experiment1** merge vào branch **experiment2**.

Chừng đó vẫn chưa đủ cho bạn? Hãy vào [official doc](https://git-scm.com/docs/git-cherry-pick) của git để tham khảo thêm nhé.