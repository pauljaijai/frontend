import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ImageGrid } from './ImageGrid';
import mockImageBlocks from '../../utils/mock-data/mock-image-blocks';

describe('ImageGrid Component', () => {
  test('- should render images and their descriptions', () => {
    render(
      <Router>
        <ImageGrid imageBlocks={mockImageBlocks} />
      </Router>
    );

    expect(
      screen.getByAltText(mockImageBlocks[0].data.description)
    ).toBeInTheDocument();
    expect(
      screen.getByAltText(mockImageBlocks[1].data.description)
    ).toBeInTheDocument();
  });

  test('- should apply the selected image style when blockId matches', () => {
    render(
      <Router>
        <ImageGrid imageBlocks={mockImageBlocks} />
      </Router>
    );

    const linkElements = screen.getAllByRole('link');
    expect(linkElements[0]).toHaveClass('imageContainer');
    expect(linkElements[1]).toHaveClass('imageContainer');
  });

  test('- should not display images when empty imageBlocks array', () => {
    render(
      <Router>
        <ImageGrid imageBlocks={[]} />
      </Router>
    );

    expect(
      screen.queryByAltText(mockImageBlocks[0].data.description)
    ).not.toBeInTheDocument();
    expect(
      screen.queryByAltText(mockImageBlocks[1].data.description)
    ).not.toBeInTheDocument();
  });
});
