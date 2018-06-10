import * as constants from "../constants/index"

export const addWidget = dispatch => (
    dispatch({type: constants.ADD_WIDGET})
)

// export const deleteWidget = (dispatch, selectedId) => (
//     dispatch({type: constants.DELETE_WIDGET, id: selectedId})
// )