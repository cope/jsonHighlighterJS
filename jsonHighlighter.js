/*
 * JSON Highlight : Small JSON highlighter for your webpage.
 * http://github.com/cope/jsonHighlight/
 *
 * Licensed under the MIT licenses.
 *
 * Inspired by (read: stolen from) http://stackoverflow.com/a/7220510
 * Therefore, all credit goes to Pumbaa80 (http://stackoverflow.com/users/27862/pumbaa80)
 *
 */

cope = ("undefined" === typeof cope) ? {} : cope;
cope.Highlighter = ("undefined" === typeof cope.Highlighter) ? {} : cope.Highlighter;

cope.Highlighter.cssString = 'color: darkgreen;';
cope.Highlighter.cssNumber = 'color: darkorange;';
cope.Highlighter.cssBoolean = 'color: blue;';
cope.Highlighter.cssNull = 'color: magenta;';
cope.Highlighter.cssKey = 'color: red;';

cope.Highlighter.highlight = function (aJSON, aOptions) {
	var indent = 2, useTabs = false;
	if(aOptions) {
		if(aOptions.indent) {
			indent = aOptions.indent;
		}
		if(aOptions.useTabs) {
			useTabs = aOptions.useTabs;
		}
	}
	if (typeof aJSON != 'string') {
		aJSON = JSON.stringify(aJSON, undefined, (useTabs === true ? "\t" : indent));
	} else {
		aJSON = JSON.stringify(JSON.parse(aJSON), undefined, (useTabs === true ? "\t" : indent));
	}

	aJSON = aJSON.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
	return aJSON.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (aMatch) {
		var lStyle = cope.Highlighter.cssNumber;
		if (/^"/.test(aMatch)) {
			if (/:$/.test(aMatch)) {
				lStyle = cope.Highlighter.cssKey;
			} else {
				lStyle = cope.Highlighter.cssString;
			}
		} else if (/true|false/.test(aMatch)) {
			lStyle = cope.Highlighter.cssBoolean;
		} else if (/null/.test(aMatch)) {
			lStyle = cope.Highlighter.cssNull;
		}
		return '<span style="' + lStyle + '">' + aMatch + '</span>';
	});
};
