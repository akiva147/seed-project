import { googleLogout, useGoogleLogin } from '@react-oauth/google';
// import { decode } from 'jsonwebtoken';
import { useContext, useEffect } from 'react';
import axios from 'axios';
import { TokenContext } from 'src/contexts/TokenContext';
import { getNewAccessToken, getRefreshToken } from 'src/utils/google.util';
import { UserContext } from 'src/contexts/UserContext';
import classes from './login-page.module.scss';
import { jwtDecode } from 'jwt-decode';
import { useUser } from 'src/hooks/useUser';

export interface LoginPageProps {}

export const LoginPage: React.FC<LoginPageProps> = () => {
    const { token, setToken } = useContext(TokenContext);
    const { currentUser, logoutUser } = useUser();
    const SCOPE = 'https://mail.google.com/';

    const googleLogin = useGoogleLogin({
        // adding scope to get full authority to get information
        // scope: SCOPE,
        // to get the refresh token we need to request for authentication code.
        flow: 'auth-code',
        onSuccess: (codeResponse) => {
            new Promise<void>((resolve) => {
                getRefreshToken(codeResponse, setToken);

                if (token) {
                    // wait for the refresh token to arrive.
                    resolve();
                }
            });
        },
        onError: (error: any) => {
            console.log('Login Failed:', error);
        },
    });

    // useEffect(() => {
    //   if (!user) {
    //     userserv
    //   }
    // }, [user])

    // useEffect(() => {
    //     if (token) {
    //         axios
    //             .get(
    //                 `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${token}`,
    //                 {
    //                     headers: {
    //                         Authorization: `Bearer ${token}`,
    //                         Accept: 'application/json',
    //                     },
    //                 }
    //             )
    //             .then((res) => {
    //                 console.log('.thkujgvfen  res:', res);
    //                 setToken(res.data);
    //             })
    //             .catch((err) => console.log('err: ', err));
    //     }
    // }, [token]);

    // log out function to log the user out of google and set the profile array to null
    // const logOut = () => {
    //     googleLogout();
    //     setToken(undefined);
    // };

    return (
        <div className={classes.container}>
            <h2>React Google Login</h2>
            <br />

            {currentUser ? (
                <div>
                    <img src={currentUser.picture} alt="currentUser image" />
                    <h3>Hurray! We have got the currentUser profile.</h3>

                    <div>
                        <p>Name: {currentUser.name}</p>
                        <p>Email Address: {currentUser.gmail}</p>
                    </div>

                    <br />
                    <button onClick={logoutUser}>Log out</button>
                </div>
            ) : (
                <button onClick={googleLogin}>Sign in with Google 🚀 </button>
            )}
        </div>
    );
};
