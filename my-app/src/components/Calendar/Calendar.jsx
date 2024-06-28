import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import CreateForm from "./CreateForm";

function Calendar(props) {
  const events = props.events.map((el) => {
    return {
      start: el.startTime,
      end: el.finishTime,
      title: el.title,
    };
  });
  return (
    <div className="p-4">
      <div className="bg-stone-500 text-black max-w-lg mx-auto space-x-3 mt-4 mb-4 p-4 rounded-lg shadow-lg">
        <h1 className="text-2xl font-semibold mb-4">Create a new event</h1>
        <CreateForm user={props.user} />
      </div>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          start: "prev today next",
          center: "title",
          end: "dayGridMonth,dayGridWeek,timeGridDay",
        }}
        weekends={true}
        events={events}
        eventContent={renderEventContent}
      />
    </div>
  );
}

function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  );
}

export default Calendar;
