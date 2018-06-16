import React from 'react';
import App from '../widgetList/containers/WidgetList';


export default class TopicEditor extends React.Component {
    constructor(props) {
        super(props);
       // console.log(props);
    }


    render() {
        return (<App topicId={this.props.match.params.topicId}/>)
    }

}