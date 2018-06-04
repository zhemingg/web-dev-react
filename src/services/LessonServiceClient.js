const LESSON_API_URL = 'http://localhost:8080/api/lesson/LID';
const LESSON_ID_URL = 'http://localhost:8080/api/course/CID/module/MID/lesson';

let _singleton = Symbol();
export default class LessonServiceClient {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Singleton!!!');
    }

    static get instance() {
        if(!this[_singleton])
            this[_singleton] = new LessonServiceClient(_singleton);
        return this[_singleton]
    }

    deleteLesson(lessonId) {
        return fetch(LESSON_API_URL.replace
        ('LID', lessonId), {
            method: 'delete'
        })
    }

    findAllLessonsForModule(moduleId) {
        return fetch(
            LESSON_ID_URL
                .replace('MID', moduleId))
            .then(function (response) {
                return response.json();
            })
    }

    createLesson(moduleId, lesson) {
        return fetch(LESSON_ID_URL.replace('MID', moduleId),
            {   body: JSON.stringify(lesson),
                headers: { 'Content-Type': 'application/json' },
                method: 'POST'
            }).then(function (response)
        { return response.json(); })
    }





}
