import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid/Grid";
import CardContent from "@material-ui/core/CardContent/CardContent";
import Typography from "@material-ui/core/Typography/Typography";
import Card from "@material-ui/core/Card/Card";

const styles = theme => ({
});

class ShareError extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        const { classes } = this.props;
        return (
            <Grid container justify = "center">
                <Card className={classes.card}>
                    <CardContent>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>COMP41110 Cloud Todo List</Typography>
                        <Typography variant="h5" component="h2">{ERROR_MESSAGE}</Typography>
                    </CardContent>
                </Card>
            </Grid>
        );
    }
}

ShareError.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ShareError);
