import React from 'react'
import {Link} from 'react-router-dom'

export default class LessonItem extends React.Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            style:{marginRight:"5px", backgroundColor: 'white'}
        }

    }

    componentWillReceiveProps(newProps) {
        if (newProps.selectedLesson === this.props.lessonId) {
            this.setState({style:{marginRight: "5px", backgroundColor:'#E0FFFF'}});
        } else {
            this.setState({style:{marginRight:"5px", backgroundColor: 'white'}});
        }
    }

    render() {
        return (
        <ul className='list-group-item nav-link' style={this.state.style}
            onClick={
            () => {
                this.props.selectFunction(this.props.lessonId);
            }}>
            <Link to={`/course/${this.props.courseId}/edit/module/${this.props.moduleId}/lesson/${this.props.lessonId}`}>
                {this.props.lesson.title}
            </Link>

            <span className="float-right">
                    <i className="fa fa-trash" onClick={() => {
                        if (window.confirm('Are you sure to delete this Lesson?')) {
                            this.props.delete(this.props.lessonId)
                        }
                    }} style={{color: "red"}}></i>
            </span>
        </ul>
    )
    }
}

