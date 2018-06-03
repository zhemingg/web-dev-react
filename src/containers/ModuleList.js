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
            module: {title: ''},
            modules: [
                {title: 'Module 1 - jQuery', id: 123},
                {title: 'Module 2 - React', id: 234},
                {title: 'Module 3 - Redux', id: 345},
                {title: 'Module 4 - Angular', id: 456},
                {title: 'Module 5 - Node.js', id: 567},
                {title: 'Module 6 - MongoDB', id: 678}
            ]
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
    }

    createModule(event) {
        //console.log(this.state.module);
        this.ModuleService
            .createModule(this.props.courseId, this.state.module);

    }

    titleChanged(event) {
        //console.log(event.target.value);
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
                console.log(course);
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