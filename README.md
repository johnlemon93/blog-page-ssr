# Blog Page SSR
Blog Page SSR is a static blog engine can be hosted on static file servers such as Github Pages.
It was built with ReactJS using Server Side Rendering and some preload techniques.

## Live demo
Check out the [live demo here](https://blogchanhday.com)

## What makes this blog engine cool?
- It is super fast and lightweight
- No installation required
- Easy to customize with changes in component level since it was built with ReactJS
- Made for Github Pages: free, fast, simple
- More nice features will come (I don't promise but if you press ★ they will come :D)


## How to use?

### Run locally
1. Clone this project to your computer
2. Open your Command Line (**cmd** on Windows or **Terminal** on MacOs) and point to the project folder
3. Run ```npm update``` to get all required packages
4. Run ```npm preview``` (make sure you have installed **Create React App** tool, if not please run ```npm install create-react-app``` first)
5. The blog is now available at http://localhost:3080/

### Use with Github Pages

1. Create your Github Pages by creating a repository under the name ```<your-github-user-name>.github.io```
2. Clone that repository to your computer. Then modified the path in *server/deploy.js*
3. Run ```npm deploy``` to copy the content generated from CRA tool and ```npm preview``` in **build** folder to your blog repository
4. Navigate the directory in step 2 and check in the files to Github Pages.
5. Now your blog page and posts are online at https://your-github-user-name.github.io

Every time you want to write, create a new *.md file in *server/posts* folder and write with your favorite Markdown Editor.    
After that, Add your post to the list in *public/publish.json* then run ```npm preview``` and ```npm deloy``` to publish.

## How to customize?

I have not creating configuration yet. Because I hate configuration (I mean I'm lazy 😂).
So most of customization will be done by modifying the sources (.js, .css...)

### Change theme of code highlighting
I'm using [highlight.js](https://github.com/highlightjs/highlight.js) for code highlighting. You can change the theme by replace my favorite one in *src/index.css* then rebuild the source.

```css
@import '../node_modules/highlightjs/styles/tomorrow.css';
```

### Change font family, color, size...

You can use your favorite font by replace mine in *public/index.html*
```html
<link href="https://fonts.googleapis.com/css?family=Inconsolata:400,700&amp;subset=latin-ext,vietnamese" rel="stylesheet">
```
and font-size, color... in *src/index.css*
```css
* {
    font-family: inconsolata, monospace;
    font-size: 16px;
}
```
### Comment
The comment function was built using firebase, so you can create your own app/database then replace your firebase info in *src/database/fire.js*

```javascript
var config = {
    apiKey: "your api key",
    authDomain: "your auth domain",
    databaseURL: "your database url",
    projectId: "your project id",
    storageBucket: "your storage bucket",
    messagingSenderId: "your messaing sender id"
  };
```
Be noticed that there is no notification yet. Someday I will try to fight with laziness and implement that feature 😄.     
If you want another comment method, feel free to change the code in *Comment* component at *src/components/pages/post/comment*.

### Google Analytics
Change your GA id in *src/components/common/GoogleAnalytics.js* at line 55.

### Insert your Social links
There are some social links in ```footer```, you can put yours by modifying *src/components/layout/Footer/index.js*

# References
[AzerothJS](https://github.com/huytd/azeroth-js)

# License
[MIT](https://opensource.org/licenses/MIT)
