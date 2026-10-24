
// Utility Functions

/**
 * Capitalizes the first letter of each word in the input string.
 * @param {string} input - The input string.
 * @returns {string} - The formatted string.
 */
function capitalizeWords(input) {
    return input.replace(/\b\w/g, char => char.toUpperCase());
}

/**
 * Filters active users from the array.
 * @param {Array} users - An array of user objects.
 * @returns {Array} - An array of active user objects.
 */
function filterActiveUsers(users) {
    return users.filter(user => user.isActive);
}

/**
 * Logs an action performed by a user with a timestamp.
 * @param {string} action - The action performed.
 * @param {string} username - The name of the user.
 * @returns {string} - The log message.
 */
function logAction(action, username) {
    const timestamp = new Date().toISOString();
    return `User ${username} performed ${action} at ${timestamp}`;
}

module.exports = { capitalizeWords, filterActiveUsers, logAction };



describe('capitalizeWords', () => {
    test('capitalizes the first letter of each word', () => {
        expect(capitalizeWords('hello world')).toBe('Hello World');
    });

    test('handles multiple words', () => {
        expect(capitalizeWords('the quick brown fox')).toBe('The Quick Brown Fox');
    });

    test('returns an empty string for an empty string', () => {
        expect(capitalizeWords('')).toBe('');
    });

    test('handles a single word', () => {
        expect(capitalizeWords('hello')).toBe('Hello');
    });

    test('capitalizes after special characters like hyphens', () => {
        expect(capitalizeWords('hello-world')).toBe('Hello-World');
    });

    test('leaves already capitalized words unchanged', () => {
        expect(capitalizeWords('Hello World')).toBe('Hello World');
    });

    test('keeps the rest of each word unchanged', () => {
        expect(capitalizeWords('hELLO wORLD')).toBe('HELLO WORLD');
    });
});

describe('filterActiveUsers', () => {
    test('returns only active users from a mixed array', () => {
        const users = [
            { name: 'Alice', isActive: true },
            { name: 'Bob', isActive: false },
        ];
        expect(filterActiveUsers(users)).toEqual([{ name: 'Alice', isActive: true }]);
    });

    test('returns all users when everyone is active', () => {
        const users = [
            { name: 'Alice', isActive: true },
            { name: 'Carol', isActive: true },
        ];
        expect(filterActiveUsers(users)).toEqual(users);
    });

    test('returns an empty array when all users are inactive', () => {
        const users = [
            { name: 'Bob', isActive: false },
            { name: 'Dave', isActive: false },
        ];
        expect(filterActiveUsers(users)).toEqual([]);
    });

    test('returns an empty array for an empty array', () => {
        expect(filterActiveUsers([])).toEqual([]);
    });

    test('does not modify the original array', () => {
        const users = [
            { name: 'Alice', isActive: true },
            { name: 'Bob', isActive: false },
        ];
        filterActiveUsers(users);
        expect(users).toHaveLength(2);
    });
});

describe('logAction', () => {
    beforeEach(() => {
        jest.useFakeTimers();
        jest.setSystemTime(new Date('2024-11-27T12:00:00Z'));
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    test('generates the correct log string for valid inputs', () => {
        expect(logAction('login', 'Alice')).toBe(
            'User Alice performed login at 2024-11-27T12:00:00.000Z'
        );
    });

    test('includes the username and action in the log', () => {
        const result = logAction('logout', 'Bob');
        expect(result).toContain('Bob');
        expect(result).toContain('logout');
    });

    test('includes undefined in the message when the username is missing', () => {
        expect(logAction('login')).toBe(
            'User undefined performed login at 2024-11-27T12:00:00.000Z'
        );
    });

    test('includes undefined in the message when the action is missing', () => {
        expect(logAction(undefined, 'Alice')).toBe(
            'User Alice performed undefined at 2024-11-27T12:00:00.000Z'
        );
    });

    test('handles empty strings as inputs', () => {
        expect(logAction('', '')).toBe(
            'User  performed  at 2024-11-27T12:00:00.000Z'
        );
    });
});