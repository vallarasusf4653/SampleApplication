"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let CurrentUser;
let localList = new Array;
function newUser() {
    var signin = document.getElementById('signIn');
    signin.style.display = "none";
    var signup = document.getElementById('signUp');
    signup.style.display = "block";
}
function existUser() {
    var signin = document.getElementById('signIn');
    signin.style.display = "block";
    var signup = document.getElementById('signUp');
    signup.style.display = "none";
}
var newUserName = document.getElementById('userName');
var newUserEmail = document.getElementById('userEmail');
var newUserPassword = document.getElementById('userPassword');
var newUserImage = document.getElementById('userImage');
var newUserPhoneNumber = document.getElementById('userPhone');
function signUp() {
    return __awaiter(this, void 0, void 0, function* () {
        if (!newUserImage.files || newUserImage.files.length == 0) {
            return;
        }
        let File = newUserImage.files[0];
        let data = yield ConvertToByteArr(File);
        function ConvertToByteArr(file) {
            return new Promise((resolve, reject) => {
                let reader = new FileReader();
                reader.onload = () => {
                    let buffer = reader.result;
                    let data = buffer.split(",")[1];
                    resolve(data);
                };
                reader.onerror = () => {
                    reject(new Error('Failed to read data'));
                };
                reader.readAsDataURL(file);
            });
        }
        const user = {
            userID: undefined,
            userName: newUserName.value,
            userEmail: newUserEmail.value,
            password: newUserPassword.value,
            phoneNumber: newUserPhoneNumber.value,
            walletBalance: 0,
            userImage: data
        };
        addUser(user);
        alert("Account created Successfully");
        existUser();
    });
}
var CurrentUserEmail = document.getElementById('existEmail');
var CurrentUserPassword = document.getElementById('existPassword');
function signIn() {
    return __awaiter(this, void 0, void 0, function* () {
        let flag = true;
        var userList = yield fetchUsers();
        userList.forEach(user => {
            if (user.userEmail == CurrentUserEmail.value && user.password == CurrentUserPassword.value) {
                flag = false;
                CurrentUser = user;
                dashBoard();
            }
        });
        if (flag) {
            alert("Invalid Email & Password");
        }
    });
}
function displayNone() {
    document.getElementById('homeButton').style.display = 'none';
    document.getElementById('stockButton').style.display = 'none';
    document.getElementById('purchaseButton').style.display = 'none';
    document.getElementById('cartButton').style.display = 'none';
    document.getElementById('orderButton').style.display = 'none';
    document.getElementById('topupButton').style.display = 'none';
    document.getElementById('showBalanceButton').style.display = 'none';
    document.getElementById('StockButtonAdd').style.display = 'none';
    document.getElementById('signOutButton').style.display = 'none';
    document.getElementById('signIn').style.display = 'none';
    document.getElementById('signUp').style.display = 'none';
    document.getElementById('header').style.display = 'none';
    document.getElementById('navBar').style.display = 'none';
}
function dashBoard() {
    displayNone();
    document.getElementById('signIn').style.display = 'none';
    var signup = document.getElementById('navBar');
    signup.style.display = "block";
    homeButton();
}
function homeButton() {
    return __awaiter(this, void 0, void 0, function* () {
        displayNone();
        document.getElementById('homeButton').style.display = 'block';
        var table = document.querySelector('#data tbody');
        var photo = document.getElementById('photo');
        photo.style.display = "block";
        var signup = document.getElementById('navBar');
        signup.style.display = "block";
        table.innerHTML = "";
        const userList = yield fetchUsers();
        userList.forEach(user => {
            if (user.userID == CurrentUser.userID) {
                var row = document.createElement('tr');
                row.innerHTML = `
            <td> Welcome ${user.userName}<td>
            <td><img src = "${'data:image/jpge;base64,' + user.userImage}" width=100 height=100</td>`;
                table.appendChild(row);
            }
        });
    });
}
function stockButton() {
    return __awaiter(this, void 0, void 0, function* () {
        displayNone();
        var signup = document.getElementById('navBar');
        signup.style.display = "block";
        document.getElementById('stockButton').style.display = 'block';
        try {
            const tableBody = document.getElementById('stockDatatableBody');
            const productList = yield fetchProducts();
            tableBody.innerHTML = '';
            var count = 1;
            productList.forEach(product => {
                const row = document.createElement('tr');
                row.innerHTML = `
        
          <td>${product.productName}</td>
          <td>${product.productCount}</td>
          <td>${product.productPrice}</td>
          <td>${product.dateOfPurchase.toString().split('T')[0].split('-').reverse().join('/')}</td>
           <td>${product.dateOfExpiry.toString().split('T')[0].split('-').reverse().join('/')}</td>
           <td><img src = "${'data:image/png;base64,' + product.productImage}" width="100" height"100"></td>
           <td>
            <button onclick="editProduct('${product.productID}')">Edit</button>
            <button onclick="deleteProduct('${product.productID}')">Delete</button>
          </td>`;
                // count++;
                tableBody.appendChild(row);
            });
        }
        catch (error) {
            console.error('Error fetching contacts:', error);
        }
    });
}
let editingId = null;
const form = document.getElementById("form");
var nameInput = document.getElementById('productName');
var countInput = document.getElementById('productCount');
var priceInput = document.getElementById('ProductPrice');
var doeInput = document.getElementById('dateOfEpiry');
var dopInput = document.getElementById('dateOfPurchase');
var imageInput = document.getElementById('ProductImage');
function Submit() {
    return __awaiter(this, void 0, void 0, function* () {
        const productName = nameInput.value.trim();
        const productCount = countInput.value;
        const productPrice = priceInput.value;
        const dateOfExpiry = doeInput.value;
        const dateOfPurchase = dopInput.value;
        if (!imageInput.files || imageInput.files.length == 0) {
            return;
        }
        let File = imageInput.files[0];
        let data = yield ConvertToByteArr(File);
        function ConvertToByteArr(file) {
            return new Promise((resolve, reject) => {
                let reader = new FileReader();
                reader.onload = () => {
                    let buffer = reader.result;
                    let data = buffer.split(",")[1];
                    resolve(data);
                };
                reader.onerror = () => {
                    reject(new Error('Failed to read data'));
                };
                reader.readAsDataURL(file);
            });
        }
        if (editingId !== null) {
            const product = {
                productID: editingId,
                productName: productName,
                productCount: parseInt(productCount),
                productPrice: parseInt(productPrice),
                dateOfPurchase: dateOfPurchase,
                dateOfExpiry: dateOfExpiry,
                productImage: data
            };
            updateProduct(editingId, product);
            fetchProducts();
        }
        else {
            const product = {
                productID: undefined,
                productName: productName,
                productCount: parseInt(productCount),
                productPrice: parseInt(productPrice),
                dateOfPurchase: dateOfPurchase,
                dateOfExpiry: dateOfExpiry,
                productImage: data
            };
            addProduct(product);
            fetchProducts();
        }
    });
}
function editProduct(id) {
    return __awaiter(this, void 0, void 0, function* () {
        displayNone();
        document.getElementById('stockButton').style.display = 'block';
        var signup = document.getElementById('navBar');
        signup.style.display = "block";
        let medicineMenu = document.getElementById('StockButtonAdd');
        medicineMenu.style.display = "block";
        editingId = id;
        const products = yield fetchProducts();
        const product = products.find(product => product.productID == id);
        if (product != null) {
            nameInput.value = product.productName;
            countInput.value = product.productCount.toString();
            doeInput.value = product.dateOfPurchase.split('T')[0];
            priceInput.value = product.productPrice.toString();
            imageInput.src = product.productImage[0];
            dopInput.value = product.dateOfExpiry.split('T')[0];
        }
    });
}
function add() {
    displayNone();
    document.getElementById('stockButton').style.display = 'block';
    var signup = document.getElementById('navBar');
    signup.style.display = "block";
    let medicineMenu = document.getElementById('StockButtonAdd');
    medicineMenu.style.display = "block";
}
function topUpButton() {
    displayNone();
    var signup = document.getElementById('navBar');
    signup.style.display = "block";
    document.getElementById('topupButton').style.display = 'block';
}
function RechargeMessage() {
    return __awaiter(this, void 0, void 0, function* () {
        const userList = yield fetchUsers();
        var rechargeAmount = parseInt(document.getElementById('RechargeAmount').value);
        userList.forEach(user => {
            if (user.userID == CurrentUser.userID) {
                if (rechargeAmount > 0) {
                    user.walletBalance += rechargeAmount;
                    var content = document.getElementById('amountMessage');
                    updateUser(user.userID, user);
                    content.textContent = "Recharged Successfully";
                }
                else {
                    alert("Unable to  Recharge");
                }
            }
        });
        document.getElementById('RechargeAmount').value = "";
    });
}
function showBalanceButton() {
    return __awaiter(this, void 0, void 0, function* () {
        displayNone();
        document.getElementById('showBalanceButton').style.display = 'block';
        var signup = document.getElementById('navBar');
        signup.style.display = "block";
        const userList = yield fetchUsers();
        userList.forEach(user => {
            if (user.userID == CurrentUser.userID) {
                var currentbalance = document.getElementById('balance');
                currentbalance.textContent = (user.walletBalance).toString();
            }
        });
    });
}
function signOutButton() {
    displayNone();
    document.getElementById('header').style.display = 'block';
}
function fetchUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        const apiUrl = 'http://localhost:5205/api/UserDetails';
        const response = yield fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch Users');
        }
        return yield response.json();
    });
}
function addUser(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('http://localhost:5205/api/UserDetails', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        if (!response.ok) {
            throw new Error('Failed to add contact');
        }
    });
}
function purchaseButton() {
    return __awaiter(this, void 0, void 0, function* () {
        displayNone();
        var signup = document.getElementById('navBar');
        signup.style.display = "block";
        document.getElementById('purchaseButton').style.display = 'block';
        try {
            const productList = yield fetchProducts();
            const tableBody = document.getElementById('purchaseProduct');
            tableBody.innerHTML = '';
            productList.forEach(product => {
                const row = document.createElement('tr');
                row.innerHTML = `
        
          <td>${product.productName}</td>
          <td>${product.productCount}</td>
          <td>${product.productPrice}</td>
          <td>${product.dateOfPurchase.toString().split('T')[0].split('-').reverse().join('/')}</td>
           <td>${product.dateOfExpiry.toString().split('T')[0].split('-').reverse().join('/')}</td>
           <td><img src = "${'data:image/png;base64,' + product.productImage}" width="100" height"100"></td>
           <td>
            <button onclick="purchaseProduct(' ${product.productID}')">Add to Cart </button>
          </td>`;
                tableBody.appendChild(row);
            });
        }
        catch (error) {
            console.error('Error fetching contacts:', error);
        }
    });
}
function purchaseProduct(productID) {
    return __awaiter(this, void 0, void 0, function* () {
        // const id = parseInt(productID);
        let Quanitiy = prompt("Enter the Quanitiy");
        const count = Number(Quanitiy);
        const productList = yield fetchProducts();
        productList.forEach(product => {
            if (product.productID == productID) {
                if (product.productCount >= count) {
                    const item = {
                        productName: product.productName,
                        productCount: count,
                        productPrice: product.productPrice
                    };
                    localList.push(item);
                }
                else {
                    alert("Count is not enough to buy");
                }
            }
        });
    });
}
console.log(localList);
function cartButton() {
    displayNone();
    var signup = document.getElementById('navBar');
    signup.style.display = "block";
    document.getElementById('cartButton').style.display = 'block';
    const tableBody = document.getElementById('cardItem');
    tableBody.innerHTML = '';
    localList.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
    
      <td>${item.productName}</td>
      <td>${item.productCount}</td>
      <td>${item.productPrice}</td>
      </td>`;
        tableBody.appendChild(row);
    });
}
function buy() {
    return __awaiter(this, void 0, void 0, function* () {
        let totalProductPrice = 0;
        let productCount = 0;
        localList.forEach(item => {
            var singleProductPrice = item.productCount * item.productPrice;
            totalProductPrice += singleProductPrice;
            productCount++;
        });
        if (totalProductPrice <= CurrentUser.walletBalance) {
            const order = {
                orderID: undefined,
                userID: CurrentUser.userID,
                productCount: productCount,
                totalPrice: totalProductPrice,
                dateOfOrder: new Date()
            };
            addOrder(order);
            let currentorderID = 0;
            const orderList = yield fetchOrder();
            //   const itemList = await fetchItem();
            const order1 = orderList.length - 1;
            currentorderID = orderList[order1].orderID;
            localList.forEach(itemList => {
                const item = {
                    cartItemID: undefined,
                    userID: CurrentUser.userID,
                    orderID: currentorderID,
                    productName: itemList.productName,
                    productCount: itemList.productCount,
                    productPrice: itemList.productPrice
                };
                addItem(item);
            });
            alert("Successfully Ordered");
        }
        else {
            alert("Insufficient Balance");
        }
    });
}
function updateUser(id, user) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5205/api/UserDetails/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        if (!response.ok) {
            throw new Error('Failed to update user');
        }
    });
}
function fetchProducts() {
    return __awaiter(this, void 0, void 0, function* () {
        const apiUrl = 'http://localhost:5205/api/ProductDetails';
        const response = yield fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch product');
        }
        return yield response.json();
    });
}
function addProduct(product) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('http://localhost:5205/api/ProductDetails', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        });
        if (!response.ok) {
            throw new Error('Failed to add product');
        }
        stockButton();
    });
}
function updateProduct(id, product) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5205/api/ProductDetails/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        });
        if (!response.ok) {
            throw new Error('Failed to update product');
        }
        stockButton();
    });
}
function deleteProduct(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5205/api/ProductDetails/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('Failed to delete product');
        }
        stockButton();
    });
}
function addOrder(product) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('http://localhost:5205/api/OrderDetails', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        });
        if (!response.ok) {
            throw new Error('Failed to add product');
        }
    });
}
function fetchOrder() {
    return __awaiter(this, void 0, void 0, function* () {
        const apiUrl = 'http://localhost:5205/api/OrderDetails';
        const response = yield fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch order');
        }
        return yield response.json();
    });
}
function addItem(order) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('http://localhost:5205/api/CartItemDetails', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(order)
        });
        if (!response.ok) {
            throw new Error('Failed to add item');
        }
        // stockButton();
    });
}
function fetchItem() {
    return __awaiter(this, void 0, void 0, function* () {
        const apiUrl = 'http://localhost:5205/api/CartItemDetails';
        const response = yield fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch item');
        }
        return yield response.json();
    });
}
