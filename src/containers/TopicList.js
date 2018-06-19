import React from 'react';
import TopicServiceClient from '../services/TopicServiceClient';
import TopicItem from '../components/TopicItem'

export default class TopicList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            topics: [],
            topic: {title: 'New Topic'},
            courseId: '',
            moduleId: '',
            lessonId: '',
            selectedTopic:''

        };
        this.TopicService = TopicServiceClient.instance;
        this.setCourseId = this.setCourseId.bind(this);
        this.setModuleId = this.setModuleId.bind(this);
        this.setLessonId = this.setLessonId.bind(this);
        this.setTopics = this.setTopics.bind(this);

        this.titleChanged = this.titleChanged.bind(this);
        this.createTopic = this.createTopic.bind(this);
        this.deleteTopic = this.deleteTopic.bind(this);
        this.setSelectedTopic = this.setSelectedTopic.bind(this);

    }

    componentDidMount() {
        this.setModuleId(this.props.moduleId);
        this.setCourseId(this.props.courseId);
        this.setLessonId(this.props.lessonId);
    }

    componentWillReceiveProps(newProps) {
        this.setCourseId(newProps.courseId);
        this.setModuleId(newProps.moduleId);
        this.setLessonId(newProps.lessonId);

        this.findAllTopicsForLesson(newProps.lessonId);
    }

    createTopic() {
        this.TopicService
            .createTopic(this.state.lessonId, this.state.topic)
            .then(
                () => this.findAllTopicsForLesson(this.state.lessonId)
            );
    }

    deleteTopic(topicId){
        this.TopicService
            .deleteTopic(topicId)
            .then(() => {
                this.findAllTopicsForLesson(this.state.lessonId);
            });
    }

    setSelectedTopic(topicId){
        this.setState({selectedTopic:topicId}, () => {
            //console.log(this.state.selectedTopic)
        });
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

    setTopics(topics) {
        this.setState({topics: topics});
    }

    titleChanged(event) {
        console.log(event.target.value);
        this.setState({topic: {title: event.target.value}});
    }

    findAllTopicsForLesson(lessonId) {
        this.TopicService
            .findAllTopicsForLesson(lessonId)
            .then(
                (topics) => {
                    this.setTopics(topics)
                }
            )
    }

    renderTopics(){
        let topics = this.state.topics.map(

            (topic) => {
                return (<TopicItem key={topic.id} topic={topic}
                                   moduleId={this.state.moduleId} delete={this.deleteTopic}
                                   lessonId={this.state.lessonId} courseId={this.state.courseId}
                                   topicId = {topic.id}
                                   setSelectedTopic = {this.setSelectedTopic}
                                   selectedTopicId={this.state.selectedTopic}/>)
            }
        );
        return topics;
    }


    render() {
        return (
            <div>
                <div>
                    {this.renderTopics()}
                </div>
                <div className="input-group-append">
                    <input className="form-control container-fluid "
                           onChange={this.titleChanged}
                           placeholder="New Topic Title"
                           style={{margin: "10px 5px 10px 0px"}}/>
                    <button onClick={this.createTopic} className="btn btn-primary "
                            style={{margin: "5px 0px 10px 5px"}}>
                        <i className="fa fa-plus"></i>
                    </button>
                </div>
            </div>

        )
    }
}
