import React from 'react';
import List from "@material-ui/core/List/List";
import ListItem from "@material-ui/core/ListItem/ListItem";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";

class TodoLists extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        };
    }

    componentDidMount() {
        fetch("./api/todolists")
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
    }

    updateSelectedList(id){
        this.props.callbackFromParent(id);
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
                    {items.map(item => (
                    <ListItem button key={item.id} value={item.id} onClick={() => this.updateSelectedList(item.id)}>
                        <ListItemText primary={item.name} />
                    </ListItem>
                    ))}
                </List>
            );
        }
    }
}

export default TodoLists;