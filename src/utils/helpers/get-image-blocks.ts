import { Block } from '../../blocks';
import { ImageBlock } from '../../types/blocks';

const getImageBlocksHelper = (block: Block): ImageBlock[] => {
  const isImageBlock = (block: Block): block is ImageBlock =>
    block.type === 'Image';

  const getImageBlocksFromBlock = (block: Block): ImageBlock[] => {
    const imageBlocks: ImageBlock[] = [];

    if (isImageBlock(block)) {
      imageBlocks.push(block);
    }

    if (block.children) {
      imageBlocks.push(...block.children.flatMap(getImageBlocksFromBlock));
    }

    return imageBlocks;
  };

  const getImageBlocks = (blocks: Block[]): ImageBlock[] =>
    blocks.flatMap(getImageBlocksFromBlock);

  const imageBlocks: ImageBlock[] = getImageBlocks([block]);
  return imageBlocks;
};

export default getImageBlocksHelper;
