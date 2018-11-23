import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText/DialogContentText";
import TextField from "@material-ui/core/TextField/TextField";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import Dialog from "@material-ui/core/Dialog/Dialog";

const styles = {
    card: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
};

class TodoListsMainSelectedListDisplay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            response: null,
            name: this.props.selectedTodoList.name,
            description: this.props.selectedTodoList.description
        };
    }

    handleClickOpen = () => {
        this.setState({
            open: true
        });
        this.setState({name: this.props.selectedTodoList.name});
        this.setState({description: this.props.selectedTodoList.description});
    };

    handleAddClose = () => {
        this.setState({
            open: false
        });
    };

    handleUpdate = () => {
        console.log("handleCreate, " + this.state.name + ", " + this.state.description);

        let name = this.state.name;
        let description = this.state.description;

        let formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);

        fetch("/api/todolists/" + this.props.selectedTodoList.id,
            {
                method: "POST",
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                this.handleAddClose();
                this.props.callbackUpdateCurrentTodoList(data);
                this.props.updateCurrentTodo(data.id);
                this.props.setReload(true);
            })
    }

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

    deleteItem(id) {
        fetch('/api/todolists/' + id, {
            method: 'DELETE',
        })
            .then(res => res.text())
            .then(res => this.deleteFinished(res))
    }

    deleteFinished(res){
        this.props.updateCurrentTodo(null);
    }

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
        const { classes } = this.props;
        if (this.props.selectedTodoList == null) {
            return <div>No todo list active</div>;
        } else {
            return (
                <Card className={classes.card}>
                    <CardContent>
                        <Typography variant="h5" component="h2">
                            {this.props.selectedTodoList.name}
                        </Typography>
                        <Typography component="p">
                            {this.props.selectedTodoList.description}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small" >Add Task</Button>
                        <Button size="small" >Share</Button>
                        <Button size="small" onClick={this.handleClickOpen}>Edit</Button>
                        <Button size="small" onClick={() => this.deleteItem(this.props.selectedTodoList.id)}>Delete</Button>
                        <Dialog open={this.state.open} onClose={this.handleAddClose} aria-labelledby="form-dialog-title" >
                            <DialogTitle id="form-dialog-title">Update Todo List</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    Enter the name and description to update this todo list.
                                </DialogContentText>
                                <TextField
                                    margin="dense"
                                    id="name"
                                    value={this.state.name}
                                    onChange={this.onNameInputChange}
                                    label="Name"
                                    type="text"
                                    fullWidth
                                />
                                <TextField
                                    margin="dense"
                                    id="description"
                                    value={this.state.description}
                                    onChange={this.onDescriptionInputChange}
                                    label="Description"
                                    type="text"
                                    fullWidth
                                />
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={this.handleAddClose} color="primary">Cancel</Button>
                                <Button onClick={() => this.handleUpdate()} color="primary">Update</Button>
                            </DialogActions>
                    </Dialog>
                    </CardActions>
                </Card>
            );
        }
    }
}

export default withStyles(styles)(TodoListsMainSelectedListDisplay);