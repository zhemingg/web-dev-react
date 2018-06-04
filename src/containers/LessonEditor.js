import React from 'react';
import LessonTab from './LessonTabs'
// import LessonTabs from './LessonTabs'
// import { Route} from 'react-router-dom'
//
class LessonEditor extends React.Component {
    constructor(props) {
        super(props);
        console.log(props);
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
            <h3>Lesson Editor</h3>
//             <div className="bg-secondary">
//                 <div className="row">
//                     <div className="col-4">
//                         <ModuleList courseId={this.state.courseId}/>
//                     </div>
//
//                     <div className="col-8">
//                         <Route path="/course/:courseId/edit/module/:moduleId/lesson"
//                                component={LessonTabs}></Route>
//                     </div>
//
//                 </div>
//             </div>
        );
    }
}

export default LessonEditor;