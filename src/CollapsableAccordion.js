import React from "react";
import ContentArea from "./ContentArea";
import Stubs from "./services/Stubs";

export default class CollapsableAccordion extends React.Component {
	/**
	 *
	 * @param {object} props -
	 *		We don't do anything with props
	 */
	constructor(props) {
		super(props);

		this.state = {
			items: Stubs.items()
		};
	}

	/**
	 *	We need a delegate to pass to components when they
	 *	need to open. This delegate will change the internal
	 *	state so that this component knows to redraw all 
	 *	the children.
	 *
	 * @param {string} key -
	 *		By design, react uses a key to identify components.
	 *		We make each delegate to pass their key as a parameter
	 *		so that this component can redraw itself properly
	 */
	openContentAreaDelegate(key) {
		let items = this.state.items.map((item) => {
			if(item.id === key)
				item.isOpen = true;

			return item;
		});

		this.setState({
			items: items
		});
	}

	/**
	 *	We need a delegate to pass to components when they
	 *	need to cloase. This delegate will change the internal
	 *	state so that this component knows to redraw all 
	 *	the children.
	 *
	 * @param {string} key -
	 *		By design, react uses a key to identify components.
	 *		We make each delegate to pass their key as a parameter
	 *		so that this component can redraw itself properly
	 */
	closeContentAreaDelegate(key) {
		let items = this.state.items.map((item) => {
			if(item.id === key)
				item.isOpen = false;

			return item;
		});

		this.setState({
			items: items
		});
	}

	/**
	 *
	 * @example <caption>Sample Markup</caption>
	 *	<collapsable-accordion>	
	 *		<content-area>
	 *			<button style="" class="accordion">Button 1</button
	 *			<div class="panel">
	 * 			<p>Lorem Ipsum Dolor ...</p>
	 *			</div>
	 *		</content-area>
	 *		<content-area>
	 *			<button style="" class="accordion">Button 2</button
	 *			<div class="panel">
	 * 			<p>Lorem Ipsum Dolor ...</p>
	 *			</div>
	 *		</content-area>
	 *		...
	 *	</collapsable-accordion>	
	 */
	render() {
		return(
			<collapsable-accordion>
				{this.contentAreas}
			</collapsable-accordion>
		);
	}

	/**
	 *
	 *	@return {array} 
	 */
	get contentAreas() {
		let self = this;
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


		let doms = this.state.items.map( (item) => {
			return <ContentArea 
				openContentAreaDelegate={self.openContentAreaDelegate.bind(this)}
				closeContentAreaDelegate={self.closeContentAreaDelegate.bind(this)}
				qa={item.qa}
				title={item.title}
				styles={styles}
				mainContent={item.content}
				key={item.id}
				id={item.id}
				isOpen={item.isOpen} />
		});

		return doms;
	}
}

