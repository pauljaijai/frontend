import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { InfoPanel } from './InfoPanel';
import { ImageBlock } from '../../types/blocks';
import '@testing-library/jest-dom/extend-expect';
import mockImageBlocks from '../../utils/mock-data/mock-image-blocks';

describe('InfoPanel Component', () => {
  test('- should render block details when a matching block is found', () => {
    render(
      <MemoryRouter initialEntries={['/1']}>
        <InfoPanel blocks={mockImageBlocks} />
      </MemoryRouter>
    );

    expect(screen.getByText('Block info')).toBeInTheDocument();
    expect(screen.getByText(/ID:/)).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText(/Description:/)).toBeInTheDocument();
    expect(screen.getByText('Image 1 description')).toBeInTheDocument();
    expect(screen.getByText(/Dimensions:/)).toBeInTheDocument();
    expect(screen.getByText('800 x 600')).toBeInTheDocument();
    expect(screen.getByText(/Created at:/)).toBeInTheDocument();
    expect(screen.getByText('2024-08-04')).toBeInTheDocument();
  });

  test('- should render an empty panel when no matching block is found', () => {
    render(
      <MemoryRouter initialEntries={['/nonexistent']}>
        <InfoPanel blocks={mockImageBlocks} />
      </MemoryRouter>
    );

    expect(screen.queryByText(/Block info/)).not.toBeInTheDocument();
  });

  test('- should handle missing data', () => {
    const brokenImageBlocks: ImageBlock[] = [
      {
        id: '3',
        type: 'Image',
        options: {
          url: '',
          align: 'center',
          width: '100%',
        },
        data: {
          description: '',
          width: 0,
          height: 0,
          createdAt: '',
        },
      },
    ];

    render(
      <MemoryRouter initialEntries={['/3']}>
        <InfoPanel blocks={brokenImageBlocks} />
      </MemoryRouter>
    );

    expect(screen.getByText(/Block info/)).toBeInTheDocument();
    expect(screen.getByText(/ID:/)).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText(/Description:/)).toBeInTheDocument();

    expect(screen.getByText(/Dimensions:/)).toBeInTheDocument();
    expect(screen.getByText('0 x 0')).toBeInTheDocument();
    expect(screen.getByText(/Created at:/)).toBeInTheDocument();
  });
});
