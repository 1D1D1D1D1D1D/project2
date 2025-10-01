import App from 'app/App';
import './app/styles/tailwind.css';
import 'app/styles/index.scss';
import { createRoot } from 'react-dom/client';
import { StoreProvider } from 'app/providers/StoreProvider/ui/StoreProvider';
import ErrorBoundary from 'app/providers/ErrorBoundary/ErrorBoundary';
import { ThemeProvider } from 'app/providers/ThemeProvider';

const container = document.getElementById('root') as HTMLElement;

if (container) {
    const root = createRoot(container);
    root.render(
        <StoreProvider >
            <ErrorBoundary>
                <ThemeProvider>
                    <App />
                </ThemeProvider>
            </ErrorBoundary>
        </StoreProvider>
    );
} else {
    console.error('No DOM element with id "root" found.');
}
