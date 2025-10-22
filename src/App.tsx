import React, { useState } from 'react';
import { Box, Grid, ChakraProvider, extendTheme } from '@chakra-ui/react';
import InfiniteScroll from 'react-infinite-scroller';

import { Filter } from './components/Filter';
import { Loading } from './components/Loading';
import { Meeting } from './components/Meeting';
import type { Meeting as MeetingType } from './components/Meeting';

import { Results } from './components/Results';
import {
  dataUrl,
  meetingsPerPage,
  releasePkgInfo as release
} from './helpers/config';
import { load, State } from './helpers/data';
import { filter } from './helpers/filter';
import { setQuery } from './helpers/query';

const InfiniteScrollAny = InfiniteScroll as unknown as any;

export default function App() {
  const [state, setState] = useState<State>({
    filters: {
      Days: [],
      Times: [],
      Formats: [],
      Types: []
    },
    limit: meetingsPerPage,
    loading: true,
    meetings: [],
    search: [],
    timezone: ''
  });

  const toggleTag = (filter: string, value: string, checked: boolean): void => {
    state.filters[filter].forEach(tag => {
      if (tag.tag === value) {
        tag.checked = checked;
      } else if (['days', 'formats'].includes(filter)) {
        tag.checked = false;
      }
    });

    setState({ ...state });
  };

  if (state.loading) {
    fetch(dataUrl)
      .then(result => result.json())
      .then(result => {
        setState(load(result));
      })
      .catch(error => {
        console.error(error);
      });
  } else {
    setQuery(state);
  }

  const tags: string[] = Object.keys(state.filters)
    .map(filter => {
      return state.filters[filter]
        .filter(value => value.checked)
        .map(value => value.tag);
    })
    .flat();

  const filteredMeetings = filter(state, tags);

  const customTheme = extendTheme({
    icons: {
      video: {
        path: (
          <path
            fill="currentColor"
            d="M16 16c0 1.104-.896 2-2 2h-12c-1.104 0-2-.896-2-2v-8c0-1.104.896-2 2-2h12c1.104 0 2 .896 2 2v8zm8-10l-6 4.223v3.554l6 4.223v-12z"
          />
        ),
        viewBox: '0 0 32 32'
      }
    }
  });

  return (
    <ChakraProvider theme={customTheme}>
      {state.loading ? (
        <Loading />
      ) : (
        <Box
          as="main"
          maxW="1240px"
          minH="100%"
          mx="auto"
          p={{ base: 3, md: 6 }}
        >
          <Grid
            as="section"
            gap={{ base: 3, md: 6 }}
            templateColumns={{ base: '1fr', md: '1fr 300px' }}
          >
            <Box as="section" order={{ base: 1, md: 2 }}>
              <Filter
                setSearch={(search: string[]) => {
                  setState({ ...state, search });
                }}
                setTimezone={(timezone: string) => {
                  setState({ ...state, timezone });
                }}
                state={state}
                toggleTag={toggleTag}
              />
            </Box>
            <Box
              order={{ base: 2, md: 1 }}
              display="flex"
              flexDirection="column"
              minH="60vh"
            >
              {/* Thin header for NoResults */}
              <Box
                flex="0 0 auto"
                height="72px"
                display="flex"
                alignItems="center"
              >
                <Results
                  count={filteredMeetings.length}
                  state={state}
                  toggleTag={toggleTag}
                />
              </Box>
              {/* Scrollable list area */}
              <Box flex="1 1 auto" overflowY="auto">
                {!!filteredMeetings.length && (
                  <InfiniteScrollAny
                    loadMore={() => {
                      const limit = state.limit + meetingsPerPage;
                      setState({ ...state, limit });
                    }}
                    hasMore={filteredMeetings.length > state.limit}
                  >
                    {filteredMeetings
                      .slice(0, state.limit)
                      .map((meeting: MeetingType, index: number) => (
                        <Meeting
                          key={index}
                          meeting={meeting}
                          search={state.search}
                          tags={tags}
                        />
                      ))}
                  </InfiniteScrollAny>
                )}
              </Box>
            </Box>
          </Grid>
        </Box>
      )}
    </ChakraProvider>
  );
}
