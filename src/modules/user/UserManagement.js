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
} from '@material-ui/core';
import API from "../../services/API";
import UserRowManagement from "./components/row/UserRowManagement";
import CreateUserControl from "./components/CreateUserControl";
import CreateUserForm from "./components/forms/CreateUserForm";

const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 650,
    },
}));

const UserManagement = () => {
    const classes = useStyles();
    const [users, setUser] = useState([]);
    const [isCreate, setIsCreate] = useState(false);

    useEffect(() => {
        getUsers();
        // eslint-disable-next-line
    }, []);

    const getUsers = useCallback(() => {
        API.get('/refresh')
            .then(({data}) => {
                setUser(data);
            })
    }, []);

    const deleteUser = (userID) => {
        API.post('/delete', {userID})
            .then(() => getUsers())
    }

    const updateUser = (editForm) => {
        API.post('/update', {...editForm, age: Number(editForm.age)})
            .then(() => getUsers())
    }

    const setIsCreateUser = () => setIsCreate(prevState => !prevState);

    return (
        <>
            <CreateUserControl setIsCreateUser={setIsCreateUser} />
            <Box m={5}>
                <Container>
                    <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Ім'я</TableCell>
                                    <TableCell align="right">Прізвище</TableCell>
                                    <TableCell align="right">Вік</TableCell>
                                    <TableCell align="right">Телефон</TableCell>
                                    <TableCell align="right">Стать</TableCell>
                                    <TableCell align="right">Дія</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <CreateUserForm isCreate={isCreate} setIsCreate={setIsCreate} getUsers={getUsers} />
                                {users.map((user) => (
                                    <UserRowManagement
                                        user={user}
                                        key={user.id}
                                        deleteUser={deleteUser}
                                        classes={classes}
                                        updateUser={updateUser}/>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Container>
            </Box>
        </>
    )
}

export default UserManagement;