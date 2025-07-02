// Mobile Menu Toggle
function toggleMobileMenu() {
    const mobileNav = document.getElementById('mobileNav');
    mobileNav.classList.toggle('active');
}
// Mobile Menu Toggle
function toggleMobileMenu() {
    const mobileNav = document.getElementById('mobileNav');
    mobileNav.classList.toggle('active');

    // Add or remove the outside click listener based on menu state
    if (mobileNav.classList.contains('active')) {
        document.addEventListener('click', closeMenuOnOutsideClick);
    } else {
        document.removeEventListener('click', closeMenuOnOutsideClick);
    }
}

// Close menu on outside click
function closeMenuOnOutsideClick(event) {
    const mobileNav = document.getElementById('mobileNav');
    const toggleBtn = document.querySelector('.mobile-menu-btn');

    const isClickInsideMenu = mobileNav.contains(event.target);
    const isClickOnToggle = toggleBtn.contains(event.target);

    if (!isClickInsideMenu && !isClickOnToggle) {
        mobileNav.classList.remove('active');
        document.removeEventListener('click', closeMenuOnOutsideClick);
    }
}


// Calculator Navigation
function showCalculator(type) {
    // Hide all calculators
    document.querySelectorAll('.calculator').forEach(calc => {
        calc.classList.remove('active');
    });
    
    // Remove active class from all buttons
    document.querySelectorAll('.calc-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show selected calculator
    document.getElementById(type + '-calculator').classList.add('active');
    
    // Add active class to clicked button
    event.target.closest('.calc-btn').classList.add('active');
}

// Loan Calculator
function calculateLoan() {
    const amount = parseFloat(document.getElementById('loan-amount').value);
    const rate = parseFloat(document.getElementById('loan-rate').value);
    const tenure = parseFloat(document.getElementById('loan-tenure').value);
    
    if (!amount || !rate || !tenure) {
        alert('Please fill in all fields');
        return;
    }
    
    const monthlyRate = rate / 100 / 12;
    const numPayments = tenure * 12;
    
    const emi = (amount * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
                (Math.pow(1 + monthlyRate, numPayments) - 1);
    
    const totalAmount = emi * numPayments;
    const totalInterest = totalAmount - amount;
    
    displayResult('loan-result', {
        'Monthly EMI': formatCurrency(emi),
        'Total Interest': formatCurrency(totalInterest),
        'Total Amount': formatCurrency(totalAmount)
    });
}

// EMI Calculator
function calculateEMI() {
    const amount = parseFloat(document.getElementById('emi-amount').value);
    const rate = parseFloat(document.getElementById('emi-rate').value);
    const tenure = parseFloat(document.getElementById('emi-tenure').value);
    
    if (!amount || !rate || !tenure) {
        alert('Please fill in all fields');
        return;
    }
    
    const monthlyRate = rate / 100 / 12;
    
    const emi = (amount * monthlyRate * Math.pow(1 + monthlyRate, tenure)) / 
                (Math.pow(1 + monthlyRate, tenure) - 1);
    
    const totalAmount = emi * tenure;
    const totalInterest = totalAmount - amount;
    
    displayResult('emi-result', {
        'Monthly EMI': formatCurrency(emi),
        'Total Interest': formatCurrency(totalInterest),
        'Total Amount': formatCurrency(totalAmount)
    });
}

// SIP Calculator
function calculateSIP() {
    const monthlyAmount = parseFloat(document.getElementById('sip-amount').value);
    const rate = parseFloat(document.getElementById('sip-rate').value);
    const tenure = parseFloat(document.getElementById('sip-tenure').value);
    
    if (!monthlyAmount || !rate || !tenure) {
        alert('Please fill in all fields');
        return;
    }
    
    const monthlyRate = rate / 100 / 12;
    const months = tenure * 12;
    
    const maturityAmount = monthlyAmount * (((Math.pow(1 + monthlyRate, months)) - 1) / monthlyRate) * (1 + monthlyRate);
    const totalInvestment = monthlyAmount * months;
    const totalReturns = maturityAmount - totalInvestment;
    
    displayResult('sip-result', {
        'Total Investment': formatCurrency(totalInvestment),
        'Expected Returns': formatCurrency(totalReturns),
        'Maturity Amount': formatCurrency(maturityAmount)
    });
}

// SWP Calculator
function calculateSWP() {
    const investment = parseFloat(document.getElementById('swp-investment').value);
    const withdrawal = parseFloat(document.getElementById('swp-withdrawal').value);
    const rate = parseFloat(document.getElementById('swp-rate').value);
    const tenure = parseFloat(document.getElementById('swp-tenure').value);
    
    if (!investment || !withdrawal || !rate || !tenure) {
        alert('Please fill in all fields');
        return;
    }
    
    const monthlyRate = rate / 100 / 12;
    const months = tenure * 12;
    
    let balance = investment;
    let totalWithdrawal = 0;
    
    for (let i = 0; i < months; i++) {
        if (balance <= 0) break;
        balance = balance * (1 + monthlyRate) - withdrawal;
        totalWithdrawal += withdrawal;
    }
    
    const finalBalance = Math.max(0, balance);
    
    displayResult('swp-result', {
        'Total Withdrawal': formatCurrency(totalWithdrawal),
        'Remaining Balance': formatCurrency(finalBalance),
        'Total Months Sustained': Math.min(months, Math.floor(totalWithdrawal / withdrawal))
    });
}

// Display Result Helper
function displayResult(elementId, results) {
    const resultElement = document.getElementById(elementId);
    
    let html = '<h4>Calculation Results</h4>';
    
    for (const [key, value] of Object.entries(results)) {
        html += `
            <div class="result-item">
                <span>${key}:</span>
                <span>${value}</span>
            </div>
        `;
    }
    
    resultElement.innerHTML = html;
    resultElement.classList.add('show');
}

// Format Currency Helper
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
    }).format(amount);
}

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    // Set active navigation based on current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});
