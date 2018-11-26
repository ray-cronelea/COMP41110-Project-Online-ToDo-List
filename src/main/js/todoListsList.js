import React from 'react';
import List from "@material-ui/core/List/List";
import ListItem from "@material-ui/core/ListItem/ListItem";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import {withStyles} from "@material-ui/core";

const styles = theme => ({
    selected: {
        backgroundColor: theme.palette.background.paper,
    }
});

class TodoListsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        };
    }

    updateItems(){

        let url = './api/todolists';
        let search = this.props.searchTerm;

        if(search.length > 0){
            url = url + "/search/" + search;
        }

        console.log("Update Items Url: " + url );

        fetch(url)
            .then(res => res.json())
            .then(
                (result) => {
                    // Examine the text in the response
                    console.log(result);
                    this.setState({
                        isLoaded: true,
                        items: result
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
        this.props.setReload(false);
    }

    componentDidMount() {
        this.updateItems();
    }

    componentDidUpdate(prevProps, prevState){
        if (prevProps.reloadList !== this.props.reloadList) {
            this.updateItems();
        }

        if (prevProps.searchTerm !== this.props.searchTerm) {
            this.updateItems();
        }
    }

    updateSelectedList(id){
        this.props.updateCurrentTodo(id);
    }

    render() {
        const { error, isLoaded, items } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <List>
                    {items.map(item =>
                    <ListItem selected={this.props.selectedId === item.id} button key={item.id} value={item.id} onClick={() => this.updateSelectedList(item.id)}>
                        <ListItemText primary={item.name} />
                    </ListItem>
                    )}
                </List>
            );
        }
    }
}

export default withStyles(styles)(TodoListsList);