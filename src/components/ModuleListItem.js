import React from 'react';

export default class ModuleListItem
    extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <li className="list-group-item" style={{margin: "5px 10px"}}>
                {this.props.title}
                <span className="float-right">
                    <i className="fa fa-trash" onClick={() =>{
                        if(window.confirm('Are you sure to delete this module?')){
                            this.props.delete(this.props.moduleId)
                        }}} style={{color:"red"}}></i>
                 </span>
            </li>
        );

    }
}