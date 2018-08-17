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

var cope = {
	Highlighter: {
		cssString: "color: darkgreen;",
		cssNumber: "color: darkorange;",
		cssBoolean: "color: blue;",
		cssNull: "color: magenta;",
		cssKey: "color: red;"
	}
};

cope.Highlighter.match = function (match) {
	var style = cope.Highlighter.cssNumber;

	var styles = [
		{test: /true|false/.test(match), style: cope.Highlighter.cssBoolean},
		{test: /null/.test(match), style: cope.Highlighter.cssNull},
		{test: /^"/.test(match) && /:$/.test(match), style: cope.Highlighter.cssKey},
		{test: /^"/.test(match) && !(/:$/.test(match)), style: cope.Highlighter.cssString}
	];

	for (var s of styles) {
		if (s.test === true) {
			style = s.style;
			break;
		}
	}

	// if (/^"/.test(match)) {
	// 	if (/:$/.test(match)) style = cope.Highlighter.cssKey;
	// 	else style = cope.Highlighter.cssString;
	// }
	// else if (/true|false/.test(match)) style = cope.Highlighter.cssBoolean;
	// else if (/null/.test(match)) style = cope.Highlighter.cssNull;

	return "<span style=\"" + style + "\">" + match + "</span>";
};

cope.Highlighter.fixOptions = function (options) {
	if (!options.indent) options.indent = 2;
	options.useTabs = true === options.useTabs;
	return options;
};

cope.Highlighter.fixJSON = function (json) {
	return (typeof json === "string") ? JSON.parse(json) : json;
};

cope.Highlighter.highlight = function (json, options) {
	json = cope.Highlighter.fixJSON(json);
	options = cope.Highlighter.fixOptions(options);

	var tabs = options.useTabs;
	var indent = options.indent;

	json = JSON.stringify(json, null, (tabs === true ? "\t" : indent));
	json = json.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
	return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, cope.Highlighter.match);
};
