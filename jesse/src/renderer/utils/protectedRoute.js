import React from "react";
import { Route, Redirect } from "react-router-dom";
import { ReadCookie } from "./readCookies";

const ProtectedRoute = ({ component: Component, ...rest }) => {
    // let token = 'eyJpdiI6Ik9xcWhtaTZuZlJnR2RRdGcwMG9vQ3c9PSIsInZhbHVlIjoiQmQ1U1k1TUpiMnp1MG5ldHVyekFBQ0IxLzE4N2RpZ3RteTZ1QlVpQ1pNZSs3ZTV0N3hlQW1VekNMdWF0TVVlNnlGOXg0aEFpWUdhbTJiK08zamdwUkNVUkdvOGJFT28rbEoxSXE3Sm8yb0RRcG93WWd4T3JJK09ZeFQva1NManMiLCJtYWMiOiI2YzY5NmMwM2RhNTE4NTA3NzQwMmM5MWY4ZTZkZWEzNTViZjZiZDhiYTU1Y2MwMjVjZDg0NDk0NWUwMmY5ODIwIiwidGFnIjoiIn0%3D; laravel_session=eyJpdiI6IlJwN2toZTBOYllQVUduSnJkTU1WR0E9PSIsInZhbHVlIjoiSlVLdTN1Q2EwRlBmZXNJNzdpWk1Jd2hTRDFpQTVmQTMrTDhNNVRVT3llem9XbWNCaTEySEFGUEVPR1JsaEQ4TTdjY1lQUmJ6ZXNIbmdmWkErMENjOWhNbS94YWM2U0xLQm1qQkszbk01SW5tZ3RpMkhCdEhhZVdGSTlHMEtockUiLCJtYWMiOiJjMTE2MGQ0MzBlNDMyMTljZWYzZjBkMzg4ODNlZTVmZTJmMzNmMDU5ODdjNjAwZTdmZmMzMTdjNTljNTkzMTg1IiwidGFnIjoiIn0%3D' //ReadCookie("token");
    let token = ReadCookie("token")
    return (
        <Route
            {...rest}
            render={props => {
                if (!token) {
                    return <Redirect to="/" />;

                }
                return <Component {...props} />;
            }}
        />
    );
};

export default ProtectedRoute;