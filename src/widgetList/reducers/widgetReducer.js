import * as constants from "../constants/index"

let newState;
function exchange (i,j, array) {
    let temp = array[i].widgetOrder;
    array[i].widgetOrder = array[j].widgetOrder;
    array[j].widgetOrder = temp;
    array.sort((a, b) => a.widgetOrder - b.widgetOrder);
    return array;
}

function assignWidgetOrder(widgets) {
    for (var i = 0; i< widgets.length; i++){
        widgets[i].widgetOrder = i;
    }
    return widgets;
}

export const widgetReducer = (state = {widgets: [], topicId: 0}, action) => {
    switch (action.type) {

        case constants.ADD_WIDGET:
            let max = 0;
            for (let i = 0; i < state.widgets.length; i++){
                max = Math.max(max, state.widgets[i].id);
            }

            return {
                widgets: [
                    ...state.widgets,
                    {
                        widgetOrder: state.widgets.length,
                        text: '',
                        widgetType: 'Heading Widget',
                        id: ++max,
                        size: '1',
                        name: '',
                        href: '',
                        src: '',
                        listType: 'unordered'
                    }
                ]
            }

        case constants.DELETE_WIDGET:
            return {
                widgets: assignWidgetOrder(
                    state.widgets.filter(widget => (widget.id !== action.id))
                )
            }

        case constants.FIND_ALL_WIDGETS_FOR_TOPIC:
            newState = Object.assign({}, state);
            newState.widgets = action.widgets
            return newState;

        case constants.SELECT_WIDGET_TYPE:
            newState = {
                widgets: state.widgets.filter((widget) => {
                    if (widget.id === action.id) {
                        widget.widgetType = action.widgetType
                    }
                    return true;
                })

            }
            return JSON.parse(JSON.stringify(newState));

        case constants.TEXT_CHANGED:
            return {
                widgets: state.widgets.map(widget => {
                    if (widget.id === action.id) {
                        widget.text = action.text
                    }
                    return Object.assign({}, widget)
                })
            }

        case constants.HEADING_SIZE_CHANGED:
            return {
                widgets: state.widgets.map(widget => {
                    if (widget.id === action.id) {
                        widget.size = action.size
                    }
                    return Object.assign({}, widget)
                })
            }

        case constants.NAME_CHANGED:
            return {
                widgets: state.widgets.map(widget => {
                    if (widget.id === action.id) {
                        widget.name = action.name
                    }
                    return Object.assign({}, widget)
                })
            }
        case constants.MOVE_UP:
            let index = state.widgets.indexOf(action.widget);
            if (index <= 0){
                return state;
            } else {
                newState = {
                    widgets: assignWidgetOrder(exchange(index, index-1, state.widgets)),
                };
                return JSON.parse(JSON.stringify(newState));
            }


        case constants.MOVE_DOWN:
            index = state.widgets.indexOf(action.widget);

            if (index >= state.widgets.length-1){
                return state;
            } else {
                newState = {
                    widgets: assignWidgetOrder(exchange(index, index+1, state.widgets)),
                };
                return JSON.parse(JSON.stringify(newState));
            }

        case constants.SRC_CHANGED:
            return {
                widgets: state.widgets.map(widget => {
                    if (widget.id === action.id) {
                        widget.src = action.src
                    }
                    return Object.assign({}, widget)
                })
            }
        case constants.HREF_CHANGED:
            return {
                widgets: state.widgets.map(widget => {
                    if (widget.id === action.id) {
                        widget.href = action.href
                    }
                    return Object.assign({}, widget)
                })
            }

        case constants.LIST_TYPE_CHANGED:
            return {
                widgets: state.widgets.map(widget => {
                    if (widget.id === action.id) {
                        console.log(action.listType)
                        widget.listType = action.listType
                    }
                    return Object.assign({}, widget)
                })
            }


        case constants.SAVE:
            fetch('http://localhost:8080/api/course/CID/module/MID/lesson/LID/topic/TID/widget'.replace('TID', action.topicId), {
                method: 'post',
                body: JSON.stringify(state.widgets),
                headers: {
                    'content-type': 'application/json'
                }
            })
            return state;
        default:
            return state;
    }
}