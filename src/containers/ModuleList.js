import React from 'react';
import ModuleListItem from '../components/ModuleListItem';
import ModuleServiceClient from '../services/ModuleServiceClient';
import CourseServiceClient from "../services/CourseServiceClient";

class ModuleList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            courseId: '',
            course: '',
            module: {title: 'New Module', selectedId : ''},
            modules: [],
            selectedModule:''
        };

        this.titleChanged = this.titleChanged.bind(this);
        this.createModule = this.createModule.bind(this);
        this.setCourseId = this.setCourseId.bind(this);
        this.ModuleService = ModuleServiceClient.instance;
        this.CourseService = CourseServiceClient.instance;
        this.selectModule = this.selectModule.bind(this);
        this.setCourse = this.setCourse.bind(this);
        this.deleteModule = this.deleteModule.bind(this);
       // this.renderListOfModules = this.renderListOfModules.bind(this);
    }

    componentWillReceiveProps(newProps) {
        // console.log('...');
        this.setCourseId(newProps.courseId);
        this.setCourse(newProps.courseId);
        this.findAllModulesForCourse(newProps.courseId)
    }

    createModule(event) {
        console.log(this.state.module);
        this.ModuleService
            .createModule(this.props.courseId, this.state.module)
            .then(
                () => {this.findAllModulesForCourse(this.state.courseId)}
            )

    }

    deleteModule(moduleId) {
        this.ModuleService
            .deleteModule(moduleId)
            .then(() => {
                this.findAllModulesForCourse
                (this.state.courseId)
            });


    }

    titleChanged(event) {
        console.log(event.target.value);
        this.setState({module: {title: event.target.value}});
    }

    renderListOfModules() {
        let modules = this.state.modules.map((module) => {
            return <ModuleListItem key={module.id}
                                   title={module.title}
                                   selecteModule={this.selectModule}
                                   moduleId = {module.id}
                                   courseId = {this.state.courseId}
                                   delete={this.deleteModule}
                                   selectedModuleId={this.state.selectedModule}/>
        });
        return modules;
    }

    setCourseId(courseId) {
        this.setState({courseId: courseId});
    }

    setCourse(courseId) {
        this.CourseService
            .findCourseById(courseId).then(
            (course) => {
                //console.log(course);
                this.setState({
                    course: course
                })
            }
        )
    }

    setModules(modules) {
        this.setState({modules: modules})
    }

    selectModule(moduleId){
        //console.log(moduleId);
        this.setState({selectedModule: moduleId})
    }

    findAllModulesForCourse(courseId) {
        this.ModuleService
            .findAllModulesForCourse(courseId)
            .then((modules) => {
                this.setModules(modules)
            });
    }


    render() {
        return (
            <div>
                <nav id="moduleListNav" className="navbar navbar-expand navbar-dark bg-primary sticky-top"
                     style={{margin: "10px 5px 5px 0px"}}>
                    <button id="btnFld" className="btn btn-danger my-2 my-sm-0" onClick={this.createCourse}>Back
                    </button>
                    <h2 style={{color: "white"}}>{this.state.course.title}</h2>
                </nav>

                <ul className="list-group">
                    {this.renderListOfModules()}
                </ul>
                <div className="input-group-append">
                    <input className="form-control container-fluid "
                           onChange={this.titleChanged}
                           placeholder="New Module Title"
                           style={{margin:"5px 5px 10px 10px"}} />
                    <button onClick={this.createModule} className="btn btn-primary " style={{margin:"5px 10px 10px 5px"}}>
                        <i className="fa fa-plus"></i>
                    </button>
                </div>

            </div>
        )
    }
}

export default ModuleList;