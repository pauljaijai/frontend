import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { App } from './App';
import { useFetch } from './hooks/apis/use-fetch';
import getImageBlocksHelper from './utils/helpers/get-image-blocks';

jest.mock('./utils/helpers/get-image-blocks');
jest.mock('./components/Header/Header', () => ({
  Header: () => <div>Header</div>,
}));
jest.mock('./components/ImageGrid/ImageGrid', () => ({
  ImageGrid: () => <div>ImageGrid</div>,
}));
jest.mock('./components/InfoPanel/InfoPanel', () => ({
  InfoPanel: () => <div>InfoPanel</div>,
}));

jest.mock('./hooks/apis/use-fetch', () => ({
  useFetch: jest.fn(),
}));

describe('App Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders loading state', () => {
    (useFetch as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
    });
    (getImageBlocksHelper as jest.Mock).mockReturnValue([]);

    render(
      <Router>
        <App />
      </Router>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('renders error state', () => {
    const errorMessage = 'Failed to fetch data';
    (useFetch as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      error: errorMessage,
    });
    (getImageBlocksHelper as jest.Mock).mockReturnValue([]);

    render(
      <Router>
        <App />
      </Router>
    );

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  test('renders components when data is loaded', async () => {
    const mockData = { someData: 'test' };
    const mockImageBlocks = [{ id: 1, imageUrl: 'test.jpg' }];
    (useFetch as jest.Mock).mockReturnValue({
      data: mockData,
      isLoading: false,
      error: null,
    });
    (getImageBlocksHelper as jest.Mock).mockReturnValue(mockImageBlocks);

    render(
      <Router>
        <App />
      </Router>
    );

    await waitFor(() => {
      expect(screen.getByText('Header')).toBeInTheDocument();
      expect(screen.getByText('ImageGrid')).toBeInTheDocument();
      expect(screen.getByText('InfoPanel')).toBeInTheDocument();
    });
  });

  test('handles empty image blocks', async () => {
    (useFetch as jest.Mock).mockReturnValue({
      data: {},
      isLoading: false,
      error: null,
    });
    (getImageBlocksHelper as jest.Mock).mockReturnValue([]);

    render(
      <Router>
        <App />
      </Router>
    );

    await waitFor(() => {
      expect(screen.getByText('ImageGrid')).toBeInTheDocument();
      expect(screen.getByText('InfoPanel')).toBeInTheDocument();
    });
  });

  test('handles null data', async () => {
    (useFetch as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      error: null,
    });
    (getImageBlocksHelper as jest.Mock).mockReturnValue([]);

    render(
      <Router>
        <App />
      </Router>
    );

    await waitFor(() => {
      expect(screen.getByText('ImageGrid')).toBeInTheDocument();
      expect(screen.getByText('InfoPanel')).toBeInTheDocument();
    });
    expect(getImageBlocksHelper).not.toHaveBeenCalled();
  });
});
