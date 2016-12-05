RingCentral Fax Custom Cover Page Demos
=======================================

The RingCentral API supports over 10 different fax cover page templates, however, it does not currently support custom cover pages which are available in the RingCentral for Desktop softphone application.

These demos show how to create and use your own custom cover page.

This is done by creating a cover page in your app and then using that as the first attachment in a fax, while also disabling RingCentral provided cover pages.

These demos have the following steps, using the Handlebars template engine:

1. Render the [Handlebars cover page template](ruby/view_coverpage.handlebars)
2. Add it as the first attachment ahead of [others](ruby/asset_file.pdf), while disabling the standard cover page
3. Resulting in [a fax with a custom cover page and body](ruby/asset_output.pdf) (redacted)

## RingCentral Fax API Configuration Parameters

When using these demos, the fax API `coverIndex` parameter should be set to `0` so that no cover page is added.

### Logo example

In the Ruby example, there is an alternate handlebars template that supports embedding logos: `view_coverpage_logo.handlebars`. To use this demo, just reference it in the `.env` file.

Of note, the RingCentral HTML rendering image can render images specified as `src` attributes in the `img` tag but not as [CSS Data URIs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs).

## Adding Your Cover Page

The RingCentral Fax API can accept requests in `multipart/mixed` and `multipart/form-data`. These demos will use `multipart/mixed`.

To do this:

1. Create your own cover page and then add it as as the first MIME part in the request. RingCentral's fax API can support many file types including PDF, DOCX, DOC, HTML, plaintext, etc. For this demo we will use HTML since it provides formatting and does not require complex rendering like PDF. The Handlebars template engine is used because it is supported by many languages and supports some more complex constructs than Mustache.
2. Wrap the cover page HTML in an appropriate part for the language / SDK you are using, e.g. a `RingCentral.SDK.Helper.Attachment` object for C# and a `MIME::Text` object for Ruby.
3. Add the wrapped mime part to the list of attachments in the fax request.

## Demos

* [C#](csharp)
* [Node.js](nodejs)
* [Ruby](ruby)
