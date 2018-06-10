import React, {Component} from 'react';
import {connect} from 'react-redux';
import WidgetContainer from '../components/Widget'
import * as actions from '../actions/index'

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
                <button className="btn btn-danger"
                        onClick={this.props.addWidget}>
                    <i className="fa fa-plus"></i>
                </button>
            </div>
        )
    }
}

const stateToPropertiesMapper = (state) => ({
    widgets: state.widgets,
});

const dispatcherToPropsMapper = (dispatch) => ({
    addWidget: () => actions.addWidget(dispatch),
})

const App = connect(
    stateToPropertiesMapper,
    dispatcherToPropsMapper
)(WidgetList);


export default App;


