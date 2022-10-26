import React             from 'react'
import FullCalendar      from '@fullcalendar/react' // must go before plugins
import dayGridPlugin     from '@fullcalendar/daygrid' // a plugin!
import timeGridPlugin    from "@fullcalendar/timegrid";
import listPlugin        from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import { INITIAL_EVENTS, createEventId } from './event-utils';



export class EventCalendar extends React.Component {


    state = {
        weekendsVisible: true,
        currentEvents: []
    }

    //This will render the entire calendar
    render()
    {
        function renderEventContent(eventInfo)
        {
            return(
                <>
                    <b>{eventInfo.timeText}</b>
                    <b><i>{eventInfo.event.title +":" }</i></b>
                    <i>{eventInfo.event.extendedProps.description}</i>
                </>
            )
        }
        //let tooltipInstance = null;
        // //This is tooltip for events
        // const handleMouseEnter = (info) =>
        // {
        //
        //     if (info.event.extendedProps.description)
        //     {
        //         tooltipInstance = new Tooltip(info.el,
        //             {
        //             title: info.event.extendedProps.description,
        //             html: true,
        //             place: "top",
        //             trigger: "hover",
        //             container: "body"
        //         });
        //
        //         tooltipInstance.show();
        //     }
        // }
        //
        // const handleMouseLeave = (info) =>
        // {
        //
        //     if (info.event.extendedProps.description)
        //     {
        //         if (tooltipInstance)
        //         {
        //             tooltipInstance.dispose();
        //             tooltipInstance = null;
        //         }
        //     }
        // }

        return (
            <div className = 'event-calendar'>
                {/*{this.renderSidebar()}*/}
                <div className = 'event-calendar-main'>
                    <FullCalendar
                        plugins={[ dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin ]}
                        //This is for the toolbar above the calendar.
                        headerToolbar={{
                            left: 'prev,next today',
                            center: 'title',
                            right: 'timeGridWeek dayGridMonth listWeek'
                        }}

                        initialView   = "timeGridWeek"
                        editable      = {true}
                        selectable    = {true}
                        selectMirror  = {true}
                        dayMaxEvents  = {true}
                        eventMaxStack = {true}
                        weekends      = {this.state.weekendsVisible}
                        initialEvents = {INITIAL_EVENTS}
                        select        = {this.handleDateSelect}
                        eventContent  = {renderEventContent}
                        eventClick    = {this.handleEventClick}
                        eventsSet     = {this.handleEvents}

                        // eventMouseEnter={handleMouseEnter}
                        // eventMouseLeave={handleMouseLeave}
                    />
                </div>
            </div>
        )
    }

    // renderSidebar()
    // {
    //     function renderSidebarEvent(event)
    //     {
    //         return(
    //             <li key={event.id}>
    //                 <b>{formatDate(event.start, {year: 'numeric', month: 'short', day: 'numeric'})}</b>
    //                 <i>{event.title}</i>
    //                 <i>{event.description}</i>
    //             </li>
    //         )
    //     }

    //     return(
    //         <div className = 'event-calendar-sidebar'>
    //             <div className = 'event-calendar-sidebar-section'>
    //                 <h2>Instructions</h2>
    //                 <ul>
    //                     <li>
    //                         To create a new event, click on a date, and you will be prompted for the title of the event,
    //                         a description of the event, start-time/end-time, and whether the event is recurring.
    //                     </li>
    //                     <li>
    //                         To update your events, drag and drop them to the desired time slot. You can also shorten
    //                         and lengthen your events by resizing them accordingly.
    //                     </li>
    //                     <li>
    //                         To delete an event, you can click on it.
    //                     </li>
    //                 </ul>
    //             </div>
    //             <div className = 'event-calendar-sidebar-section'>
    //                 <label>
    //                     <input
    //                         type    = 'checkbox'
    //                         checked = { this.state.weekendsVisible }
    //                         onChange= { this.handleWeekendsToggle }
    //                     ></input>
    //                     Toggle weekends
    //                 </label>
    //             </div>
    //             <div className = 'event-calendar-sidebar-section'>
    //                 <h2>
    //                     All Events ({this.state.currentEvents.length})
    //                 </h2>
    //                 <ul>
    //                     {this.state.currentEvents.map(renderSidebarEvent)}
    //                 </ul>
    //             </div>
    //         </div>
    //
    //     )
    // }
    //
    // //this will handle what happens with the weekends toggle in our sidebar
    // handleWeekendsToggle = () =>
    // {
    //     this.setState
    //     ({
    //             weekendsVisible: !this.state.weekendsVisible
    //     })
    // }

    handleDateSelect = (selectInfo) =>
    {
        let title = prompt('Please enter a new title for your event')
        let description = prompt('Please give your event a description')
        // let startTime = prompt("Please give your event's starting time")
        // let endTime =  prompt("Please give your event's ending time")

        let calendarApi = selectInfo.view.calendar

        calendarApi.unselect()

        if(title)
        {
            calendarApi.addEvent
            ({
                id: createEventId(),
                title,
                start: selectInfo.startStr,
                end: selectInfo.endStr,
                allDay: selectInfo.allDay,
                extendedProps:{
                    description: description
                }
            })
        }
    }

    handleEventClick = (clickInfo) =>
    {
        // eslint-disable-next-line no-restricted-globals
        if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`))
        {
            clickInfo.event.remove()
        }
    }

    handleEvents = (events) =>
    {
        this.setState({
            currentEvents: events
        })
    }



}

