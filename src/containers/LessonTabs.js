import React from 'react'
import LessonItem from '../components/LessonItem'

export default class LessonTabs
    extends React.Component {
    constructor(props) {
        console.log(props);
        super(props);
        this.state = {
            lesson: {title: 'New Module'},
            lessons: []
        }


    }

    renderTabOfLesson() {
        let lessons = this.state.lessons.map(
            (lesson) => {
                return (<LessonItem key={lesson.id} lesson={this.state.lesson}
                                    courseId={this.props.match.params.courseId}
                                    moduleId={this.props.match.params.moduleId}/>)
            }
        );
        return lessons;
    }

    render() {
        return (
            <div>
                <div className="input-group-append">
                    <input className="form-control container-fluid "
                           onChange={this.titleChanged}
                           placeholder="New Lesson Title"
                           style={{margin: "10px 5px 10px 10px"}}/>
                    <button onClick={this.createLesson} className="btn btn-primary "
                            style={{margin: "5px 10px 10px 5px"}}>
                        <i className="fa fa-plus"></i>
                    </button>
                </div>
                <div>
                    <ul className="nav nav-tabs" style={{marginTop: "10px"}}>
                        {this.renderTabOfLesson()}
                    </ul>
                </div>
            </div>

        );
    }
}