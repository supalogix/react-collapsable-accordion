class OpenContentAreaStyle {
	getStyle() {
		var styles = {
			"accordion": {
				"backgroundColor": "#eee",
				"color": "#444",
				"cursor": "pointer",
				"padding": "18px",
				"width": "100%",
				"textAlign": "left",
				"border": "none",
				"outline": "none",
				"transition": "0.4s"
			},
			"panel": {
				"padding": "0 18px",
				"backgroundColor": "white",
				"display": "none",

				"maxHeight": 0,
				"overflow": "hidden",
				"transition": "0.6s ease-in-out",
				"opacity": 0
			}
		};

		console.log("closed");

		return styles;
	}
}

class ClosedContentAreaStyle {
	getStyle() {
		var styles = {
			"accordion": {
				"backgroundColor": "#eee",
				"color": "#444",
				"cursor": "pointer",
				"padding": "18px",
				"width": "100%",
				"textAlign": "left",
				"border": "none",
				"outline": "none",
				"transition": "0.4s"
			},
			"panel": {
				"padding": "0 18px",
				"backgroundColor": "white",
				"display": "none",

				"maxHeight": 0,
				"overflow": "hidden",
				"transition": "0.6s ease-in-out",
				"opacity": 0
			}
		};

		console.log("closed");

		return styles;
	}
}

export default class ContentAreaStyleContext {
	constructor() {
		this.states = [
			new OpenContentAreaStyle(),
			new ClosedContentAreaStyle()
		];
	}

	/**
	 *	We need the caller to tell us the state of 
	 *	the component so that we know what to render.
	 *
	 * @param {string} state -
	 *		We expect the caller to pass either the string
	 *		"open" or "closed".
	 */
	getStyle(state) {
		if(state === "open")
			return this.states[0];

		return this.states[1];
	}
}

