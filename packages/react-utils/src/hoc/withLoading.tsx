import { ComponentType, FC } from 'react';

export type LoadableComponentProps<T> = {
    loading?: boolean;
} & T;

const withLoading = <O, L>(
    OriginalComponent: ComponentType<O>,
    LoadingComponent: ComponentType<L>
): FC<LoadableComponentProps<O | L>> => {
    const LoadableComponent: FC<LoadableComponentProps<O | L>> = ({
        loading = false,
        ...props
    }: LoadableComponentProps<O | L>) =>
        loading ? (
            <LoadingComponent {...(props as L)} />
        ) : (
            <OriginalComponent {...(props as O)} />
        );

    return LoadableComponent;
};

export default withLoading;
