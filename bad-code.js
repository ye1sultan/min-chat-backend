// This file contains intentionally bad code to test SonarCloud

const express = require('express');

// Hard-coded credentials (Security Hotspot)
const API_KEY = "sk-1234567890abcdefghijklmnopqrstuvwxyz";
const PASSWORD = "admin123";
const SECRET_TOKEN = "my-secret-token-12345";

// Unused variables (Code Smell)
const unusedVariable = "This variable is never used";
const anotherUnusedVar = 42;
let neverUsed = [];

// Function with too many parameters (Code Smell)
function complexFunction(a, b, c, d, e, f, g, h, i, j) {
    console.log(a + b + c + d + e + f + g + h + i + j);
}

// Dead code / Unreachable code (Code Smell)
function deadCodeExample() {
    return true;
    console.log("This will never be executed");
    let x = 5;
    return false;
}

// Cognitive Complexity - Deeply nested conditions (Code Smell)
function complexLogic(x, y, z) {
    if (x > 0) {
        if (y > 0) {
            if (z > 0) {
                if (x > y) {
                    if (y > z) {
                        if (x > z) {
                            return "very complex";
                        }
                    }
                }
            }
        }
    }
    return "simple";
}

// Code duplication (Code Smell)
function calculatePrice1(items) {
    let total = 0;
    for (let i = 0; i < items.length; i++) {
        total += items[i].price * items[i].quantity;
    }
    return total;
}

function calculatePrice2(products) {
    let total = 0;
    for (let i = 0; i < products.length; i++) {
        total += products[i].price * products[i].quantity;
    }
    return total;
}

function calculatePrice3(goods) {
    let total = 0;
    for (let i = 0; i < goods.length; i++) {
        total += goods[i].price * goods[i].quantity;
    }
    return total;
}

// == instead of === (Code Smell)
function compareValues(a, b) {
    if (a == b) {  // Should use ===
        return true;
    }
    return false;
}

// eval() usage (Security Vulnerability)
function dangerousEval(userInput) {
    return eval(userInput);  // Critical security issue
}

// SQL Injection vulnerability potential
function getUserData(userId) {
    const query = "SELECT * FROM users WHERE id = " + userId;  // SQL injection risk
    console.log(query);
}

// Missing error handling (Code Smell)
function parseJSON(data) {
    return JSON.parse(data);  // No try-catch
}

// Console.log in production code (Code Smell)
function debugFunction() {
    console.log("Debug: Function called");
    console.log("Debug: Processing data");
    console.error("Error log");
    console.warn("Warning log");
}

// Variable shadowing (Code Smell)
let globalVar = "global";
function shadowExample() {
    let globalVar = "local";  // Shadows outer variable
    console.log(globalVar);
}

// Empty block (Code Smell)
function emptyBlock(x) {
    if (x > 0) {
        // Empty if block
    }
}

// Identical if/else branches (Code Smell)
function identicalBranches(x) {
    if (x > 0) {
        return "value";
    } else {
        return "value";  // Same as if branch
    }
}

// Magic numbers everywhere (Code Smell)
function magicNumbers(x) {
    if (x > 42) {
        return x * 3.14159;
    } else if (x < 10) {
        return x / 2.5;
    }
    return 100;
}

// No input validation
function processUserInput(input) {
    return input.toUpperCase();  // No null/undefined check
}

// Overly complex boolean expression
function complexBoolean(a, b, c, d) {
    return (a && b || c && d || !a && !b || a && !c && d || !a && b && !d);
}

// Export to make it a "used" file
module.exports = {
    complexFunction,
    deadCodeExample,
    dangerousEval
};

