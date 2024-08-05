import { Block, blocks } from '../../blocks';
import { ImageBlock } from '../../types/blocks';
import getImageBlocksHelper from './get-image-blocks';

describe('getImageBlocksHelper', () => {
  test('- should return an array of imageBlock', () => {
    const imageBlock: ImageBlock = {
      id: '1',
      type: 'Image',
      options: {
        url: 'http://example.com/image.png',
        align: 'center',
        width: '100%',
      },
      data: {
        description: 'An example image',
        width: 800,
        height: 600,
        createdAt: '2024-08-04',
      },
    };

    const result = getImageBlocksHelper(imageBlock);
    expect(result).toEqual([imageBlock]);
  });

  test('- should return an array with multiple ImageBlocks from nested blocks', () => {
    const imageBlock1: ImageBlock = {
      id: '1',
      type: 'Image',
      options: {
        url: 'http://example.com/image1.png',
        align: 'center',
        width: '100%',
      },
      data: {
        description: 'First image',
        width: 800,
        height: 600,
        createdAt: '2024-08-04',
      },
    };

    const imageBlock2: ImageBlock = {
      id: '2',
      type: 'Image',
      options: {
        url: 'http://example.com/image2.png',
        align: 'left',
        width: '50%',
      },
      data: {
        description: 'Second image',
        width: 400,
        height: 300,
        createdAt: '2024-08-04',
      },
    };

    const blockWithChildren: Block = {
      id: '3',
      type: 'Layout',
      children: [imageBlock1, imageBlock2],
    };

    const result = getImageBlocksHelper(blockWithChildren);
    expect(result).toEqual([imageBlock1, imageBlock2]);
  });

  test('- should return an empty array when there are no ImageBlocks', () => {
    const nonImageBlock: Block = {
      id: '1',
      type: 'PlainText',
      data: {
        text: 'This is a plain text block',
      },
    };

    const result = getImageBlocksHelper(nonImageBlock);
    expect(result).toEqual([]);
  });
});
