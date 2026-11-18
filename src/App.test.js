import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from './redux/store';
import App from './App';

test('renders portfolio page without crashing', () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
  // Verify Vitthal's brand/name or role is in the document
  const nameElement = screen.getAllByText(/Vitthal/i);
  expect(nameElement.length).toBeGreaterThan(0);
});
