import React, {useState} from 'react';
import UserRowItem from "./UserRowItem";
import UpdateUserForm from "../forms/UpdateUserForm";

const UserRowManagement = ({user, deleteUser, updateUser}) => {
    const [isEdit, setIsEdit] = useState(false);

    if (isEdit) {
        return <UpdateUserForm setIsEdit={setIsEdit} user={user} updateUser={updateUser}/>
    }

    return (
        <UserRowItem user={user} deleteUser={deleteUser} setIsEdit={setIsEdit}/>
    )
};

export default UserRowManagement;