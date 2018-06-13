import * as constants from "../constants/index"

let index = 3;
let newState;
let initialState;
export const widgetReducer = (state = {widgets: [], topicId: 0}, action) => {
    switch (action.type) {

        case constants.ADD_WIDGET:
            return {
                widgets: [
                    ...state.widgets,
                    {id: index++, text: 'New widget', widgetType: 'Paragraph'}
                ]
            }

        case constants.DELETE_WIDGET:
            return {
                widgets: state.widgets.filter(widget => (
                    widget.id !== action.id
                ))
            }

        case constants.FIND_ALL_WIDGETS_FOR_TOPIC:
            newState = Object.assign({}, state);
            newState.widgets = action.widgets;
            return newState;

        case constants.SELECT_WIDGET_TYPE:
              newState = {
                widgets: state.widgets.filter((widget) => {
                    if(widget.id === action.id) {
                        widget.widgetType = action.widgetType
                    }
                    return true;
                })
            }
            return JSON.parse(JSON.stringify(newState));

        case constants.HEADING_TEXT_CHANGED:
            return {
                widgets: state.widgets.map(widget => {
                    if(widget.id === action.id) {
                        widget.text = action.text
                    }
                    return Object.assign({}, widget)
                })
            }

        case constants.HEADING_SIZE_CHANGED:
            return {
                widgets: state.widgets.map(widget => {
                    if(widget.id === action.id) {
                        widget.size = action.size
                    }
                    return Object.assign({}, widget)
                })
            }
        case constants.SAVE:
            fetch('http://localhost:8080/api/course/CID/module/MID/lesson/LID/topic/TID/widget'.replace('TID', action.topicId), {
                method: 'post',
                body: JSON.stringify(state.widgets),
                headers: {
                    'content-type': 'application/json'}
            })
            return state;
        default:
            return state;
    }
}