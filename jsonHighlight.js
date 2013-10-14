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
cope.Highlight = ("undefined" === typeof cope.Highlight) ? {} : cope.Highlight;

cope.Highlight.cssString = 'color: darkgreen;';
cope.Highlight.cssNumber = 'color: darkorange;';
cope.Highlight.cssBoolean = 'color: blue;';
cope.Highlight.cssNull = 'color: magenta;';
cope.Highlight.cssKey = 'color: red;';

cope.Highlight.highlight = function (aJSON, aOptions) {
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
		var lStyle = cope.Highlight.cssNumber;
		if (/^"/.test(aMatch)) {
			if (/:$/.test(aMatch)) {
				lStyle = cope.Highlight.cssKey;
			} else {
				lStyle = cope.Highlight.cssString;
			}
		} else if (/true|false/.test(aMatch)) {
			lStyle = cope.Highlight.cssBoolean;
		} else if (/null/.test(aMatch)) {
			lStyle = cope.Highlight.cssNull;
		}
		return '<span style="' + lStyle + '">' + aMatch + '</span>';
	});
};
