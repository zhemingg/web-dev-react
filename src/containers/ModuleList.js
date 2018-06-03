import React from 'react';
import ModuleListItem from '../components/ModuleListItem';
import ModuleService from '../services/ModuleService';
import CourseService from "../services/CourseService";

class ModuleList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            courseId: '',
            course: '',
            module: {title: 'New Module'},
            modules: []
        };

        this.titleChanged = this.titleChanged.bind(this);
        this.createModule = this.createModule.bind(this);
        this.setCourseId = this.setCourseId.bind(this);
        this.ModuleService = ModuleService.instance;
        this.CourseService = CourseService.instance;

        this.setCourse = this.setCourse.bind(this);
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

    titleChanged(event) {
        console.log(event.target.value);
        this.setState({module: {title: event.target.value}});
    }

    renderListOfModules() {
        let modules = this.state.modules.map(function (module) {
            return <ModuleListItem key={module.id} title={module.title}/>
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
        // this.setState({course: });
    }

    setModules(modules) {
        this.setState({modules: modules})
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
            <div className="bg-secondary">
                <nav id="moduleListNav" className="navbar navbar-expand navbar-dark bg-primary sticky-top"
                     style={{margin: "10px 0px 5px 0px"}}>
                    <button id="btnFld" className="btn btn-danger my-2 my-sm-0" onClick={this.createCourse}>Back
                    </button>
                    <h2 style={{color: "white"}}>Editing Course: {this.state.course.title}</h2>
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