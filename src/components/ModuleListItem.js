import React from 'react';
import {Link} from 'react-router-dom'


export default class ModuleListItem
    extends React.Component {
    constructor(props) {
        super(props);
        this.state = {styleOfList: {margin: "5px 10px", backgroundColor: 'white'}}
        // this.setStateActive = this.setStateActive.bind(this);
        // this.setStateBack = this.setStateBack.bind(this);
    }

    componentWillReceiveProps(newProps) {
        //console.log(newProps);
        if (newProps.selectedModuleId === this.props.moduleId) {
            this.setState({styleOfList: {margin: "5px 10px", backgroundColor: '#E0FFFF'}});
        } else {
            this.setState({styleOfList: {margin: "5px 10px", backgroundColor: 'white'}});
        }
    }

    // setStateActive (){
    //     this.state.styleOfList = {margin: "5px 10px", backgroundColor: "#E0FFFF"};
    //     this.setState({styleOfList: {margin: "5px 10px", backgroundColor: 'white'}});
    // }
    // setStateBack(){
    //     this.state.styleOfList = {margin: "5px 10px", backgroundColor: 'white'};
    // }


    render() {

        return (
            <li className='list-group-item' style={this.state.styleOfList}>
                <Link
                    onClick={
                        () => {
                            // console.log(this.props.moduleId);
                            this.props.selecteModule(this.props.moduleId);
                        }}
                    to={`/course/${this.props.courseId}/edit/module/${this.props.moduleId}`}
                >
                    {this.props.title}
                </Link>

                <span className="float-right">
                    <i className="fa fa-trash" onClick={() => {
                        if (window.confirm('Are you sure to delete this module?')) {
                            this.props.delete(this.props.moduleId)
                        }
                    }} style={{color: "red"}}></i>
                 </span>
            </li>
        );


    }
}