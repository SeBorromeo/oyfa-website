import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

/**
 * Utility function that mocks the `IntersectionObserver` API. Necessary for components that rely
 * on it, otherwise the tests will crash. Recommended to execute inside `beforeEach`.
 * @param intersectionObserverMock - Parameter that is sent to the `Object.defineProperty`
 * overwrite method. `jest.fn()` mock functions can be passed here if the goal is to not only
 * mock the intersection observer, but its methods.
 */
export function setupIntersectionObserverMock({
    root = null,
    rootMargin = '',
    thresholds = [],
    disconnect = () => null,
    observe = () => null,
    takeRecords = () => [],
    unobserve = () => null,
  } = {}) {
    class MockIntersectionObserver {
      constructor() {
        this.root = root;
        this.rootMargin = rootMargin;
        this.thresholds = thresholds;
        this.disconnect = disconnect;
        this.observe = observe;
        this.takeRecords = takeRecords;
        this.unobserve = unobserve;
      }
    }
  
    Object.defineProperty(window, 'IntersectionObserver', {
      writable: true,
      configurable: true,
      value: MockIntersectionObserver
    });
  
    Object.defineProperty(global, 'IntersectionObserver', {
      writable: true,
      configurable: true,
      value: MockIntersectionObserver
    });
}

beforeEach(() => {
    setupIntersectionObserverMock(); //Must do this because Framer Motion uses something called IntersectionObserver
});

describe('Routing Test', () => {
    test('Check Home Route', () => {
        render(<App/>);
        expect(screen.getByText('Helloyfa!')).toBeInTheDocument()
    });
});