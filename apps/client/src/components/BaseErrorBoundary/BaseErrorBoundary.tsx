import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouteError } from 'react-router-dom';
import classes from './base-error-boundary.module.scss';

export const BaseErrorBoundary = () => {
    const error = useRouteError() as Error;

    return (
        <div className={classes.container}>
            <FontAwesomeIcon icon={faTriangleExclamation} />
            <h1>אירעה שגיאה</h1>
            <p>{error.message}</p>
        </div>
    );
};
