import React from 'react'
import ModuleListItem from '../components/ModuleListItem'

class ModuleList2 extends React.Component {

    constructor() { super();
        this.state = {
            module: { title: '' },
            modules: [
                {title: 'Module 1 - jQuery', id: 123},
                {title: 'Module 2 - React', id: 234},
                {title: 'Module 3 - Redux', id: 345},
                {title: 'Module 4 - Angular', id: 456},
                {title: 'Module 5 - Node.js', id: 567},
                {title: 'Module 6 - MongoDB', id: 678}
            ]
        };

        this.titleChanged = this.titleChanged.bind(this);
        this.createModule = this.createModule.bind(this);
    }

    createModule(event) {
        console.log(this.state.module);
    }

    titleChanged(event) {
        console.log(event.target.value);
        this.setState({module: {title: event.target.value}});
    }

    renderListOfModules() {
        let modules = this.state.modules.map(function (module) {
            return <ModuleListItem key={module.id} title={module.title}/>
        })
        return modules;
    }

    render() {
        return(
            <div>
                <br/>
                <input className="form-control"
                       onChange={this.titleChanged}
                       placeholder="title"/>

                <button onClick={this.createModule} className="btn btn-primary btn-block">
                    <i className="fa fa-plus"></i>
                </button>

                <ul className="list-group">
                    {this.renderListOfModules()}
                </ul>
            </div>
        )
    }
}

export default ModuleList2;