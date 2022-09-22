import { ComponentProps, ComponentType, createElement, FC } from 'react';

export type LoadableComponentProps<T extends ComponentType> = {
    loading?: boolean;
} & ComponentProps<T>;

const withLoading = <O extends ComponentType, L extends ComponentType>(
    OriginalComponent: O,
    LoadingComponent: L
): FC<LoadableComponentProps<O | L>> => {
    const LoadableComponent: ComponentType<LoadableComponentProps<O | L>> = ({
        loading = false,
        ...props
    }: LoadableComponentProps<O | L>) => {
        if (loading) {
            const loadingProps = props as ComponentProps<L>;
            return createElement(LoadingComponent, loadingProps);
        } else {
            const originalProps = props as ComponentProps<L>;
            return createElement(OriginalComponent, originalProps);
        }
    };

    return LoadableComponent;
};

export default withLoading;
