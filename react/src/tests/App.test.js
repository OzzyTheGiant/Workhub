import React from 'react';
import ReactDOM from 'react-dom';
import ShallowRenderer from 'react-test-renderer/shallow';
import App from 'components/App';
import Header from 'components/Header';
import ModuleContainer from 'components/ModuleContainer';
import DocumentModule from 'components/DocumentModule';
const renderer = new ShallowRenderer();

it('renders without crashing', () => {
  	const div = document.createElement('div');
	ReactDOM.render(<App />, div);
  	ReactDOM.unmountComponentAtNode(div);
});

test('renders all required components', () => {
	renderer.render(<App />);
	const result = renderer.getRenderOutput();
	expect(result.type).toBe('div');
	expect(result.props.children).toEqual([
		<Header />,
		<ModuleContainer title="Documents">
			<DocumentModule />
		</ModuleContainer>
	]);
});
