import React from "react";
import {Typography, Link} from "@material-ui/core";

export default function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center" style={{paddingTop: "20px"}}>
            {'Copyright © '}
            <Link color="inherit">
                Illia Khrypunov
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}