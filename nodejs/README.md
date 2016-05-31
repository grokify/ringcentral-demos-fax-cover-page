# Custom Cover Page Demo in Node.js

A custom fax cover page can be added by including the cover page as the first attachment and having the fax API not include its own cover page.

The demo shows how to create a custom cover page using HTML and use it with the fax API.

Components of the demo include:

1. Creating and rendering a [HTML template](view_coverpage.handlebars) (using [handlebars.js](https://github.com/wycats/handlebars.js) in this demo) for the cover page.
2. Creating a temporary `cover.html` for the rendered HTML and adding it as the first file attachment for the fax.
3. Seeing the fax `coverIndex` to `0` to represent "None" and not include a RingCentral provided cover page.

Sample files:

1. [Cover Page HTML template](view_coverpage.handlebars)
2. [Fax Attachment](asset_file.pdf)
3. [Fax Demo Output](asset_output.pdf)



## Installation

```
$ git clone https://github.com/grokify/ringcentral-demos-fax-cover-page
$ cd ringcentral-demos-fax-cover-page/nodejs
$ npm install
```


## Configuration

```
cp .env.sample .env
vim .env
```


## Usage

```
node index.js
```
