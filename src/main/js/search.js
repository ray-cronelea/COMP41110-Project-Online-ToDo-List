import React from 'react';
import PropTypes from 'prop-types';
import {createMuiTheme, withStyles} from '@material-ui/core/styles';
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import CssBaseline from "@material-ui/core/CssBaseline/CssBaseline";
import AppBar from "@material-ui/core/AppBar/AppBar";
import Toolbar from "@material-ui/core/Toolbar/Toolbar";
import SvgIcon from "@material-ui/core/SvgIcon/SvgIcon";
import Typography from "@material-ui/core/Typography/Typography";
import Button from "@material-ui/core/Button/Button";
import ButtonLogout from "./buttonLogout";
import blue from "@material-ui/core/colors/blue";
import red from "@material-ui/core/colors/red";
import InputBase from "@material-ui/core/InputBase/InputBase";
import {fade} from "@material-ui/core/es/styles/colorManipulator";
import SearchIcon from '@material-ui/icons/Search';
import TodoListsMainContainer from "./todoListsMainContainer";

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
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.black, 0.1),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.black, 0.1),
        },
        marginRight: theme.spacing.unit * 2,
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing.unit * 3,
            width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing.unit * 9,
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
        width: '100%',
    },
    inputInput: {
        paddingTop: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
        paddingLeft: theme.spacing.unit * 10,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: 200,
        },
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

class Search extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
        };
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
                            <Typography variant="h6" color="inherit" noWrap style={{ flex: 1 }}>COMP41110 Cloud Todo List</Typography>
                            <div><Button variant="outlined" href="/app" color="inherit">Back</Button></div>
                            <div><ButtonLogout/></div>
                        </Toolbar>
                    </AppBar>
                    {/* APP BAR SECTION END */}

                    {/* SEARCH SECTION START */}

                    <main className={classes.content}>
                        <div className={classes.toolbar} />
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon />
                            </div>
                            <InputBase
                                placeholder="Search…"
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                            />
                        </div>
                    </main>
                    {/* SEARCH SECTION END */}
                </MuiThemeProvider>
            </div>
        );
    }
}

Search.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Search);
