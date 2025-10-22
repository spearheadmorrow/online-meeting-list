import { State } from './data';

export function setQuery(state: State) {
  let query: string[] = [];
  Object.keys(state.filters).forEach(key => {
    const checkedValues = state.filters[key].filter(value => value.checked);
    if (checkedValues.length) {
      query.push(
        key.concat(
          '=',
          checkedValues.map(value => encodeURIComponent(value.tag)).join(',')
        )
      );
    }
  });

  window.history.pushState(
    '',
    '',
    query.length ? '?'.concat(query.join('&')) : window.location.pathname
  );
}
