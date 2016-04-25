
export default class Stubs {
	static items() {
		let content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam gravida pulvinar ligula, eu mattis magna aliquet eget. Phasellus ut odio vitae risus scelerisque tristique. Duis lacinia, tortor in porta porta, tortor ipsum vestibulum nisi, in interdum leo ipsum in massa. Nunc sed dignissim mauris. Praesent eget velit scelerisque, mattis dolor ut, facilisis lacus. Nunc et elementum nisl. Sed convallis fermentum justo, ac viverra ligula faucibus eu.";

		let item1 = {
			"title": "Section 1",
			"content": [content],
			"id": "1234",
			"qa": {
				"button": "button1",
				"content": "content1"
			},
			"isOpen": false
		};

		let item2 = {
			"title": "Section 2",
			"content": [content, content],
			"id": "1235",
			"qa": {
				"button": "button2",
				"content": "content2"
			},
			"isOpen": false
		};

		let item3 = {
			"title": "Section 3",
			"content": [content, content, content],
			"id": "1236",
			"qa": {
				"button": "button3",
				"content": "content3"
			},
			"isOpen": false
		};

		let items = [item1, item2, item3];

		return items;
	}
}
