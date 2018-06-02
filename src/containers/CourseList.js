import React from 'react';
import CourseRow from '../components/CourseRow';
import CourseService from '../services/CourseService';

class CourseList extends React.Component {
    constructor(props) {
        super(props);
        this.courseService = CourseService.instance;
        this.state = {courses: []};
        this.titleChanged = this.titleChanged.bind(this);
        this.createCourse = this.createCourse.bind(this);
        this.deleteCourse = this.deleteCourse.bind(this);

    }

    componentDidMount() {
        this.findAllCourses()

    }

    findAllCourses() {
        this.courseService.findAllCourses()
            .then((courses) => {
                this.setState({courses: courses});
            });

    }

    renderCourseRows() {
        let courses = null;
        if (this.state) {
            courses = this.state.courses.map((course) => {
                return <CourseRow course={course} key={course.id}
                                  delete={this.deleteCourse}/>

            });
        }
        return courses;

    }

    titleChanged(event) {
        this.setState({
            course: {title: event.target.value}
        });
    }

    createCourse() {
        this.courseService
            .createCourse(this.state.course)
            .then(() => {
                this.findAllCourses();
            });
    }

    deleteCourse(courseId) {
        this.courseService
            .deleteCourse(courseId)
            .then(() => {
                this.findAllCourses();
            });
    }


    render() {
        return (
            <div>
                <nav className="navbar navbar-expand navbar-dark bg-primary sticky-top">
                    <h1 className="navbar-brand">Course Manager</h1>
                    <input id="titleFld" className="form-control" onChange={this.titleChanged}
                           placeholder="New Course Title"></input>
                    <button id="btnFld" className="btn btn-danger my-2 my-sm-0" onClick={this.createCourse}>+
                    </button>
                </nav>
                <div className="container-fluid">
                    <table className="table">
                        <thead>
                        <tr>
                            <th>Title</th>
                            <th>Owned By</th>
                            <th>Last Modified By Me</th>
                            <th>&nbsp;</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.renderCourseRows()}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default CourseList;
