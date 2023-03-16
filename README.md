# WYSIWYG
## [Try Me](https://fakerybakery.github.io/WYSIWYG)
A simple visual editor for modern writers in Vanilla JS, CSS, and HTML with 0 dependencies.
## Installation
### Via CDN
Add the following lines to your `head` tag:
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/fakerybakery/WYSIWYG@main/wysiwyg.min.css">
<script src="https://cdn.jsdelivr.net/gh/fakerybakery/WYSIWYG@main/wysiwyg.min.js"></script>
```
### Manually
Download the sources and include the files.

## Usage
Make a textarea or input field
```html
<textarea id="textarea"></textarea>
<input id="input"></input>
```
Initialize the editor
```js
new WYSIWYG(document.getElementById('textarea'));
new WYSIWYG(document.getElementById('input'));
```
&copy; 2023 mrfakename. All rights reserved.
