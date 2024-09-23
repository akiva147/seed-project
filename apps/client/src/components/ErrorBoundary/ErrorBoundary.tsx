import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import classes from './error-boundary.module.scss';
import { useRouteError } from 'react-router-dom';

export interface ErrorBoundaryProps {
    msg?: string;
    variant?: 'normal' | 'inverse';
    size?: 'small' | 'large';
    isInTable?: boolean;
}

export const ErrorBoundary = ({
    msg,
    variant,
    size,
    isInTable,
}: ErrorBoundaryProps) => {
    const routeError = useRouteError() as Error;

    const errorMessage = msg ? msg : routeError.message;

    return isInTable ? (
        <tbody
            className={classNames(classes.container, classes.table, {
                [classes.small]: size === 'small',
            })}
        >
            <tr>
                <td style={{ backgroundColor: 'white' }}>
                    <FontAwesomeIcon icon={faExclamationTriangle as IconProp} />
                    <p>{'שגיאה: ' + errorMessage}</p>
                </td>
            </tr>
        </tbody>
    ) : (
        <div
            className={classNames(classes.container, {
                [classes.inverse]: variant === 'inverse',
                [classes.small]: size === 'small',
            })}
        >
            <FontAwesomeIcon icon={faExclamationTriangle as IconProp} />
            <p>{'שגיאה: ' + errorMessage}</p>
        </div>
    );
};
