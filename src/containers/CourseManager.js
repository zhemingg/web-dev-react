import React from 'react';
import CourseList from './CourseList';
import CourseEditor from './CourseEditor';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'

require('../styles/CourseManager.Style.css');


class CourseManager extends React.Component {
    render() {
        return (
            <Router>
                <div>
                    <Route exact path="/"
                           component={CourseList}>
                    </Route>
                    <Route path="/course/:courseId/edit"
                           component={CourseEditor}>
                    </Route>
                </div>
            </Router>
        )
    }
}

export default CourseManager;
