import classNames from 'classnames';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import { PropsWithChildren, useEffect } from 'react';
import { ErrorBoundary } from '../ErrorBoundary';
import classes from './status-indicator.module.scss';

type Variant = 'normal' | 'inverse';
interface StatusIndicatorProps extends Status {
    size?: 'small' | 'large';
    variant?: {
        loading?: Variant;
        error?: Variant;
    };
    isInTable?: boolean;
}

export const antIcon = (
    <LoadingOutlined style={{ fontSize: '2rem' }} spin alt="spinner" />
);
export const StatusIndicator = ({
    loading,
    error,
    variant,
    size,
    children,
    isInTable,
}: PropsWithChildren<StatusIndicatorProps>) => {
    if (error) {
        return (
            <ErrorBoundary
                msg={error}
                variant={variant?.error}
                size={size}
                isInTable={isInTable}
            />
        );
    } else {
        if (loading) {
            return isInTable ? (
                <tbody style={{ backgroundColor: 'white' }}>
                    <tr
                        className={classNames(classes.container, {
                            [classes.small]: size === 'small',
                        })}
                    >
                        <td style={{ backgroundColor: 'white' }}>
                            <Spin indicator={antIcon} />
                        </td>
                    </tr>
                </tbody>
            ) : (
                <div
                    className={classNames(classes.container, {
                        [classes.inverse]: variant?.loading === 'inverse',
                        [classes.small]: size === 'small',
                    })}
                >
                    <Spin indicator={antIcon} />
                </div>
            );
        } else {
            return <>{children}</>;
        }
    }
};

export type Status = {
    loading: boolean;
    error?: string;
};
