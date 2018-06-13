import React, {Component} from 'react';
import {connect} from 'react-redux';
import WidgetContainer from '../components/Widget';
import * as actions from '../actions/index';


class WidgetList extends Component {
    constructor(props) {
        super(props)
        this.props.findAllWidgetsForTopic(this.props.topicId)
    }

    componentWillReceiveProps(newProps){
        if(this.props.topicId === newProps.topicId) {
            return;
        } else {
            this.props.findAllWidgetsForTopic(newProps.topicId)
        }
    }


    render() {
        return (
            <div>
                <h2>Widget List</h2>
                <button  onClick={() => this.props.save(this.props.topicId)}>
                    Save
                </button>
                <ul>
                    {console.log(this.props.widgets)}
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
    findAllWidgetsForTopic: (topicId) => {
        console.log(topicId);
        actions.findAllWidgetsForTopic(dispatch, topicId)

    },
    save: (topicId) => actions.save(dispatch, topicId)
})

const App = connect(
    stateToPropertiesMapper,
    dispatcherToPropsMapper
)(WidgetList);


export default App;


