import React from 'react';
import LessonItem from '../components/LessonItem';
import LessonServiceClient from '../services/LessonServiceClient';
import ModuleServiceClient from "../services/ModuleServiceClient";
import CourseServiceClient from "../services/CourseServiceClient";

export default class LessonTabs
    extends React.Component {
    constructor(props) {
        console.log('he');
        console.log(props);
        super(props);
        this.state = {
            lesson: {title: 'New Module'},
            lessons: [],
            moduleId: '',
            courseId:'',
            selectedLesson:''
        }

        this.LessonService = LessonServiceClient.instance;
        this.setModuleId = this.setModuleId.bind(this);
        this.deleteLesson = this.deleteLesson.bind(this);
        this.createLesson = this.createLesson.bind(this);
        this.titleChanged = this.titleChanged.bind(this);
        this.setCourseId = this.setCourseId.bind(this);
        this.setSelectedLesson = this.setSelectedLesson.bind(this);


    }

    componentDidMount() {
        //console.log(this.props.courseId);

        this.setModuleId(this.props.moduleId);
        this.setCourseId(this.props.courseId);

    }

    componentWillReceiveProps(newProps) {

        // console.log(newProps.courseId);
        this.setCourseId(newProps.courseId);
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

    setSelectedLesson(lessonId){
        this.setState({selectedLesson:lessonId});
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

    setCourseId(courseId){

        this.setState({courseId: courseId});
    }




    renderTabOfLesson() {
        //console.log(this.state);
        let lessons = this.state.lessons.map(

            (lesson) => {
                return (<LessonItem key={lesson.id} lesson={lesson}
                                    moduleId={this.state.moduleId} delete={this.deleteLesson}
                                    lessonId={lesson.id} courseId={this.state.courseId}
                                    selectedLesson = {this.state.selectedLesson}
                                    selectFunction = {this.setSelectedLesson}/>)
            }
        );
        //console.log(lessons);
        return lessons;
    }

    setModuleId(moduleId) {
        this.setState({moduleId: moduleId});
    }



    render() {
        return (
            <div>
                <div className="input-group-append">
                    <input className="form-control container-fluid"
                           onChange={this.titleChanged}
                           placeholder="New Lesson Title"
                           style={{margin: "10px 5px 10px 0px"}}/>
                    <button onClick={this.createLesson} className="btn btn-primary "
                            style={{margin: "5px 10px 10px 5px"}}>
                        <i className="fa fa-plus"></i>
                    </button>
                </div>
                <div>
                    <ul className="nav nav-pills" style={{marginTop: "10px", marginRight: "5px"}}>
                        {this.renderTabOfLesson()}
                    </ul>
                </div>
            </div>

        );
    }
}