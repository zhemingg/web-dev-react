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
                <td>time</td>
                <td>
                    <i className="fa fa-remove"></i>
                </td>
            </tr>
        )
    }
}
export default CourseRow;
