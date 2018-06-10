import React, {Component} from 'react';
import {connect} from 'react-redux';
import WidgetContainer from '../components/Widget'

class WidgetList extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <h2>Widget List</h2>
                <ul>
                    {this.props.widgets.map(
                        widget => (
                            <WidgetContainer widget={widget} key={widget.id}/>
                        )
                    )}
                </ul>
            </div>
        )
    }
}

const stateToPropertiesMapper = (state) => ({
    widgets: state.widgets,
});

const dispatcherToPropsMapper
    = () => ({})

const App = connect(
    stateToPropertiesMapper,
    dispatcherToPropsMapper
)(WidgetList);


export default App;


