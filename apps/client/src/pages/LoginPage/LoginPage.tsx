import classes from './login-page.module.scss';

export interface LoginPageProps {}

export const LoginPage: React.FC<LoginPageProps> = () => {
    const handleLogin = async () => {};

    return (
        <div className={classes.container}>
            <button onClick={handleLogin}>התחברות</button>
        </div>
    );
};
