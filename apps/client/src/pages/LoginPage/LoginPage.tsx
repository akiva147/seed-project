import { useGoogleLogin } from '@react-oauth/google';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, message } from 'antd';
import { useUser } from 'src/hooks/useUser';
import { getRefreshToken } from 'src/utils/google.util';
import classes from './login-page.module.scss';

export interface LoginPageProps {}

export const LoginPage: React.FC<LoginPageProps> = () => {
    const { currentUser, logoutUser, token, setToken, currentUserStatus } =
        useUser();
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate();
    const googleLogin = useGoogleLogin({
        // to get the refresh token we need to request for authentication code.
        flow: 'auth-code',
        onSuccess: (codeResponse) => {
            // console.log('codeResponse:', codeResponse);
            new Promise<void>((resolve) => {
                getRefreshToken(codeResponse, setToken);

                if (token) resolve();
            });
        },
        onError: (error: any) => {
            console.log('Login Failed:', error);
        },
    });
    // useEffect(() => {
    //     const checkExpired = async () => {
    //         if (currentUserStatus === 'error') {
    //             await logoutUser();
    //             messageApi.info(
    //                 'Your session has expired, please reconnect to your account'
    //             );
    //         }
    //     };
    //     checkExpired();
    // }, [currentUserStatus]);

    useEffect(() => {
        if (currentUserStatus === 'success') navigate('/notes');
    }, [currentUserStatus]);

    return (
        <div className={classes.container}>
            <h2>React Google Login</h2>
            <br />
            {contextHolder}
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
                <Button onClick={googleLogin}>Sign in with Google 🚀 </Button>
            )}
        </div>
    );
};
