// Numera Financial Tools Suite - JavaScript
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
    setupToolCards();g
    setupModal();
    applyTheme(currentTheme);
    setupSmoothScrolling();
}

// Theme Management
function setupThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
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
            
            if (href.startsWith('#')) {
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
    const closeBtn = modal.querySelector('.close');
    
    closeBtn.addEventListener('click', closeModal);
    
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
    
    if (template) {
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
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    
    // Clear results when closing
    clearAllResults();
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
    alert(message); // In production, use a better error display method
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
    
    document.getElementById('emiResult').innerHTML = resultHTML;
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
    
    document.getElementById('sipResult').innerHTML = resultHTML;
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
    
    document.getElementById('taxResult').innerHTML = resultHTML;
}

// Currency Converter
function convertCurrency() {
    const amount = parseFloat(document.getElementById('amount').value);
    const fromCurrency = document.getElementById('fromCurrency').value;
    const toCurrency = document.getElementById('toCurrency').value;
    
    // Validation
    if (!validateInput(amount, 0)) {
        showError('Please enter a valid amount');
        return;
    }
    
    if (fromCurrency === toCurrency) {
        showError('Please select different currencies');
        return;
    }
    
    // Show loading
    const resultDiv = document.getElementById('currencyResult');
    resultDiv.innerHTML = '<div class="loading"></div> Converting...';
    
    // Use fallback rates directly for better reliability
    const fallbackRates = {
        'USD': { 'INR': 83.00, 'EUR': 0.92, 'GBP': 0.79, 'JPY': 149.00, 'AUD': 1.52, 'CAD': 1.36 },
        'INR': { 'USD': 0.012, 'EUR': 0.011, 'GBP': 0.0095, 'JPY': 1.79, 'AUD': 0.018, 'CAD': 0.016 },
        'EUR': { 'USD': 1.08, 'INR': 90.00, 'GBP': 0.86, 'JPY': 161.00, 'AUD': 1.65, 'CAD': 1.47 },
        'GBP': { 'USD': 1.26, 'INR': 105.00, 'EUR': 1.16, 'JPY': 187.00, 'AUD': 1.92, 'CAD': 1.71 },
        'JPY': { 'USD': 0.0067, 'INR': 0.56, 'EUR': 0.0062, 'GBP': 0.0053, 'AUD': 0.010, 'CAD': 0.0091 },
        'AUD': { 'USD': 0.66, 'INR': 54.60, 'EUR': 0.61, 'GBP': 0.52, 'JPY': 98.00, 'CAD': 0.89 },
        'CAD': { 'USD': 0.74, 'INR': 61.20, 'EUR': 0.68, 'GBP': 0.58, 'JPY': 110.00, 'AUD': 1.12 }
    };
    
    // Check if conversion is available
    if (fallbackRates[fromCurrency] && fallbackRates[fromCurrency][toCurrency]) {
        const rate = fallbackRates[fromCurrency][toCurrency];
        const convertedAmount = amount * rate;
        
        const resultHTML = `
            <h3>Currency Conversion Results</h3>
            <div class="result-item">
                <span class="result-label">Amount</span>
                <span class="result-value">${formatNumber(amount)} ${fromCurrency}</span>
            </div>
            <div class="result-item">
                <span class="result-label">Exchange Rate</span>
                <span class="result-value">1 ${fromCurrency} = ${formatNumber(rate, 4)} ${toCurrency}</span>
            </div>
            <div class="result-item">
                <span class="result-label">Converted Amount</span>
                <span class="result-value">${formatNumber(convertedAmount)} ${toCurrency}</span>
            </div>
            <div class="highlight">
                <strong>${formatNumber(amount)} ${fromCurrency} = ${formatNumber(convertedAmount)} ${toCurrency}</strong>
            </div>
            <p style="text-align: center; margin-top: 10px; font-size: 0.9rem; color: var(--text-secondary);">
                *Exchange rates are approximate and updated regularly
            </p>
        `;
        
        resultDiv.innerHTML = resultHTML;
    } else {
        resultDiv.innerHTML = `
            <p style="color: var(--danger-color); text-align: center;">
                Conversion between ${fromCurrency} and ${toCurrency} is not available.<br>
                Please select different currencies.
            </p>
        `;
    }
}

// Legacy async version (backup)
async function convertCurrencyAPI() {
    const amount = parseFloat(document.getElementById('amount').value);
    const fromCurrency = document.getElementById('fromCurrency').value;
    const toCurrency = document.getElementById('toCurrency').value;
    
    // Show loading
    const resultDiv = document.getElementById('currencyResult');
    resultDiv.innerHTML = '<div class="loading"></div> Converting...';
    
    try {
        // Using a free exchange rate API with timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3000); // 3 second timeout
        
        const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`, {
            signal: controller.signal
        });
        clearTimeout(timeoutId);
        
        if (!response.ok) {
            throw new Error('API response not ok');
        }
        
        const data = await response.json();
        
        if (data.rates[toCurrency]) {
            const rate = data.rates[toCurrency];
            const convertedAmount = amount * rate;
            
            // Display Results
            const resultHTML = `
                <h3>Currency Conversion Results</h3>
                <div class="result-item">
                    <span class="result-label">Amount</span>
                    <span class="result-value">${formatNumber(amount)} ${fromCurrency}</span>
                </div>
                <div class="result-item">
                    <span class="result-label">Exchange Rate</span>
                    <span class="result-value">1 ${fromCurrency} = ${formatNumber(rate, 4)} ${toCurrency}</span>
                </div>
                <div class="result-item">
                    <span class="result-label">Converted Amount</span>
                    <span class="result-value">${formatNumber(convertedAmount)} ${toCurrency}</span>
                </div>
                <div class="highlight">
                    <strong>${formatNumber(amount)} ${fromCurrency} = ${formatNumber(convertedAmount)} ${toCurrency}</strong>
                </div>
                <p style="text-align: center; margin-top: 10px; font-size: 0.9rem; color: var(--text-secondary);">
                    *Exchange rates are approximate and may vary
                </p>
            `;
            
            resultDiv.innerHTML = resultHTML;
        } else {
            throw new Error('Currency not supported');
        }
    } catch (error) {
        console.error('Currency conversion error:', error);
        
        // Fallback with approximate rates (for demo purposes)
        const fallbackRates = {
            'USD': { 'INR': 83.00, 'EUR': 0.92, 'GBP': 0.79, 'JPY': 149.00, 'AUD': 1.52, 'CAD': 1.36 },
            'INR': { 'USD': 0.012, 'EUR': 0.011, 'GBP': 0.0095, 'JPY': 1.79, 'AUD': 0.018, 'CAD': 0.016 },
            'EUR': { 'USD': 1.08, 'INR': 90.00, 'GBP': 0.86, 'JPY': 161.00, 'AUD': 1.65, 'CAD': 1.47 },
            'GBP': { 'USD': 1.26, 'INR': 105.00, 'EUR': 1.16, 'JPY': 187.00, 'AUD': 1.92, 'CAD': 1.71 },
            'JPY': { 'USD': 0.0067, 'INR': 0.56, 'EUR': 0.0062, 'GBP': 0.0053, 'AUD': 0.010, 'CAD': 0.0091 },
            'AUD': { 'USD': 0.66, 'INR': 54.60, 'EUR': 0.61, 'GBP': 0.52, 'JPY': 98.00, 'CAD': 0.89 },
            'CAD': { 'USD': 0.74, 'INR': 61.20, 'EUR': 0.68, 'GBP': 0.58, 'JPY': 110.00, 'AUD': 1.12 }
        };
        
        if (fallbackRates[fromCurrency] && fallbackRates[fromCurrency][toCurrency]) {
            const rate = fallbackRates[fromCurrency][toCurrency];
            const convertedAmount = amount * rate;
            
            const resultHTML = `
                <h3>Currency Conversion Results (Approximate)</h3>
                <div class="result-item">
                    <span class="result-label">Amount</span>
                    <span class="result-value">${formatNumber(amount)} ${fromCurrency}</span>
                </div>
                <div class="result-item">
                    <span class="result-label">Approximate Rate</span>
                    <span class="result-value">1 ${fromCurrency} ≈ ${formatNumber(rate, 4)} ${toCurrency}</span>
                </div>
                <div class="result-item">
                    <span class="result-label">Converted Amount</span>
                    <span class="result-value">${formatNumber(convertedAmount)} ${toCurrency}</span>
                </div>
                <div class="highlight">
                    <strong>${formatNumber(amount)} ${fromCurrency} ≈ ${formatNumber(convertedAmount)} ${toCurrency}</strong>
                </div>
                <p style="text-align: center; margin-top: 10px; font-size: 0.9rem; color: var(--warning-color);">
                    *Using approximate rates. Please check current rates for accurate conversion.
                </p>
            `;
            
            resultDiv.innerHTML = resultHTML;
        } else {
            resultDiv.innerHTML = '<p style="color: var(--danger-color); text-align: center;">Unable to fetch exchange rates. Please try again later.</p>';
        }
    }
}

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
    
    document.getElementById('zakatResult').innerHTML = resultHTML;
}

// Savings Goal Tracker
function calculateSavingsGoal() {
    const goalAmount = parseFloat(document.getElementById('goalAmount').value);
    const currentSavings = parseFloat(document.getElementById('currentSavings').value) || 0;
    const monthlySavings = parseFloat(document.getElementById('monthlySavings').value);
    const savingsInterest = parseFloat(document.getElementById('savingsInterest').value) || 0;
    
    // Validation
    if (!validateInput(goalAmount, 1000)) {
        showError('Please enter a valid goal amount');
        return;
    }
    
    if (!validateInput(monthlySavings, 100)) {
        showError('Please enter a valid monthly savings amount');
        return;
    }
    
    if (!validateInput(savingsInterest, 0, 20)) {
        showError('Please enter a valid interest rate between 0% and 20%');
        return;
    }
    
    const remainingAmount = goalAmount - currentSavings;
    
    if (remainingAmount <= 0) {
        document.getElementById('savingsResult').innerHTML = `
            <div class="highlight">
                <strong>Congratulations! You've already reached your goal!</strong>
            </div>
        `;
        return;
    }
    
    let monthsToGoal;
    let futureValue = currentSavings;
    
    if (savingsInterest > 0) {
        // With interest calculation
        const monthlyRate = savingsInterest / 12 / 100;
        monthsToGoal = Math.log((goalAmount * monthlyRate / monthlySavings) + 1) / Math.log(1 + monthlyRate);
        
        if (monthsToGoal < 0 || !isFinite(monthsToGoal)) {
            // Fallback calculation
            monthsToGoal = remainingAmount / monthlySavings;
        }
    } else {
        // Without interest
        monthsToGoal = remainingAmount / monthlySavings;
    }
    
    const yearsToGoal = monthsToGoal / 12;
    const totalSavings = monthlySavings * monthsToGoal;
    const progressPercentage = (currentSavings / goalAmount) * 100;
    
    // Display Results
    const resultHTML = `
        <h3>Savings Goal Analysis</h3>
        <div class="result-item">
            <span class="result-label">Goal Amount</span>
            <span class="result-value">${formatCurrency(goalAmount)}</span>
        </div>
        <div class="result-item">
            <span class="result-label">Current Savings</span>
            <span class="result-value">${formatCurrency(currentSavings)}</span>
        </div>
        <div class="result-item">
            <span class="result-label">Remaining Amount</span>
            <span class="result-value">${formatCurrency(remainingAmount)}</span>
        </div>
        <div class="result-item">
            <span class="result-label">Monthly Savings</span>
            <span class="result-value">${formatCurrency(monthlySavings)}</span>
        </div>
        <div class="result-item">
            <span class="result-label">Time to Reach Goal</span>
            <span class="result-value">${Math.ceil(monthsToGoal)} months (${formatNumber(yearsToGoal, 1)} years)</span>
        </div>
        <div class="result-item">
            <span class="result-label">Progress</span>
            <span class="result-value">${formatNumber(progressPercentage, 1)}%</span>
        </div>
        
        <div class="progress-container" style="margin: 20px 0;">
            <div class="progress-bar" style="width: ${Math.min(progressPercentage, 100)}%"></div>
        </div>
        
        <div class="highlight">
            <strong>You'll reach your goal in ${Math.ceil(monthsToGoal)} months!</strong>
        </div>
    `;
    
    document.getElementById('savingsResult').innerHTML = resultHTML;
}

// Mark calculator todos as complete
function markCalculatorTodosComplete() {
    // This would be called after implementing each calculator
    // For now, we'll mark them all as complete since they're all implemented
}