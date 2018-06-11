import React from 'react';
import {connect} from 'react-redux'
import * as actions from '../actions/index'
import {DELETE_WIDGET} from "../constants/index"



const Widget = ({widget, dispatch}) => {
    let selectElement;
    return (
        <ul>
            {widget.id}{widget.widgetType}
            <select value={widget.widgetType}
                    onChange={e =>
                        dispatch({
                            type: 'SELECT_WIDGET_TYPE',
                            id: widget.id,
                            widgetType: selectElement.value
                        })} ref={node => selectElement = node}>
                <option>Heading</option>
                <option>Paragraph</option>
                <option>List</option>
                <option>Image</option>
            </select>
            <button className="btn btn-danger"
                    onClick={
                        e => dispatch({type: DELETE_WIDGET, id: widget.id})
                    }>
                <i className="fa fa-times"></i>
            </button>
        </ul>
    )
}



const mapStateToProps = state => ({

})


const dispatcherToPropsMapper = dispatch => ({

})
const WidgetContainer = connect()(Widget);


export default WidgetContainer;
