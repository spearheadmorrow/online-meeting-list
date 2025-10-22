import moment from 'moment-timezone';

import { days } from './config';
import { State } from './data';
import { Meeting } from '../components/Meeting';

export function filter(
  { meetings, search, timezone }: State,
  tags: string[]
): Meeting[] {
  const now = moment();

  meetings.map(meeting => {
    if (meeting.time) {
      meeting.time.tz(timezone);

      let diff = meeting.time.diff(now, 'minutes');

      if (diff < -10080) {
        meeting.time.add(1, 'week');
        diff = meeting.time.diff(now, 'minutes');
      }

      if (diff < -10) {
        meeting.time.add(1, 'week');
      }

      meeting.tags = meeting.tags.filter(tag => !days.includes(tag));
      meeting.tags.push(meeting.time.format('dddd'));
      meeting.tags.sort();
    }

    return meeting;
  });

  if (tags.length) {
    meetings = meetings.filter(meeting => {
      for (let i = 0; i < tags.length; i++) {
        if (!meeting.tags.includes(tags[i])) return false;
      }
      return true;
    });
  }

  if (search) {
    meetings = meetings.filter(meeting => {
      return (
        search
          .map(word => {
            return meeting.search.includes(word);
          })
          .filter(e => e).length === search.length
      );
    });
  }

  meetings.sort((a: Meeting, b: Meeting) => {
    if (a.time && b.time && !a.time.isSame(b.time)) {
      return a.time.isAfter(b.time) ? 1 : -1;
    } else if (a.time && !b.time) {
      return -1;
    } else if (b.time && !a.time) {
      return 1;
    }
    return a.name.localeCompare(b.name);
  });

  return meetings;
}
