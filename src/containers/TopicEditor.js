import React from 'react';
import App from '../widgetList/containers/WidgetList';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {widgetReducer} from '../widgetList/reducers/widgetReducer'


export default class TopicEditor extends React.Component {
    constructor(props) {
        super(props)
    }


    render() {

        let store = createStore(widgetReducer);
        return (
            <Provider store={store}>
                <App/>
            </Provider>
        )
    }

}