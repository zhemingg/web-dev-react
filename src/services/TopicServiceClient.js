let _singleton = Symbol();
const TOPIC_API_URL = 'http://localhost:8080/api/course/CID/module/MID/lesson/LID/topic';


export default class LessonServiceClient {

    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Singleton!!!');
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new LessonServiceClient(_singleton);
        return this[_singleton]
    }

    createTopic(lessonId, topic) {
        return fetch(TOPIC_API_URL.replace('LID', lessonId),
            {   body: JSON.stringify(topic),
                headers: { 'Content-Type': 'application/json' },
                method: 'POST'
            }).then(function (response)
        { return response.json(); })
    }

    findAllTopicsForLesson(lessonId) {
        return fetch(
            TOPIC_API_URL
                .replace('LID', lessonId))
            .then(function (response) {
                return response.json();
            })
    }






}
