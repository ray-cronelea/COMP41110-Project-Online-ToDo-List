import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

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
            response: null,
        };
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
                        <Button size="small">Edit</Button>
                        <Button size="small" onClick={() => this.deleteItem(this.props.selectedTodoList.id)}>Delete</Button>
                    </CardActions>
                </Card>
            );
        }
    }
}

export default  withStyles(styles)(TodoListsMainSelectedListDisplay);