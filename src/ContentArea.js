import React from "react";
import assert from "assert";

/**
 * We need to encapsulate arbitrary content into a single 
 * component.
 */
export default class ContentArea extends React.Component {
	/**
	 * @param {object} props  - 
	 * @param {string} props.title - 
	 *		This component assumes that there exists some
	 *		title that this component has to display
	 * @param {array} props.mainContent - 
	 *		This component assumes that there exists some 
	 *		content that the user agent would like to display
	 * @param {string} props.id - 
	 *		We need some unique identifying string for this
	 *		component
	 * @param {boolean} props.isOpen -
	 *		The user agent will this this component if it is open
	 *		or closed
	 * @param {obj} props.qa - 
	 *		We want to provide qa ids to various subcomponents
	 *		so that we can test
	 * @param {string} props.qa.button -
	 *		We assume that there exist a button inside of this 
	 *		component
	 * @param {string} props.qa.content -
	 *		We assume that there exist a content area of this
	 *		component
	 * @param {object} props.styles -
	 *		We want to inject the styles for the markup from the outside.
	 *		This will allow us to control the styles from runtime.
	 * @param {function} props.openContentAreaDelegate -
	 *		The parent element will pass a delegate to this
	 *		component because it expects this component to 
	 *		execute some action when this component detects 
	 *		that the user agent clicked on it.
	 * @param {function} props.closeContentAreaDelegate -
	 *		The parent element will pass a delegate to this
	 *		component because it expects this component to 
	 *		execute some action when this component detects 
	 *		that the user agent clicked on it.
	 *
	 * @example <caption>Sample Input</caption>
	 *	{
	 *		"title": "Section 1",
	 *		"mainContent": [
	 * 		"Lorem ipsum dolor ...",
	 * 		"Lorem ipsum dolor ...",
	 * 		"Lorem ipsum dolor ..."],
	 *		"id": "12345",
	 *		"isOpen": false,
	 *		"qa": {
	 *			"button": "button1",
	 *			"content": "content1",
	 *		}
	 *		"openContentAreaDelegate": function() {
	 *			// do something
	 *		},
	 *		"closeContentAreaDelegate": function() {
	 *			// do something
	 *		}
	 *	}
	 */
	constructor(props) {
		assert(typeof(props) === "object");
		assert(typeof(props.title) === "string");
		assert(Array.isArray(props.mainContent));
		assert(typeof(props.id) === "string");
		assert(typeof(props.qa) === "object");
		assert(typeof(props.styles) === "object");
		assert(typeof(props.openContentAreaDelegate) === "function");
		assert(typeof(props.closeContentAreaDelegate) === "function");

		super(props);

		this.state = {
		};
	}

	/**
	 * We would like to setup the initial state of this component
	 * to whatever the parent component injected through properties.
	 *
	 * @return {void}
	 */
	componentDidMount() {
		this.setState({
			isOpen: this.props.isOpen
		});
	}

	/**
	 *
	 * @return {void}
	 * @param {object} props - see props from constructor
	 */
	componentWillReceiveProps(props) {
		if( this.state.isOpen !== props.isOpen ) {
			this.setState({
				isOpen: props.isOpen
			});
		}
	}

	/**
	 *
	 * @return {void}
	 * @param {object} nextProps - see props from constructor
	 * @param {object} nextState - 
	 */
	shouldComponentUpdate(nextProps, nextState) {
		return nextProps.isOpen !== this.state.isOpen;
	}

	/**
	 * When the user agent clicks on the button, we need to
	 * execute the delegate that the parent component provided
	 * this component
	 * 
	 *	@param {obj} event - 
	 */
	onButtonClick(event) {
		assert(typeof(event) === "object");

		if(this.state.isOpen)
			this.props.closeContentAreaDelegate(this.props.id);
		else
			this.props.openContentAreaDelegate(this.props.id);
	}

	/**
	 *
	 * @return {void}
	 * @example <caption>Sample Markup</caption>
	 *	<content-area>
	 *		<button qa-id="button1" style="..." class="accordion">Button 1</button
	 *		<div qa-id="content1" class="panel">
	 * 		<p>Lorem Ipsum Dolor ...</p>
	 *		</div>
	 *	</content-area>
	 */
	render() {
		let styles = this.props.styles;
		let icon = "+";

		if( this.state.isOpen ) {
			icon = "-";
			styles.accordion.backgroundColor = "#ddd";
			styles.panel.display = "block";
			styles.panel.opacity = 1;
			styles.panel.maxHeight = "500px";

		}

		
		let paragraphs = this.props.mainContent.map((str) => {
			return <p key={Math.random()}>{str}</p>;
		});

		let iconStyle = {
			fontSize: '20px',
			color: "#777",
			float: "right",
			marginLeft: "5px"
		}

		return (
			<content-area>
				<button 
					qa-id={this.props.qa.button}
					onClick={this.onButtonClick.bind(this)}
					style={styles.accordion} 
					className="accordion">
					
					{this.props.title}
					<div style={iconStyle}>{icon}</div>
				</button>
				<div 
					qa-id={this.props.qa.content} 
					style={styles.panel}
					className="panel">
					{paragraphs}
				</div>
			</content-area>
		);
	}
}
