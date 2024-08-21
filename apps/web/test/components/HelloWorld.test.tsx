import * as React from 'react';
import { HelloWorld } from '../../src/components/Notes';
import { render } from '../test-util';

describe('<Hello World />', () => {
    it('should render', () => {
        const { getByText } = render(<HelloWorld />);
        expect(getByText('Akiva', { exact: false })).toBeInTheDocument();
    });

    it('should display username', () => {
        const { getByText } = render(<HelloWorld />);
        expect(getByText('test')).toBeInTheDocument();
    });
});
