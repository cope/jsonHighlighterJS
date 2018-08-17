/*
 * JSON Highlighter : Small JSON highlighter for your webpage.
 * http://cope.github.io/jsonHighlighterJS/
 *
 * Licensed under the MIT licenses.
 * (if anyone knows how to change the license on github, please let me know so that I can unlicense it)
 *
 * Inspired by (read: stolen from) http://stackoverflow.com/a/7220510
 * Therefore, all credit goes to Pumbaa80 (http://stackoverflow.com/users/27862/pumbaa80)
 *
 */

var cope = {};
cope.Highlighter = ("undefined" === typeof cope.Highlighter) ? {} : cope.Highlighter;

cope.Highlighter.cssString = "color: darkgreen;";
cope.Highlighter.cssNumber = "color: darkorange;";
cope.Highlighter.cssBoolean = "color: blue;";
cope.Highlighter.cssNull = "color: magenta;";
cope.Highlighter.cssKey = "color: red;";

cope.Highlighter.highlight = function (json, options) {
	var indent = 2, tabs = false;
	if (options) {
		if (options.indent) indent = options.indent;
		if (options.useTabs) tabs = options.useTabs;
	}
	if (typeof json != "string") json = JSON.stringify(json, undefined, (tabs === true ? "\t" : indent));
	else json = JSON.stringify(JSON.parse(json), undefined, (tabs === true ? "\t" : indent));

	json = json.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
	return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
		var style = cope.Highlighter.cssNumber;
		if (/^"/.test(match)) {
			if (/:$/.test(match)) style = cope.Highlighter.cssKey;
			else style = cope.Highlighter.cssString;
		}
		else if (/true|false/.test(match)) style = cope.Highlighter.cssBoolean;
		else if (/null/.test(match)) style = cope.Highlighter.cssNull;

		return "<span style=\"" + style + "\">" + match + "</span>";
	});
};
