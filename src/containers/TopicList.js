import React from 'react';
import TopicServiceClient from '../services/TopicServiceClient';

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
        this.TopicService = TopicServiceClient.instance;
        this.setCourseId = this.setCourseId.bind(this);
        this.setModuleId = this.setModuleId.bind(this);
        this.setLessonId = this.setLessonId.bind(this);

        this.titleChanged = this.titleChanged.bind(this);
        this.createTopic = this.createTopic.bind(this);

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

    createTopic (){
        // if (this.state.topic.title === ''){
        //     this.setState({topic : {title : "New Topic"}});
        // }
        this.TopicService
            .createTopic( this.state.lessonId, this.state.topic);
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

    titleChanged(event) {
        console.log(event.target.value);
        this.setState({lesson: {title: event.target.value}});
    }


    render() {
        return (
            <div className="input-group-append">
                <input className="form-control container-fluid "
                       onChange={this.titleChanged}
                       placeholder="New Topic Title"
                       style={{margin: "10px 5px 10px 10px"}}/>
                <button onClick={this.createTopic} className="btn btn-primary "
                        style={{margin: "5px 10px 10px 5px"}}>
                    <i className="fa fa-plus"></i>
                </button>
            </div>

        )
    }
}
