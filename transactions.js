// ==================== TRANSACTION FUNCTIONS ====================
function renderProducts() {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">
                <i class="fas ${product.icon}"></i>
            </div>
            <div class="product-name">${product.name}</div>
            <div class="product-price">${formatCurrency(product.price)}</div>
            <div class="product-stock">Stok: ${product.stock}</div>
            <button class="btn-add-cart" onclick="addToCart(${product.id})" ${product.stock <= 0 ? 'disabled' : ''}>
                <i class="fas fa-cart-plus"></i> Tambah
            </button>
        `;
        productList.appendChild(productCard);
    });
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        if (existingItem.quantity < product.stock) {
            existingItem.quantity++;
        } else {
            alert('Stok tidak mencukupi!');
            return;
        }
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1
        });
    }

    renderCart();
    updateTotals();
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    renderCart();
    updateTotals();
}

function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    const product = products.find(p => p.id === productId);
    
    if (item && product) {
        const newQuantity = item.quantity + change;
        
        if (newQuantity <= 0) {
            removeFromCart(productId);
        } else if (newQuantity <= product.stock) {
            item.quantity = newQuantity;
            renderCart();
            updateTotals();
        } else {
            alert('Stok tidak mencukupi!');
        }
    }
}

function renderCart() {
    const cartItems = document.getElementById('cart-items');
    
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <p>Keranjang kosong</p>
                <small>Tambahkan produk dari daftar di samping</small>
            </div>
        `;
        document.getElementById('checkout-btn').disabled = true;
        return;
    }

    cartItems.innerHTML = '';
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">${formatCurrency(item.price)}</div>
            </div>
            <div class="cart-item-controls">
                <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                <span class="quantity-display">${item.quantity}</span>
                <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                <button class="btn-remove" onclick="removeFromCart(${item.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        cartItems.appendChild(cartItem);
    });

    document.getElementById('checkout-btn').disabled = false;
}

function updateTotals() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const diskon = 0;
    const total = subtotal - diskon;

    document.getElementById('subtotal').textContent = formatCurrency(subtotal);
    document.getElementById('diskon-value').textContent = formatCurrency(diskon);
    document.getElementById('total').textContent = formatCurrency(total);
    updateKembalian();
}

function updateKembalian() {
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const bayar = parseFloat(document.getElementById('bayar').value) || 0;
    const kembali = bayar - total;

    document.getElementById('kembali').textContent = formatCurrency(kembali >= 0 ? kembali : 0);
}

function checkout() {
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const bayar = parseFloat(document.getElementById('bayar').value) || 0;

    if (bayar < total) {
        alert('Jumlah pembayaran kurang!');
        return;
    }

    if (cart.length === 0) {
        alert('Keranjang belanja kosong!');
        return;
    }

    // Create new transaction
    const newTransaction = {
        id: transactions.length > 0 ? Math.max(...transactions.map(t => t.id)) + 1 : 1,
        date: new Date().toISOString().replace('T', ' ').substring(0, 19),
        items: [...cart],
        total: total,
        bayar: bayar,
        kembali: bayar - total,
        status: 'selesai',
        customerId: selectedCustomer ? selectedCustomer.id : null,
        customerName: selectedCustomer ? selectedCustomer.name : null
    };

    transactions.push(newTransaction);
    
    // Update product stocks
    cart.forEach(item => {
        const product = products.find(p => p.id === item.id);
        if (product) {
            product.stock -= item.quantity;
        }
    });

    // Update customer transaction count
    if (selectedCustomer) {
        selectedCustomer.totalTransactions += 1;
        selectedCustomer.totalSpent += total;
    }

    // Show receipt
    showReceipt(newTransaction);
    
    // Reset cart and customer selection
    cart = [];
    selectedCustomer = null;
    renderCart();
    updateTotals();
    document.getElementById('bayar').value = '';
    updateCustomerSelectionDisplay();
    renderProducts();
}

// ==================== CUSTOMER SELECTION FUNCTIONS ====================
function showCustomerSelection() {
    const modal = new bootstrap.Modal(document.getElementById('selectCustomerModal'));
    renderCustomerSelectionTable();
    modal.show();
}

function renderCustomerSelectionTable() {
    const tbody = document.getElementById('select-customer-table-body');
    tbody.innerHTML = '';

    customers.forEach(customer => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${customer.name}</td>
            <td>${customer.email || '-'}</td>
            <td>${customer.phone || '-'}</td>
            <td>${customer.totalTransactions}</td>
            <td>
                <button class="btn btn-sm btn-primary" onclick="selectCustomer(${customer.id})">
                    <i class="fas fa-check"></i> Pilih
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function selectCustomer(customerId) {
    selectedCustomer = customers.find(c => c.id === customerId);
    if (selectedCustomer) {
        document.getElementById('selected-customer-name').textContent = selectedCustomer.name;
        document.getElementById('selected-customer-contact').textContent = 
            `${selectedCustomer.email || ''} ${selectedCustomer.phone ? '| ' + selectedCustomer.phone : ''}`;
        document.getElementById('customer-selection').style.display = 'block';
        
        bootstrap.Modal.getInstance(document.getElementById('selectCustomerModal')).hide();
    }
}

function changeCustomer() {
    showCustomerSelection();
}

function updateCustomerSelectionDisplay() {
    if (selectedCustomer) {
        document.getElementById('customer-selection').style.display = 'block';
    } else {
        document.getElementById('customer-selection').style.display = 'none';
    }
}

// ==================== RECEIPT FUNCTIONS ====================
function generateReceipt(transaction) {
    const receiptContainer = document.getElementById('receipt-container');
    const now = new Date();
    
    const receiptHTML = `
        <div class="receipt">
            <div class="receipt-header">
                <h3>KASIR UMKM</h3>
                <p>Jl. Contoh No. 123</p>
                <p>Telp: (021) 123-4567</p>
                <p>${formatDate(transaction.date)}</p>
                <p>No: #${transaction.id.toString().padStart(6, '0')}</p>
                ${transaction.customerName ? `<p>Pelanggan: ${transaction.customerName}</p>` : ''}
            </div>
            
            <div class="receipt-items">
                ${transaction.items.map(item => `
                    <div class="receipt-item">
                        <span>${item.name}</span>
                        <span>${item.quantity} x ${formatCurrency(item.price)}</span>
                    </div>
                    <div class="receipt-item" style="text-align: right;">
                        <span>${formatCurrency(item.price * item.quantity)}</span>
                    </div>
                `).join('')}
            </div>
            
            <div class="receipt-totals">
                <div class="receipt-total-row">
                    <span>Subtotal:</span>
                    <span>${formatCurrency(transaction.total)}</span>
                </div>
                <div class="receipt-total-row">
                    <span>Bayar:</span>
                    <span>${formatCurrency(transaction.bayar)}</span>
                </div>
                <div class="receipt-total-row">
                    <span>Kembali:</span>
                    <span>${formatCurrency(transaction.kembali)}</span>
                </div>
                <div class="receipt-total-row" style="font-weight: bold; border-top: 1px solid #000; padding-top: 0.5rem;">
                    <span>TOTAL:</span>
                    <span>${formatCurrency(transaction.total)}</span>
                </div>
            </div>
            
            <div class="receipt-footer">
                <p>Terima kasih atas kunjungan Anda</p>
                <p>*** Barang yang sudah dibeli tidak dapat ditukar ***</p>
            </div>
        </div>
    `;
    
    receiptContainer.innerHTML = receiptHTML;
}

function showReceipt(transaction) {
    currentTransaction = transaction;
    generateReceipt(transaction);
    const receiptModal = new bootstrap.Modal(document.getElementById('receiptModal'));
    receiptModal.show();
}

function printReceipt() {
    const receiptElement = document.getElementById('receipt-container');
    const originalContents = document.body.innerHTML;
    
    // Create print-friendly receipt
    const printContents = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Struk Kasir UMKM</title>
            <style>
                body { 
                    font-family: 'Courier New', monospace; 
                    font-size: 12px;
                    margin: 0;
                    padding: 10px;
                }
                .receipt { 
                    width: 80mm; 
                    margin: 0 auto;
                }
                .receipt-header { 
                    text-align: center; 
                    border-bottom: 2px dashed #000;
                    padding-bottom: 10px;
                    margin-bottom: 10px;
                }
                .receipt-items { 
                    margin-bottom: 10px;
                }
                .receipt-item { 
                    display: flex; 
                    justify-content: space-between;
                    margin-bottom: 3px;
                }
                .receipt-totals { 
                    border-top: 1px dashed #000;
                    padding-top: 10px;
                    margin-top: 10px;
                }
                .receipt-total-row { 
                    display: flex; 
                    justify-content: space-between;
                    margin-bottom: 3px;
                }
                .receipt-footer { 
                    text-align: center; 
                    margin-top: 10px;
                    padding-top: 10px;
                    border-top: 2px dashed #000;
                    font-size: 10px;
                }
                @media print {
                    body { margin: 0; }
                }
            </style>
        </head>
        <body>
            ${receiptElement.innerHTML}
        </body>
        </html>
    `;
    
    const printWindow = window.open('', '_blank');
    printWindow.document.write(printContents);
    printWindow.document.close();
    
    // Wait for content to load then print
    setTimeout(() => {
        printWindow.print();
        printWindow.close();
    }, 250);
}