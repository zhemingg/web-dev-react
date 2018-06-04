import React from 'react'
import LessonItem from '../components/LessonItem'

export default class LessonTabs
    extends React.Component {
    constructor(props) {
        console.log('new');
        console.log(props);
        super(props);
        this.state = {
            lesson: {title: 'New Module'},
            lessons: [],
            moduleId : '1'
        }


        this.setModuleId.bind(this);

    }
    componentDidMount() {
        this.setModuleId(this.props.moduleId);
        console.log(this.state.moduleId);
        console.log('did');
    }
    componentWillReceiveProps(newProps){
        console.log(newProps);
       this.setModuleId(newProps.moduleId);
    }


    renderTabOfLesson() {
        let lessons = this.state.lessons.map(
            (lesson) => {
                return (<LessonItem key={lesson.id} lesson={this.state.lesson}
                                    courseId={this.props.match.params.courseId}
                                    moduleId={this.props.match.params.moduleId}/>)
            }
        );
        return lessons;
    }

    setModuleId(moduleId){
        this.setState({moduleId: moduleId});
    }

    render() {
        return (
            <div>
                <h4>{this.state.moduleId}123</h4>
                {console.log(this.state)}
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