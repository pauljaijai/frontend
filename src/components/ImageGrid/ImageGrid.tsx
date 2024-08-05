import styles from './ImageGrid.module.css';

import { Block } from '../../blocks';

type ImageGridProps = {
  data?: Block;
};

export const ImageGrid = (props: ImageGridProps) => {
  return <div className={styles.imageGrid}>Replace me</div>;
};
