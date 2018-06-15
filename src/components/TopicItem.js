import React from 'react'
import {Link} from 'react-router-dom'

export default class TopicItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ul className='list-group-item nav-link'>
                <Link
                    to={`/course/${this.props.courseId}/edit/module/${this.props.moduleId}/lesson/${this.props.lessonId}/topic/${this.props.topicId}`}>
                    {this.props.topic.title}
                </Link>

                <span className="float-right">
                    <i className="fa fa-trash" onClick={() => {
                        if (window.confirm('Are you sure to delete this topic?')) {
                            this.props.delete(this.props.topicId)
                        }
                    }} style={{color: "red"}}></i>
                </span>
            </ul>
        )
    }
}