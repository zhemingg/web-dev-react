import React from 'react';
import ModuleList from './ModuleList'
import LessonTabs from './LessonTabs'
import { Route} from 'react-router-dom'
import ModuleEditor from "./ModuleEditor";

class CourseEditor extends React.Component {
    constructor(props) {
        super(props);
        this.selectCourse = this.selectCourse.bind(this);
        this.state = {courseId: ''};
    }

    selectCourse(courseId) {
        this.setState({courseId: courseId});
    }

    componentDidMount() {
        this.selectCourse(this.props.match.params.courseId);
    }


    render() {
        return (
                <div className="bg-secondary">
                    <div className="row">
                        <div className="col-4">
                            <ModuleList courseId={this.state.courseId}/>
                        </div>

                        <div className="col-8">
                            <Route path="/course/:courseId/edit/module/:moduleId"
                                   component={ModuleEditor}></Route>
                        </div>

                    </div>
                </div>
        );
    }
}

export default CourseEditor;