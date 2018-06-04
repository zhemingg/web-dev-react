import React from 'react';

export default class TopicList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            topics:[],
            topic:{title:'New Topic'},
            courseId:'',
            moduleId:'',
            lessonId:''
        };
        this.setCourseId = this.setCourseId.bind(this);
        this.setModuleId = this.setModuleId.bind(this);
        this.setLessonId = this.setLessonId.bind(this);
    }

    componentDidMount() {
        this.setModuleId(this.props.moduleId);
        this.setCourseId(this.props.courseId);
        this.setLessonId(this.props.lessonId);
    }
    componentWillReceiveProps(newProps){
        this.setCourseId(newProps.courseId);
        this.setModuleId(newProps.moduleId);
        this.setLessonId(newProps.lessonId);
    }


    setCourseId(courseId) {
        this.setState({courseId: courseId});
    }

    setModuleId(moduleId) {
        this.setState({moduleId: moduleId});
    }
    setLessonId(lessonId) {
        this.setState({lessonId: lessonId});
    }


    render() {
        return (
            <div className="input-group-append">
                <input className="form-control container-fluid "
                       onChange={this.titleChanged}
                       placeholder="New Topic Title"
                       style={{margin: "10px 5px 10px 10px"}}/>
                <button onClick={this.createLesson} className="btn btn-primary "
                        style={{margin: "5px 10px 10px 5px"}}>
                    <i className="fa fa-plus"></i>
                </button>
            </div>

        )
    }
}
