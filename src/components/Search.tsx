import React, { ChangeEvent, useRef } from 'react';
import {
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement
} from '@chakra-ui/react';
import { SearchIcon, CloseIcon } from '@chakra-ui/icons';

type Search = {
  setSearch: (search: string[]) => void;
  search: string[];
};

export function Search({ search, setSearch }: Search) {
  const searchField = useRef<HTMLInputElement>(null);
  return (
    <InputGroup borderColor="gray.300">
      <InputLeftElement>
        <SearchIcon color="gray.300" />
      </InputLeftElement>
      <Input
        aria-label="Search"
        placeholder="Search"
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setSearch(
            e.target.value
              .toLowerCase()
              .split(' ')
              .filter(e => e)
          );
        }}
        ref={searchField}
      />
      {!!search.length && (
        <InputRightElement>
          <IconButton
            aria-label="Clear search"
            bg="transparent"
            color="gray.300"
            icon={<CloseIcon />}
            _active={{ bg: 'transparent', color: 'gray.500' }}
            _hover={{ bg: 'transparent', color: 'gray.500' }}
            onClick={() => {
              setSearch([]);
              if (searchField.current) {
                searchField.current.value = '';
                searchField.current.focus();
              }
            }}
          />
        </InputRightElement>
      )}
    </InputGroup>
  );
}
