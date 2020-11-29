import React, {useEffect, useState} from "react";
import {Box, Button, MenuItem, Select, TableCell, TableRow, TextField} from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import {makeStyles} from "@material-ui/core/styles";
import API from "../../../../services/API";

const initForm = {
    name: '',
    lastName: '',
    age: '',
    phone: '',
    sex: '',
};

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
}));

const CreateUserForm = ({isCreate, setIsCreate, getUsers}) => {
    const classes = useStyles();
    const [form, setForm] = useState(initForm);

    useEffect(() => {
        if (!isCreate) setForm(initForm)
    }, [isCreate]);

    const formHandler = ({target}) => {
        setForm((prevState) => ({
            ...prevState,
            [target.name]: target.value,
        }))
    };

    const saveHandler = () => {
        API.post('/create', {...form, age: Number(form.age)})
            .then(() => {
                setIsCreate(false)
                getUsers();
            })
    }

    if (!isCreate) {
        return null
    }

    return (
        <TableRow>
            <TableCell component="th" scope="row">
                <TextField
                    label="Ім'я"
                    value={form.name}
                    name="name"
                    variant="outlined"
                    onChange={formHandler}
                    size="small"
                />
            </TableCell>
            <TableCell align="right">
                <TextField
                    label="Прізвище"
                    value={form.lastName}
                    name="lastName"
                    variant="outlined"
                    onChange={formHandler}
                    size="small"
                />
            </TableCell>
            <TableCell align="right">
                <TextField
                    label="Вік"
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
                    label="Телефон"
                    value={form.phone}
                    name="phone"
                    variant="outlined"
                    onChange={formHandler}
                    size="small"
                />
            </TableCell>
            <TableCell align="right">
                <FormControl variant="outlined" size="small"
                             className={classes.formControl}>
                    <InputLabel
                        id="demo-simple-select-outlined-label">Стать</InputLabel>
                    <Select
                        value={form.sex}
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
                        <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            onClick={saveHandler}
                        >
                            Зберегти
                        </Button>
                    </Box>
                    <Button
                        variant="contained"
                        color="secondary"
                        size="small"
                        onClick={() => setIsCreate(false)}
                    >
                        Відмінити
                    </Button>
                </div>
            </TableCell>
        </TableRow>
    )
};

export default CreateUserForm