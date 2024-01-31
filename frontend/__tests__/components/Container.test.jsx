import Container from '@/components/layout/Container';
import { render } from '@testing-library/react';

describe('Container component', () => {
	it('should render children correctly', () => {
		const { getByText } = render(
			<Container>
				<div>Test Child</div>
			</Container>,
		);

		expect(getByText('Test Child')).toBeInTheDocument();
	});

	it('should apply correct container styles', () => {
		const { container } = render(
			<Container>
				<div>Test Child</div>
			</Container>,
		);

		const containerElement = container.firstChild;

		expect(containerElement).toHaveClass('container');
		expect(containerElement).toHaveClass('d-flex');
		expect(containerElement).toHaveClass('justify-content-center');
		expect(containerElement).toHaveClass('align-items-center');
		expect(containerElement).toHaveClass('min-vh-100');
	});
});
