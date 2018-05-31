import React from 'react';
import CourseRow from '../components/CourseRow';
import CourseService from '../services/CourseService';
class CourseList extends React.Component {
    constructor() {
        super();
        this.courseService = CourseService.instance;
        this.state = {courses: []};
        this.titleChanged = this.titleChanged.bind(this);
        this.createCourse = this.createCourse.bind(this);

    }

    componentDidMount() {
        this.courseService.findAllCourses()
            .then((courses) => {
                this.setState({courses: courses});
            });
    }

    renderCourseRows(){
        let courses = null;
        if(this.state){
            courses = this.state.courses.map(
                function (course) {
                    return <CourseRow key={course.id} course={course}/>
                });
        }
        return courses;

    }
    titleChanged(event) {
        this.setState({
            course: { title: event.target.value }
        });
    }

    createCourse()      {
        console.log("createCourse");
    }

    render() {
        return (
            <div>
                <h2>Course List</h2>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Title</th>
                        </tr>
                        <tr>
                            <th><input id="titleFld" className="form-control"
                                       onChange={this.titleChanged} placeholder="cs101"/></th>
                            <th><button className="btn btn-primary" onClick={this.createCourse}>Add</button></th>
                        </tr>

                    </thead>
                    <tbody>
                        {this.renderCourseRows()}
                    </tbody>
                </table>
            </div>
        )
    }
}
export default CourseList;
