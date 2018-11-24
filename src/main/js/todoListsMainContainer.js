import React from 'react';
import TodoListsMainSelectedListDisplay from './todoListsMainSelectedListDisplay'
import TodoListsMainListItems from './todoListsMainListItems'
import Typography from "@material-ui/core/Typography/Typography";
import CardContent from "@material-ui/core/CardContent/CardContent";
import Card from "@material-ui/core/Card/Card";
import {withStyles} from "@material-ui/core";

const styles = theme => ({
});

class TodoLists extends React.Component {
    constructor(props) {
        super(props);
        this.callbackUpdateCurrentTodoList = this.callbackUpdateCurrentTodoList.bind(this);
        this.state = {
            error: null,
            isLoaded: false,
            currentTodoList: null,
        };
    }

    callbackUpdateCurrentTodoList(todoList){
        this.setState({currentTodoList: todoList});
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
        const { classes } = this.props;
        const { error, isLoaded, currentTodoList } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded || (this.props.selectedId == null)) {
            return(
                <div style={{flex:1}}>
                    <Card style={{flex:1, alignSelf:'stretch'}} className={classes.card}>
                        <CardContent>
                            <Typography>Please select a list from the sidebar!</Typography>
                        </CardContent>
                    </Card>
                </div>
            );
        } else {
            return (
                <div>
                    <TodoListsMainSelectedListDisplay setReload={this.props.setReload} callbackUpdateCurrentTodoList={this.callbackUpdateCurrentTodoList} selectedTodoList={currentTodoList} updateCurrentTodo={this.props.updateCurrentTodo}/>
                    <TodoListsMainListItems selectedTodoList={currentTodoList}/>
                </div>
            );
        }
    }
}

export default withStyles(styles)(TodoLists);