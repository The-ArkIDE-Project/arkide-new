import './public-path';
import '../lib/normalize.css';

// Suppress noisy legacy React lifecycle warnings from third party libraries
const originalConsoleError = console.error;
console.error = (...args) => {
    const msg = args[0];
    if (typeof msg === 'string' && (
        msg.includes('componentWillMount') ||
        msg.includes('componentWillReceiveProps') ||
        msg.includes('componentWillUpdate') ||
        msg.includes('Each child in a list should have a unique') ||
        msg.includes('Unknown event handler property') ||
        msg.includes('does not recognize the') ||
        msg.includes('Failed prop type') ||
        (msg.includes('Invalid prop') && msg.includes('DOM element'))
    )) {
        return;
    }
    originalConsoleError.apply(console, args);
};

const originalConsoleWarn = console.warn;
console.warn = (...args) => {
    const msg = args[0];
    if (typeof msg === 'string' && (
        msg.includes('componentWillMount') ||
        msg.includes('componentWillReceiveProps') ||
        msg.includes('componentWillUpdate') ||
        msg.includes('Each child in a list should have a unique') ||
        msg.includes('Unknown event handler property') ||
        msg.includes('does not recognize the') ||
        msg.includes('extraProjectInfo.remixId') ||
        msg.includes('Failed prop type') ||
        (msg.includes('Invalid prop') && msg.includes('DOM element'))
    )) {
        return;
    }
    originalConsoleWarn.apply(console, args);
};