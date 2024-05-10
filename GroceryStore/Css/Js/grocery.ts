let CurrentUser: UserDetails;

interface UserDetails {
    userID: any,
    userName: string,
    userEmail: string,
    password: string,
    phoneNumber: string,
    walletBalance: number,
    userImage: string
}

interface ProductDetails {
    productID: any,
    productName: string,
    productCount: number,
    productPrice: number,
    dateOfPurchase: string,
    dateOfExpiry: string,
    productImage: string
}

interface CartItemDetails {
    cartItemID: any,
    userID: number,
    orderID: number,
    productName: string,
    productCount: number,
    productPrice: number,
}

interface OrderDetails {
    orderID: any,
    userID: number,
    productCount: number,
    totalPrice: number,
    dateOfOrder: Date
}

interface LocalCartItem {
    productName: string,
    productCount: number,
    productPrice: number,
}

let localList: Array<LocalCartItem> = new Array<LocalCartItem>;


function newUser() {
    var signin = (document.getElementById('signIn') as HTMLDivElement);
    signin.style.display = "none";
    var signup = (document.getElementById('signUp') as HTMLDivElement);
    signup.style.display = "block";
}
function existUser() {
    var signin = (document.getElementById('signIn') as HTMLDivElement);
    signin.style.display = "block";
    var signup = (document.getElementById('signUp') as HTMLDivElement);
    signup.style.display = "none";
}


var newUserName = document.getElementById('userName') as HTMLInputElement;
var newUserEmail = document.getElementById('userEmail') as HTMLInputElement;
var newUserPassword = document.getElementById('userPassword') as HTMLInputElement;
var newUserImage = document.getElementById('userImage') as HTMLInputElement;
var newUserPhoneNumber = document.getElementById('userPhone') as HTMLInputElement;




async function signUp() {

    if (!newUserImage.files || newUserImage.files.length == 0) {
        return
    }
    let File = newUserImage.files[0];
    let data = await ConvertToByteArr(File);

    function ConvertToByteArr(file: File): Promise<string> {
        return new Promise((resolve, reject) => {
            let reader = new FileReader();
            reader.onload = () => {
                let buffer = reader.result as string;
                let data = buffer.split(",")[1];
                resolve(data);
            }
            reader.onerror = () => {
                reject(new Error('Failed to read data'));
            };
            reader.readAsDataURL(file)
        });
    }

    const user: UserDetails =
    {
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
}

var CurrentUserEmail = document.getElementById('existEmail') as HTMLInputElement;
var CurrentUserPassword = document.getElementById('existPassword') as HTMLInputElement;

async function signIn() {
    let flag = true;
    var userList = await fetchUsers();
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
}

function displayNone() {
    (document.getElementById('homeButton') as HTMLDivElement).style.display = 'none';
    (document.getElementById('stockButton') as HTMLDivElement).style.display = 'none';
    (document.getElementById('purchaseButton') as HTMLDivElement).style.display = 'none';
    (document.getElementById('cartButton') as HTMLDivElement).style.display = 'none';
    (document.getElementById('orderButton') as HTMLDivElement).style.display = 'none';
    (document.getElementById('topupButton') as HTMLDivElement).style.display = 'none';
    (document.getElementById('showBalanceButton') as HTMLDivElement).style.display = 'none';
    (document.getElementById('StockButtonAdd') as HTMLDivElement).style.display = 'none';
    (document.getElementById('signOutButton') as HTMLDivElement).style.display = 'none';
    (document.getElementById('signIn') as HTMLDivElement).style.display = 'none';
    (document.getElementById('signUp') as HTMLDivElement).style.display = 'none';
    (document.getElementById('header') as HTMLDivElement).style.display = 'none';
    (document.getElementById('navBar') as HTMLDivElement).style.display = 'none';
}

function dashBoard() {
    displayNone();
    (document.getElementById('signIn') as HTMLDivElement).style.display = 'none';
    var signup = (document.getElementById('navBar') as HTMLDivElement);
    signup.style.display = "block";

    homeButton();
}

async function homeButton() {
    displayNone();
    (document.getElementById('homeButton') as HTMLDivElement).style.display = 'block';
    var table = document.querySelector('#data tbody') as HTMLTableCellElement;
    var photo = document.getElementById('photo') as HTMLDivElement;
    photo.style.display = "block";
    var signup = (document.getElementById('navBar') as HTMLDivElement);
    signup.style.display = "block";
    table.innerHTML = "";
    const userList = await fetchUsers();
    userList.forEach(user => {

        if (user.userID == CurrentUser.userID) {
            var row = document.createElement('tr');
            row.innerHTML = `
            <td> Welcome ${user.userName}<td>
            <td><img src = "${'data:image/jpge;base64,' + user.userImage}" width=100 height=100</td>`
            table.appendChild(row);
        }

    });


}

async function stockButton() {
    displayNone();
    var signup = (document.getElementById('navBar') as HTMLDivElement);
    signup.style.display = "block";
    (document.getElementById('stockButton') as HTMLDivElement).style.display = 'block';
    try {
        const tableBody = document.getElementById('stockDatatableBody') as HTMLTableSectionElement;
        const productList = await fetchProducts();
        tableBody.innerHTML = '';
        var count: number = 1;
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
    } catch (error) {
        console.error('Error fetching contacts:', error);
    }

}






let editingId: number | null = null;
const form = document.getElementById("form") as HTMLFormElement;


var nameInput = (document.getElementById('productName') as HTMLInputElement);
var countInput = (document.getElementById('productCount') as HTMLInputElement);

var priceInput = (document.getElementById('ProductPrice') as HTMLInputElement);

var doeInput = (document.getElementById('dateOfEpiry') as HTMLInputElement);

var dopInput = (document.getElementById('dateOfPurchase') as HTMLInputElement);

var imageInput = (document.getElementById('ProductImage') as HTMLInputElement);


async function Submit() {


    const productName = nameInput.value.trim();
    const productCount = countInput.value;
    const productPrice = priceInput.value;
    const dateOfExpiry = doeInput.value;
    const dateOfPurchase = dopInput.value;

    if (!imageInput.files || imageInput.files.length == 0) {
        return
    }
    let File = imageInput.files[0];
    let data = await ConvertToByteArr(File);

    function ConvertToByteArr(file: File): Promise<string> {
        return new Promise((resolve, reject) => {
            let reader = new FileReader();
            reader.onload = () => {
                let buffer = reader.result as string;
                let data = buffer.split(",")[1];
                resolve(data);
            }
            reader.onerror = () => {
                reject(new Error('Failed to read data'));
            };
            reader.readAsDataURL(file)
        });
    }





    if (editingId !== null) {
        const product: ProductDetails =
        {
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
        const product: ProductDetails =
        {
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

}




async function editProduct(id: number) {


    displayNone();
    (document.getElementById('stockButton') as HTMLDivElement).style.display = 'block';
    var signup = (document.getElementById('navBar') as HTMLDivElement);
    signup.style.display = "block";
    let medicineMenu = document.getElementById('StockButtonAdd') as HTMLDivElement;
    medicineMenu.style.display = "block";
    editingId = id;
    const products = await fetchProducts();
    const product = products.find(product => product.productID == id);
    if (product != null) {

        nameInput.value = product.productName;

        countInput.value = product.productCount.toString();
        doeInput.value = product.dateOfPurchase.split('T')[0];
        priceInput.value = product.productPrice.toString();
        imageInput.src = product.productImage[0];

        dopInput.value = product.dateOfExpiry.split('T')[0];
    }
}

function add() {
    displayNone();
    (document.getElementById('stockButton') as HTMLDivElement).style.display = 'block';
    var signup = (document.getElementById('navBar') as HTMLDivElement);
    signup.style.display = "block";
    let medicineMenu = document.getElementById('StockButtonAdd') as HTMLDivElement;
    medicineMenu.style.display = "block";
}

function topUpButton() {
    displayNone();
    var signup = (document.getElementById('navBar') as HTMLDivElement);
    signup.style.display = "block";
    (document.getElementById('topupButton') as HTMLDivElement).style.display = 'block';

}
async function RechargeMessage() {
    const userList = await fetchUsers();
    var rechargeAmount = parseInt((document.getElementById('RechargeAmount') as HTMLInputElement).value);

    userList.forEach(user => {
        if (user.userID == CurrentUser.userID) {
            if (rechargeAmount > 0) {
                user.walletBalance += rechargeAmount;
                var content = document.getElementById('amountMessage') as HTMLSpanElement
                updateUser(user.userID, user)
                content.textContent = "Recharged Successfully";

            }
            else {
                alert("Unable to  Recharge");
            }
        }
    });
    (document.getElementById('RechargeAmount') as HTMLInputElement).value = "";
}

async function showBalanceButton() {
    displayNone();
    (document.getElementById('showBalanceButton') as HTMLDivElement).style.display = 'block';
    var signup = (document.getElementById('navBar') as HTMLDivElement);
    signup.style.display = "block";
    const userList = await fetchUsers();
    userList.forEach(user => {
        if (user.userID == CurrentUser.userID) {

            var currentbalance = document.getElementById('balance') as HTMLSpanElement;
            currentbalance.textContent = (user.walletBalance).toString();
        }
    });

}
function signOutButton() {
    displayNone();
    (document.getElementById('header') as HTMLDivElement).style.display = 'block';
}

async function fetchUsers(): Promise<UserDetails[]> {
    const apiUrl = 'http://localhost:5205/api/UserDetails';
    const response = await fetch(apiUrl);
    if (!response.ok) {
        throw new Error('Failed to fetch Users');
    }
    return await response.json();
}
async function addUser(user: UserDetails): Promise<void> {
    const response = await fetch('http://localhost:5205/api/UserDetails', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });
    if (!response.ok) {
        throw new Error('Failed to add contact');
    }

}


async function purchaseButton() {
    displayNone();
    var signup = (document.getElementById('navBar') as HTMLDivElement);
    signup.style.display = "block";
    (document.getElementById('purchaseButton') as HTMLDivElement).style.display = 'block';
    try {

        const productList = await fetchProducts();
        const tableBody = document.getElementById('purchaseProduct') as HTMLTableSectionElement;
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
    } catch (error) {
        console.error('Error fetching contacts:', error);
    }
}

async function purchaseProduct(productID: number) {
    // const id = parseInt(productID);
    let Quanitiy = prompt("Enter the Quanitiy");
    const count: number = Number(Quanitiy);
    const productList = await fetchProducts();

    productList.forEach(product => {


        if (product.productID == productID) {
            if (product.productCount >= count) {
                const item: LocalCartItem =
                {


                    productName: product.productName,
                    productCount: count,
                    productPrice: product.productPrice
                };
                localList.push(item);

            }
            else {
                alert("Count is not enough to buy")
            }
        }

    });
}
console.log(localList);

function cartButton() {
    displayNone();
    var signup = (document.getElementById('navBar') as HTMLDivElement);
    signup.style.display = "block";
    (document.getElementById('cartButton') as HTMLDivElement).style.display = 'block';
    const tableBody = document.getElementById('cardItem') as HTMLTableSectionElement;
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

async function buy() {

    let totalProductPrice: number = 0;
    let productCount: number = 0
    localList.forEach(item => {

       var singleProductPrice = item.productCount*item.productPrice;
        totalProductPrice += singleProductPrice;
        productCount++;
    });


    if (totalProductPrice <= CurrentUser.walletBalance) {
        const order: OrderDetails =
        {
            orderID: undefined,
            userID: CurrentUser.userID,
            productCount: productCount,
            totalPrice: totalProductPrice,
            dateOfOrder: new Date()
        };
        addOrder(order);
        let currentorderID: number = 0;
        const orderList = await fetchOrder();
     //   const itemList = await fetchItem();
        const order1 = orderList.length - 1;
        currentorderID = orderList[order1].orderID;

        localList.forEach(itemList => {

            const item: CartItemDetails = {
                cartItemID: undefined,
                userID: CurrentUser.userID,
                orderID: currentorderID,
                productName: itemList.productName,
                productCount: itemList.productCount,
                productPrice: itemList.productPrice
            }
            addItem(item);

        });
        alert("Successfully Ordered")


    }
    else {
        alert("Insufficient Balance");
    }
}

async function updateUser(id: number, user: UserDetails): Promise<void> {
    const response = await fetch(`http://localhost:5205/api/UserDetails/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });
    if (!response.ok) {
        throw new Error('Failed to update user');
    }

}
async function fetchProducts(): Promise<ProductDetails[]> {
    const apiUrl = 'http://localhost:5205/api/ProductDetails';
    const response = await fetch(apiUrl);
    if (!response.ok) {
        throw new Error('Failed to fetch product');
    }
    return await response.json();
}
async function addProduct(product: ProductDetails): Promise<void> {
    const response = await fetch('http://localhost:5205/api/ProductDetails', {
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
}

async function updateProduct(id: number, product: ProductDetails): Promise<void> {
    const response = await fetch(`http://localhost:5205/api/ProductDetails/${id}`, {
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
}

async function deleteProduct(id: number): Promise<void> {
    const response = await fetch(`http://localhost:5205/api/ProductDetails/${id}`, {
        method: 'DELETE'
    });
    if (!response.ok) {
        throw new Error('Failed to delete product');
    }
    stockButton();
}

async function addOrder(product: OrderDetails): Promise<void> {
    const response = await fetch('http://localhost:5205/api/OrderDetails', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
    });
    if (!response.ok) {
        throw new Error('Failed to add product');
    }
    
}


async function fetchOrder(): Promise<OrderDetails[]> {
    const apiUrl = 'http://localhost:5205/api/OrderDetails';
    const response = await fetch(apiUrl);
    if (!response.ok) {
        throw new Error('Failed to fetch order');
    }
    return await response.json();
}
async function addItem(order: CartItemDetails): Promise<void> {
    const response = await fetch('http://localhost:5205/api/CartItemDetails', {
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
}
async function fetchItem(): Promise<CartItemDetails[]> {
    const apiUrl = 'http://localhost:5205/api/CartItemDetails';
    const response = await fetch(apiUrl);
    if (!response.ok) {
        throw new Error('Failed to fetch item');
    }
    return await response.json();
}