import React from 'react';

const Widget = ({widget}) => (<ui> {widget.text} </ui>);

const WidgetList = ({ widgets }) => (
    <ul>
        {widgets.map(widget =>
            <Widget key={widget.id} widget={widget}/>)}
    </ul>)

const App = () => (
    <WidgetList widgets={[{text: 'Heading'}, {text: 'List'}]}/>
)


export default App;
