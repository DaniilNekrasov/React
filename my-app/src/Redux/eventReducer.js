import { eventAPI } from "../API/API";

const SET_EVENTS = "SET_EVENTS";
const DELETE_EVENT = "DELETE_EVENT";

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
    case DELETE_EVENT:
      return {
        ...state,
        events: state.events.filter((e) => e.id !== action.event),
      };
    default:
      return state;
  }
};

export const setEvents = (events) => ({ type: SET_EVENTS, events });
export const deleteEventAC = (event) => ({ type: DELETE_EVENT, event });

export const deleteEvent = (id) => {
  return async (dispatch) => {
    await eventAPI.deleteEvent(id);
    dispatch(deleteEventAC(id));
  };
};

export const getEvents = (id) => {
  return async (dispatch) => {
    const events = (await eventAPI.getEvents(id)).data;
    dispatch(setEvents(events));
  };
};

export default eventsReducer;
