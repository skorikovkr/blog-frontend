export type TextPostBlock = {
  id: number;
  type: 'text';
  content: string;
};

export type CodePostBlock = {
  id: number;
  type: 'code';
  content: string;
  language?: string;
};

export type ImagePostBlock = {
  id: number;
  type: 'image';
  src?: string;
  ['attached_to']?: string; 
};

export type PostBlock = TextPostBlock | ImagePostBlock | CodePostBlock;