import React from 'react';
import {connect} from 'react-redux'
import * as actions from '../actions/index'
import {DELETE_WIDGET} from "../constants/index"


const Heading = ({dispatch, widget, preview, headingTextChanged, headingSizeChanged}) => {
    let inputElem, selectElem;

    return (
        <div>
            <div>
                <h2>Heading Widget</h2>
                <input onChange={() =>{
                    console.log(widget);
                    headingTextChanged(widget.id, inputElem.value)
                }}
                       value={widget.text}
                       ref={node => inputElem = node}/>
                <select onChange={() => headingSizeChanged(widget.id, selectElem.value)}
                        value={widget.size}
                        ref={node => selectElem = node}>
                    <option value="1">Heading 1</option>
                    <option value="2">Heading 2</option>
                    <option value="3">Heading 3</option>
                </select>
                <h3>Preview</h3>
            </div>
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

const dispatchToPropsMapper = dispatch => ({
    headingTextChanged: (widgetId, newText) => {
        console.log('heading');
        actions.headingTextChanged(dispatch, widgetId, newText)
    },
    headingSizeChanged: (widgetId, newSize) => actions.headingSizeChanged(dispatch, widgetId, newSize)
})
const stateToPropsMapper = state => ({
    preview: state.preview
})

const HeadingContainer = connect(stateToPropsMapper, dispatchToPropsMapper)(Heading);

const Widget = ({widget, dispatch}) => {
    let selectElement;
    return (
        <ul>
            {widget.id}{widget.widgetType}
            <button className='btn btn-warning'>
                <i className="fa fa-arrow-down"></i>
            </button>
            <button className='btn btn-warning'>
                <i className="fa fa-arrow-up"></i>
            </button>
            <select value={widget.widgetType}
                    onChange={e =>
                        dispatch({
                            type: 'SELECT_WIDGET_TYPE',
                            id: widget.id,
                            widgetType: selectElement.value
                        })}
                    ref={node => selectElement = node}>
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
            <div>
                {widget.widgetType === 'Heading' && <HeadingContainer widget={widget}/>}
                {widget.widgetType === 'Paragraph' && <Paragraph/>}
                {widget.widgetType === 'List' && <List/>}
                {widget.widgetType === 'Image' && <Image/>}
            </div>
        </ul>
    )
}

const WidgetContainer = connect()(Widget);


export default WidgetContainer;
