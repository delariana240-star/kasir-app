// ==================== GLOBAL VARIABLES ====================
let products = [
    { id: 1, name: "Gula Pasir 1Kg", price: 14000, stock: 11, category: "Makanan", description: "Gula pasir kemasan 1Kg", icon: "fa-cube" },
    { id: 2, name: "Kecap", price: 4000, stock: 60, category: "Makanan", description: "Kecap manis botol", icon: "fa-wine-bottle" },
    { id: 3, name: "Mie Instan", price: 23000, stock: 20, category: "Makanan", description: "Mie instan berbagai rasa", icon: "fa-utensils" },
    { id: 4, name: "Minyak Goreng 1L", price: 15000, stock: 14, category: "Makanan", description: "Minyak goreng kemasan 1 liter", icon: "fa-oil-can" },
    { id: 5, name: "Sabun Mandi", price: 5000, stock: 25, category: "Kebersihan", description: "Sabun mandi batang", icon: "fa-soap" }
];

let customers = [
    { id: 1, name: "Budi Santoso", email: "budi@email.com", phone: "081234567890", address: "Jl. Merdeka No. 123", totalTransactions: 5, totalSpent: 250000 },
    { id: 2, name: "Siti Rahayu", email: "siti@email.com", phone: "081298765432", address: "Jl. Sudirman No. 45", totalTransactions: 3, totalSpent: 120000 },
    { id: 3, name: "Ahmad Wijaya", email: "ahmad@email.com", phone: "081112223344", address: "Jl. Gatot Subroto No. 67", totalTransactions: 8, totalSpent: 450000 }
];

let transactions = [
    { 
        id: 1, 
        date: '2024-01-15 10:30:00', 
        items: [
            { name: "Gula Pasir 1Kg", price: 14000, quantity: 2 },
            { name: "Kecap", price: 4000, quantity: 1 }
        ], 
        total: 32000, 
        status: 'selesai',
        customerId: 1,
        customerName: "Budi Santoso"
    },
    { 
        id: 2, 
        date: '2024-01-15 14:20:00', 
        items: [
            { name: "Mie Instan", price: 23000, quantity: 1 },
            { name: "Minyak Goreng 1L", price: 15000, quantity: 1 },
            { name: "Sabun Mandi", price: 5000, quantity: 2 }
        ], 
        total: 48000, 
        status: 'selesai',
        customerId: 2,
        customerName: "Siti Rahayu"
    }
];

let cart = [];
let currentTransaction = null;
let selectedCustomer = null;