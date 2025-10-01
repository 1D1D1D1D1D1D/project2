import React, { ErrorInfo, ReactNode, Suspense } from "react";

interface ErrorBoundaryProps {
    children: ReactNode
}
interface ErrorBoundaryState {
    hasError: boolean
}
class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        // You can also log the error to an error reporting service
    }

    render() {
        const { hasError } = this.state
        const { children } = this.props
        if (this.state.hasError) {
            return <Suspense>Error</Suspense>
        }

        return children
    }
}

export default ErrorBoundary