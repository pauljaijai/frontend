import { useRouteMatch } from 'react-router-dom';
import styles from './InfoPanel.module.css';

import { ImageBlock } from '../../types/blocks';

type InfoPanelProps = {
  blocks: ImageBlock[];
};

export const InfoPanel = (props: InfoPanelProps) => {
  const { blocks } = props;
  const routMatch = useRouteMatch<{
    blockId: string;
  }>('/:blockId');

  const blockId = routMatch?.params.blockId;

  const foundBlock = blocks.find((d) => d.id === blockId);
  if (!foundBlock) return <aside className={styles.panel}></aside>;

  const { description, width, height, createdAt } = foundBlock.data;

  return (
    <aside className={styles.panel}>
      <h2 className={styles.heading}>Block info</h2>
      <dl>
        <dt className={styles.title}>ID:</dt>
        <dd className={styles.details}>{foundBlock.id}</dd>

        <dt className={styles.title}>Description:</dt>
        <dd className={styles.details}>{description}</dd>

        <dt className={styles.title}>Dimensions:</dt>
        <dd className={styles.details}>
          {width} x {height}
        </dd>

        <dt className={styles.title}>Created at:</dt>
        <dd className={styles.details}>{createdAt}</dd>
      </dl>
    </aside>
  );
};
