import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import classes from './login-page.module.scss';
import { useUser } from 'src/hooks/useUser';

export interface LoginPageProps {}

export const LoginPage: React.FC<LoginPageProps> = () => {
    const { setCredentialResponse } = useUser();
    const onSuccess = (credentialResponse: CredentialResponse) => {
        console.log('Logged in successfully: ', credentialResponse);
        setCredentialResponse(credentialResponse);
    };

    const onError = () => {
        console.error('Faild to login');
    };

    return (
        <div className={classes.container}>
            <h2>Login with google</h2>
            <GoogleLogin onSuccess={onSuccess} onError={onError} locale="en" />
        </div>
    );
};
