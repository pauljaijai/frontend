import { BrowserRouter as Router } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { getBlocks } from './blocks';

import { Header } from './components/Header/Header';
import { InfoPanel } from './components/InfoPanel/InfoPanel';
import { ImageGrid } from './components/ImageGrid/ImageGrid';

export const App = () => {
  return (
    <Router>
      <Header />
      <main>
        <ImageGrid />
        <InfoPanel />
      </main>
    </Router>
  );
};
