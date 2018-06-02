import React from 'react';
import { Link } from 'react-router-dom'

class CourseRow extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <tr>
                <td>
                    <Link to={`/course/${this.props.course.id}/edit`}>
                        {this.props.course.title}
                    </Link>
                </td>
                <td>me</td>
                <td>{this.props.course.modified}</td>
                <td>
                    <i className="fa fa-remove" onClick={() => {this.props.delete(this.props.course.id)}}></i>
                </td>
            </tr>
        )
    }
}
export default CourseRow;
