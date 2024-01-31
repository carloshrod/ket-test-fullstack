import { render } from '@testing-library/react';
import { useRouter } from 'next/router';
import Home from '@/pages';

jest.mock('next/router', () => ({
	useRouter: jest.fn(),
}));

describe('Home component', () => {
	it('should redirect to /auth/signin', () => {
		const mockPush = jest.fn();
		useRouter.mockImplementation(() => ({
			push: mockPush,
		}));

		render(<Home />);

		expect(mockPush).toHaveBeenCalledWith('/auth/signin');
	});
});
