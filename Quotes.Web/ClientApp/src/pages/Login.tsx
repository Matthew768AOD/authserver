import React from "react";
import { Card } from "../../../ClientApp/my-lib/src";
import { LoginForm } from "../../../ClientApp/my-lib/src";
import { Typography } from "../../../ClientApp/my-lib/src";

export const Login: React.FC = () => {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                padding: "40px"
            }}
        >
            <Card variant="outlined" shadow="md" style={{ textAlign: "center" }}>
                <Typography as="h1" variant="h1">
                    Login
                </Typography>

                <LoginForm />
            </Card>
        </div>
    );
};

export default Login;