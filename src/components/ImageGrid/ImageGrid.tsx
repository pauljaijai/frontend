import styles from './ImageGrid.module.css';

import { Link, useRouteMatch } from 'react-router-dom';
import { ImageBlock } from '../../types/blocks';

type ImageGridProps = {
  imageBlocks: ImageBlock[];
};

export const ImageGrid = (props: ImageGridProps) => {
  const { imageBlocks = [] } = props;

  const routMatch = useRouteMatch<{
    blockId: string;
  }>('/:blockId');

  const blockId = routMatch?.params.blockId;

  return (
    <div className={styles.imageGrid}>
      {imageBlocks.map((block) => (
        <Link
          key={block.id}
          to={`/${block.id}`}
          className={styles.imageContainer}
        >
          <img
            src={block.options.url}
            className={[
              styles.image,
              block.id === blockId && styles.imageSelected,
            ].join(' ')}
            alt={block.data.description}
          />
        </Link>
      ))}
    </div>
  );
};
