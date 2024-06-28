import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Calendar from "./Calendar";
import { getEvents } from "../../Redux/eventReducer";
import { withAuthRedirect } from "../HOC/WithAuthRedirect";
import { compose } from "redux";

const CalendarContainer = () => {
  const dispatch = useDispatch();
  const userEvents = useSelector((state) => state.events);
  const user = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getEvents(user.userId));
  }, [userEvents, user.userId]);

  return <Calendar events={userEvents.events} user={user} />;
};

export default compose(withAuthRedirect)(CalendarContainer);
