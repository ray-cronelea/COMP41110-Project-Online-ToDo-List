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
import ShareIcon from '@material-ui/icons/Share';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import Switch from "@material-ui/core/Switch/Switch";

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
            openUpdate: false,
            openShare: false,
            openDelete: false,
            response: null,
            name: this.props.selectedTodoList.name,
            description: this.props.selectedTodoList.description,
        };
    }

    handleClickOpenUpdate = () => {
        this.setState({
            openUpdate: true
        });
        this.setState({name: this.props.selectedTodoList.name});
        this.setState({description: this.props.selectedTodoList.description});
    };

    handleUpdateClose = () => {
        this.setState({
            openUpdate: false
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
                this.handleUpdateClose();
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

    handleClickOpenDelete = () => {
        this.setState({
            openDelete: true
        });
    };

    handleDeleteClose = () => {
        this.setState({
            openDelete: false
        });
    };

    deleteItem(id) {
        fetch('/api/todolists/' + id, {
            method: 'DELETE',
        })
            .then(res => res.text())
            .then(res => {
                this.deleteFinished(res);
            })
    }

    deleteFinished(res){
        this.props.updateCurrentTodo(null);
    }

    handleClickOpenShare = () => {
        this.setState({
            openShare: true
        });
    };

    handleShareClose = () => {
        this.setState({
            openShare: false
        });
    };
    handleShareCheckboxChange = (event) => {

        let currentid = this.props.selectedTodoList.id;
        let val = 0;
        this.props.selectedTodoList.isShared = event.target.checked;
        if (event.target.checked === true){
            val = 1;
        }

        fetch("/api/todolists/" + currentid + "/share/" + val.toString(),
            {method: "POST"}).then(data => {})
    };

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
                        <Typography variant="h6" component="h3">
                            {this.props.selectedTodoList.description}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small" onClick={this.handleClickOpenShare}><ShareIcon/></Button>
                        <Button size="small" onClick={this.handleClickOpenUpdate}><EditIcon/></Button>
                        <Button size="small" onClick={this.handleClickOpenDelete}><DeleteIcon/></Button>
                    </CardActions>

                    {/* DIALOG FOR DELETING LIST */}
                    <Dialog
                        open={this.state.openDelete}
                        onClose={this.handleDeleteClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">{"Are you sure you want to delete this list?"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                This list and all associated list items will be deleted!
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleDeleteClose} color="primary">
                                No
                            </Button>
                            <Button onClick={() => this.deleteItem(this.props.selectedTodoList.id)} color="primary" autoFocus>
                                Yes
                            </Button>
                        </DialogActions>
                    </Dialog>


                    {/* DIALOG FOR UPDATING LIST */}
                    <Dialog open={this.state.openUpdate} onClose={this.handleUpdateClose} aria-labelledby="form-dialog-title" >
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
                            <Button onClick={this.handleUpdateClose} color="primary">Cancel</Button>
                            <Button onClick={() => this.handleUpdate()} color="primary">Update</Button>
                        </DialogActions>
                    </Dialog>

                    {/* DIALOG FOR SHARING LIST */}
                    <Dialog open={this.state.openShare} onClose={this.handleShareClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                        <DialogTitle id="alert-dialog-title">{"Share List"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText>Set the list as shared and use the link to give somebody else read only access to the list.</DialogContentText>
                        </DialogContent>
                        <DialogContent>
                            <FormControlLabel control={ <Switch defaultChecked={this.props.selectedTodoList.isShared} onChange={this.handleShareCheckboxChange}/>} label="Shared"/>
                        </DialogContent>
                        <DialogContent>
                            <DialogContentText>https://todo.raywilson.ie/share/{this.props.selectedTodoList.shareId}</DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleShareClose} color="primary">Close</Button>
                        </DialogActions>
                    </Dialog>

                </Card>
            );
        }
    }
}

export default withStyles(styles)(TodoListsMainSelectedListDisplay);