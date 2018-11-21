import React from 'react';
import TodoListsMainSelectedListDisplay from './todoListsMainSelectedListDisplay'


class TodoLists extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            currentTodoList: null,
        };
    }

    componentDidUpdate(prevProps, prevState){
        if (prevProps.selectedId !== this.props.selectedId) {
            if (this.props.selectedId !== null) {
                fetch("./api/todolists/" + this.props.selectedId)
                    .then(res => res.json())
                    .then(
                        (result) => {
                            // Examine the text in the response
                            this.setState({
                                isLoaded: true,
                                currentTodoList: result
                            });
                        },
                        // Note: it's important to handle errors here
                        // instead of a catch() block so that we don't swallow
                        // exceptions from actual bugs in components.
                        (error) => {
                            this.setState({
                                isLoaded: true,
                                error
                            });
                        }
                    )
            } else {
                this.props.setReload(true);
            }
        }
    }

    render() {
        const { error, isLoaded, currentTodoList } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded || (this.props.selectedId == null)) {
            return <div>Select a todo list from the left</div>;
        } else {
            return (
                <div>
                    <TodoListsMainSelectedListDisplay selectedTodoList={currentTodoList} updateCurrentTodo={this.props.updateCurrentTodo}></TodoListsMainSelectedListDisplay>
                </div>
            );
        }
    }
}

export default TodoLists;