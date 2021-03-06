import React from 'react';
import {connect} from 'react-redux'
import * as actions from '../actions/index'
import {DELETE_WIDGET, EDIT} from "../constants/index"

function isHidden(preview, edit){
   if (preview === false)
       return false;
   else {
       console.log(edit);
       return !edit;
   }
}




const Heading = ({widget, preview, widgetTextChanged, headingSizeChanged, widgetNameChanged}) => {
    let inputElem, selectElem, nameElem;


    return (
        <div className='bg-white'
             style={{marginLeft: '10px', marginRight: '10px', paddingBottom: '10px', marginBottom: '1px'}}>
            <div hidden={isHidden(preview, widget.edit)}>
                <div className='row'>
                    <label htmlFor={widget.id + 'text'} className='col-sm-2 col-form-label'>Heading Text</label>
                    <div className="col-sm-10">
                        <input onChange={() => {
                            widgetTextChanged(widget.id, inputElem.value)
                        }}
                               value={widget.text}
                               ref={node => inputElem = node}
                               placeholder={'Heading text'}
                               className='form-control container-fluid'
                               style={{marginTop: '5px', marginBottom: '5px'}}
                               id={widget.id + 'text'}
                        />
                    </div>
                </div>
                <div className='row'>
                    <label htmlFor={widget.id + 'select'} className='col-sm-2 col-form-label'>Heading Size</label>
                    <div className="col-sm-10">
                        <select onChange={() => headingSizeChanged(widget.id, selectElem.value)}
                                value={widget.size}
                                ref={node => selectElem = node}
                                style={{marginTop: '5px', marginBottom: '5px'}}
                                id={widget.id + 'select'}
                                className='form-control container-fluid'>
                            <option value="1">Heading Size 1</option>
                            <option value="2">Heading Size 2</option>
                            <option value="3">Heading Size 3</option>
                        </select>
                    </div>
                </div>
                <div className='row'>
                    <label htmlFor={widget.id + 'name'} className='col-sm-2 col-form-label'>Widget Name</label>
                    <div className="col-sm-10">
                        <input onChange={() => widgetNameChanged(widget.id, nameElem.value)}
                               value={widget.name}
                               ref={node => nameElem = node}
                               placeholder={'Widget Name'}
                               style={{marginTop: '5px', marginBottom: '5px'}}
                               className='form-control container-fluid'
                               id={widget.id + 'name'}
                        />
                    </div>
                </div>
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
        <div style={{marginLeft: '10px', marginRight: '10px', paddingBottom: '10px', marginBottom: '1px'}}>
            <div hidden={isHidden(preview, widget.edit)}>
                <div className='row'>
                    <label htmlFor={widget.id + 'text'} className='col-sm-2 col-form-label'>Paragraph Text</label>
                    <div className="col-sm-10">
                    <textarea onChange={() => widgetTextChanged(widget.id, inputElem.value)}
                              value={widget.text}
                              ref={node => inputElem = node}
                              placeholder={'Paragraph text'}
                              className='form-control container-fluid'
                              id={widget.id + 'text'}
                              style={{marginTop: '5px', marginBottom: '5px'}}></textarea>
                    </div>
                </div>
                <div className='row'>
                    <label htmlFor={widget.id + 'name'} className='col-sm-2 col-form-label'>Widget Name</label>
                    <div className="col-sm-10">
                        <input onChange={() => widgetNameChanged(widget.id, nameElem.value)}
                               value={widget.name}
                               ref={node => nameElem = node}
                               placeholder={'Widget Name'}
                               className='form-control container-fluid'
                               style={{marginTop: '5px', marginBottom: '5px'}}
                               id={widget.id + 'name'}
                        />
                    </div>
                </div>
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
        <div style={{marginLeft: '10px', marginRight: '10px', paddingBottom: '10px', marginBottom: '1px'}}>
            <div hidden={isHidden(preview, widget.edit)}>
                <div className='row'>
                    <label htmlFor={widget.id + 'img'} className='col-sm-2 col-form-label'>Image Src</label>
                    <div className="col-sm-10">
                        <input onChange={() => widgetSrcChanged(widget.id, srcElem.value)}
                               value={widget.src}
                               ref={node => srcElem = node}
                               className='form-control container-fluid'
                               style={{marginTop: '5px', marginBottom: '5px'}}
                               id={widget.id + 'img'}
                               placeholder='Image URL'/>
                    </div>
                </div>
                <div className='row'>
                    <label htmlFor={widget.id + 'name'} className='col-sm-2 col-form-label'>Widget Name</label>
                    <div className="col-sm-10">
                        <input onChange={() => widgetNameChanged(widget.id, nameElem.value)}
                               value={widget.name}
                               ref={node => nameElem = node}
                               placeholder={'Widget Name'}
                               className='form-control container-fluid'
                               style={{marginTop: '5px', marginBottom: '5px'}}
                               id={widget.id + 'name'}
                        />
                    </div>
                </div>
                <h3>Preview</h3>
            </div>

            <div>
                <img src={widget.src}/>
            </div>
        </div>

    )
}


const List = ({widget, widgetNameChanged, widgetListItemsChanged, listOrderChanged, preview}) => {
    let nameElem, inputElem, selectElem, key = 0;
    return (
        <div style={{marginLeft: '10px', marginRight: '10px', paddingBottom: '10px', marginBottom: '1px'}}>
            <div hidden={isHidden(preview, widget.edit)}>
                <div className='row'>
                    <label htmlFor={widget.id + 'list'} className='col-sm-2 col-form-label'>List Text</label>
                    <div className="col-sm-10">
                    <textarea onChange={() => widgetListItemsChanged(widget.id, inputElem.value)}
                              value={widget.listItems}
                              ref={node => inputElem = node}
                              className='form-control container-fluid'
                              id={widget.id + 'list'}
                              style={{marginTop: '5px', marginBottom: '5px'}}
                              placeholder={'List text'}></textarea>
                    </div>
                </div>
                <div className='row'>
                    <label htmlFor={widget.id + 'name'} className='col-sm-2 col-form-label'>Widget Name</label>
                    <div className="col-sm-10">
                        <input onChange={() => widgetNameChanged(widget.id, nameElem.value)}
                               value={widget.name}
                               ref={node => nameElem = node}
                               placeholder={'Widget Name'}
                               className='form-control container-fluid'
                               style={{marginTop: '5px', marginBottom: '5px'}}
                               id={widget.id + 'name'}
                        />
                    </div>
                </div>

                <div className='row'>
                    <label htmlFor={widget.id + 'select'} className='col-sm-2 col-form-label'>Link URL</label>
                    <div className="col-sm-10">
                <select onChange={() => listOrderChanged(widget.id, selectElem.value)}
                        value={widget.listType}
                        className='form-control container-fluid'
                        id={widget.id + 'select'}
                        style={{marginTop: '5px', marginBottom: '5px'}}
                        ref={node => selectElem = node}>
                    <option value="ordered">Ordered List</option>
                    <option value="unordered">Unordered List</option>
                </select>
                    </div>
                </div>
                <h3>Preview</h3>
            </div>
            <div>
                {widget.listType === 'ordered' && widget.listItems !== '' &&
                <ol>{widget.listItems.split('\n').map((line) => (<li key={key++}>{line}</li>))}</ol>}
                {widget.listType === 'unordered' && widget.listItems !== '' &&
                <ul>{widget.listItems.split('\n').map((line) => (<li key={key++}>{line}</li>))}</ul>}
            </div>

        </div>

    )

}

const Link = ({widget, widgetNameChanged, widgetTextChanged, widgetHrefChanged, preview}) => {
    let nameElem, inputElem, hrefElem;
    return (
        <div style={{marginLeft: '10px', marginRight: '10px', paddingBottom: '10px', marginBottom: '1px'}}>
            <div hidden={isHidden(preview, widget.edit)}>
                <div className='row'>
                    <label htmlFor={widget.id + 'url'} className='col-sm-2 col-form-label'>Link URL</label>
                    <div className="col-sm-10">
                        <input onChange={() => widgetHrefChanged(widget.id, hrefElem.value)}
                               value={widget.href}
                               ref={node => hrefElem = node}
                               className='form-control container-fluid'
                               style={{marginTop: '5px', marginBottom: '5px'}}
                               id={widget.id + 'url'}
                               placeholder={'Link URL'}/>
                    </div>
                </div>
                <div className='row'>
                    <label htmlFor={widget.id + 'text'} className='col-sm-2 col-form-label'>Link Text</label>
                    <div className="col-sm-10">
                        <input onChange={() => widgetTextChanged(widget.id, inputElem.value)}
                               value={widget.text}
                               ref={node => inputElem = node}
                               className='form-control container-fluid'
                               style={{marginTop: '5px', marginBottom: '5px'}}
                               id={widget.id + 'text'}
                               placeholder={'Link text'}/>
                    </div>
                </div>
                <div className='row'>
                    <label htmlFor={widget.id + 'name'} className='col-sm-2 col-form-label'>Link URL</label>
                    <div className="col-sm-10">
                <input onChange={() => widgetNameChanged(widget.id, nameElem.value)}
                       value={widget.name}
                       ref={node => nameElem = node}
                       className='form-control container-fluid'
                       id={widget.id+'name'}
                       style={{marginTop: '5px', marginBottom: '5px'}}
                       placeholder={'Widget Name'}/>
                    </div>
                </div>

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
    listOrderChanged: (widgetId, newListType) => actions.listOrderChanged(dispatch, widgetId, newListType),
    widgetListItemsChanged : (widgetId, newListItems) => actions.widgetListItemsChanged(dispatch, widgetId, newListItems),
})
const widgetStateToPropsMapper = state => ({
    preview: state.preview
})
const HeadingContainer = connect(widgetStateToPropsMapper, widgetDispatchToPropsMapper)(Heading);

const ParagraphContainer = connect(widgetStateToPropsMapper, widgetDispatchToPropsMapper)(Paragraph);

const ImageContainer = connect(widgetStateToPropsMapper, widgetDispatchToPropsMapper)(Image);

const LinkContainer = connect(widgetStateToPropsMapper, widgetDispatchToPropsMapper)(Link);

const ListContainer = connect(widgetStateToPropsMapper, widgetDispatchToPropsMapper)(List);


const Widget = ({widget, dispatch, lastPosition, preview}) => {
    let selectElement;

    return (
        <div className='bg-white'>
            <div hidden={preview}>
                <div className='row'>
                    <div className='col-6'>
                        <strong><h3 style={{padding: '5px 5px 5px 10px'}}>{widget.widgetType}</h3></strong>
                    </div>
                    <div className='col-6'>
                        <div className="float-right">
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
                                    style={{marginRight: '5px', backgroundColor: 'white'}}>
                                <option>Heading Widget</option>
                                <option>Paragraph Widget</option>
                                <option>List Widget</option>
                                <option>Image Widget</option>
                                <option>Link Widget</option>
                            </select>
                            <button className="btn btn-danger"
                                    onClick={
                                        e => dispatch({type: DELETE_WIDGET, id: widget.id})
                                    }
                                    style={{margin: '5px 10px 5px 0px'}}>
                                <i className="fa fa-times"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div hidden={!preview}>
                <button className='btn btn-primary' style={{marginLeft:'10px', marginTop: '10px'}}
                onClick={e => dispatch({type: EDIT, id: widget.id})}><i className='fa fa-edit'></i></button>
            </div>

            <div>
                {widget.widgetType === 'Heading Widget' && <HeadingContainer widget={widget}/>}
                {widget.widgetType === 'Paragraph Widget' && <ParagraphContainer widget={widget}/>}
                {widget.widgetType === 'List Widget' && <ListContainer widget={widget}/>}
                {widget.widgetType === 'Image Widget' && <ImageContainer widget={widget}/>}
                {widget.widgetType === 'Link Widget' && <LinkContainer widget={widget}/>}
            </div>
        </div>
    )
}

const WidgetContainer = connect(widgetStateToPropsMapper)(Widget);


export default WidgetContainer;
