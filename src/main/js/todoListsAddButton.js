import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ListItem from "@material-ui/core/ListItem/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon/ListItemIcon";
import AddIcon from '@material-ui/icons/AddCircle';
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import List from "@material-ui/core/List/List";

class TodoListsAddButton extends React.Component {
    constructor(props) {
        super(props);
        self = this;
        this.state = {
            open: false,
            name: "",
            description: ""
        };
    }

    handleClickOpen = () => {
        this.setState({
            open: true
        });
    };

    handleClose = () => {
        console.log("handleClose");
        this.setState({
            open: false
        });
    };

    handleCreate = () => {
        console.log("handleCreate, " + this.state.name + ", " + this.state.description);

        let name = this.state.name;
        let description = this.state.description;

        let formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);

        fetch("/api/todolists",
            {
                method: "POST",
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                this.props.updateCurrentTodo(data.id);
                this.props.setReload(true);
                this.handleClose();
            })
    };

    onNameInputChange = (event) => {
        if (event.target.value) {
            this.setState({name: event.target.value})
        } else {
            this.setState({name: ''})
        }
    }

    onDescriptionInputChange = (event) => {
        if (event.target.value) {
            this.setState({description: event.target.value})
        } else {
            this.setState({description: ''})
        }
    }

    render() {
        return (
            <List>
                <ListItem button onClick={this.handleClickOpen}>
                    <ListItemIcon><AddIcon/></ListItemIcon>
                    <ListItemText>Add List</ListItemText>
                </ListItem>
                <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title" >
                    <DialogTitle id="form-dialog-title">Create a Todo List</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Enter the name and description to create a new todo list.
                        </DialogContentText>
                        <TextField
                            margin="dense"
                            id="name"
                            onChange={this.onNameInputChange}
                            label="Name"
                            type="text"
                            fullWidth
                        />
                        <TextField
                            margin="dense"
                            id="description"
                            onChange={this.onDescriptionInputChange}
                            label="Description"
                            type="text"
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">Cancel</Button>
                        <Button onClick={() => this.handleCreate()} color="primary">Create</Button>
                    </DialogActions>
                </Dialog>
            </List>
        );
    }
}

export default TodoListsAddButton;