import { Block } from '../blocks';

export type ImageBlock = Omit<Block, 'options' | 'data'> & {
  type: 'Image';
  options: {
    url: string;
    align: string;
    width: string;
  };
  data: {
    description: string;
    width: number;
    height: number;
    createdAt: string;
  };
};
