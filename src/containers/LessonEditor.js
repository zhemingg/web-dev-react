import React from 'react';
import TopicList from "./TopicList";
import TopicEditor from  './TopicEditor';
import {Route} from 'react-router-dom';

class LessonEditor extends React.Component {
    constructor(props) {
        super(props);
        //console.log(props);
        this.state = {courseId:'', moduleId: '', lessonId: ''};
        this.setLessonId = this.setLessonId.bind(this);
        this.setModuleId = this.setModuleId.bind(this);
        this.setCourseId = this.setCourseId.bind(this);

    }

    componentDidMount() {
        this.setLessonId(this.props.match.params.lessonId);
        this.setModuleId(this.props.match.params.moduleId);
        this.setCourseId(this.props.match.params.courseId);
    }

    componentWillReceiveProps(newProps) {
        this.setCourseId(newProps.match.params.courseId);
        this.setModuleId(newProps.match.params.moduleId);
        this.setLessonId(newProps.match.params.lessonId);
    }

    setCourseId(courseId){
        this.setState({courseId: courseId});
    }

    setModuleId(moduleId) {
        this.setState({moduleId: moduleId});
    }

    setLessonId(lessonId) {
        this.setState({lessonId: lessonId});
    }

//
//
    render() {
        return (
            <div className="container">
                <div>
                    <TopicList moduleId={this.state.moduleId} courseId={this.state.courseId} lessonId={this.state.lessonId}/>
                </div>
                <div className="row">
                    <Route path="/course/:courseId/edit/module/:moduleId/lesson/:lessonId/topic/:topicId"
                           component={TopicEditor}></Route>
                </div>
            </div>
        );
    }
}

export default LessonEditor;