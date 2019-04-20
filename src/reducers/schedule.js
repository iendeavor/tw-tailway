import TYPES from '../constants/actionTypes';
import KEYS from '../constants/keys';

const default_state = {
  [KEYS.schedules]: [],
  [KEYS.originalSchedules]: []
};

export const omitSecondForTimestamp = timestamp => {
  return (timestamp - (timestamp % 60)) / 60;
};

export const convertToTimestamp = time_string => {
  time_string = time_string.replace(/:/g, '');
  while (time_string.length < 6) {
    time_string += '0';
  }

  const hh = parseInt(time_string.slice(0, 2));
  const mm = parseInt(time_string.slice(2, 4));
  const ss = parseInt(time_string.slice(4, 6));
  if (hh > 24 || mm > 59 || ss > 60) {
    throw new RangeError(`Invalid time: ${hh}:${mm}:${ss}.`);
  }

  return hh * 60 * 60 + mm * 60 + ss;
};

export const convertDepartureToTimestamp = departure => {
  return omitSecondForTimestamp(convertToTimestamp(departure));
};

export const convertArrivalToTimestamp = (arrival, departure) => {
  let arrival_timestamp = omitSecondForTimestamp(convertToTimestamp(arrival));

  if (departure !== undefined) {
    const departure_timestamp = convertDepartureToTimestamp(departure);
    if (arrival_timestamp < departure_timestamp) {
      arrival_timestamp += 24 * 60;
    }
  }

  return arrival_timestamp;
};

export default (state = default_state, action) => {
  if (action === undefined) {
    return state;
  }

  const next = { ...state };

  switch (action.type) {
    case TYPES.clearTimetable:
      next[KEYS.originalSchedules] = [];
      next[KEYS.schedules] = [];
      break;
    case TYPES.search:
      next[KEYS.originalSchedules] = action.payload[KEYS.schedules].map(
        schedule => {
          schedule.fare = state[KEYS.fares][schedule.train_type];
          return schedule;
        }
      );
      next[KEYS.schedules] = next[KEYS.originalSchedules].slice();
      break;
    case TYPES.restoreHistory:
      next[KEYS.originalSchedules] = action.payload[KEYS.schedules].slice();
      next[KEYS.schedules] = action.payload[KEYS.schedules].slice();
      break;
    case TYPES.restoreSearch:
      next[KEYS.schedules] = state[KEYS.originalSchedules].slice();
      break;
    case TYPES.setFare:
      next[KEYS.fares] = action.payload[KEYS.fares];
      break;
    case TYPES.sort:
      next[KEYS.schedules] = state[KEYS.schedules].slice().sort((a, b) => {
        let flag = 0;

        switch (action.payload[KEYS.sortBy]) {
          case KEYS.arrival:
            const a_arrival = convertArrivalToTimestamp(a.arrival, a.departure);
            const b_arrival = convertArrivalToTimestamp(b.arrival, b.departure);
            flag = a_arrival - b_arrival;
            break;

          case KEYS.departure:
            const a_departure = convertDepartureToTimestamp(a.departure);
            const b_departure = convertDepartureToTimestamp(b.departure);
            flag = a_departure - b_departure;
            break;

          case KEYS.duration:
            const a_duration = omitSecondForTimestamp(
              convertToTimestamp(a.duration)
            );
            const b_duration = omitSecondForTimestamp(
              convertToTimestamp(b.duration)
            );
            flag = a_duration - b_duration;
            break;

          case KEYS.fare:
            const a_fare = parseInt(a.fare);
            const b_fare = parseInt(b.fare);
            flag = a_fare - b_fare;
            break;

          default:
            break;
        }

        return flag;
      });
      break;
    case TYPES.filter:
      let schedules = state[KEYS.schedules].slice();

      for (let filter of action.payload[KEYS.selectedFilters]) {
        schedules = schedules.filter(schedule => {
          switch (filter) {
            case KEYS.wheelChair:
              return schedule.has_wheel_chair;
            case KEYS.bikeSpace:
              return schedule.is_bike_allowed;
            case KEYS.nursingRoom:
              return schedule.has_nursing_room;
            default:
              break;
          }

          return true;
        });
      }

      next[KEYS.schedules] = schedules;
      break;
    case TYPES.filterDepartureTime:
      const selected_departure = action.payload[KEYS.departureTime];

      next[KEYS.schedules] = state[KEYS.schedules].slice().filter(schedule => {
        if (selected_departure === '') {
          return true;
        }

        const after = convertDepartureToTimestamp(selected_departure);
        const departure = convertDepartureToTimestamp(schedule.departure);
        return after <= departure;
      });
      break;
    case TYPES.filterArrivalTime:
      const selected_arrival = action.payload[KEYS.arrivalTime];

      next[KEYS.schedules] = state[KEYS.schedules].slice().filter(schedule => {
        if (selected_arrival === '') {
          return true;
        }

        const before = convertArrivalToTimestamp(selected_arrival);
        const arrival = convertArrivalToTimestamp(
          schedule.arrival,
          schedule.departure
        );
        return arrival <= before;
      });
      break;
    default:
      break;
  }

  return next;
};
