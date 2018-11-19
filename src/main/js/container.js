import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AddIcon from '@material-ui/icons/AddCircle';
import red from '@material-ui/core/colors/red';
import blue from '@material-ui/core/colors/blue';
import SvgIcon from '@material-ui/core/SvgIcon';
import TodoLists from './todoLists';
import SelectedTodoList from './selectedTodoList';

import ButtonLogout from './buttonLogout';

const styles = theme => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
    },
    iconSvg: {
        marginLeft: -12,
        marginRight: 20,
    },
    toolbar: theme.mixins.toolbar,
});


const drawerWidth = 240;

const theme = createMuiTheme({
    palette: {
        primary: blue,
        secondary: red,
    },
    typography: {
        useNextVariants: true,
    },
});

class ClippedDrawer extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            selectedId: -1,
        };
        this.updateCurrentTodo = this.updateCurrentTodo.bind(this);
    }

    updateCurrentTodo(dataFromChild){
        console.log(dataFromChild);

        this.setState({selectedId:dataFromChild}, () => {
            console.log(this.state);
        });

    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <MuiThemeProvider theme={theme}>
                    <CssBaseline />

                    {/* APP BAR SECTION START */}
                    <AppBar position="fixed" className={classes.appBar}>
                        <Toolbar>
                            <SvgIcon className={classes.iconSvg}>
                                <path d="M21 3h-6.18C14.4 1.84 13.3 1 12 1s-2.4.84-2.82 2H3v18h18V3zm-9 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                            </SvgIcon>
                            <Typography variant="h6" color="inherit" noWrap style={{ flex: 1 }}>
                                COMP41110 Cloud Todo List
                            </Typography>
                            <div>
                                <ButtonLogout/>
                            </div>
                        </Toolbar>
                    </AppBar>
                    {/* APP BAR SECTION END */}

                    {/* DRAWER SECTION START */}
                    <Drawer
                        className={classes.drawer}
                        variant="permanent"
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                    >
                        <div className={classes.toolbar} />

                        <TodoLists callbackFromParent={this.updateCurrentTodo}></TodoLists>

                        <Divider />
                        <List>
                            <ListItem button>
                                <ListItemIcon><AddIcon/></ListItemIcon>
                                <ListItemText>Add</ListItemText>
                            </ListItem>
                        </List>
                    </Drawer>
                    {/* DRAWER SECTION END */}

                    {/* MAIN SECTION START */}
                    <main className={classes.content}>
                        <div className={classes.toolbar} />
                        <SelectedTodoList selectedId={this.state.selectedId}/>
                    </main>
                    {/* MAIN SECTION END */}

                </MuiThemeProvider>
            </div>
        );
    }

}

ClippedDrawer.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ClippedDrawer);