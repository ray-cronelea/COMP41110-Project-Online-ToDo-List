import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CardContent from "@material-ui/core/CardContent/CardContent";
import Typography from "@material-ui/core/Typography/Typography";
import Card from "@material-ui/core/Card/Card";
import Table from "@material-ui/core/Table/Table";
import TableHead from "@material-ui/core/TableHead/TableHead";
import TableRow from "@material-ui/core/TableRow/TableRow";
import TableCell from "@material-ui/core/TableCell/TableCell";
import TableBody from "@material-ui/core/TableBody/TableBody";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import Paper from "@material-ui/core/Paper/Paper";
import Grid from "@material-ui/core/Grid/Grid";

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
        minWidth: 275,
        maxWidth: 900,
        justify: "center"
    },
    card: {
    },
    table: {
        minWidth: 700,
        tableLayout: 'auto'
    },
    tabbutton: {
        'width': '5%',
    }
});

class Share extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        const { classes } = this.props;
        return (
        <Grid container justify = "center">
            <Paper className={classes.root}>
                <Card className={classes.card}>
                    <CardContent>
                        <Typography variant="h5" component="h2">Name: {TODO_LIST.name}</Typography>
                        <Typography variant="h6" component="h3">Description: {TODO_LIST.description}</Typography>
                    </CardContent>
                </Card>

                <Table className={classes.table}>
                    <TableHead>
                    <TableRow>
                        <TableCell className={classes.tabbutton}>Done</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Time Slot</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {TODO_LIST_ITEMS.map(row => {
                        return (
                        <TableRow key={row.id}>
                            <TableCell padding="checkbox" className={classes.tabbutton}>
                            <Checkbox checked={row.completed}/>
                            </TableCell>
                            <TableCell>{row.name}</TableCell>
                            <TableCell>{row.description}</TableCell>
                            <TableCell>{row.date}</TableCell>
                        </TableRow>
                        );
                    })}
                </TableBody>
                </Table>
            </Paper>
        </Grid>
        );
    }
}

Share.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Share);
