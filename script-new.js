// Numera Financial Tools Suite - Clean JavaScript
// All calculator functions and interactivity

// Global Variables
let currentTheme = localStorage.getItem('theme') || 'light';

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Initialize all app functionality
function initializeApp() {
    setupThemeToggle();
    setupNavigation();
    setupToolCards();
    setupModal();
    applyTheme(currentTheme);
    setupSmoothScrolling();
}

// Theme Management
function setupThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;
    
    const themeIcon = themeToggle.querySelector('i');
    
    themeToggle.addEventListener('click', () => {
        currentTheme = currentTheme === 'light' ? 'dark' : 'light';
        applyTheme(currentTheme);
        localStorage.setItem('theme', currentTheme);
        
        // Update icon
        themeIcon.className = currentTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    });
    
    // Set initial icon
    themeIcon.className = currentTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
}

function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
}

// Navigation Setup
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const href = link.getAttribute('href');
            
            if (href && href.startsWith('#')) {
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
                
                // Update active state
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            }
        });
    });
}

// Smooth Scrolling Setup
function setupSmoothScrolling() {
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', (e) => {
            e.preventDefault();
            const toolsSection = document.querySelector('#tools');
            if (toolsSection) {
                toolsSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
}

// Tool Cards Setup
function setupToolCards() {
    const toolCards = document.querySelectorAll('.tool-card');
    
    toolCards.forEach(card => {
        card.addEventListener('click', () => {
            const toolType = card.getAttribute('data-tool');
            openCalculator(toolType);
        });
        
        // Add keyboard accessibility
        card.setAttribute('tabindex', '0');
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const toolType = card.getAttribute('data-tool');
                openCalculator(toolType);
            }
        });
    });
}

// Modal Management
function setupModal() {
    const modal = document.getElementById('calculatorModal');
    if (!modal) return;
    
    const closeBtn = modal.querySelector('.close');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }
    
    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });
}

// Open Calculator Modal
function openCalculator(toolType) {
    const modal = document.getElementById('calculatorModal');
    const content = document.getElementById('calculatorContent');
    const template = document.getElementById(`${toolType}Calculator`);
    
    if (template && modal && content) {
        content.innerHTML = template.outerHTML;
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Focus management for accessibility
        const firstInput = content.querySelector('input, select, button');
        if (firstInput) {
            firstInput.focus();
        }
    }
}

// Close Calculator Modal
function closeModal() {
    const modal = document.getElementById('calculatorModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        
        // Clear results when closing
        clearAllResults();
    }
}

// Clear all result sections
function clearAllResults() {
    const resultSections = ['emiResult', 'sipResult', 'taxResult', 'currencyResult', 'zakatResult', 'savingsResult'];
    resultSections.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.innerHTML = '';
        }
    });
}

// Utility Functions
function formatCurrency(amount, currency = '₹') {
    return `${currency}${Number(amount).toLocaleString('en-IN', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    })}`;
}

function formatNumber(number, decimals = 2) {
    return Number(number).toLocaleString('en-IN', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
    });
}

function validateInput(value, min = 0, max = Infinity) {
    const num = parseFloat(value);
    return !isNaN(num) && num >= min && num <= max;
}

function showError(message) {
    alert(message);
}

// EMI Calculator
function calculateEMI() {
    const loanAmount = parseFloat(document.getElementById('loanAmount').value);
    const interestRate = parseFloat(document.getElementById('interestRate').value);
    const loanTenure = parseFloat(document.getElementById('loanTenure').value);
    
    // Validation
    if (!validateInput(loanAmount, 1000, 100000000)) {
        showError('Please enter a valid loan amount between ₹1,000 and ₹10,00,00,000');
        return;
    }
    
    if (!validateInput(interestRate, 1, 30)) {
        showError('Please enter a valid interest rate between 1% and 30%');
        return;
    }
    
    if (!validateInput(loanTenure, 1, 30)) {
        showError('Please enter a valid loan tenure between 1 and 30 years');
        return;
    }
    
    // EMI Calculation
    const monthlyRate = interestRate / 12 / 100;
    const numberOfMonths = loanTenure * 12;
    
    const emi = loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfMonths) / 
                (Math.pow(1 + monthlyRate, numberOfMonths) - 1);
    
    const totalPayment = emi * numberOfMonths;
    const totalInterest = totalPayment - loanAmount;
    
    // Display Results
    const resultHTML = `
        <h3>EMI Calculation Results</h3>
        <div class="result-item">
            <span class="result-label">Monthly EMI</span>
            <span class="result-value">${formatCurrency(emi)}</span>
        </div>
        <div class="result-item">
            <span class="result-label">Principal Amount</span>
            <span class="result-value">${formatCurrency(loanAmount)}</span>
        </div>
        <div class="result-item">
            <span class="result-label">Total Interest</span>
            <span class="result-value">${formatCurrency(totalInterest)}</span>
        </div>
        <div class="result-item">
            <span class="result-label">Total Payment</span>
            <span class="result-value">${formatCurrency(totalPayment)}</span>
        </div>
        <div class="highlight">
            <strong>Your monthly EMI is ${formatCurrency(emi)}</strong>
        </div>
    `;
    
    const resultDiv = document.getElementById('emiResult');
    if (resultDiv) {
        resultDiv.innerHTML = resultHTML;
    }
}

// SIP Calculator
function calculateSIP() {
    const monthlyInvestment = parseFloat(document.getElementById('monthlyInvestment').value);
    const expectedReturn = parseFloat(document.getElementById('expectedReturn').value);
    const investmentPeriod = parseFloat(document.getElementById('investmentPeriod').value);
    
    // Validation
    if (!validateInput(monthlyInvestment, 100, 1000000)) {
        showError('Please enter a valid monthly investment between ₹100 and ₹10,00,000');
        return;
    }
    
    if (!validateInput(expectedReturn, 1, 30)) {
        showError('Please enter a valid expected return between 1% and 30%');
        return;
    }
    
    if (!validateInput(investmentPeriod, 1, 50)) {
        showError('Please enter a valid investment period between 1 and 50 years');
        return;
    }
    
    // SIP Calculation
    const monthlyRate = expectedReturn / 12 / 100;
    const numberOfMonths = investmentPeriod * 12;
    
    const futureValue = monthlyInvestment * ((Math.pow(1 + monthlyRate, numberOfMonths) - 1) / monthlyRate) * (1 + monthlyRate);
    const totalInvestment = monthlyInvestment * numberOfMonths;
    const totalReturns = futureValue - totalInvestment;
    
    // Display Results
    const resultHTML = `
        <h3>SIP Calculation Results</h3>
        <div class="result-item">
            <span class="result-label">Monthly Investment</span>
            <span class="result-value">${formatCurrency(monthlyInvestment)}</span>
        </div>
        <div class="result-item">
            <span class="result-label">Total Investment</span>
            <span class="result-value">${formatCurrency(totalInvestment)}</span>
        </div>
        <div class="result-item">
            <span class="result-label">Total Returns</span>
            <span class="result-value">${formatCurrency(totalReturns)}</span>
        </div>
        <div class="result-item">
            <span class="result-label">Maturity Value</span>
            <span class="result-value">${formatCurrency(futureValue)}</span>
        </div>
        <div class="highlight">
            <strong>Your investment will grow to ${formatCurrency(futureValue)} in ${investmentPeriod} years!</strong>
        </div>
    `;
    
    const resultDiv = document.getElementById('sipResult');
    if (resultDiv) {
        resultDiv.innerHTML = resultHTML;
    }
}

// Income Tax Calculator
function calculateTax() {
    const annualIncome = parseFloat(document.getElementById('annualIncome').value);
    const taxRegime = document.getElementById('taxRegime').value;
    const deductions = parseFloat(document.getElementById('deductions').value) || 0;
    
    // Validation
    if (!validateInput(annualIncome, 0, 100000000)) {
        showError('Please enter a valid annual income');
        return;
    }
    
    if (!validateInput(deductions, 0, 10000000)) {
        showError('Please enter valid deductions');
        return;
    }
    
    let taxableIncome = annualIncome;
    let tax = 0;
    
    if (taxRegime === 'old') {
        // Old tax regime with standard deduction and other deductions
        taxableIncome = Math.max(0, annualIncome - deductions - 50000); // 50k standard deduction
        
        // Tax slabs for old regime
        if (taxableIncome <= 250000) {
            tax = 0;
        } else if (taxableIncome <= 500000) {
            tax = (taxableIncome - 250000) * 0.05;
        } else if (taxableIncome <= 1000000) {
            tax = 12500 + (taxableIncome - 500000) * 0.20;
        } else {
            tax = 12500 + 100000 + (taxableIncome - 1000000) * 0.30;
        }
    } else {
        // New tax regime
        taxableIncome = Math.max(0, annualIncome - 50000); // Only standard deduction
        
        // Tax slabs for new regime
        if (taxableIncome <= 300000) {
            tax = 0;
        } else if (taxableIncome <= 600000) {
            tax = (taxableIncome - 300000) * 0.05;
        } else if (taxableIncome <= 900000) {
            tax = 15000 + (taxableIncome - 600000) * 0.10;
        } else if (taxableIncome <= 1200000) {
            tax = 45000 + (taxableIncome - 900000) * 0.15;
        } else if (taxableIncome <= 1500000) {
            tax = 90000 + (taxableIncome - 1200000) * 0.20;
        } else {
            tax = 150000 + (taxableIncome - 1500000) * 0.30;
        }
    }
    
    // Add 4% Health and Education Cess
    const cess = tax * 0.04;
    const totalTax = tax + cess;
    const netIncome = annualIncome - totalTax;
    
    // Display Results
    const resultHTML = `
        <h3>Income Tax Calculation Results (${taxRegime.toUpperCase()} Regime)</h3>
        <div class="result-item">
            <span class="result-label">Annual Income</span>
            <span class="result-value">${formatCurrency(annualIncome)}</span>
        </div>
        <div class="result-item">
            <span class="result-label">Taxable Income</span>
            <span class="result-value">${formatCurrency(taxableIncome)}</span>
        </div>
        <div class="result-item">
            <span class="result-label">Income Tax</span>
            <span class="result-value">${formatCurrency(tax)}</span>
        </div>
        <div class="result-item">
            <span class="result-label">Health & Education Cess</span>
            <span class="result-value">${formatCurrency(cess)}</span>
        </div>
        <div class="result-item">
            <span class="result-label">Total Tax Liability</span>
            <span class="result-value">${formatCurrency(totalTax)}</span>
        </div>
        <div class="result-item">
            <span class="result-label">Net Income</span>
            <span class="result-value">${formatCurrency(netIncome)}</span>
        </div>
        <div class="highlight">
            <strong>Your total tax liability is ${formatCurrency(totalTax)}</strong>
        </div>
    `;
    
    const resultDiv = document.getElementById('taxResult');
    if (resultDiv) {
        resultDiv.innerHTML = resultHTML;
    }
}

// Advanced Scientific Calculator Functions
let currentExpression = '';
let shouldResetDisplay = false;
let angleMode = 'deg'; // 'deg' or 'rad'
let memoryValue = 0;
let history = [];

// Basic input functions
function inputNumber(num) {
    const display = document.getElementById('calculatorDisplay');
    if (!display) return;
    
    if (shouldResetDisplay) {
        display.value = '';
        shouldResetDisplay = false;
    }
    
    // Handle parentheses
    if (num === '(') {
        if (display.value === '0' || display.value === '') {
            display.value = '(';
        } else {
            display.value += '*(';
        }
    } else if (display.value === '0' && num !== '.') {
        display.value = num;
    } else {
        display.value += num;
    }
    
    currentExpression = display.value;
}

function inputOperator(operator) {
    const display = document.getElementById('calculatorDisplay');
    if (!display) return;
    
    if (shouldResetDisplay) {
        shouldResetDisplay = false;
    }
    
    const lastChar = display.value.slice(-1);
    
    // Handle special operators
    if (operator === '^') {
        display.value += '^';
    } else if (operator === '%') {
        display.value += '/100';
    } else {
        // Don't add operator if display is empty or last character is already an operator
        if (display.value === '' || ['+', '-', '*', '/', '^'].includes(lastChar)) {
            return;
        }
        display.value += operator;
    }
    
    currentExpression = display.value;
}

function inputFunction(func) {
    const display = document.getElementById('calculatorDisplay');
    if (!display) return;
    
    if (shouldResetDisplay) {
        display.value = '';
        shouldResetDisplay = false;
    }
    
    if (display.value === '0' || display.value === '') {
        display.value = func;
    } else {
        display.value += '*' + func;
    }
    
    currentExpression = display.value;
}

function inputConstant(constant) {
    const display = document.getElementById('calculatorDisplay');
    if (!display) return;
    
    if (shouldResetDisplay) {
        display.value = '';
        shouldResetDisplay = false;
    }
    
    let value;
    if (constant === 'PI') {
        value = Math.PI.toString();
    } else if (constant === 'E') {
        value = Math.E.toString();
    }
    
    if (display.value === '0' || display.value === '') {
        display.value = value;
    } else {
        display.value += '*' + value;
    }
    
    currentExpression = display.value;
}

// Advanced calculation function
function calculate() {
    const display = document.getElementById('calculatorDisplay');
    const historyDiv = document.getElementById('displayHistory');
    if (!display) return;
    
    try {
        let expression = display.value;
        
        // Save to history
        historyDiv.textContent = expression + ' =';
        
        // Replace × with *
        expression = expression.replace(/×/g, '*');
        
        // Handle scientific functions
        expression = expression.replace(/sin\(/g, angleMode === 'deg' ? 'Math.sin(toRad(' : 'Math.sin(');
        expression = expression.replace(/cos\(/g, angleMode === 'deg' ? 'Math.cos(toRad(' : 'Math.cos(');
        expression = expression.replace(/tan\(/g, angleMode === 'deg' ? 'Math.tan(toRad(' : 'Math.tan(');
        expression = expression.replace(/asin\(/g, angleMode === 'deg' ? 'fromRad(Math.asin(' : 'Math.asin(');
        expression = expression.replace(/acos\(/g, angleMode === 'deg' ? 'fromRad(Math.acos(' : 'Math.acos(');
        expression = expression.replace(/atan\(/g, angleMode === 'deg' ? 'fromRad(Math.atan(' : 'Math.atan(');
        expression = expression.replace(/log\(/g, 'Math.log10(');
        expression = expression.replace(/ln\(/g, 'Math.log(');
        expression = expression.replace(/sqrt\(/g, 'Math.sqrt(');
        expression = expression.replace(/abs\(/g, 'Math.abs(');
        expression = expression.replace(/pow\(/g, 'Math.pow(');
        expression = expression.replace(/factorial\(/g, 'factorial(');
        expression = expression.replace(/\^/g, '**');
        
        // Basic validation
        if (expression === '' || /[+\-*/^]$/.test(expression)) {
            return;
        }
        
        // Helper functions for angle conversion
        const toRad = (deg) => deg * Math.PI / 180;
        const fromRad = (rad) => rad * 180 / Math.PI;
        
        // Factorial function
        const factorial = (n) => {
            if (n < 0) return NaN;
            if (n === 0 || n === 1) return 1;
            let result = 1;
            for (let i = 2; i <= n; i++) {
                result *= i;
            }
            return result;
        };
        
        // Evaluate the expression with helper functions in scope
        const result = Function('toRad', 'fromRad', 'factorial', `"use strict"; return (${expression});`)(toRad, fromRad, factorial);
        
        if (isFinite(result)) {
            // Format the result
            let formattedResult = result;
            if (Math.abs(result) < 1e-10) {
                formattedResult = 0;
            } else if (Math.abs(result) > 1e10 || (Math.abs(result) < 1e-4 && result !== 0)) {
                formattedResult = result.toExponential(6);
            } else {
                formattedResult = parseFloat(result.toPrecision(12));
            }
            
            display.value = formattedResult.toString();
            currentExpression = display.value;
            shouldResetDisplay = true;
            
            // Add to history
            history.push({ expression: display.value, result: formattedResult });
        } else {
            display.value = 'Error';
            historyDiv.textContent = 'Error';
            shouldResetDisplay = true;
        }
    } catch (error) {
        display.value = 'Error';
        document.getElementById('displayHistory').textContent = 'Error';
        shouldResetDisplay = true;
    }
}

// Clear functions
function clearDisplay() {
    const display = document.getElementById('calculatorDisplay');
    const historyDiv = document.getElementById('displayHistory');
    if (!display) return;
    
    display.value = '0';
    historyDiv.textContent = '';
    currentExpression = '';
    shouldResetDisplay = false;
}

function clearEntry() {
    const display = document.getElementById('calculatorDisplay');
    if (!display) return;
    
    display.value = '0';
    shouldResetDisplay = false;
}

function deleteLast() {
    const display = document.getElementById('calculatorDisplay');
    if (!display) return;
    
    if (display.value.length > 1) {
        display.value = display.value.slice(0, -1);
    } else {
        display.value = '0';
    }
    
    currentExpression = display.value;
}

// Angle mode functions
function toggleAngleMode(mode) {
    angleMode = mode;
    document.getElementById('currentMode').textContent = mode.toUpperCase();
    
    // Update button states
    document.getElementById('degMode').classList.remove('active');
    document.getElementById('radMode').classList.remove('active');
    document.getElementById(mode + 'Mode').classList.add('active');
}

// Memory functions
function memoryStore() {
    const display = document.getElementById('calculatorDisplay');
    if (!display) return;
    
    memoryValue = parseFloat(display.value) || 0;
    // Add visual indicator that memory has value
    showMemoryIndicator(true);
}

function memoryRecall() {
    const display = document.getElementById('calculatorDisplay');
    if (!display) return;
    
    display.value = memoryValue.toString();
    shouldResetDisplay = true;
}

function memoryClear() {
    memoryValue = 0;
    showMemoryIndicator(false);
}

function showMemoryIndicator(show) {
    // This function would show/hide a memory indicator
    // For now, we'll just log it
    console.log('Memory ' + (show ? 'stored' : 'cleared'));
}

// Keyboard support
document.addEventListener('keydown', function(e) {
    const display = document.getElementById('calculatorDisplay');
    if (!display || display.style.display === 'none') return;
    
    // Numbers
    if (e.key >= '0' && e.key <= '9') {
        inputNumber(e.key);
    }
    // Operators
    else if (['+', '-', '*', '/'].includes(e.key)) {
        inputOperator(e.key);
    }
    // Special keys
    else if (e.key === '.') {
        inputNumber('.');
    }
    else if (e.key === 'Enter' || e.key === '=') {
        e.preventDefault();
        calculate();
    }
    else if (e.key === 'Escape' || e.key.toLowerCase() === 'c') {
        clearDisplay();
    }
    else if (e.key === 'Backspace') {
        e.preventDefault();
        deleteLast();
    }
    else if (e.key === '(' || e.key === ')') {
        inputNumber(e.key);
    }
});

// Zakat Calculator
function calculateZakat() {
    const cashSavings = parseFloat(document.getElementById('cashSavings').value) || 0;
    const goldValue = parseFloat(document.getElementById('goldValue').value) || 0;
    const silverValue = parseFloat(document.getElementById('silverValue').value) || 0;
    const investments = parseFloat(document.getElementById('investments').value) || 0;
    const debts = parseFloat(document.getElementById('debts').value) || 0;
    
    // Calculate total zakatable wealth
    const totalWealth = cashSavings + goldValue + silverValue + investments - debts;
    
    // Nisab threshold (approximately ₹4,50,000 as of 2024)
    const nisabThreshold = 450000;
    
    let zakatAmount = 0;
    let isEligible = false;
    
    if (totalWealth >= nisabThreshold) {
        zakatAmount = totalWealth * 0.025; // 2.5% of total wealth
        isEligible = true;
    }
    
    // Display Results
    const resultHTML = `
        <h3>Zakat Calculation Results</h3>
        <div class="result-item">
            <span class="result-label">Cash & Savings</span>
            <span class="result-value">${formatCurrency(cashSavings)}</span>
        </div>
        <div class="result-item">
            <span class="result-label">Gold Value</span>
            <span class="result-value">${formatCurrency(goldValue)}</span>
        </div>
        <div class="result-item">
            <span class="result-label">Silver Value</span>
            <span class="result-value">${formatCurrency(silverValue)}</span>
        </div>
        <div class="result-item">
            <span class="result-label">Investments</span>
            <span class="result-value">${formatCurrency(investments)}</span>
        </div>
        <div class="result-item">
            <span class="result-label">Debts (Deducted)</span>
            <span class="result-value">-${formatCurrency(debts)}</span>
        </div>
        <div class="result-item">
            <span class="result-label">Net Zakatable Wealth</span>
            <span class="result-value">${formatCurrency(totalWealth)}</span>
        </div>
        <div class="result-item">
            <span class="result-label">Nisab Threshold</span>
            <span class="result-value">${formatCurrency(nisabThreshold)}</span>
        </div>
        <div class="result-item">
            <span class="result-label">Zakat Due</span>
            <span class="result-value">${formatCurrency(zakatAmount)}</span>
        </div>
        <div class="highlight">
            ${isEligible ? 
                `<strong>Your Zakat obligation is ${formatCurrency(zakatAmount)}</strong>` :
                `<strong>Your wealth is below Nisab threshold. No Zakat is due.</strong>`
            }
        </div>
        <p style="text-align: center; margin-top: 10px; font-size: 0.9rem; color: var(--text-secondary);">
            *Consult with Islamic scholars for specific Zakat rulings
        </p>
    `;
    
    const resultDiv = document.getElementById('zakatResult');
    if (resultDiv) {
        resultDiv.innerHTML = resultHTML;
    }
}

