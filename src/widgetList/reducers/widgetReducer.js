import * as constants from "../constants/index"

let initialState = {
    widgets: [
        {id: 0, text: 'widget 1'},
        {id: 1, text: 'widget 2'},
        {id: 2, text: 'widget 3'}
    ]
};

let index = 3;
let newState;
export const widgetReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'test':
            alert('test');
            return state;
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
        case constants.FIND_ALL_WIDGETS:
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
        default:
            return state;
    }
}