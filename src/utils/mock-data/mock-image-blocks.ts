import { ImageBlock } from '../../types/blocks';

const mockImageBlocks: ImageBlock[] = [
  {
    id: '1',
    type: 'Image',
    options: {
      url: 'http://example.com/image1.png',
      align: 'center',
      width: '100%',
    },
    data: {
      description: 'Image 1 description',
      width: 800,
      height: 600,
      createdAt: '2024-08-04',
    },
  },
  {
    id: '2',
    type: 'Image',
    options: {
      url: 'http://example.com/image2.png',
      align: 'left',
      width: '50%',
    },
    data: {
      description: 'Image 2 description',
      width: 400,
      height: 300,
      createdAt: '2024-08-04',
    },
  },
];

export default mockImageBlocks;
