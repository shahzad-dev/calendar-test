import React from 'react'
import moment from 'moment';
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'
import BigCalendar from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';

import 'react-big-calendar/lib/css/react-big-calendar.css';

const DragAndDropCalendar = withDragAndDrop(BigCalendar);

class FullCalendar extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      events: []
    }
    BigCalendar.momentLocalizer(moment); // or globalizeLocalizer
    this.moveEvent = this.moveEvent.bind(this)
  }
  componentWillMount() {
    this.setState({ events: this.props.eventsData });
  }

  moveEvent({ event, start, end }) {
    const { events } = this.state;

    const idx = events.indexOf(event);
    const updatedEvent = { ...event, start, end };

    const nextEvents = [...events]
    nextEvents.splice(idx, 1, updatedEvent)

    this.setState({
      events: nextEvents
    })

    alert(`${event.title} was dropped onto ${event.start}`);
  }

  render(){
    return (
      <DragAndDropCalendar
        selectable
        style={{height: 800}}
        onEventDrop={this.moveEvent}
        {...this.props}
        events={this.state.events}
      />
    )
  }
}

export default DragDropContext(HTML5Backend)(FullCalendar)
