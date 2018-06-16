import React, {Component} from 'react';
import {connect} from 'react-redux';
import WidgetContainer from '../components/Widget';
import * as actions from '../actions/index';


class WidgetList extends Component {
    constructor(props) {
        super(props);
        this.props.findAllWidgetsForTopic(this.props.topicId);

    }

    componentWillReceiveProps(newProps) {
        if (this.props.topicId === newProps.topicId) {
            return;
        } else {
            this.props.findAllWidgetsForTopic(newProps.topicId)
        }
    }

    render() {
        return (

            <div>
                <div className='row'>
                    <div className='col-12'>
                        <button onClick={() => this.props.save(this.props.topicId)}
                                className='float-right btn btn-success'
                                style={{marginBottom:'10px'}}>Save
                        </button>
                    </div>
                </div>

                <div className='row'>
                    <div className='col-12'>
                    {this.props.widgets
                        .sort((a,b)=> a.widgetOrder - b.widgetOrder)
                        .map(widget => (<WidgetContainer widget={widget} key={widget.id} lastPosition={this.props.widgets.length - 1}/>)
                    )}
                    </div>
                </div>

                <div className='row'>
                    <div className='col-12'>
                    <button className="btn btn-danger float-right"
                            onClick={this.props.addWidget}
                            type='button'
                            style={{marginBottom:'10px'}}>
                        <i className="fa fa-plus"></i>
                    </button>
                    </div>
                </div>


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
        //console.log(topicId);
        actions.findAllWidgetsForTopic(dispatch, topicId)

    },
    save: (topicId) => actions.save(dispatch, topicId)
})

const App = connect(
    stateToPropertiesMapper,
    dispatcherToPropsMapper
)(WidgetList);


export default App;


