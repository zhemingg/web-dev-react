import React from 'react';

export default class ModuleListItem
    extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <li className="list-group-item" style={{margin:"5px 10px"}}>
                {this.props.title}
                <span className="float-right">
                    <i className="fa fa-trash"></i>
                    <i className="fa fa-pencil"></i>
                 </span>
            </li>
        );
    }
}