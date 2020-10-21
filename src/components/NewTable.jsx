import React, {useCallback, useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {
    Container,
    Paper,
    TableRow,
    TableHead,
    TableContainer,
    TableCell,
    TableBody,
    Table,
    Box,
    IconButton,
    Button,
    TextField,
    Select,
    MenuItem,
} from '@material-ui/core';
import API from "../services/API";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";

const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 650,
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
}));

const initForm = {
    name: '',
    lastName: '',
    age: '',
    phone: '',
    sex: '',
};

const NewTable = () => {
    const classes = useStyles();
    const [users, setUser] = useState([]);
    const [isCreate, setIsCreate] = useState(false);
    const [form, setForm] = useState(initForm);

    useEffect(() => {
        getUsers();
    }, []);

    useEffect(() => {
        if (!isCreate) setForm(initForm)
    }, [isCreate]);

    const getUsers = useCallback(() => {
        API.get('/refresh')
            .then(({data}) => {
                setUser(data);
            })
    }, []);

    const formHandler = ({ target }) => {
        setForm((prevState) => ({
            ...prevState,
            [target.name]: target.value,
        }))
    };

    const saveHandler = () => {
        API.post('/create', { ...form, age: Number(form.age) })
            .then(() => {
                setIsCreate(false)
                getUsers();
            })
    }

    return (
        <>
            <Box m={5}>
                <Container>
                    <Button variant="contained" color="primary" onClick={() => setIsCreate(prevState => !prevState)}>
                        Create User
                    </Button>
                </Container>
            </Box>
            <Box m={5}>
                <Container>
                    <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell align="right">Last name</TableCell>
                                    <TableCell align="right">Age</TableCell>
                                    <TableCell align="right">Phone</TableCell>
                                    <TableCell align="right">Gender</TableCell>
                                    <TableCell align="right">Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    isCreate && (
                                        <TableRow>
                                            <TableCell component="th" scope="row">
                                                <TextField
                                                    label="Name"
                                                    value={form.name}
                                                    name="name"
                                                    variant="outlined"
                                                    onChange={formHandler}
                                                    size="small"
                                                />
                                            </TableCell>
                                            <TableCell align="right">
                                                <TextField
                                                    label="Last name"
                                                    value={form.lastName}
                                                    name="lastName"
                                                    variant="outlined"
                                                    onChange={formHandler}
                                                    size="small"
                                                />
                                            </TableCell>
                                            <TableCell align="right">
                                                <TextField
                                                    label="Age"
                                                    value={form.age}
                                                    name="age"
                                                    type="number"
                                                    variant="outlined"
                                                    onChange={formHandler}
                                                    size="small"
                                                />
                                            </TableCell>
                                            <TableCell align="right">
                                                <TextField
                                                    label="Phone"
                                                    value={form.phone}
                                                    name="phone"
                                                    variant="outlined"
                                                    onChange={formHandler}
                                                    size="small"
                                                />
                                            </TableCell>
                                            <TableCell align="right">
                                                <FormControl variant="outlined" size="small" className={classes.formControl}>
                                                    <InputLabel id="demo-simple-select-outlined-label">Gender</InputLabel>
                                                    <Select
                                                        value={form.sex}
                                                        onChange={formHandler}
                                                        name="sex"
                                                        labelId="demo-simple-select-outlined-label"
                                                        label="Gender"
                                                        id="demo-simple-select-outlined"
                                                    >
                                                        <MenuItem value="">
                                                            <em>None</em>
                                                        </MenuItem>
                                                        <MenuItem value={'Men'}>Men</MenuItem>
                                                        <MenuItem value={'Women'}>Women</MenuItem>
                                                    </Select>
                                                </FormControl>

                                            </TableCell>
                                            <TableCell align="right">
                                                <Box mr={1}>
                                                    <Button variant="contained" color="primary" size="small" onClick={saveHandler}>
                                                        Save
                                                    </Button>
                                                </Box>
                                                <Button variant="contained" color="secondary" size="small" onClick={() => setIsCreate(false)}>
                                                    Cancel
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    )
                                }
                                {
                                    users.map((user, i) => (
                                        <TableRow key={i}>
                                            <TableCell component="th" scope="row">
                                                {user.name}
                                            </TableCell>
                                            <TableCell align="right">{user.lastName}</TableCell>
                                            <TableCell align="right">{user.age}</TableCell>
                                            <TableCell align="right">{user.phone}</TableCell>
                                            <TableCell align="right">{user.sex}</TableCell>
                                            <TableCell align="right">
                                                <div className="table-action">
                                                    <Box m={1}>
                                                        <IconButton aria-label="edit" size="small">
                                                            <EditIcon fontSize="inherit"/>
                                                        </IconButton>
                                                    </Box>
                                                    <Box m={1}>
                                                        <IconButton aria-label="delete" size="small">
                                                            <DeleteIcon fontSize="inherit"/>
                                                        </IconButton>
                                                    </Box>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Container>
            </Box>
        </>
    )
}

export default NewTable;