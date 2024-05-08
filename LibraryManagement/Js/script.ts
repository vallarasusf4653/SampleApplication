var CurrentUser: UserDetails;


interface UserDetails {
    userID: any,
    userName: string,
    userEmail: string,
    password: string,
    gender: string,
    department: string,
    mobileNumber: string,
    walletBalance: number;
}

interface BorrowDetails {
    borrowID: any,
    bookID: number,
    userID: number,
    borrowedDate: string,
    borrowBookCount: number,
    status: string,
    paidFineAmount: number

}

interface BookDetails {
    bookID: any,
    bookName: string,
    authorName: string,
    bookCount: number

}


var newUserName = document.getElementById('username') as HTMLInputElement;
var newUserEmail = document.getElementById('useremail') as HTMLInputElement;
var newUserPassword = document.getElementById('userpassword') as HTMLInputElement;

var newUserGender = document.getElementById('usergender') as HTMLInputElement;
var newUserDepartment = document.getElementById('userdepartment') as HTMLInputElement;
var newUserMobileNumber = document.getElementById('usermobilenumber') as HTMLInputElement;

function NewUser() {
    var signin = (document.getElementById('signin') as HTMLDivElement);
    signin.style.display = "none";
    var signup = (document.getElementById('signup') as HTMLDivElement);
    signup.style.display = "block";
}
function ExistUser() {
    var signin = (document.getElementById('signin') as HTMLDivElement);
    signin.style.display = "block";
    var signup = (document.getElementById('signup') as HTMLDivElement);
    signup.style.display = "none";
}

function SignUp() {
    const user: UserDetails =
    {
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
var CurrentUserEmail = document.getElementById('existemail') as HTMLInputElement;
var CurrentUserPassword = document.getElementById('existpassword') as HTMLInputElement;



async function SignIn() {
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


function dashBoard() {


    (document.getElementById('dashBoard') as HTMLDivElement).style.display = "block";
    (document.getElementById('header') as HTMLDivElement).style.display = "none";
    (document.getElementById('homeButton') as HTMLDivElement).style.display = "block";
    (document.getElementById('signin') as HTMLDivElement).style.display = "none";
    (document.getElementById('signup') as HTMLDivElement).style.display = "none";
    homeMenu();

}


function displayNone() {
    (document.getElementById('dashBoard') as HTMLDivElement).style.display = "none";
    (document.getElementById('header') as HTMLDivElement).style.display = "none";
    (document.getElementById('homeButton') as HTMLDivElement).style.display = "none";
    (document.getElementById('signin') as HTMLDivElement).style.display = "none";
    (document.getElementById('signup') as HTMLDivElement).style.display = "none";
    (document.getElementById('BorrowHistoryButton') as HTMLDivElement).style.display = "none";
    (document.getElementById('ShowBalanceButton') as HTMLDivElement).style.display = "none";
    (document.getElementById('RechargeButton') as HTMLDivElement).style.display = "none";
    (document.getElementById('borrowBookButton') as HTMLDivElement).style.display = "none";
    (document.getElementById('ReturnBookButton') as HTMLDivElement).style.display = "none";



}

function homeMenu() {
    displayNone();
    (document.getElementById('homeButton') as HTMLDivElement).style.display = "block";
    (document.getElementById('dashBoard') as HTMLDivElement).style.display = "block";
    var user = document.getElementById('username') as HTMLSpanElement;
    user.innerHTML = CurrentUser.userName;

}

async function renderBorrowbook() {
    const bookList = await fetchBooks();
    displayNone();

    (document.getElementById('dashBoard') as HTMLDivElement).style.display = "block";
    (document.getElementById('borrowBookButton') as HTMLDivElement).style.display = "block";
    let table = document.querySelector("#BookData tbody") as HTMLTableRowElement;
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
}


async function OrderBook(BorrowbookID: number) {
    displayNone();
    (document.getElementById('dashBoard') as HTMLDivElement).style.display = "block";
    (document.getElementById('borrowBookButton') as HTMLDivElement).style.display = "block";

    let count = prompt("Enter the count");
    let count1: number = Number(count);
    const bookList = await fetchBooks();
    const borrowList = await fetchBorrowBooks();

    if (count1 > 0) {


        var flag = true;
        var flag2 = false;
        bookList.forEach(book => {

            if (book.bookID == BorrowbookID) {
                if (book.bookCount >= count1) {
                    flag = false;
                    let bookcount: number = 0;
                    borrowList.forEach(borrow => {


                        if (CurrentUser.userID == borrow.userID && borrow.status == 'Borrowed') {
                            bookcount += borrow.borrowBookCount;
                        }

                    });


                    if (bookcount + count1 <= 3) {
                        const date = new Date();
                        const newbook: BorrowDetails =
                        {
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
                        renderBorrowbook()
                    }
                    else if (bookcount > 3) {
                        alert("You have borrowed 3 books already")

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

}
async function showReturnBook() {
    const borrowList = await fetchBorrowBooks();
    displayNone();
    (document.getElementById('ReturnBookButton') as HTMLDivElement).style.display = "block";
    (document.getElementById('dashBoard') as HTMLDivElement).style.display = "block";
    let table = document.querySelector("#returnBookData tbody") as HTMLTableRowElement;
    table.innerHTML = "";
    let count: number = 1;
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
}
async function returnBook(bookid: number) {

    const BorrowList = await fetchBorrowBooks();
    const bookList = await fetchBooks();

    BorrowList.forEach(borrow => {

        if (borrow.borrowID == bookid && borrow.status == "Borrowed") {
            var date = borrow.borrowedDate.split('T')[0].split('-').reverse().join('/')
            var date1: string[] = date.split('/');

            var date3: number = new Date(`${date1[2]}-${date1[1]}-${date1[0]}`).getTime();
            var currentDate: number = new Date().getTime();

            var diff: number = Math.abs(currentDate - date3);
            var days: number = Math.round(diff / (1000 * 3600 * 24));

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
}

async function borrowHistory() {
    const borrowList = await fetchBorrowBooks();
    displayNone();
    (document.getElementById('BorrowHistoryButton') as HTMLDivElement).style.display = "block";
    (document.getElementById('dashBoard') as HTMLDivElement).style.display = "block";
    let table = document.querySelector("#BorrowHistoryData tbody") as HTMLTableRowElement;
    table.innerHTML = "";
    let count: number = 1;
    borrowList.forEach(book => {
        if (book.userID == CurrentUser.userID) {
            const row = document.createElement('tr');
            row.innerHTML = `<td>${count}</td><td>${book.bookID}</td><td>${book.userID}</td><td>${book.borrowedDate.toString().split('T')[0].split('-').reverse().join('/')}</td><td>${book.borrowBookCount}</td><td>${book.status}</td><td>${book.paidFineAmount}</td>`;
            table.appendChild(row);
            count++;
        }

    });


    // fetchOrder();


}

function rechargeAmount() {
    displayNone();
    (document.getElementById('dashBoard') as HTMLDivElement).style.display = "block";
    (document.getElementById('RechargeButton') as HTMLDivElement).style.display = "block";

}
async function RechargeMessage() {


    const userList = await fetchUsers();
    var flag: boolean = true;
    var balance = parseInt((document.getElementById('RechargeAmount') as HTMLInputElement).value);
    userList.forEach(user => {
        if (user.userID == CurrentUser.userID) {
            if (balance > 0) {
                flag = false;
                user.walletBalance += balance;
                updateUser(user.userID, user);
                var message = (document.getElementById('amountMessage') as HTMLSpanElement);
                message.textContent = "Recharged Successfully";
                alert("Recharged Success");

            }
        }

    });
    if (flag) {
        alert("Insufficient Balance");
    }
}


async function showBalance() {
    displayNone();
    (document.getElementById('ShowBalanceButton') as HTMLDivElement).style.display = "block";
    (document.getElementById('dashBoard') as HTMLDivElement).style.display = "block";
    const UserList = await fetchUsers();
    UserList.forEach(user => {
        if (user.userID == CurrentUser.userID) {

            var currentbalance = document.getElementById('showBalance') as HTMLSpanElement;
            currentbalance.textContent = (user.walletBalance).toString();
        }
    });
}

function SignOut() {
    displayNone();
    (document.getElementById('header') as HTMLDivElement).style.display = "block";
}




async function fetchBooks(): Promise<BookDetails[]> {
    const apiUrl = 'http://localhost:5282/api/BookDetails';
    const response = await fetch(apiUrl);
    if (!response.ok) {
        throw new Error('Failed to fetch Books');
    }
    return await response.json();
}

async function fetchBorrowBooks(): Promise<BorrowDetails[]> {
    const apiUrl = 'http://localhost:5282/api/BorrowDetails';
    const response = await fetch(apiUrl);
    if (!response.ok) {
        throw new Error('Failed to fetch BorrowBooks');
    }
    return await response.json();
}
async function fetchUsers(): Promise<UserDetails[]> {
    const apiUrl = 'http://localhost:5282/api/UserDetails';
    const response = await fetch(apiUrl);
    if (!response.ok) {
        throw new Error('Failed to fetch Users');
    }
    return await response.json();
}

async function addUser(user: UserDetails): Promise<void> {
    const response = await fetch('http://localhost:5282/api/UserDetails', {
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
async function addBorrow(borrow: BorrowDetails): Promise<void> {
    const response = await fetch('http://localhost:5282/api/BorrowDetails', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(borrow)
    });
    if (!response.ok) {
        throw new Error('Failed to add contact');
    }

}
async function updateUser(id: number, user: UserDetails): Promise<void> {
    const response = await fetch(`http://localhost:5282/api/UserDetails/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });
    if (!response.ok) {
        throw new Error('Failed to update contact');
    }

}
async function updateBook(id: number, user: BookDetails): Promise<void> {
    const response = await fetch(`http://localhost:5282/api/BookDetails/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });
    if (!response.ok) {
        throw new Error('Failed to update contact');
    }


}

async function updateBorrow(id: number, borrow: BorrowDetails): Promise<void> {
    const response = await fetch(`http://localhost:5282/api/BorrowDetails/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(borrow)
    });
    if (!response.ok) {
        throw new Error('Failed to update contact');
    }


}


