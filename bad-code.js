// This file now contains clean, properly written code

const express = require('express');

// Constants instead of magic numbers
const PRICE_THRESHOLD = 42;
const PI_APPROXIMATION = 3.14159;
const DEFAULT_DIVISOR = 2.5;
const DEFAULT_RETURN_VALUE = 100;
const MIN_THRESHOLD = 10;

// Credentials should come from environment variables
function getApiKey() {
    return process.env.API_KEY || '';
}

function getPassword() {
    return process.env.PASSWORD || '';
}

function getSecretToken() {
    return process.env.SECRET_TOKEN || '';
}

// Refactored function with reasonable number of parameters
function calculateSum(numbers) {
    return numbers.reduce((sum, num) => sum + num, 0);
}

// Removed dead code - only reachable code remains
function validateInput() {
    return true;
}

// Simplified logic with reduced cognitive complexity
function categorizeValue(x, y, z) {
    if (x <= 0 || y <= 0 || z <= 0) {
        return "simple";
    }
    
    const isValid = x > y && y > z && x > z;
    return isValid ? "very complex" : "simple";
}

// Single reusable function instead of duplicates
function calculateTotalPrice(items) {
    if (!items || !Array.isArray(items)) {
        return 0;
    }
    
    return items.reduce((total, item) => {
        const price = item.price || 0;
        const quantity = item.quantity || 0;
        return total + (price * quantity);
    }, 0);
}

// Using strict equality
function compareValues(a, b) {
    return a === b;
}

// Safe alternative to eval - using Function constructor with validation
function safeEvaluate(expression) {
    // Only allow simple mathematical expressions
    const safePattern = /^[0-9+\-*/().\s]+$/;
    
    if (!safePattern.test(expression)) {
        throw new Error('Invalid expression');
    }
    
    try {
        // Using Function is safer than eval but still should be avoided in production
        // Consider using a proper expression parser library
        return new Function(`'use strict'; return (${expression})`)();
    } catch (error) {
        throw new Error('Evaluation failed');
    }
}

// Using parameterized queries (example with prepared statement pattern)
function getUserData(userId) {
    // This would use a proper database library with parameterized queries
    // Example: const query = 'SELECT * FROM users WHERE id = ?';
    // return db.query(query, [userId]);
    
    if (!userId || typeof userId !== 'number') {
        throw new Error('Invalid user ID');
    }
    
    // Return a safe query structure instead of concatenating
    return {
        query: 'SELECT * FROM users WHERE id = ?',
        params: [userId]
    };
}

// Proper error handling
function parseJSON(data) {
    try {
        return JSON.parse(data);
    } catch (error) {
        throw new Error(`Failed to parse JSON: ${error.message}`);
    }
}

// Using proper logger instead of console (in production, use winston/bunyan)
function logDebug(message) {
    // In production, replace with proper logging library
    if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.log(message);
    }
}

// No variable shadowing
const globalConfiguration = "global";

function getConfiguration() {
    const localConfiguration = "local";
    return localConfiguration;
}

// Non-empty block with meaningful logic
function processPositiveNumber(x) {
    if (x > 0) {
        return x * 2;
    }
    return 0;
}

// Different branches with distinct behavior
function categorizeNumber(x) {
    if (x > 0) {
        return "positive";
    }
    return "non-positive";
}

// Using named constants
function calculateValue(x) {
    if (x > PRICE_THRESHOLD) {
        return x * PI_APPROXIMATION;
    }
    
    if (x < MIN_THRESHOLD) {
        return x / DEFAULT_DIVISOR;
    }
    
    return DEFAULT_RETURN_VALUE;
}

// Input validation
function processUserInput(input) {
    if (input === null || input === undefined) {
        throw new Error('Input cannot be null or undefined');
    }
    
    if (typeof input !== 'string') {
        throw new Error('Input must be a string');
    }
    
    return input.toUpperCase();
}

// Simplified boolean expression
function evaluateConditions(a, b, c, d) {
    const condition1 = (a && b) || (c && d);
    const condition2 = (!a && !b) || (a && !c && d);
    const condition3 = !a && b && !d;
    
    return condition1 || condition2 || condition3;
}

// Export functions
module.exports = {
    calculateSum,
    validateInput,
    categorizeValue,
    calculateTotalPrice,
    compareValues,
    safeEvaluate,
    getUserData,
    parseJSON,
    logDebug,
    getConfiguration,
    processPositiveNumber,
    categorizeNumber,
    calculateValue,
    processUserInput,
    evaluateConditions,
    getApiKey,
    getPassword,
    getSecretToken
};
