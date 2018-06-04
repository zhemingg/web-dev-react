import React from 'react'
import {Link} from 'react-router-dom'

export default class LessonItem extends React.Component {
    constructor(props) {
        super(props);
        console.log(props);

    }

    render() {
        return (
        <ul className='list-group-item nav-link'>
            <Link to={`/course/${this.props.courseId}/edit/module/${this.props.moduleId}/lesson/${this.props.lessonId}`}>
                {this.props.module.title}
            </Link>

            <span className="float-right">
                    <i className="fa fa-trash" onClick={() => {
                        if (window.confirm('Are you sure to delete this module?')) {
                            this.props.delete(this.props.lessonId)
                        }
                    }} style={{color: "red"}}></i>
            </span>
        </ul>
    )
    }
}

