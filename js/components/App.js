import React from 'react';
import Relay from 'react-relay';
import hobbyAddMutation from './hobbyAddMutation';
import FullCalendar from './FullCalendar';
import events from './events';

class App extends React.Component {

    static contextTypes = {
      relay: Relay.PropTypes.Environment,
    }

    constructor( props, context ) {

      super( props, context )

      this.state = {
      }
    }

_handle_OnChange = ( event ) => {
    //this.setState({count: this.state.count + 1});
    console.log(this.props.viewer.hobbies.edges.length);
    this.context.relay.commitUpdate(
        new hobbyAddMutation( {
          id: `${this.props.viewer.hobbies.edges.length + 1}`,
          title: `blah`, // ${this.state.count}`,
          Viewer: this.props.viewer
        } )
      )
    this.setState({count: this.props.viewer.hobbies.edges.length });
 }
  render() {

    return (
        <FullCalendar
            eventsData={events}
            culture='en'
            defaultView='week'
            defaultDate={new Date(2015, 3, 12)}
            />
    );
  }
}

export default Relay.createContainer(App, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on User {
        hobbies(first: 100) {
          edges {
            node {
              title,
            },
          },
        },
        ${hobbyAddMutation.getFragment('Viewer')},
      }
    `,
  },
});
