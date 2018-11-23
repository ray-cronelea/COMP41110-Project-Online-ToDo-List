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

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
});

const cardData = [
    {
        id: 1,
        name: "Tile 1",
        description: "Description 1",
        date: "23/12/2012",
        completed: true,
    },
    {
        id: 2,
        name: "Tile 2",
        description: "Description 2",
        date: "23/12/2012",
        completed: false,
    },
    {
        id: 3,
        name: "Tile 3",
        description: "Description 3",
        date: "23/12/2012",
        completed: true,
    },
    {
        id: 4,
        name: "Tile 4",
        description: "Description 4",
        date: "23/12/2012",
        completed: false,
    },
    {
        id: 5,
        name: "Tile 5",
        description: "Description 5",
        date: "23/12/2012",
        completed: false,
    }
];

class TodoListsMainListItems extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { classes } = this.props;
        return (
            <Paper className={classes.root}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Completed</TableCell>
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cardData.map(row => {
                            return (
                                <TableRow key={row.id}>
                                    <TableCell padding="checkbox">
                                        <Checkbox checked={row.completed} />
                                    </TableCell>
                                    <TableCell component="th" scope="row">{row.id}</TableCell>
                                    <TableCell>{row.name}</TableCell>
                                    <TableCell>{row.description}</TableCell>
                                    <TableCell>{row.date}</TableCell>
                                    <TableCell><Button color="primary">Edit</Button></TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </Paper>
        );
    }
}

TodoListsMainListItems.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TodoListsMainListItems);