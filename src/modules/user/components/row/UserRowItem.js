import React from "react";
import {Box, IconButton, TableCell, TableRow} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

const UserRowItem = ({ user, setIsEdit, deleteUser }) => {
    return (
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
};

export default UserRowItem