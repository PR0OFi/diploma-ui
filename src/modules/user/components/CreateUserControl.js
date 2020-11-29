import React from "react";
import {Box, Button, Container} from "@material-ui/core";

const CreateUserControl = ({setIsCreateUser}) => {
    return (
        <Box m={5}>
            <Container>
                <Button variant="contained" color="primary" onClick={setIsCreateUser}>
                    Додати користувача
                </Button>
            </Container>
        </Box>
    )
};

export default CreateUserControl