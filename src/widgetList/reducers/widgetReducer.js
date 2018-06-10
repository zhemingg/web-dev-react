import * as constants from "../constants/index"

let initialState = {
    widgets: [
        {id: 0, text: 'widget 1'},
        {id: 1, text: 'widget 2'},
        {id: 2, text: 'widget 3'}
    ]
};

let index = 3;
export const widgetReducer = (state = initialState, action) => {
    switch (action.type) {
        case constants.ADD_WIDGET:
            return {
                widgets: [
                    ...state.widgets,
                    {id: index++, text: 'New widget'}
                ]
            }
        case constants.DELETE_WIDGET:
            return {
                widgets: state.widgets.filter(widget => (
                    widget.id !== action.id
                ))
            }
        default:
            return state;
    }
}