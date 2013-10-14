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
cope.json = ("undefined" === typeof cope.json) ? {} : cope.json;
cope.json.Highlight = ("undefined" === typeof cope.json.Highlight) ? {} : cope.json.Highlight;

cope.json.Highlight.cssString = 'color: darkgreen;';
cope.json.Highlight.cssNumber = 'color: darkorange;';
cope.json.Highlight.cssBoolean = 'color: blue;';
cope.json.Highlight.cssNull = 'color: magenta;';
cope.json.Highlight.cssKey = 'color: red;';

cope.json.Highlight.highlight = function (aJSON, aUseTab) {
	if (typeof aJSON != 'string') {
		aJSON = JSON.stringify(aJSON, undefined, (aUseTab && aUseTab === true ? "\t" : 2));
	} else {
		aJSON = JSON.stringify(JSON.parse(aJSON), undefined, (aUseTab && aUseTab === true ? "\t" : 2));
	}

	aJSON = aJSON.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
	return aJSON.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (aMatch) {
		var lStyle = cope.json.Highlight.cssNumber;
		if (/^"/.test(aMatch)) {
			if (/:$/.test(aMatch)) {
				lStyle = cope.json.Highlight.cssKey;
			} else {
				lStyle = cope.json.Highlight.cssString;
			}
		} else if (/true|false/.test(aMatch)) {
			lStyle = cope.json.Highlight.cssBoolean;
		} else if (/null/.test(aMatch)) {
			lStyle = cope.json.Highlight.cssNull;
		}
		return '<span style="' + lStyle + '">' + aMatch + '</span>';
	});
};
