import React, {useState} from "react";
import {Box, Button, MenuItem, Select, TableCell, TableRow, TextField} from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
}));

const UpdateUserForm = ({ setIsEdit, user, updateUser }) => {
    const classes = useStyles();

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
        <TableRow>
            <TableCell component="th" scope="row">
                <TextField
                    label="Ім'я"
                    value={updateForm.name}
                    name="name"
                    variant="outlined"
                    onChange={formHandler}
                    size="small"
                />
            </TableCell>
            <TableCell align="right">
                <TextField
                    label="Прізвище"
                    value={updateForm.lastName}
                    name="lastName"
                    variant="outlined"
                    onChange={formHandler}
                    size="small"
                />
            </TableCell>
            <TableCell align="right">
                <TextField
                    label="Вік"
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
                    label="Телефон"
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
                        id="demo-simple-select-outlined-label">Стать</InputLabel>
                    <Select
                        value={updateForm.sex}
                        onChange={formHandler}
                        name="sex"
                        labelId="demo-simple-select-outlined-label"
                        label="Стать"
                        id="demo-simple-select-outlined"
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={'Чоловік'}>Чоловік</MenuItem>
                        <MenuItem value={'Жінка'}>Жінка</MenuItem>
                    </Select>
                </FormControl>
            </TableCell>
            <TableCell align="right">
                <div style={{ display: "flex" }}>
                    <Box mr={1}>
                        <Button variant="contained" color="primary" size="small"
                                onClick={updateUserForm}>
                            Зберегти
                        </Button>
                    </Box>
                    <Button variant="contained" color="secondary" size="small"
                            onClick={() => setIsEdit(false)}>
                        Відмінити
                    </Button>
                </div>
            </TableCell>
        </TableRow>
    )
};

export default UpdateUserForm