import React from 'react';
import {connect} from 'react-redux'
import * as actions from '../actions/index'
import {DELETE_WIDGET} from "../constants/index"


const Heading = ({widget, preview, widgetTextChanged, headingSizeChanged, widgetNameChanged}) => {
    let inputElem, selectElem, nameElem;

    return (
        <div className='bg-white'>
            <div className='row' hidden={preview}>
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

const Paragraph = ({widget, widgetTextChanged, widgetNameChanged, preview}) => {
    let inputElem, nameElem;
    return (
        <div>
            <div hidden={preview}>
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
            </div>

            <div>
                <p>{widget.text}</p>
            </div>
        </div>

    )

}

const Image = ({widget, widgetSrcChanged, widgetNameChanged, preview}) => {
    let srcElem, nameElem;
    return (
        <div>
            <div hidden={preview}>
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
            </div>

            <div>
                <img src={widget.src}/>
            </div>
        </div>

    )
}


const List = ({widget, widgetNameChanged, widgetTextChanged, listOrderChanged, preview}) => {
    let nameElem, inputElem, selectElem, key = 0;
    return (
        <div>
            <div hidden={preview}>
            <textarea onChange={() => widgetTextChanged(widget.id, inputElem.value)}
                      value={widget.text}
                      ref={node => inputElem = node}
                      placeholder={'List text'}></textarea>
                <input onChange={() => widgetNameChanged(widget.id, nameElem.value)}
                       value={widget.name}
                       ref={node => nameElem = node}
                       placeholder={'Widget Name'}
                />
                <select onChange={() => listOrderChanged(widget.id, selectElem.value)}
                        value={widget.listType}
                        ref={node => selectElem = node}>
                    <option value="ordered">Ordered List</option>
                    <option value="unordered">Unordered List</option>
                </select>
                <h3>Preview</h3>
            </div>
            <div>
                {widget.listType === 'ordered' &&
                <ol>{widget.text.split('\n').map((line) => (<li key={key++}>{line}</li>))}</ol>}
                {widget.listType === 'unordered' &&
                <ul>{widget.text.split('\n').map((line) => (<li key={key++}>{line}</li>))}</ul>}
            </div>

        </div>

    )

}

const Link = ({widget, widgetNameChanged, widgetTextChanged, widgetHrefChanged, preview}) => {
    let nameElem, inputElem, hrefElem;
    return (
        <div>
            <div hidden={preview}>
                <input onChange={() => widgetHrefChanged(widget.id, hrefElem.value)}
                       value={widget.href}
                       ref={node => hrefElem = node}
                       placeholder={'Link URL'}/>
                <input onChange={() => widgetTextChanged(widget.id, inputElem.value)}
                       value={widget.text}
                       ref={node => inputElem = node}
                       placeholder={'Link text'}/>
                <input onChange={() => widgetNameChanged(widget.id, nameElem.value)}
                       value={widget.name}
                       ref={node => nameElem = node}
                       placeholder={'Widget Name'}/>

                <h3>Preview</h3>
            </div>
            <div>
                <a href={widget.href}>{widget.text}</a>
            </div>

        </div>

    )
}

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
    widgetSrcChanged: (widgetId, newSrc) => actions.widgetSrcChanged(dispatch, widgetId, newSrc),
    widgetHrefChanged: (widgetId, newHref) => actions.widgetHrefChanged(dispatch, widgetId, newHref),
    listOrderChanged: (widgetId, newListType) => actions.listOrderChanged(dispatch, widgetId, newListType)
})
const widgetStateToPropsMapper = state => ({
    preview: state.preview
})
const HeadingContainer = connect(widgetStateToPropsMapper, widgetDispatchToPropsMapper)(Heading);

const ParagraphContainer = connect(widgetStateToPropsMapper, widgetDispatchToPropsMapper)(Paragraph);

const ImageContainer = connect(widgetStateToPropsMapper, widgetDispatchToPropsMapper)(Image);

const LinkContainer = connect(widgetStateToPropsMapper, widgetDispatchToPropsMapper)(Link);

const ListContainer = connect(widgetStateToPropsMapper, widgetDispatchToPropsMapper)(List);


const Widget = ({widget, dispatch, lastPosition, preview }) => {
    let selectElement;

    return (
        <ul>
            <div hidden={preview}>
            <div className='list-group-item d-flex justify-content-between align-items-center'>
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
                        <option>Link Widget</option>
                    </select>
                    <button className="btn btn-danger"
                            onClick={
                                e => dispatch({type: DELETE_WIDGET, id: widget.id})
                            }>
                        <i className="fa fa-times"></i>
                    </button>
                </span>
            </div>
            </div>
            <div>
                {widget.widgetType === 'Heading Widget' && <HeadingContainer widget={widget}/>}
                {widget.widgetType === 'Paragraph Widget' && <ParagraphContainer widget={widget}/>}
                {widget.widgetType === 'List Widget' && <ListContainer widget={widget}/>}
                {widget.widgetType === 'Image Widget' && <ImageContainer widget={widget}/>}
                {widget.widgetType === 'Link Widget' && <LinkContainer widget={widget}/>}
            </div>
        </ul>
    )
}

const WidgetContainer = connect(widgetStateToPropsMapper)(Widget);


export default WidgetContainer;
