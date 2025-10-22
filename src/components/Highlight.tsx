import React from 'react';
import Highlighter from 'react-highlight-words';

type HighlightProps = {
  searchWords: string[];
  textToHighlight: string;
};

// Small wrapper with well-typed props that forwards to react-highlight-words.
export function Highlight({ searchWords, textToHighlight }: HighlightProps) {
  // use any for the third-party component to avoid typing mismatch inside the wrapper
  return React.createElement(Highlighter as any, {
    searchWords,
    textToHighlight
  });
}
