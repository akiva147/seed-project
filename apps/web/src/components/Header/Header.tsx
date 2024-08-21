import classes from './header.module.scss';

export interface HeaderProps {}

export const Header = (props: HeaderProps) => (
    <header className={classes.container}>
        <Title />
        <UserSection />
    </header>
);

const Title = () => <h1>ניהול פתקים - פרויקט לדוגמא</h1>;

const UserSection = () => {
    // const handleLogout = () => logoutFromLoggedInUser();

    return (
        <div className={classes.user}>
            {/* <span>{username}</span> */}
            {/* <button onClick={handleLogout}>התנתקות</button> */}
        </div>
    );
};
