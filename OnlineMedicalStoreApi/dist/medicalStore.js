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
let NewUserNameStatus = false;
let NewUserMailStatus = false;
let NewUserPasswordStatus = false;
let NewUserConfirmPasswordStatus = false;
let NewUserPhoneStatus = false;
let OrderIdAutoIncrement = 1000;
let CurrentUserEmail = "";
let CurrentUserPassword = "";
let CurrentUser;
function newUserPage() {
    let signin = document.getElementById('existingUserPage');
    let signup = document.getElementById('newUserPage');
    signup.style.display = "block";
    signin.style.display = "none";
}
let UserEmail = "";
function checkNewUserEmail(paramNewUserEmail) {
    let newUserMail = document.getElementById(paramNewUserEmail).value;
    let newUserMailMessage = document.getElementById(paramNewUserEmail + "Message");
    let newUserMailRegex = /^([a-z0-9]+)@([a-z]+).([a-z]{2,20})$/;
    if (newUserMailRegex.test(newUserMail)) {
        UserEmail = newUserMail;
        NewUserMailStatus = true;
        newUserMailMessage.style.visibility = "hidden";
    }
    else {
        NewUserMailStatus = false;
        newUserMailMessage.innerHTML = "Please enter valid Email";
        newUserMailMessage.style.visibility = "visible";
        newUserMailMessage.style.color = "tomato";
        newUserMailMessage.style.marginLeft = "10px";
    }
}
let UserName = "";
function checkNewUserName(paramNewUserName) {
    let newUserName = document.getElementById(paramNewUserName).value;
    let newUserNameMessage = document.getElementById(paramNewUserName + "Message");
    let newUserMailRegex = /\w{4,20}/;
    if (newUserMailRegex.test(newUserName)) {
        UserName = newUserName;
        NewUserNameStatus = true;
        newUserNameMessage.style.visibility = "hidden";
    }
    else {
        NewUserNameStatus = false;
        newUserNameMessage.innerHTML = "Please enter valid name";
        newUserNameMessage.style.visibility = "visible";
        newUserNameMessage.style.color = "tomato";
        newUserNameMessage.style.marginLeft = "10px";
    }
}
let UserPassword = "";
function checkNewUserPassword(paramNewUserPassword) {
    let newUserPassword = document.getElementById(paramNewUserPassword).value;
    let newUserPasswordMessage = document.getElementById(paramNewUserPassword + "Message");
    let newUserPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!^%*?&]{8,15}$/;
    if (newUserPasswordRegex.test(newUserPassword)) {
        UserPassword = newUserPassword;
        NewUserPasswordStatus = true;
        newUserPasswordMessage.style.visibility = "hidden";
    }
    else {
        NewUserPasswordStatus = false;
        newUserPasswordMessage.textContent = "Password is too short";
        newUserPasswordMessage.style.visibility = "visible";
        newUserPasswordMessage.style.color = "tomato";
        newUserPasswordMessage.style.marginLeft = "10px";
    }
}
function checkNewUserConfirmPassword(paramNewUserConfirmPassword) {
    let newUserConfirmPassword = document.getElementById(paramNewUserConfirmPassword).value;
    let newUserConfirmPasswordMessage = document.getElementById(paramNewUserConfirmPassword + "Message");
    if (UserPassword == (newUserConfirmPassword)) {
        NewUserConfirmPasswordStatus = true;
        newUserConfirmPasswordMessage.style.visibility = "hidden";
    }
    else {
        NewUserPasswordStatus = false;
        newUserConfirmPasswordMessage.textContent = "Didn't match";
        newUserConfirmPasswordMessage.style.visibility = "visible";
        newUserConfirmPasswordMessage.style.color = "tomato";
        newUserConfirmPasswordMessage.style.marginLeft = "10px";
    }
}
let UserPhone = "";
function checkNewUserPhone(paramNewUserPhone) {
    let newUserPhone = document.getElementById(paramNewUserPhone).value;
    let newUserPhoneMessage = document.getElementById(paramNewUserPhone + "Message");
    let newUserPhoneRegex = /\d{10}/;
    if (newUserPhoneRegex.test(newUserPhone)) {
        UserPhone = newUserPhone;
        NewUserPhoneStatus = true;
        newUserPhoneMessage.style.visibility = "hidden";
    }
    else {
        NewUserPasswordStatus = false;
        newUserPhoneMessage.innerHTML = "Invalid Number";
        newUserPhoneMessage.style.color = "tomato";
        newUserPhoneMessage.style.visibility = "visible";
        newUserPhoneMessage.style.marginLeft = "10px";
    }
}
function SignUp() {
    if (NewUserMailStatus == true && NewUserPasswordStatus == true && NewUserConfirmPasswordStatus == true && NewUserPhoneStatus == true) {
        const User = {
            userID: undefined,
            userName: UserName,
            userEmail: UserEmail,
            userPassword: UserPassword,
            userPhoneNumber: UserPassword,
            walletBalance: 0
        };
        addUser(User);
        let homepage = document.getElementById('homePage');
        let newUserPage = document.getElementById('newUserPage');
        homepage.style.display = "block";
        newUserPage.style.display = "none";
        alert("Account Created Successfully");
    }
}
function existingUserPage() {
    let signin = document.getElementById('existingUserPage');
    let signup = document.getElementById('newUserPage');
    signup.style.display = "none";
    signin.style.display = "block";
}
function checkExistUserEmail(paramExitUserEmail) {
    let ExistUserMail = document.getElementById(paramExitUserEmail).value;
    let ExistUserMailMessage = document.getElementById(paramExitUserEmail + "Message");
    let ExistUserMailRegex = /^([a-z0-9]+)@([a-z]+).([a-z]{2,20})$/;
    if (ExistUserMailRegex.test(ExistUserMail)) {
        CurrentUserEmail = ExistUserMail;
        NewUserMailStatus = true;
        ExistUserMailMessage.style.visibility = "hidden";
    }
    else {
        ExistUserMailMessage.textContent = "Please enter valid name";
        ExistUserMailMessage.style.visibility = "visible";
        ExistUserMailMessage.style.color = "tomato";
        ExistUserMailMessage.style.marginLeft = "10px";
    }
}
function checkExistUserPassword(paramExistUserPassword) {
    let ExistUserPassword = document.getElementById(paramExistUserPassword).value;
    let ExistUserPasswordMessage = document.getElementById(paramExistUserPassword + "Message");
    let ExistUserPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!^%*?&]{8,15}$/;
    if (ExistUserPasswordRegex.test(ExistUserPassword)) {
        CurrentUserPassword = ExistUserPassword;
        ExistUserPasswordMessage.style.visibility = "hidden";
    }
    else {
        ExistUserPasswordMessage.textContent = "Password is too short";
        ExistUserPasswordMessage.style.visibility = "visible";
        ExistUserPasswordMessage.style.color = "tomato";
        ExistUserPasswordMessage.style.marginLeft = "10px";
    }
}
let user = "";
let CurrentUserName = "";
function SignIn() {
    return __awaiter(this, void 0, void 0, function* () {
        var noExistingUserIdChecker = false;
        const user = yield fetchUser();
        for (let i = 0; i < user.length; i++) {
            if (user[i].userEmail == CurrentUserEmail && user[i].userPassword == CurrentUserPassword) {
                CurrentUserName = user[i].userName;
                CurrentUser = user[i];
                DashBoard();
                return;
            }
            else {
                noExistingUserIdChecker = true;
            }
        }
        if (noExistingUserIdChecker) {
            alert("Enter Valid Email AND Password");
        }
    });
}
function DashBoard() {
    let homepage = document.getElementById('homePage');
    let newUserPage = document.getElementById('newUserPage');
    let ExistUser = document.getElementById('existingUserPage');
    let DashBoard = document.getElementById('dashBoard');
    homepage.style.display = "none";
    newUserPage.style.display = "none";
    ExistUser.style.display = "none";
    DashBoard.style.display = "block";
    HomeMenu();
}
function HomeMenu() {
    let DashBoard = document.getElementById('dashBoard');
    let HomeMenu = document.getElementById('HomeButton');
    let TopupMenu = document.getElementById('TopupButton');
    let medicineMenu = document.getElementById('MedicineButton');
    let MedicineButtonAdd = document.getElementById('MedicineButtonAdd');
    let CancelMenu = document.getElementById('cancelButton');
    let PurchaseMenu = document.getElementById('PurchaseButton');
    let CountMenu = document.getElementById('CountButton');
    CountMenu.style.display = "none";
    PurchaseMenu.style.display = "none";
    CancelMenu.style.display = "none";
    MedicineButtonAdd.style.display = "none";
    medicineMenu.style.display = "none";
    TopupMenu.style.display = "none";
    DashBoard.style.display = "block";
    HomeMenu.style.display = "block";
    let user = document.getElementById('CurrentUserName');
    user.textContent = CurrentUserName;
}
function ShowBalance() {
    return __awaiter(this, void 0, void 0, function* () {
        let DashBoard = document.getElementById('dashBoard');
        let HomeMenu = document.getElementById('HomeButton');
        let MedicineMenu = document.getElementById('MedicineButton');
        let TopupMenu = document.getElementById('TopupButton');
        let ShowBalanceMenu = document.getElementById('ShowBalnceButton');
        let OrderMenu = document.getElementById('OrderButton');
        let MedicineButtonAdd = document.getElementById('MedicineButtonAdd');
        let CancelMenu = document.getElementById('cancelButton');
        let PurchaseMenu = document.getElementById('PurchaseButton');
        let CountMenu = document.getElementById('CountButton');
        CountMenu.style.display = "none";
        PurchaseMenu.style.display = "none";
        CancelMenu.style.display = "none";
        MedicineButtonAdd.style.display = "none";
        OrderMenu.style.display = "none";
        MedicineMenu.style.display = "none";
        HomeMenu.style.display = "none";
        TopupMenu.style.display = "none";
        DashBoard.style.display = "block";
        ShowBalanceMenu.style.display = "block";
        const UserArrayList = yield fetchUser();
        for (let i = 0; i < UserArrayList.length; i++) {
            if (UserArrayList[i].userEmail == CurrentUserEmail) {
                var currentbalance = document.getElementById('balance');
                currentbalance.textContent = (UserArrayList[i].walletBalance).toString();
            }
        }
    });
}
function RechargeAmount() {
    let DashBoard = document.getElementById('dashBoard');
    let HomeMenu = document.getElementById('HomeButton');
    let MedicineMenu = document.getElementById('MedicineButton');
    let TopupMenu = document.getElementById('TopupButton');
    let ShowBalanceMenu = document.getElementById('ShowBalnceButton');
    let OrderMenu = document.getElementById('OrderButton');
    let MedicineButtonAdd = document.getElementById('MedicineButtonAdd');
    let CancelMenu = document.getElementById('cancelButton');
    let PurchaseMenu = document.getElementById('PurchaseButton');
    let CountMenu = document.getElementById('CountButton');
    CountMenu.style.display = "none";
    PurchaseMenu.style.display = "none";
    CancelMenu.style.display = "none";
    MedicineButtonAdd.style.display = "none";
    OrderMenu.style.display = "none";
    MedicineMenu.style.display = "none";
    DashBoard.style.display = "block";
    HomeMenu.style.display = "none";
    TopupMenu.style.display = "block";
    ShowBalanceMenu.style.display = "none";
}
function RechargeMessage() {
    return __awaiter(this, void 0, void 0, function* () {
        const UserArrayList = yield fetchUser();
        var rechargeAmount = parseInt(document.getElementById('RechargeAmount').value);
        for (let i = 0; i < UserArrayList.length; i++) {
            if (UserArrayList[i].userEmail == CurrentUserEmail) {
                if (rechargeAmount > 0) {
                    UserArrayList[i].walletBalance += rechargeAmount;
                    alert(UserArrayList[i].walletBalance + " Recharged");
                    var content = document.getElementById('amountMessage');
                    updateUser(UserArrayList[i].userID, UserArrayList[i]);
                    content.textContent = "Recharged Successfully";
                }
                else {
                    alert("Unable to  Recharge");
                }
            }
        }
    });
}
function PurchaseItem() {
    return __awaiter(this, void 0, void 0, function* () {
        let DashBoard = document.getElementById('dashBoard');
        let TopupMenu = document.getElementById('TopupButton');
        let OrderMenu = document.getElementById('OrderButton');
        let ShowBalanceMenu = document.getElementById('ShowBalnceButton');
        let HomeMenu = document.getElementById('HomeButton');
        let CancelMenu = document.getElementById('cancelButton');
        let MedicineMenu = document.getElementById('MedicineButton');
        let PurchaseMenu = document.getElementById('PurchaseButton');
        PurchaseMenu.style.display = "block";
        MedicineMenu.style.display = "none";
        CancelMenu.style.display = "none";
        HomeMenu.style.display = "none";
        ShowBalanceMenu.style.display = "none";
        DashBoard.style.display = "block";
        OrderMenu.style.display = "none";
        TopupMenu.style.display = "none";
        let table = document.querySelector('#medicineData1 tbody');
        table.innerHTML = "";
        const Medicine = yield fetchMedicine();
        Medicine.forEach(element => {
            const row = document.createElement("tr");
            row.innerHTML = `<td>${element.medicineName}</td><td>${element.medicineCount}</td><td>${element.medicinePrice}</td><td>${element.dateOfExpiry.toString().split('T')[0].split('-').reverse().join('/')}</td> <td>
            <button type="button" onclick="Order('${element.medicineID}')">Buy</button>
          </td>`;
            table.appendChild(row);
        });
    });
}
let CurrentMedicineID;
function Order(medicineID) {
    let CountMenu = document.getElementById('CountButton');
    CountMenu.style.display = "block";
    CurrentMedicineID = medicineID;
}
function PlaceOrder() {
    return __awaiter(this, void 0, void 0, function* () {
        var quantiy = parseInt(document.getElementById("Count").value);
        const Medicine = yield fetchMedicine();
        const user = yield fetchUser();
        Medicine.forEach(medicine => {
            if (medicine.medicineID == CurrentMedicineID) {
                if (medicine.medicineCount >= quantiy) {
                    var totalprice = medicine.medicinePrice * quantiy;
                    user.forEach(user => {
                        if (user.walletBalance >= totalprice && user.userEmail == CurrentUser.userEmail) {
                            user.walletBalance -= totalprice;
                            medicine.medicineCount -= quantiy;
                            const order = {
                                orderID: undefined,
                                userEmail: user.userEmail,
                                medicineName: medicine.medicineName,
                                medicineCount: quantiy,
                                totalPrice: totalprice,
                                orderDate: new Date().toISOString(),
                                orderStatus: "Ordered"
                            };
                            updateUser(user.userID, user);
                            console.log(order);
                            addOrder(order);
                            updateMedicine(medicine.medicineID, medicine);
                            alert("Order Placed Successfully");
                        }
                    });
                }
            }
        });
    });
}
function CancelOrder() {
    return __awaiter(this, void 0, void 0, function* () {
        const OrderList = yield fetchOrder();
        let DashBoard = document.getElementById('dashBoard');
        let TopupMenu = document.getElementById('TopupButton');
        let OrderMenu = document.getElementById('OrderButton');
        let ShowBalanceMenu = document.getElementById('ShowBalnceButton');
        let HomeMenu = document.getElementById('HomeButton');
        let CancelMenu = document.getElementById('cancelButton');
        let MedicineMenu = document.getElementById('MedicineButton');
        let PurchaseMenu = document.getElementById('PurchaseButton');
        let CountMenu = document.getElementById('CountButton');
        let conatiner = document.getElementById('container');
        conatiner.style.display = "none";
        CountMenu.style.display = "none";
        PurchaseMenu.style.display = "none";
        MedicineMenu.style.display = "none";
        CancelMenu.style.display = "block";
        HomeMenu.style.display = "none";
        ShowBalanceMenu.style.display = "none";
        DashBoard.style.display = "block";
        OrderMenu.style.display = "none";
        TopupMenu.style.display = "none";
        let table = document.querySelector("#OrderData1 tbody");
        table.innerHTML = "";
        for (let i = 0; i < OrderList.length; i++) {
            if (OrderList[i].userEmail === CurrentUserEmail && OrderList[i].orderStatus === "Ordered") {
                const row = document.createElement('tr');
                row.innerHTML = `<td>${OrderList[i].orderID}</td><td>${OrderList[i].medicineName}</td><td>${OrderList[i].medicineCount}</td>
          <td>${OrderList[i].totalPrice}</td><td>${OrderList[i].orderDate.toString().split('T')[0].split('-').reverse().join('/')}</td><td>${OrderList[i].orderStatus}</td>
          <td> <button  type="button" onclick="cancel('${OrderList[i].orderID}')">Cancel</button></td>`;
                table.appendChild(row);
            }
        }
    });
}
function cancel(orderID) {
    return __awaiter(this, void 0, void 0, function* () {
        const Medicine = yield fetchMedicine();
        const OrderList = yield fetchOrder();
        const UserArrayList = yield fetchUser();
        OrderList.forEach(order => {
            if (order.orderID == orderID) {
                Medicine.forEach(medicine => {
                    if (medicine.medicineName == order.medicineName) {
                        medicine.medicineCount += order.medicineCount;
                        UserArrayList.forEach(user => {
                            if (user.userEmail == CurrentUserEmail) {
                                order.orderStatus = "Cancelled";
                                user.walletBalance += order.totalPrice;
                                updateUser(user.userID, user);
                                updateOrder(order.orderID, order);
                                alert("Cancelled Successfully");
                            }
                        });
                    }
                });
            }
        });
        CancelOrder();
    });
}
function OrderHistory() {
    return __awaiter(this, void 0, void 0, function* () {
        const OrderList = yield fetchOrder();
        const UserArrayList = yield fetchUser();
        let medicineMenu = document.getElementById('MedicineButton');
        medicineMenu.style.display = "none";
        let DashBoard = document.getElementById('dashBoard');
        let TopupMenu = document.getElementById('TopupButton');
        let OrderMenu = document.getElementById('OrderButton');
        let ShowBalanceMenu = document.getElementById('ShowBalnceButton');
        let HomeMenu = document.getElementById('HomeButton');
        let CancelMenu = document.getElementById('cancelButton');
        let PurchaseMenu = document.getElementById('PurchaseButton');
        let CountMenu = document.getElementById('CountButton');
        CountMenu.style.display = "none";
        PurchaseMenu.style.display = "none";
        CancelMenu.style.display = "none";
        HomeMenu.style.display = "none";
        ShowBalanceMenu.style.display = "none";
        DashBoard.style.display = "block";
        OrderMenu.style.display = "block";
        TopupMenu.style.display = "none";
        let table = document.querySelector("#OrderData tbody");
        table.innerHTML = "";
        for (let i = 0; i < OrderList.length; i++) {
            if (OrderList[i].userEmail == CurrentUserEmail) {
                const row = document.createElement('tr');
                row.innerHTML = `<td>${OrderList[i].orderID}</td><td>${OrderList[i].medicineName}</td><td>${OrderList[i].medicineCount}</td><td>${OrderList[i].totalPrice}</td><td>${OrderList[i].orderDate.toString().split('T')[0].split('-').reverse().join('/')}</td><td>${OrderList[i].orderStatus}</td>`;
                table.appendChild(row);
            }
        }
        fetchOrder();
    });
}
let editingId = null;
const form = document.getElementById("form");
var nameinp = document.getElementById('medicineName');
var countinp = document.getElementById('medicineCount');
var priceinp = document.getElementById('medicinePrice');
var doeinp = document.getElementById('medicineDateOfEp');
function Submit() {
    const name1 = nameinp.value.trim();
    const count1 = parseInt(countinp.value);
    const price1 = parseInt(priceinp.value);
    var date1 = doeinp.value;
    if (editingId !== null) {
        const Medicine = {
            medicineID: editingId,
            medicineName: name1,
            medicineCount: count1,
            medicinePrice: price1,
            dateOfExpiry: date1
        };
        updateMedicine(editingId, Medicine);
        fetchMedicine();
    }
    else {
        const Medicine = {
            medicineID: undefined,
            medicineName: name1,
            medicineCount: count1,
            medicinePrice: price1,
            dateOfExpiry: date1
        };
        addMedicine(Medicine);
        fetchMedicine();
    }
}
function renderContacts() {
    return __awaiter(this, void 0, void 0, function* () {
        let homeMenu = document.getElementById('HomeButton');
        let TopupMenu = document.getElementById('TopupButton');
        let OrderMenu = document.getElementById('OrderButton');
        let ShowBalanceMenu = document.getElementById('ShowBalnceButton');
        let MedicineButtonAdd = document.getElementById('MedicineButtonAdd');
        let CancelMenu = document.getElementById('cancelButton');
        let PurchaseMenu = document.getElementById('PurchaseButton');
        let CountMenu = document.getElementById('CountButton');
        CountMenu.style.display = "none";
        PurchaseMenu.style.display = "none";
        CancelMenu.style.display = "none";
        MedicineButtonAdd.style.display = "none";
        ShowBalanceMenu.style.display = "none";
        OrderMenu.style.display = "none";
        TopupMenu.style.display = "none";
        homeMenu.style.display = "none";
        let medicineMenu = document.getElementById('MedicineButton');
        medicineMenu.style.display = "block";
        try {
            const tableBody = document.getElementById('medicineTableBody');
            const medicine = yield fetchMedicine();
            tableBody.innerHTML = '';
            medicine.forEach(medicine => {
                const row = document.createElement('tr');
                row.innerHTML = `
          <td>${medicine.medicineName}</td>
          <td>${medicine.medicineCount}</td>
          <td>${medicine.medicinePrice}</td>
       <td>${medicine.dateOfExpiry.toString().split('T')[0].split('-').reverse().join('/')}</td>
          <td>
            <button onclick="editMedicine('${medicine.medicineID}')">Edit</button>
            <button onclick="deleteMedicine('${medicine.medicineID}')">Delete</button>
          </td>
        `;
                tableBody.appendChild(row);
            });
        }
        catch (error) {
            console.error('Error fetching contacts:', error);
        }
    });
}
function editMedicine(id) {
    return __awaiter(this, void 0, void 0, function* () {
        let homeMenu = document.getElementById('HomeButton');
        let TopupMenu = document.getElementById('TopupButton');
        let OrderMenu = document.getElementById('OrderButton');
        let ShowBalanceMenu = document.getElementById('ShowBalnceButton');
        let MedicineButtonAdd = document.getElementById('MedicineButtonAdd');
        let CancelMenu = document.getElementById('cancelButton');
        let PurchaseMenu = document.getElementById('PurchaseButton');
        let CountMenu = document.getElementById('CountButton');
        CountMenu.style.display = "none";
        PurchaseMenu.style.display = "none";
        CancelMenu.style.display = "none";
        MedicineButtonAdd.style.display = "block";
        ShowBalanceMenu.style.display = "none";
        OrderMenu.style.display = "none";
        TopupMenu.style.display = "none";
        homeMenu.style.display = "none";
        let medicineMenu = document.getElementById('MedicineButton');
        medicineMenu.style.display = "block";
        editingId = id;
        const medicine = yield fetchMedicine();
        const med = medicine.find(medicine => medicine.medicineID == id);
        if (med != null) {
            nameinp.value = med.medicineName;
            countinp.value = med.medicineCount.toString();
            priceinp.value = med.medicinePrice.toString();
            doeinp.value = med.dateOfExpiry.split('T')[0];
        }
    });
}
function add() {
    let homeMenu = document.getElementById('HomeButton');
    let TopupMenu = document.getElementById('TopupButton');
    let OrderMenu = document.getElementById('OrderButton');
    let ShowBalanceMenu = document.getElementById('ShowBalnceButton');
    let MedicineButtonAdd = document.getElementById('MedicineButtonAdd');
    let CancelMenu = document.getElementById('cancelButton');
    let PurchaseMenu = document.getElementById('PurchaseButton');
    let CountMenu = document.getElementById('CountButton');
    CountMenu.style.display = "none";
    PurchaseMenu.style.display = "none";
    CancelMenu.style.display = "none";
    MedicineButtonAdd.style.display = "block";
    ShowBalanceMenu.style.display = "none";
    OrderMenu.style.display = "none";
    TopupMenu.style.display = "none";
    homeMenu.style.display = "none";
    let medicineMenu = document.getElementById('MedicineButton');
    medicineMenu.style.display = "block";
}
function addUser(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('http://localhost:5274/api/UserDetails', {
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
function addMedicine(medicine) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('http://localhost:5274/api/MedicineDetails', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(medicine)
        });
        if (!response.ok) {
            throw new Error('Failed to add contact');
        }
        renderContacts();
    });
}
function addOrder(order) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('http://localhost:5274/api/OrderDetails', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(order)
        });
        if (!response.ok) {
            throw new Error('Failed to add contact');
        }
        renderContacts();
    });
}
function updateMedicine(id, medicine) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5274/api/MedicineDetails/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(medicine)
        });
        if (!response.ok) {
            throw new Error('Failed to update contact');
        }
        renderContacts();
    });
}
function updateUser(id, user) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5274/api/UserDetails/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        if (!response.ok) {
            throw new Error('Failed to update contact');
        }
    });
}
function updateOrder(id, order) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5274/api/OrderDetails/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(order)
        });
        if (!response.ok) {
            throw new Error('Failed to update contact');
        }
    });
}
function deleteMedicine(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5274/api/MedicineDetails/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('Failed to delete contact');
        }
        renderContacts();
    });
}
function fetchMedicine() {
    return __awaiter(this, void 0, void 0, function* () {
        const apiUrl = 'http://localhost:5274/api/MedicineDetails';
        const response = yield fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch contacts');
        }
        return yield response.json();
    });
}
function fetchUser() {
    return __awaiter(this, void 0, void 0, function* () {
        const apiUrl = 'http://localhost:5274/api/UserDetails';
        const response = yield fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch contacts');
        }
        return yield response.json();
    });
}
function fetchOrder() {
    return __awaiter(this, void 0, void 0, function* () {
        const apiUrl = 'http://localhost:5274/api/OrderDetails';
        const response = yield fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch contacts');
        }
        return yield response.json();
    });
}
function SignOut() {
    let homeMenu = document.getElementById('HomeButton');
    let TopupMenu = document.getElementById('TopupButton');
    let OrderMenu = document.getElementById('OrderButton');
    let ShowBalanceMenu = document.getElementById('ShowBalnceButton');
    let MedicineButtonAdd = document.getElementById('MedicineButtonAdd');
    let CancelMenu = document.getElementById('cancelButton');
    let PurchaseMenu = document.getElementById('PurchaseButton');
    let CountMenu = document.getElementById('CountButton');
    CountMenu.style.display = "none";
    PurchaseMenu.style.display = "none";
    CancelMenu.style.display = "none";
    MedicineButtonAdd.style.display = "none";
    ShowBalanceMenu.style.display = "none";
    OrderMenu.style.display = "none";
    TopupMenu.style.display = "none";
    homeMenu.style.display = "none";
    let medicineMenu = document.getElementById('MedicineButton');
    medicineMenu.style.display = "none";
    let SignOutMenu = document.getElementById('homePage');
    SignOutMenu.style.display = "block";
    let DashBoard = document.getElementById('dashBoard');
    DashBoard.style.display = "none";
}
