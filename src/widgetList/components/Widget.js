import React from 'react';
import {connect} from 'react-redux'
import * as actions from '../actions/index'
import {DELETE_WIDGET} from "../constants/index"


const Heading = ({dispatch, widget, preview, headingTextChanged, headingSizeChanged, headingNameChanged}) => {
    let inputElem, selectElem,nameElem;

    return (
        <div className='bg-white'>
            <div className='row'>
                <input onChange={() => {
                            headingTextChanged(widget.id, inputElem.value)
                        }}
                       value={widget.text}
                       ref={node => inputElem = node}
                       className = 'list-group-item'/>
                <select onChange={() => headingSizeChanged(widget.id, selectElem.value)}
                        value={widget.size}
                        ref={node => selectElem = node}>
                    <option value="1">Heading 1</option>
                    <option value="2">Heading 2</option>
                    <option value="3">Heading 3</option>
                </select>
                <input onchange={() => headingNameChanged(widget.id, nameElem.value)}
                       value={widget.name}
                       ref={node => nameElem = node}
                />

            </div>
            <h3>Preview</h3>
            {console.log(widget)}
            <div>
                {widget.size == 1 && <h1>{widget.text}</h1>}
                {widget.size == 2 && <h2>{widget.text}</h2>}
                {widget.size == 3 && <h3>{widget.text}</h3>}
            </div>
        </div>
    )

}

const Paragraph = () => (
    <div>
        <h2>Paragraph</h2>
        <textarea></textarea>
    </div>
)

const Image = () => (
    <h2>Image</h2>
)

const List = () => (
    <h2>List</h2>
)

const moveUp = widget => {
    return {
        type: 'MOVE_UP', widget: widget
    }
}

const moveDown = widget => {
    return {
        type: 'MOVE_DOWN', widget: widget
    }
}

const headingDispatchToPropsMapper = dispatch => ({
    headingTextChanged: (widgetId, newText) => actions.headingTextChanged(dispatch, widgetId, newText),
    headingSizeChanged: (widgetId, newSize) => actions.headingSizeChanged(dispatch, widgetId, newSize),
    headingNameChanged: (widgetId, newName) => actions.headingNameChanged(dispatch, widgetId, newName)
})
const headingStateToPropsMapper = state => ({
    preview: state.preview
})

const HeadingContainer = connect(headingStateToPropsMapper, headingDispatchToPropsMapper)(Heading);


const Widget = ({widget, dispatch}) => {
    let selectElement;
    return (
        <ul>
            <li className='list-group-item d-flex justify-content-between align-items-center'>
                <strong><h3>{widget.widgetType}</h3></strong>
                <span className="float-right">
                    <button className='btn btn-warning'
                            onClick={() => {
                                dispatch(moveDown(widget))
                            }}
                            style={{marginRight: '5px'}}>
                        <i className="fa fa-arrow-down"></i>
                    </button>
                    <button className='btn btn-warning'
                            onClick={() => {
                                dispatch(moveUp(widget))
                            }}
                            style={{marginRight: '5px'}}>
                        <i className="fa fa-arrow-up"></i>
                    </button>
                    <select value={widget.widgetType}
                            onChange={e =>
                                dispatch({
                                    type: 'SELECT_WIDGET_TYPE',
                                    id: widget.id,
                                    widgetType: selectElement.value
                                })}
                            ref={node => selectElement = node}
                            style={{marginRight: '5px'}}>
                        <option>Heading Widget</option>
                        <option>Paragraph Widget</option>
                        <option>List Widget</option>
                        <option>Image Widget</option>
                    </select>
                    <button className="btn btn-danger"
                            onClick={
                                e => dispatch({type: DELETE_WIDGET, id: widget.id})
                            }>
                        <i className="fa fa-times"></i>
                    </button>
                </span>
            </li>
            <div>
                {widget.widgetType === 'Heading Widget' && <HeadingContainer widget={widget}/>}
                {widget.widgetType === 'Paragraph Widget' && <Paragraph/>}
                {widget.widgetType === 'List Widget' && <List/>}
                {widget.widgetType === 'Image Widget' && <Image/>}
            </div>
        </ul>
    )
}

const WidgetContainer = connect()(Widget);


export default WidgetContainer;
