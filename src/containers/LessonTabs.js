import React from 'react';
import LessonItem from '../components/LessonItem';
import LessonServiceClient from '../services/LessonServiceClient';
import ModuleServiceClient from "../services/ModuleServiceClient";
import CourseServiceClient from "../services/CourseServiceClient";

export default class LessonTabs
    extends React.Component {
    constructor(props) {
        //console.log(props);
        super(props);
        this.state = {
            lesson: {title: 'New Module'},
            lessons: [],
            moduleId: ''
        }

        this.LessonService = LessonServiceClient.instance;
        this.setModuleId = this.setModuleId.bind(this);
        this.deleteLesson = this.deleteLesson.bind(this);
        this.createLesson = this.createLesson.bind(this);
        this.titleChanged = this.titleChanged.bind(this);


    }

    componentDidMount() {
        this.setModuleId(this.props.moduleId);

    }

    componentWillReceiveProps(newProps) {
        this.setModuleId(newProps.moduleId);
        this.findAllLessonsForModule(newProps.moduleId);
    }

    deleteLesson(lessonId) {
        this.LessonService
            .deleteLesson(lessonId)
            .then(() => {
                this.findAllLessonsForModule(this.state.moduleId);
            });

    }

    titleChanged(event) {
        console.log(event.target.value);
        this.setState({lesson: {title: event.target.value}});
    }

    findAllLessonsForModule(moduleId) {
        this.LessonService
            .findAllLessonsForModule(moduleId)
            .then((lessons) => {
                this.setLessons(lessons);
            });
    }

    setLessons(lessons){
        this.setState({lessons:lessons});
    }

    createLesson() {
        console.log(this.state.moduleId);
        console.log(this.state.lesson);
        this.LessonService
            .createLesson(this.state.moduleId, this.state.lesson)
            .then(
                () => this.findAllLessonsForModule(this.state.moduleId)
            )
    }


    // createModule() {
    //     // console.log(this.state.module);
    //     this.ModuleService
    //         .createModule(this.props.courseId, this.state.module)
    //         .then(
    //             () => {this.findAllModulesForCourse(this.state.courseId)}
    //         )
    //
    // }


    renderTabOfLesson() {
        let lessons = this.state.lessons.map(

            (lesson) => {
                return (<LessonItem key={lesson.id} lesson={this.state.lesson}
                                    moduleId={this.moduleId} delete={this.deleteLesson}
                                    lessonId={lesson.id}/>)
            }
        );
        console.log(lessons);
        return lessons;
    }

    setModuleId(moduleId) {
        this.setState({moduleId: moduleId});
    }



    render() {
        return (
            <div>
                {console.log(this.state.lessons)}
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