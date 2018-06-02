import React from 'react';
import CourseRow from '../components/CourseRow';
import CourseService from '../services/CourseService';
import {BrowserRouter as Router, Route} from 'react-router-dom';

class CourseList extends React.Component {
    constructor() {
        super();
        this.courseService = CourseService.instance;
        this.state = {courses: []};
        this.titleChanged = this.titleChanged.bind(this);
        this.createCourse = this.createCourse.bind(this);

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
            courses = this.state.courses.map(
                function (course) {
                    return <CourseRow key={course.id} course={course}/>
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

    render() {
        return (

            // {/*<Router>*/}
            // {/*<div className="container-fluid">*/}
            // {/*<h1>Course Manager</h1>*/}
            // {/*<Route path='/courses' component={CourseList}></Route>*/}
            // {/*<Route path="/course/:courseId/edit"*/}
            // {/*component={CourseEditor}>*/}
            // {/*</Route>*/}
            // {/*</div>*/}
            // {/*</Router>*/}
            <Router>
                <div className="container-fluid">
                    <table className="table">
                        <thead>
                        <tr>
                            <th>Title</th>
                            <th>Owned By</th>
                            <th>Last Modified By Me</th>
                            {/*<th><input id="titleFld" className="form-control"*/}
                            {/*onChange={this.titleChanged} placeholder="cs101"/></th>*/}
                            {/*<th>*/}
                            {/*<button className="btn btn-primary" onClick={this.createCourse}>Add</button>*/}
                            {/*</th>*/}
                            <th>&nbsp;</th>
                        </tr>

                        {console.log('hello')}
                        </thead>
                        <tbody>
                        {this.renderCourseRows()}
                        </tbody>
                    </table>
                </div>
            </Router>

        )
    }
}

export default CourseList;
