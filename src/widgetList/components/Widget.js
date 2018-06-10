import React from 'react';
import {connect} from 'react-redux'
import * as actions from '../actions/index'
import {DELETE_WIDGET} from "../constants/index"



const Widget = ({widget, dispatch}) => (
    <ul>
        {widget.id}{widget.text}
        <button className="btn btn-danger"
        onClick={
            e => dispatch({type: DELETE_WIDGET, id: widget.id})
        }>
            <i className="fa fa-times"></i>
        </button>
    </ul>);


const mapStateToProps = state => ({

})


const dispatcherToPropsMapper = dispatch => ({

})
const WidgetContainer = connect()(Widget);


export default WidgetContainer;
