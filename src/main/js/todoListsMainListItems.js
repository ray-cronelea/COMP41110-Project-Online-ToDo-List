import React from "react";
import PropTypes from 'prop-types';
import {withStyles} from "@material-ui/core";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import Button from "@material-ui/core/Button/Button";
import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText/DialogContentText";
import TextField from "@material-ui/core/TextField/TextField";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import CardActions from "@material-ui/core/CardActions/CardActions";
import Card from "@material-ui/core/Card/Card";

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
        tableLayout: 'auto'
    },
    tabbutton: {
        'width': '5%',
    }
});

class TodoListsMainListItems extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            openAddItem: false,
            openDelete: false,
            rowDelete: 0,
            itemData: [],
            addName: "",
            addDescription: "",
            addDate: "",
            openEditItem: false,
            editName: "",
            editDescription: "",
            editDate: "",
            editId: ""
        };
    }

    updateItems = () => {
        console.log("Getting list items for id " + this.props.selectedTodoList.id);
        fetch("./api/todolists/" + this.props.selectedTodoList.id + "/todolistitems")
            .then(res => res.json())
            .then(
                (result) => {
                    // Examine the text in the response
                    console.log(result);
                    this.setState({
                        isLoaded: true,
                        itemData: result
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    componentDidMount() {
        console.log("component did mount");
        this.updateItems();
    }

    componentDidUpdate(prevProps, prevState){
        if (prevProps.selectedTodoList.id !== this.props.selectedTodoList.id) {
            if (this.props.selectedTodoList.id !== null) {
                this.updateItems();
            }
        }
    }

    onAddNameInputChange = (event) => {
        if (event.target.value) {
            this.setState({addName: event.target.value})
        } else {
            this.setState({addName: ''})
        }
    }

    onAddDescriptionInputChange = (event) => {
        if (event.target.value) {
            this.setState({addDescription: event.target.value})
        } else {
            this.setState({addDescription: ''})
        }
    }

    onAddDateInputChange = (event) => {
        if (event.target.value) {
            this.setState({addDate: event.target.value})
        } else {
            this.setState({addDate: ''})
        }
    }

    handleClickOpenAddItem = () => {

        let todayDate = new Date().toISOString().slice(0,10);

        this.setState({
            openAddItem: true,
            addName: "",
            addDescription: "",
            addDate: todayDate
        });
    };

    handleAddItemClose = () => {
        this.setState({
            openAddItem: false
        });
    };

    handleAddItem = () => {
        console.log("handleAddItem, " + this.state.addName + ", " + this.state.addDescription+ ", " + this.state.addDate);

        let name = this.state.addName;
        let description = this.state.addDescription;
        let date = this.state.addDate;
        let completed = "false";

        let formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('date', date);
        formData.append('completed', completed);

        fetch("/api/todolists/" + this.props.selectedTodoList.id + "/todolistitems",
            {
                method: "POST",
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                this.updateItems();
                this.handleAddItemClose();
            })
    };

    handleCheckboxChange = (event, numid) => {
        console.log(numid + " " + event.target.checked)

        let val = 0;
        if (event.target.checked === true){
            val = 1;
        }

        fetch("/api/itemstatus/" + numid.toString() + "/" + val.toString(),
            {
                method: "POST"
            })
            .then(data => {
                this.updateItems();
            })
    };

    handleClickOpenDelete = (rowId) => {
        this.setState({
            openDelete: true,
            rowDelete: rowId
        });
    };

    handleDeleteClose = () => {
        this.setState({
            openDelete: false
        });
    };

    handleDelete = (event) => {

        console.log("Delete: " + this.state.rowDelete.toString());

        fetch("/api/todolistitems/" + this.state.rowDelete.toString(),
            {
                method: "DELETE"
            })
            .then(res => res.text())
            .then(res => {
                this.updateItems();
                this.handleDeleteClose();
            })
    };

    onEditNameInputChange = (event) => {
        if (event.target.value) {
            this.setState({editName: event.target.value})
        } else {
            this.setState({editName: ''})
        }
    }

    onEditDescriptionInputChange = (event) => {
        if (event.target.value) {
            this.setState({editDescription: event.target.value})
        } else {
            this.setState({editDescription: ''})
        }
    }

    onEditDateInputChange = (event) => {
        if (event.target.value) {
            this.setState({editDate: event.target.value})
        } else {
            this.setState({editDate: ''})
        }
    }

    handleClickOpenEditItem = (id,name,date,description) => {
        this.setState({
            openEditItem: true,
            editId: id,
            editName: name,
            editDate: date,
            editDescription: description,
        });
    };

    handleEditItemClose = () => {
        this.setState({
            openEditItem: false
        });
    };

    handleEditItem = () => {
        let id = this.state.editId;
        let name = this.state.editName;
        let description = this.state.editDescription;
        let date = this.state.editDate;

        let formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('date', date);

        fetch("/api/todolistitems/" + id,
            {
                method: "POST",
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                this.handleEditItemClose();
                this.updateItems();
            })
    };

    render() {
        const { classes } = this.props;
        return (
            <Paper className={classes.root}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.tabbutton}>Done</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Time Slot</TableCell>
                            <TableCell className={classes.tabbutton}><Button onClick={this.handleClickOpenAddItem}><AddIcon /></Button></TableCell>
                            <TableCell className={classes.tabbutton}/>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.itemData.map(row => {
                            return (
                                <TableRow key={row.id}>
                                    <TableCell padding="checkbox" className={classes.tabbutton}>
                                        <Checkbox defaultChecked={row.completed} onChange={(e) => {this.handleCheckboxChange(e, row.id)}}/>
                                    </TableCell>
                                    <TableCell>{row.name}</TableCell>
                                    <TableCell>{row.description}</TableCell>
                                    <TableCell>{row.date}</TableCell>
                                    <TableCell className={classes.tabbutton}><Button onClick={(e) => this.handleClickOpenEditItem(row.id,row.name,row.date,row.description)}><EditIcon/></Button></TableCell>
                                    <TableCell className={classes.tabbutton}><Button onClick={(e) => this.handleClickOpenDelete(row.id)}><DeleteIcon/></Button></TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>

                {/* DIALOG FOR DELETING LIST */}
                <Dialog
                    open={this.state.openDelete}
                    onClose={this.handleDeleteClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Are you sure you want to delete this item?"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            This item will be deleted!
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleDeleteClose} color="primary">
                            No
                        </Button>
                        <Button onClick={(e) => this.handleDelete(e)} color="primary" autoFocus>
                            Yes
                        </Button>
                    </DialogActions>
                </Dialog>

                {/* DIALOG FOR ADDING LIST ITEM */}
                <Dialog open={this.state.openAddItem} onClose={this.handleAddItemClose} aria-labelledby="form-dialog-title" >
                    <DialogTitle id="form-dialog-title">Add New List Item</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Enter the new values in the form below
                        </DialogContentText>
                        <TextField
                            margin="dense"
                            id="name"
                            onChange={this.onAddNameInputChange}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            label="Name"
                            type="text"
                            fullWidth
                        />
                        <TextField
                            margin="dense"
                            id="description"
                            onChange={this.onAddDescriptionInputChange}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            label="Description"
                            type="text"
                            fullWidth
                        />
                        <TextField
                            margin="dense"
                            id="date"
                            defaultValue={this.state.addDate}
                            onChange={this.onAddDateInputChange}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            label="Time Slot"
                            type="date"
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleAddItemClose} color="primary">Cancel</Button>
                        <Button onClick={() => this.handleAddItem()} color="primary">Add</Button>
                    </DialogActions>
                </Dialog>

                {/* DIALOG FOR EDITING LIST ITEM */}
                <Dialog open={this.state.openEditItem} onClose={this.handleEditItemClose} aria-labelledby="form-dialog-title" >
                    <DialogTitle id="form-dialog-title">Edit List Item</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Enter the new values in the form below
                        </DialogContentText>
                        <TextField
                            margin="dense"
                            id="name"
                            value={this.state.editName}
                            onChange={this.onEditNameInputChange}
                            InputLabelProps={{shrink: true,}}
                            label="Name"
                            type="text"
                            fullWidth
                        />
                        <TextField
                            margin="dense"
                            id="description"
                            value={this.state.editDescription}
                            onChange={this.onEditDescriptionInputChange}
                            InputLabelProps={{shrink: true,}}
                            label="Description"
                            type="text"
                            fullWidth
                        />
                        <TextField
                            margin="dense"
                            id="date"
                            value={this.state.editDate}
                            onChange={this.onEditDateInputChange}
                            InputLabelProps={{shrink: true,}}
                            label="Time Slot"
                            type="date"
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleEditItemClose} color="primary">Cancel</Button>
                        <Button onClick={() => this.handleEditItem()} color="primary">Update</Button>
                    </DialogActions>
                </Dialog>

            </Paper>

        );
    }
}

TodoListsMainListItems.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TodoListsMainListItems);