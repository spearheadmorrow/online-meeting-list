import React from 'react';
import { Alert, Box, Stack, Text } from '@chakra-ui/react';

import { ButtonPrimary } from './ButtonPrimary';
import { State } from '../helpers/data';

type ResultsProps = {
  count: number;
  state: State;
  toggleTag: (filter: string, value: string, checked: boolean) => void;
};

export function Results({ count, state, toggleTag }: ResultsProps) {
  const filters = Object.keys(state.filters)
    .map(filter =>
      state.filters[filter]
        .filter(tag => tag.checked)
        .map(tag => [filter, tag.tag])
    )
    .flat() as Array<[string, string]>;

  if (count > 0) {
    return (
      <Box>
        <Text fontWeight="semibold">
          {count} result{count === 1 ? '' : 's'}
        </Text>
      </Box>
    );
  }

  return (
    <Alert flexDirection="column" py={4} borderRadius="md">
      <Stack spacing={3} align="center">
        <Box>No results match the selected filters:</Box>
        <Stack direction="row">
          {filters.length ? (
            filters.map(([filter, tag], index) => (
              <ButtonPrimary
                key={index}
                icon="small-close"
                onClick={() => toggleTag(filter, tag, false)}
                text={tag}
                title={`Clear ${filter}: ${tag}`}
              />
            ))
          ) : (
            <Text color="gray.500">
              Try removing some filters or search terms.
            </Text>
          )}
        </Stack>
      </Stack>
    </Alert>
  );
}
