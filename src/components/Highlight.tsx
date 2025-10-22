import React from 'react';
import Highlighter from 'react-highlight-words';

type HighlightProps = {
  searchWords: string[];
  textToHighlight: string;
};

export function Highlight({ searchWords, textToHighlight }: HighlightProps) {
  return React.createElement(Highlighter as any, {
    searchWords,
    textToHighlight
  });
}
