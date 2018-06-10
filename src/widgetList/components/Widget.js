import React from 'react';
import {connect} from 'react-redux'


const Widget = ({widget}) => (<ui> {widget.text} </ui>);


const mapStateToProps = state => ({
    widgets: state.widgets
})

// WidgetList = connect(
//     mapStateToProps
// )(WidgetList)
const WidgetContainer = connect()(Widget);



export default WidgetContainer;
