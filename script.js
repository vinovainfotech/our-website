// Mobile Menu Toggle
function toggleMobileMenu() {
    const mobileNav = document.getElementById('mobileNav');
    mobileNav.classList.toggle('active');

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

// Calculator Tab Switching
function showCalculator(type) {
    document.querySelectorAll('.calculator').forEach(calc => {
        calc.classList.remove('active');
    });

    document.querySelectorAll('.calc-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    document.getElementById(type + '-calculator').classList.add('active');

    document.querySelectorAll('.calc-btn').forEach(btn => {
        if (btn.textContent.toLowerCase().includes(type)) {
            btn.classList.add('active');
        }
    });
}

// SIP Sub Tab Toggle
function showSipSubCalculator(subType) {
    const monthlyForm = document.getElementById('monthly-sip-form');
    const lumpsumForm = document.getElementById('lumpsum-form');
    const monthlyBtn = document.getElementById('monthlySipSubTabButton');
    const lumpsumBtn = document.getElementById('lumpsumSipSubTabButton');

    monthlyForm.classList.remove('active');
    lumpsumForm.classList.remove('active');
    monthlyBtn.classList.remove('active');
    lumpsumBtn.classList.remove('active');

    if (subType === 'monthly') {
        monthlyForm.classList.add('active');
        monthlyBtn.classList.add('active');
    } else {
        lumpsumForm.classList.add('active');
        lumpsumBtn.classList.add('active');
    }
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

// SIP (Monthly)
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

// SIP (Lumpsum)
function calculateLumpsum() {
    const principalAmount = parseFloat(document.getElementById('lumpsum-amount').value);
    const rate = parseFloat(document.getElementById('lumpsum-rate').value);
    const tenure = parseFloat(document.getElementById('lumpsum-tenure').value);

    if (!principalAmount || !rate || !tenure) {
        alert('Please fill in all fields');
        return;
    }

    const annualRate = rate / 100;
    const maturityAmount = principalAmount * Math.pow(1 + annualRate, tenure);
    const totalReturns = maturityAmount - principalAmount;

    displayResult('Lumpsum-result', {
        'Total Investment': formatCurrency(principalAmount),
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

// Display Result (keeping existing functions as they are not related to the issue)
function displayResult(elementId, results) {
    const resultElement = document.getElementById(elementId);
    let html = '<h4>Calculation Results</h4>';
    for (const [key, value] of Object.entries(results)) {
        html += `<div class="result-item"><span>${key}:</span><span>${value}</span></div>`;
    }
    resultElement.innerHTML = html;
    resultElement.classList.add('show');
}

// Format Currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
    }).format(amount);
}

// Init on page load (keeping as is)
document.addEventListener('DOMContentLoaded', function () {
    // Highlight current nav link
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (href === 'index.html' && currentPage === '')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Default SIP sub-tab (assuming showSipSubCalculator exists elsewhere)
    if (typeof showSipSubCalculator === 'function') {
        showSipSubCalculator('monthly');
    }
});

// Store all document details in a JavaScript object for easy access
const serviceDocuments = {
    'lic-life-insurance': {
        title: 'LIC Life Insurance',
        docs: [
            'Duly filled Proposal Form',
            'Photograph of the Proposer/Life Assured (Adhaar Card, Voter ID Card, Passport etc.)',
            'Age Proof of the Proposer/Life Assured',
            'Photo Identity Proof of the Proposer/Life Assured',
            'Address Proof of the Proposer/LIfe Assured',
            'Medical Examination Report of the Proposer/Life Assured',
            'Income Proof of the Proposer/Life Assured',
            'PAN Card of the Proposer/Life Assured'
        ]
    },
    'mediclaim': {
        title: 'Mediclaim',
        docs: [
            'Identity Proof (PAN Card, Aadhaar Card, Driving License, Passport)',
            'Address Proof (Utility Bill, Bank Statement, Rent Agreement, Aadhaar Card)',
            'Age Proof (Birth Certificate, Passport, School Leaving Certificate, Aadhaar Card)',
            'Passport-size Photograph(s)',
            'Medical reports (if any pre-existing conditions)',
            'Duly filled Proposal Form'
        ]
    },
    'general-insurance': {
        title: 'General Insurance',
        docs: [
            'Aadhaar card',
            'Voting ID',
            'Driving license',
            'Birth certificate',
            'Ration Card',
            '10th or 12th mark sheet',
            'Passport',
            'PAN card',
            'Photograph, etc.'
        ]
    },
    'home-loan': {
        title: 'Home Loan',
        docs: [
            'PAN and Aadhar Card',
            'Applicant’s Passport',
            'Voter ID Card',
            'Driving Licence',
            'Utility bills (electricity or telephone bill)',
            'Salary slips of last 6 months and Form 16',
            'Identity proof that contain address, like Aadhaar Card Bank account statements',
            'Income proof and employment proof',
            'Other Documents',
            'Passport-size photographs of the applicant For self-employed, business continuity proof will be required (5 years)'
        ]
    },
    'plot-loan': {
        title: 'Plot Loan',
        docs: [
            'Application form with photograph',
            'Identity Proof (PAN Card, Aadhaar Card, Passport, Driving License, Voter ID)',
            'Address Proof (Utility Bills, Passport, Aadhaar Card, Driving License)',
            'Income Proof (Salary Slips, Bank Statements, ITR, Form 16 - for salaried; Business proof, ITR, P&L, Balance Sheet - for self-employed)',
            'Plot/Land documents (Title Deed, Sale Agreement, Encumbrance Certificate, Approved layout plan)',
            'Bank statements (last 6-12 months)'
        ]
    },
    'loan-against-property': {
        title: 'Loan against Property',
        docs: [
            'Proof of identity/residence',
            'Proof of income',
            'Property-related documents',
            'Proof of Business (for self-employed)',
            'Account statement for the last 6 months'
        ]
    },
    'commercial-vehicle-loan': {
        title: 'Commercial Vehicle Loan',
        docs: [
            'Application form with photograph',
            'Identity Proof (PAN Card, Aadhaar Card, Passport, Driving License, Voter ID)',
            'Address Proof (Utility Bills, Passport, Aadhaar Card, Driving License)',
            'Income Proof/Financial Documents (Latest 2 years financials, 12 months bank statements - for businesses)',
            'Ownership documents of existing fleet (if applicable)',
            'Business proof (Shop & Establishment Certificate, VAT/Service Tax Certificate)'
        ]
    },
    'car-loans': {
        title: 'Car Loans',
        docs: [
            'KYC documents (Valid Photo ID Proofs)',
            'PAN Card',
            'Last 2 years ITR as proof of income',
            'Salary Slip (latest 3 months)',
            'Salary account statement(latest 6 months)',
            'Signature Verification Proof'
        ]
    },
    'car-loan-refinancing': {
        title: 'Car Loan Refinancing',
        docs: [
            'KYC documents (Valid Photo ID Proofs)',
            'PAN Card',
            'Last 2 years ITR as proof of income (for self-employed individuals)',
            'Salary Slip (latest 3 months)',
            'Salary account statement (latest 6 months)',
            'Signature Verification Proof',
            'Registration Certificate of the Car',
            'Loan track (if there is an active loan on the car)',
            'Car Insurance'
        ]
    },
    'business-loan': {
        title: 'Business Loan',
        docs: [
            'Application form with photograph',
            'Identity Proof (PAN Card, Aadhaar Card, Passport, Driving License, Voter ID)',
            'Address Proof (Utility Bills, Passport, Aadhaar Card, Driving License)',
            'Business Proof (Partnership Deed, MOA/AOA, Shop & Establishment Certificate, GST Registration)',
            'Financial Statements (ITR, P&L, Balance Sheet for last 2-3 years)',
            'Bank statements (last 6-12 months of business account)'
        ]
    },
    'personal-loan': {
        title: 'Personal Loan',
        docs: [
            'Application form with photograph',
            'Identity Proof (PAN Card, Aadhaar Card, Passport, Driving License, Voter ID)',
            'Address Proof (Utility Bills, Passport, Aadhaar Card, Driving License)',
            'Income Proof (Salary Slips, Bank Statements, ITR, Form 16 - for salaried; Business proof, ITR, P&L, Balance Sheet - for self-employed)',
            'Bank statements (last 3-6 months)'
        ]
    },
    'estate-deals': {
        title: 'Estate Deals',
        docs: [
            'Sale Deed',
            'Title Deed',
            '7/12 Extract',
            'Occupancy Certificate ',
            'Encumbrance Certificate ',
            'Completion Certificate',
            'Property Tax Receipts',
            'No Objection Certificate',
            'Identity Proofs',
            'Power of Attorney'
        ]
    },
    'construction-loans': {
        title: 'Construction Loans',
        docs: [
            'Application form with photograph',
            'Identity Proof (PAN Card, Aadhaar Card, Passport, Driving License, Voter ID)',
            'Address Proof (Utility Bills, Passport, Aadhaar Card, Driving License)',
            'Income Proof (Salary Slips, Bank Statements, ITR, Form 16 - for salaried; Business proof, ITR, P&L, Balance Sheet - for self-employed)',
            'Approved building plans/sanctioned plans',
            'Cost estimate from architect/engineer',
            'Land documents (Title Deed, Sale Agreement)',
            'Bank statements (last 6-12 months)'
        ]
    },
    'itr-taxation': {
        title: 'ITR Taxation',
        docs: [
            'PAN Card',
            'Aadhaar Card',
            'Bank Account Details (Bank Name, Account Number, IFSC Code)',
            'Form 16 (for salaried individuals)',
            'Salary Slips',
            'Interest Certificates (Form 16A/26AS)',
            'Capital Gains statements (if applicable)',
            'Details of other income (rent, freelancing, etc.)',
            'Investment proofs (ELSS, PPF, Life Insurance, Mediclaim)',
            'Property details (if applicable)'
        ]
    },
    'ac-writing': {
        title: 'A/C Writing',
        docs: [
            'Bank Statements (all accounts)',
            'Sales Invoices and Purchase Bills',
            'Expense Receipts (daily, monthly, yearly)',
            'GST Returns (if applicable)',
            'Bank Reconciliation Statements',
            'Fixed Asset Register',
            'Payroll records (if applicable)',
            'Previous year\'s financial statements (if ongoing business)'
        ]
    }
};

// Mobile menu toggle (keeping as is)
function toggleMobileMenu() {
    var mobileNav = document.getElementById("mobileNav");
    if (mobileNav.style.display === "block") {
        mobileNav.style.display = "none";
    } else {
        mobileNav.style.display = "block";
    }
}

// --- JavaScript for Click-to-Toggle Dropdown ---
document.addEventListener('DOMContentLoaded', function() {
    const contentCards = document.querySelectorAll('.content-card');
    let activeCard = null; // To keep track of the currently open card

    contentCards.forEach(card => {
        const serviceId = card.dataset.service;
        const documentsOverlay = card.querySelector('.documents-overlay');
        const toggleButton = card.querySelector('.toggle-docs-btn');

        // Populate documents first
        if (serviceId && documentsOverlay && serviceDocuments[serviceId]) {
            const serviceInfo = serviceDocuments[serviceId];
            let docListHtml = `<h5>Required Documents for ${serviceInfo.title}:</h5><ul>`;
            serviceInfo.docs.forEach(doc => {
                docListHtml += `<li>${doc}</li>`;
            });
            docListHtml += `</ul>`;
            documentsOverlay.innerHTML = docListHtml;
        }

        // Add click event listener to the toggle button
        if (toggleButton) {
            toggleButton.addEventListener('click', function(event) {
                event.stopPropagation(); // Prevent the click from bubbling up

                // Toggle the 'active' class on the card
                card.classList.toggle('active');

                // Update activeCard reference
                if (card.classList.contains('active')) {
                    if (activeCard && activeCard !== card) {
                        activeCard.classList.remove('active'); // Close previously active card
                    }
                    activeCard = card;
                } else {
                    activeCard = null; // No card is active if this one was just closed
                }
            });
        }
    });

    // Close dropdown when clicking outside any card
    document.addEventListener('click', function(event) {
        let isClickInsideCard = false;
        contentCards.forEach(card => {
            if (card.contains(event.target)) {
                isClickInsideCard = true;
            }
        });

        if (!isClickInsideCard && activeCard) {
            activeCard.classList.remove('active');
            activeCard = null;
        }
    });
});