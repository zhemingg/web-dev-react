import React from 'react';
import CourseList from './CourseList';
import CourseEditor from './CourseEditor';

require('../styles/CourseManager.Style.css');


class CourseManager extends React.Component {
    render() {
        return (

            <div>
                <nav className="navbar navbar-expand navbar-dark bg-primary sticky-top">
                    <h1 className="navbar-brand">Course Manager</h1>
                    <input id="inputFld" className="form-control" placeholder="New Course Title"></input>
                    <button id="btnFld" className="btn btn-danger my-2 my-sm-0" type="submit">+</button>
                </nav>
                <CourseList/>
            </div>

        );
    }
}

export default CourseManager;
