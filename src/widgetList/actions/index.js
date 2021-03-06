import * as constants from "../constants/index"

export const addWidget = dispatch => (
    dispatch({type: constants.ADD_WIDGET})
)

// export const findAllWidgets = dispatch => {
//     fetch('http://localhost:8080/api/widget')
//         .then(response => (response.json()))
//         .then(widgets => dispatch({
//             type: constants.FIND_ALL_WIDGETS,
//             widgets: widgets }))
// }

export const widgetTextChanged = (dispatch, widgetId, newText) => (
    dispatch({
        type: constants.TEXT_CHANGED,
        id: widgetId,
        text: newText
    })
)

export const headingSizeChanged = (dispatch, widgetId, newSize) => (
    dispatch({
        type: constants.HEADING_SIZE_CHANGED,
        id: widgetId,
        size: newSize
    })
)

export const widgetNameChanged = (dispatch, widgetId, newName) => (
    dispatch({
        type: constants.NAME_CHANGED,
        id: widgetId,
        name: newName
    })
)

export const widgetSrcChanged = (dispatch, widgetId, newSrc) => (
    dispatch(
        {
            type: constants.SRC_CHANGED,
            id: widgetId,
            src: newSrc
        })
)

export const widgetHrefChanged = (dispatch, widgetId, newHref) => (
    dispatch(
        {
            type: constants.HREF_CHANGED,
            id: widgetId,
            href: newHref
        })
)

export const listOrderChanged = (dispatch, widgetId, newListType) => (
    dispatch(
        {
            type: constants.LIST_TYPE_CHANGED,
            id: widgetId,
            listType: newListType
        })
)

export const save = (dispatch, topicId) => (
    dispatch({type: constants.SAVE, topicId: topicId})
)

export const preview = dispatch => (
    dispatch({type: constants.PREVIEW})
)

export const findAllWidgetsForTopic = (dispatch, topicId) => {
    fetch('https://zhemingg-assignment.herokuapp.com/api/topic/TID/widget'.replace('TID', topicId))
        .then(response => (response.json()))
        .then(
            widgets => dispatch({
                type: constants.FIND_ALL_WIDGETS_FOR_TOPIC,
                widgets: widgets,
                topicId: topicId
            })
        )

}

export const widgetListItemsChanged = (dispatch, widgetId, newListItems) => {
    dispatch(
        {
            type: constants.LIST_ITEMS_CHANGED,
            id: widgetId,
            listItems: newListItems
        })
}

// export const deleteWidget = (dispatch, selectedId) => (
//     dispatch({type: constants.DELETE_WIDGET, id: selectedId})
// )