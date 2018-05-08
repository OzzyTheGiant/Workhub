import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Header from 'components/Header';
const renderer = new ShallowRenderer();

test("Renders Header component properly", () => {
	renderer.render(<Header/>);
	const result = renderer.getRenderOutput();
	expect(result.type).toBe('header');
	expect(result.props.children).toEqual([
		<img src="http://placehold.it/120x35" alt="Workhub Logo"/>,
		<nav>
			<ul>
				<li>Documents</li>
				<li>Log Out</li>
			</ul>
		</nav>
	]);
});