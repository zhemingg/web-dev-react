import React from 'react';
import {connect} from 'react-redux'
import * as actions from '../actions/index'
import {DELETE_WIDGET} from "../constants/index"


const Heading = ({widget, preview, widgetTextChanged, headingSizeChanged, widgetNameChanged}) => {
    let inputElem, selectElem, nameElem;

    return (
        <div className='bg-white'>
            <div className='row'>
                <input onChange={() => {
                    widgetTextChanged(widget.id, inputElem.value)
                }}
                       value={widget.text}
                       ref={node => inputElem = node}
                       placeholder={'Heading text'}
                       className='list-group-item'/>
                <select onChange={() => headingSizeChanged(widget.id, selectElem.value)}
                        value={widget.size}
                        ref={node => selectElem = node}>
                    <option value="1">Heading 1</option>
                    <option value="2">Heading 2</option>
                    <option value="3">Heading 3</option>
                </select>
                <input onChange={() => widgetNameChanged(widget.id, nameElem.value)}
                       value={widget.name}
                       ref={node => nameElem = node}
                       placeholder={'Widget Name'}
                />

            </div>
            <h3>Preview</h3>
            <div>
                {widget.size == 1 && <h1>{widget.text}</h1>}
                {widget.size == 2 && <h2>{widget.text}</h2>}
                {widget.size == 3 && <h3>{widget.text}</h3>}
            </div>
        </div>
    )

}

const Paragraph = ({widget, widgetTextChanged, widgetNameChanged}) => {
    let inputElem, nameElem;
    return (
        <div>
        <textarea onChange={() => widgetTextChanged(widget.id, inputElem.value)}
                  value={widget.text}
                  ref={node => inputElem = node}
                  placeholder={'Paragraph text'}></textarea>
            <input onChange={() => widgetNameChanged(widget.id, nameElem.value)}
                   value={widget.name}
                   ref={node => nameElem = node}
                   placeholder={'Widget Name'}
            />
            <h3>Preview</h3>
            <div>
                <h4>{widget.text}</h4>
            </div>
        </div>

    )

}

const Image = ({widget, widgetSrcChanged, widgetNameChanged}) => {
    let srcElem, nameElem;
    return (
        <div>
            <input onChange={() => widgetSrcChanged(widget.id, srcElem.value)}
                   value={widget.src}
                   ref={node => srcElem = node}
                   placeholder='Image URL'/>
            <input onChange={() => widgetNameChanged(widget.id, nameElem.value)}
                   value={widget.name}
                   ref={node => nameElem = node}
                   placeholder={'Widget Name'}
            />
            <h3>Preview</h3>
            <div>
                <img src={widget.src}/>
            </div>
        </div>

    )
}


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

const widgetDispatchToPropsMapper = dispatch => ({
    widgetTextChanged: (widgetId, newText) => actions.widgetTextChanged(dispatch, widgetId, newText),
    headingSizeChanged: (widgetId, newSize) => actions.headingSizeChanged(dispatch, widgetId, newSize),
    widgetNameChanged: (widgetId, newName) => actions.widgetNameChanged(dispatch, widgetId, newName),
    widgetSrcChanged: (widgetId, newSrc) => actions.widgetSrcChanged(dispatch, widgetId, newSrc)
})
const widgetStateToPropsMapper = state => ({
    preview: state.preview
})
const HeadingContainer = connect(widgetStateToPropsMapper, widgetDispatchToPropsMapper)(Heading);

const ParagraphContainer = connect(widgetStateToPropsMapper, widgetDispatchToPropsMapper)(Paragraph);

const ImageContainer = connect(widgetStateToPropsMapper, widgetDispatchToPropsMapper)(Image);


const Widget = ({widget, dispatch, lastPosition}) => {
    let selectElement;
    return (
        <ul>
            <li className='list-group-item d-flex justify-content-between align-items-center'>
                <strong><h3>{widget.widgetType}</h3></strong>
                <span className="float-right">
                    {widget.widgetOrder !== lastPosition && <button className='btn btn-warning'
                            onClick={() => {
                                dispatch(moveDown(widget))
                            }}
                            style={{marginRight: '5px'}}>
                        <i className="fa fa-arrow-down"></i>
                    </button>}
                    {widget.widgetOrder !== 0 && <button className='btn btn-warning'
                            onClick={() => {
                                dispatch(moveUp(widget))
                            }}
                            style={{marginRight: '5px'}}>
                        <i className="fa fa-arrow-up"></i>
                    </button>}
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
                {widget.widgetType === 'Paragraph Widget' && <ParagraphContainer widget={widget}/>}
                {widget.widgetType === 'List Widget' && <List/>}
                {widget.widgetType === 'Image Widget' && <ImageContainer widget={widget}/>}
            </div>
        </ul>
    )
}

const WidgetContainer = connect()(Widget);


export default WidgetContainer;
