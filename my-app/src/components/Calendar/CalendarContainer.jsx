import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Calendar from "./Calendar";
import { getEvents } from "../../Redux/eventReducer";

const CalendarContainer = () => {
  const dispatch = useDispatch();
  const userEvents = useSelector((state) => state.events);
  const user = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getEvents(user.userId));
  }, [dispatch, userEvents]);

  return <Calendar events={userEvents.events} user={user} />;
};

export default CalendarContainer;
