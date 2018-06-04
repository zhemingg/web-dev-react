import React from 'react';
import {Route} from 'react-router-dom';
import LessonTabs from './LessonTabs';
import LessonEditor from './LessonEditor';

class ModuleEditor extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props);
        this.setCourseId = this.setCourseId.bind(this);
        this.setModuleId = this.setModuleId.bind(this);
        this.state = {courseId: '', moduleId: ''}
    }

    componentDidMount() {
        this.setCourseId(this.props.match.params.courseId);
        this.setModuleId(this.props.match.params.moduleId);
        // console.log(this.props.match.params.courseId);
    }

    componentWillReceiveProps(newProps) {
        this.setCourseId(newProps.match.params.courseId);
        this.setModuleId(newProps.match.params.moduleId);
    }

    setCourseId(courseId) {
        console.log(courseId);
        this.setState({courseId: courseId});
    }
    setModuleId(moduleId) {
        this.setState({moduleId: moduleId});
    }


    render() {
        return (
            <div className="container">
                <div>
                    <LessonTabs moduleId={this.state.moduleId} courseId={this.state.courseId}/>
                </div>
                <div className="row">
                    <Route path="/course/:courseId/edit/module/:moduleId/lesson/:lessonId"
                           component={LessonEditor}></Route>
                </div>
            </div>


        );
    }
}

export default ModuleEditor;