import { BrowserRouter as Router } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { getBlocks } from './blocks';

import { Header } from './components/Header/Header';
import { InfoPanel } from './components/InfoPanel/InfoPanel';
import { ImageGrid } from './components/ImageGrid/ImageGrid';
import { useFetch } from './hooks/apis/use-fetch';
import { useMemo } from 'react';
import getImageBlocksHelper from './utils/helpers/get-image-blocks';

export const App = () => {
  const { data: block, isLoading, error } = useFetch(getBlocks);

  const imageBlocks = useMemo(() => {
    if (block) return getImageBlocksHelper(block);
    return [];
  }, [block, isLoading]);

  return (
    <Router>
      <Header />
      <main>
        {error && <div>{error}</div>}
        {isLoading && <p>Loading...</p>}
        <ImageGrid imageBlocks={imageBlocks} />
        <InfoPanel blocks={imageBlocks!} />
      </main>
    </Router>
  );
};
