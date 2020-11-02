import React, {useState} from 'react';
import {Box, Button, IconButton, MenuItem, Select, TableCell, TableRow, TextField} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";

const UserItem = ({user, deleteUser, updateUser, classes}) => {
    const [isEdit, setIsEdit] = useState(false);
    const [updateForm, setUpdateForm] = useState({
        name: user.name,
        lastName: user.lastName,
        age: user.age,
        phone: user.phone,
        sex: user.sex,
    });

    const updateUserForm = () => {
        updateUser({...updateForm, id: user.id})
        setIsEdit(false)
    }

    const formHandler = ({target}) => {
        setUpdateForm((prevState) => ({
            ...prevState,
            [target.name]: target.value,
        }))
    };

    return (
        <>
            {
                isEdit
                    ? (
                        <TableRow>
                            <TableCell component="th" scope="row">
                                <TextField
                                    label="Name"
                                    value={updateForm.name}
                                    name="name"
                                    variant="outlined"
                                    onChange={formHandler}
                                    size="small"
                                />
                            </TableCell>
                            <TableCell align="right">
                                <TextField
                                    label="Last name"
                                    value={updateForm.lastName}
                                    name="lastName"
                                    variant="outlined"
                                    onChange={formHandler}
                                    size="small"
                                />
                            </TableCell>
                            <TableCell align="right">
                                <TextField
                                    label="Age"
                                    value={updateForm.age}
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
                                    value={updateForm.phone}
                                    name="phone"
                                    variant="outlined"
                                    onChange={formHandler}
                                    size="small"
                                />
                            </TableCell>
                            <TableCell align="right">
                                <FormControl variant="outlined" size="small" className={classes.formControl}>
                                    <InputLabel
                                        id="demo-simple-select-outlined-label">Gender</InputLabel>
                                    <Select
                                        value={updateForm.sex}
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
                                    <Button variant="contained" color="primary" size="small"
                                            onClick={updateUserForm}>
                                        Save
                                    </Button>
                                </Box>
                                <Button variant="contained" color="secondary" size="small"
                                        onClick={() => setIsEdit(false)}>
                                    Cancel
                                </Button>
                            </TableCell>
                        </TableRow>
                    )
                    : (
                        <TableRow>
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
                                        <IconButton aria-label="edit" size="small" onClick={() => setIsEdit(true)}>
                                            <EditIcon fontSize="inherit"/>
                                        </IconButton>
                                    </Box>
                                    <Box m={1}>
                                        <IconButton aria-label="delete" size="small" onClick={() => deleteUser(user.id)}>
                                            <DeleteIcon fontSize="inherit"/>
                                        </IconButton>
                                    </Box>
                                </div>
                            </TableCell>
                        </TableRow>
                    )
            }
        </>
    )
};

export default UserItem;