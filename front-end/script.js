let transactions = [];

const generateID = () => {
    return Math.floor(Math.random() * 1000000);
};

const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
};

const getTransactionType = (category) => {
    return category === 'Income' ? 'income' : 'expense';
};

const addTransaction = (category, description, amount) => {
    const type = getTransactionType(category);
    
    const transaction = {
        id: generateID(),
        category: category,
        description: description,
        amount: parseFloat(amount),
        type: type,
        date: new Date()
    };
    
    transactions.push(transaction);
    updateLocalStorage();
    updateUI();
};

// Saves transactions to localStorage

const updateLocalStorage = () => {
    localStorage.setItem('budgetTransactions', JSON.stringify(transactions));
};

// Loads transactions from localStorage
const loadTransactions = () => {
    const savedTransactions = localStorage.getItem('budgetTransactions');
    transactions = savedTransactions ? JSON.parse(savedTransactions) : [];
    console.log("Transactions: ", transactions)
    updateUI();
};

// Updates all UI elements
const updateUI = () => {
    updateBalance();
    updateTransactionList();
};

// Updates balance, income, and expense displays
 
const updateBalance = () => {
    const income = transactions
        .filter(transaction => transaction.type === 'income')
        .reduce((total, transaction) => total + transaction.amount, 0);
    
    const expenses = transactions
        .filter(transaction => transaction.type === 'expense')
        .reduce((total, transaction) => total + transaction.amount, 0);
    
    const balance = income - expenses;

    // Update UI elements
    document.querySelector('.income .amount').textContent = `$${income.toFixed(2)}`;
    document.querySelector('.expenses .amount').textContent = `$${expenses.toFixed(2)}`;
    document.querySelector('.balance .amount').textContent = `$${balance.toFixed(2)}`;
};

// Updates the transaction list display

const updateTransactionList = () => {
    const transactionList = document.querySelector('.transaction-list');
    transactionList.innerHTML = '';

    transactions.slice().reverse().forEach(transaction => {
        const li = document.createElement('li');
        li.className = 'transaction-item';
        
        const sign = transaction.type === 'income' ? '+' : '-';
        const amountClass = transaction.type === 'income' ? 'income-text' : 'expense-text';

        li.innerHTML = `
            <span>${transaction.category} - ${transaction.description}</span>
            <span class="${amountClass}">${sign}$${transaction.amount.toFixed(2)}</span>
        `;

        transactionList.appendChild(li);
    });
};

/**
 * Clears all form inputs
 */
const clearForm = () => {
    document.getElementById('type').value = 'Dining';
    document.getElementById('description').value = '';
    document.getElementById('amount').value = '';
};

// Event Listener

document.addEventListener('DOMContentLoaded', () => {
    // Load saved transactions when page loads
    loadTransactions();
    
    // Handle form submissions
    document.querySelector('form').addEventListener('submit', (e) => {
        e.preventDefault();
        
        const category = document.getElementById('type').value;
        const description = document.getElementById('description').value.trim();
        const amount = document.getElementById('amount').value;
        
        // Validate inputs
        if(description && amount > 0) {
            addTransaction(category, description, amount);
            clearForm();
        } else {
            alert('Please enter a valid description and amount');
        }
    });
});

document.getElementById('logout-btn').addEventListener('click', () => {
    localStorage.removeItem('loggedIn');
    // redirecting back to
    window.location.href = 'login.html';
});