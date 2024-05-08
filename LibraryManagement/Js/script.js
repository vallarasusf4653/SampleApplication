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
var CurrentUser;
var newUserName = document.getElementById('username');
var newUserEmail = document.getElementById('useremail');
var newUserPassword = document.getElementById('userpassword');
var newUserGender = document.getElementById('usergender');
var newUserDepartment = document.getElementById('userdepartment');
var newUserMobileNumber = document.getElementById('usermobilenumber');
function NewUser() {
    var signin = document.getElementById('signin');
    signin.style.display = "none";
    var signup = document.getElementById('signup');
    signup.style.display = "block";
}
function ExistUser() {
    var signin = document.getElementById('signin');
    signin.style.display = "block";
    var signup = document.getElementById('signup');
    signup.style.display = "none";
}
function SignUp() {
    const user = {
        userID: undefined,
        userName: newUserName.value,
        userEmail: newUserEmail.value,
        password: newUserPassword.value,
        gender: newUserGender.value,
        department: newUserDepartment.value,
        mobileNumber: newUserMobileNumber.value,
        walletBalance: 0
    };
    addUser(user);
    alert("Account created Successfully");
    ExistUser();
}
var CurrentUserEmail = document.getElementById('existemail');
var CurrentUserPassword = document.getElementById('existpassword');
function SignIn() {
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
function dashBoard() {
    document.getElementById('dashBoard').style.display = "block";
    document.getElementById('header').style.display = "none";
    document.getElementById('homeButton').style.display = "block";
    document.getElementById('signin').style.display = "none";
    document.getElementById('signup').style.display = "none";
    homeMenu();
}
function displayNone() {
    document.getElementById('dashBoard').style.display = "none";
    document.getElementById('header').style.display = "none";
    document.getElementById('homeButton').style.display = "none";
    document.getElementById('signin').style.display = "none";
    document.getElementById('signup').style.display = "none";
    document.getElementById('BorrowHistoryButton').style.display = "none";
    document.getElementById('ShowBalanceButton').style.display = "none";
    document.getElementById('RechargeButton').style.display = "none";
    document.getElementById('borrowBookButton').style.display = "none";
    document.getElementById('ReturnBookButton').style.display = "none";
}
function homeMenu() {
    displayNone();
    document.getElementById('homeButton').style.display = "block";
    document.getElementById('dashBoard').style.display = "block";
    var user = document.getElementById('username');
    user.innerHTML = CurrentUser.userName;
}
function renderBorrowbook() {
    return __awaiter(this, void 0, void 0, function* () {
        const bookList = yield fetchBooks();
        displayNone();
        document.getElementById('dashBoard').style.display = "block";
        document.getElementById('borrowBookButton').style.display = "block";
        let table = document.querySelector("#BookData tbody");
        table.innerHTML = "";
        let Count = 1;
        bookList.forEach(book => {
            const row = document.createElement('tr');
            row.innerHTML =
                `<td>${Count}</td>
            <td>${book.bookName}</td>
            <td>${book.authorName}</td>
            <td>${book.bookCount}</td>
            <td><button type="button" onclick="OrderBook('${book.bookID}')">Buy</button></td>`;
            table.appendChild(row);
            Count++;
        });
    });
}
function OrderBook(BorrowbookID) {
    return __awaiter(this, void 0, void 0, function* () {
        displayNone();
        document.getElementById('dashBoard').style.display = "block";
        document.getElementById('borrowBookButton').style.display = "block";
        let count = prompt("Enter the count");
        let count1 = Number(count);
        const bookList = yield fetchBooks();
        const borrowList = yield fetchBorrowBooks();
        if (count1 > 0) {
            var flag = true;
            var flag2 = false;
            bookList.forEach(book => {
                if (book.bookID == BorrowbookID) {
                    if (book.bookCount >= count1) {
                        flag = false;
                        let bookcount = 0;
                        borrowList.forEach(borrow => {
                            if (CurrentUser.userID == borrow.userID && borrow.status == 'Borrowed') {
                                bookcount += borrow.borrowBookCount;
                            }
                        });
                        if (bookcount + count1 <= 3) {
                            const date = new Date();
                            const newbook = {
                                borrowID: undefined,
                                bookID: BorrowbookID,
                                userID: CurrentUser.userID,
                                borrowedDate: date.toISOString(),
                                borrowBookCount: count1,
                                status: "Borrowed",
                                paidFineAmount: 0
                            };
                            book.bookCount -= count1;
                            updateBook(BorrowbookID, book);
                            flag2 = true;
                            addBorrow(newbook);
                            alert("Book Borrowed Successfully");
                            renderBorrowbook();
                        }
                        else if (bookcount > 3) {
                            alert("You have borrowed 3 books already");
                        }
                        else {
                            alert("You can have maximum of 3 borrowed books. Your Book Count " + bookcount + "  and requested for " + count + "books");
                        }
                    }
                }
            });
            if (flag) {
                alert("Books are not available for the selected count");
            }
        }
        else {
            alert("Please Enter Valid count");
        }
    });
}
function showReturnBook() {
    return __awaiter(this, void 0, void 0, function* () {
        const borrowList = yield fetchBorrowBooks();
        displayNone();
        document.getElementById('ReturnBookButton').style.display = "block";
        document.getElementById('dashBoard').style.display = "block";
        let table = document.querySelector("#returnBookData tbody");
        table.innerHTML = "";
        let count = 1;
        borrowList.forEach(book => {
            if (book.userID == CurrentUser.userID && book.status == "Borrowed") {
                const row = document.createElement('tr');
                row.innerHTML =
                    `<td>${count}</td>
            <td>${book.bookID}</td>
            <td>${book.borrowedDate.toString().split('T')[0].split('-').reverse().join('/')}</td>
            <td>${book.borrowBookCount}</td><td>${book.status}</td>
            <td><button type="button" onclick="returnBook('${book.borrowID}')">Return</button></td>`;
                table.appendChild(row);
                count++;
            }
        });
    });
}
function returnBook(bookid) {
    return __awaiter(this, void 0, void 0, function* () {
        const BorrowList = yield fetchBorrowBooks();
        const bookList = yield fetchBooks();
        BorrowList.forEach(borrow => {
            if (borrow.borrowID == bookid && borrow.status == "Borrowed") {
                var date = borrow.borrowedDate.split('T')[0].split('-').reverse().join('/');
                var date1 = date.split('/');
                var date3 = new Date(`${date1[2]}-${date1[1]}-${date1[0]}`).getTime();
                var currentDate = new Date().getTime();
                var diff = Math.abs(currentDate - date3);
                var days = Math.round(diff / (1000 * 3600 * 24));
                if (days > 15) {
                    let fine = days - 15;
                    if (CurrentUser.walletBalance > fine) {
                        CurrentUser.walletBalance -= fine;
                        bookList.forEach(book => {
                            if (book.bookID == borrow.bookID) {
                                book.bookCount += borrow.borrowBookCount;
                                updateBook(book.bookID, book);
                            }
                        });
                        borrow.paidFineAmount += fine;
                        borrow.status = "Returned";
                        updateBorrow(borrow.borrowID, borrow);
                        updateUser(CurrentUser.userID, CurrentUser);
                        alert("Return Successfully");
                        showReturnBook();
                    }
                    else {
                        alert("Insufficient Balance");
                    }
                }
                else {
                    bookList.forEach(book => {
                        if (book.bookID == borrow.bookID) {
                            book.bookCount += borrow.borrowBookCount;
                            updateBook(book.bookID, book);
                        }
                    });
                    borrow.status = "Returned";
                    updateBorrow(borrow.borrowID, borrow);
                    alert("Return Successfully");
                    showReturnBook();
                }
            }
        });
    });
}
function borrowHistory() {
    return __awaiter(this, void 0, void 0, function* () {
        const borrowList = yield fetchBorrowBooks();
        displayNone();
        document.getElementById('BorrowHistoryButton').style.display = "block";
        document.getElementById('dashBoard').style.display = "block";
        let table = document.querySelector("#BorrowHistoryData tbody");
        table.innerHTML = "";
        let count = 1;
        borrowList.forEach(book => {
            if (book.userID == CurrentUser.userID) {
                const row = document.createElement('tr');
                row.innerHTML = `<td>${count}</td><td>${book.bookID}</td><td>${book.userID}</td><td>${book.borrowedDate.toString().split('T')[0].split('-').reverse().join('/')}</td><td>${book.borrowBookCount}</td><td>${book.status}</td><td>${book.paidFineAmount}</td>`;
                table.appendChild(row);
                count++;
            }
        });
        // fetchOrder();
    });
}
function rechargeAmount() {
    displayNone();
    document.getElementById('dashBoard').style.display = "block";
    document.getElementById('RechargeButton').style.display = "block";
}
function RechargeMessage() {
    return __awaiter(this, void 0, void 0, function* () {
        const userList = yield fetchUsers();
        var flag = true;
        var balance = parseInt(document.getElementById('RechargeAmount').value);
        userList.forEach(user => {
            if (user.userID == CurrentUser.userID) {
                if (balance > 0) {
                    flag = false;
                    user.walletBalance += balance;
                    updateUser(user.userID, user);
                    var message = document.getElementById('amountMessage');
                    message.textContent = "Recharged Successfully";
                    alert("Recharged Success");
                }
            }
        });
        if (flag) {
            alert("Insufficient Balance");
        }
    });
}
function showBalance() {
    return __awaiter(this, void 0, void 0, function* () {
        displayNone();
        document.getElementById('ShowBalanceButton').style.display = "block";
        document.getElementById('dashBoard').style.display = "block";
        const UserList = yield fetchUsers();
        UserList.forEach(user => {
            if (user.userID == CurrentUser.userID) {
                var currentbalance = document.getElementById('showBalance');
                currentbalance.textContent = (user.walletBalance).toString();
            }
        });
    });
}
function SignOut() {
    displayNone();
    document.getElementById('header').style.display = "block";
}
function fetchBooks() {
    return __awaiter(this, void 0, void 0, function* () {
        const apiUrl = 'http://localhost:5282/api/BookDetails';
        const response = yield fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch Books');
        }
        return yield response.json();
    });
}
function fetchBorrowBooks() {
    return __awaiter(this, void 0, void 0, function* () {
        const apiUrl = 'http://localhost:5282/api/BorrowDetails';
        const response = yield fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch BorrowBooks');
        }
        return yield response.json();
    });
}
function fetchUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        const apiUrl = 'http://localhost:5282/api/UserDetails';
        const response = yield fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch Users');
        }
        return yield response.json();
    });
}
function addUser(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('http://localhost:5282/api/UserDetails', {
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
function addBorrow(borrow) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('http://localhost:5282/api/BorrowDetails', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(borrow)
        });
        if (!response.ok) {
            throw new Error('Failed to add contact');
        }
    });
}
function updateUser(id, user) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5282/api/UserDetails/${id}`, {
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
function updateBook(id, user) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5282/api/BookDetails/${id}`, {
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
function updateBorrow(id, borrow) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5282/api/BorrowDetails/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(borrow)
        });
        if (!response.ok) {
            throw new Error('Failed to update contact');
        }
    });
}
