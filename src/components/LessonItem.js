import React from 'react'
import {Link} from 'react-router-dom'

export default class LessonItem extends React.Component{
    constructor(props){
        super(props);
        console.log(props);

    }

    render() {
        return (
            <li className="nav-link">
                <Link to={`/course/${this.props.courseId}/edit/module/${this.props.moduleId}/lesson/${this.props.lessonId}`}>{this.props.module.title}</Link>
            </li>
        )
    }
}

