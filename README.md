jsonHighlighterJS
=============

<b>Javascript JSON Highlighter</b>

Inspired by (read: stolen from) [Stackoverflow: JSON pretty print using JavaScript](http://stackoverflow.com/a/7220510).

Therefore, all credit goes to [Pumbaa80](http://stackoverflow.com/users/27862/pumbaa80).

Try it on [jsfiddle](http://jsfiddle.net/EVHKs/3/).  
*(fails in Chrome due to the "MIME type" error, but seems to work fine in FF 24)*


Usage:

html:

    <head>
      ...
      <script type="text/javascript" src="js/jsonHighlighter.min.js"></script>
    </head>
    <body>
      ...
      <pre id="HighlightOutput"></pre>
    </body>

javascript:

    var out = document.getElementById("out");
    out.innerHTML = cope.Highlight.highlight(jsonObject); // jsonObject is a regular JS object
    ...
    out.innerHTML = cope.Highlight.highlight(jsonString); // jsonString is a valid JSON String

with jQuery:

    var out = $("#out");
    out.html(cope.Highlight.highlight(jsonObject); // jsonObject is a regular JS object
    ...
    out.html(cope.Highlight.highlight(jsonString); // jsonString is a valid JSON String

Options (optional):
* indent: indentation
* useTabs: use tab delimiter

Indent:

    out.innerHTML = cope.Highlight.highlight(jsonObject, {indent: 3}); // set indentation to 3 space characters

Tabs: (useTabs:true overrides indent)

    out.innerHTML = cope.Highlight.highlight(jsonObject, {indent: 3, useTabs: true}); // use tabs for indentation
