import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    input: {
        display: 'none',
    },
});

function TextButtons(props) {
    const { classes } = props;
    return (
        <div>
            <Button variant="outlined" href={LOGOUT_URL} className={classes.button} color="inherit">
                Sign Out
            </Button>
        </div>
    );
}

TextButtons.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TextButtons);
