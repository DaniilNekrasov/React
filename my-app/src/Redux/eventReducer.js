import { eventAPI } from "../API/API";

const SET_EVENTS = "SET_EVENTS";

let initialState = {
  events: [],
};

const eventsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_EVENTS:
      return {
        ...state,
        events: [...action.events.events],
      };
    default:
      return state;
  }
};

export const setEvents = (events) => ({ type: SET_EVENTS, events });

export const getEvents = (id) => {
  return async (dispatch) => {
    const events = (await eventAPI.getEvents(id)).data;
    dispatch(setEvents(events));
  };
};

export default eventsReducer;
