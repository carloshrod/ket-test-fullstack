import { render } from '@testing-library/react';
import MainProvider from '@/contexts/MainContext';

export const renderWithProvider = component => {
	return render(<MainProvider>{component}</MainProvider>);
};
