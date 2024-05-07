let NewUserNameStatus = false;
let NewUserMailStatus = false;
let NewUserPasswordStatus = false;
let NewUserConfirmPasswordStatus = false;
let NewUserPhoneStatus = false;

let OrderIdAutoIncrement = 1000;
// let MedicineIdAutoIncrement = 10;


let CurrentUserEmail = "";
let CurrentUserPassword = "";
let CurrentUser: UserDetails;




//UserDetails Class

interface UserDetails {
    userID:any;
    userName: string;
    userEmail: string;
    userPassword: string;
    userPhoneNumber: string
    walletBalance: number

}

interface MedicineDetails {
    medicineID: any;
    medicineName: string;
    medicineCount: number;
    medicinePrice: number;
    dateOfExpiry: string
}

interface OrderDetails {

    orderID: any;
    userEmail: string;
    medicineName: string;
    medicineCount: number;
    totalPrice: number;
    orderDate: string;
    orderStatus: string;



}





//newUserPage
function newUserPage(): void {
    let signin = document.getElementById('existingUserPage') as HTMLDivElement;
    let signup = document.getElementById('newUserPage') as HTMLDivElement;
    signup.style.display = "block";
    signin.style.display = "none";
}

let UserEmail = "";
function checkNewUserEmail(paramNewUserEmail: string): void {
    let newUserMail = (document.getElementById(paramNewUserEmail) as HTMLInputElement).value;
    let newUserMailMessage = document.getElementById(paramNewUserEmail + "Message") as HTMLSpanElement;
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
function checkNewUserName(paramNewUserName: string): void {
    let newUserName = (document.getElementById(paramNewUserName) as HTMLInputElement).value;
    let newUserNameMessage = document.getElementById(paramNewUserName + "Message") as HTMLSpanElement;
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
function checkNewUserPassword(paramNewUserPassword: string): void {
    let newUserPassword = (document.getElementById(paramNewUserPassword) as HTMLInputElement).value;
    let newUserPasswordMessage = document.getElementById(paramNewUserPassword + "Message") as HTMLSpanElement;
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

function checkNewUserConfirmPassword(paramNewUserConfirmPassword: string): void {
    let newUserConfirmPassword = (document.getElementById(paramNewUserConfirmPassword) as HTMLInputElement).value;
    let newUserConfirmPasswordMessage = document.getElementById(paramNewUserConfirmPassword + "Message") as HTMLSpanElement;


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
function checkNewUserPhone(paramNewUserPhone: string): void {
    let newUserPhone = (document.getElementById(paramNewUserPhone) as HTMLInputElement).value;
    let newUserPhoneMessage = document.getElementById(paramNewUserPhone + "Message") as HTMLSpanElement;
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
       
        //UserArrayList.push(new UserDetails(UserName, UserEmail, UserPassword, UserPhone));
   
        const User:UserDetails = 
        {
            userID:undefined,
            userName:UserName,
            userEmail:UserEmail,
            userPassword:UserPassword,
            userPhoneNumber:UserPassword,
            walletBalance:0
          
        };
        addUser(User);
        let homepage = document.getElementById('homePage') as HTMLDivElement;
        let newUserPage = document.getElementById('newUserPage') as HTMLDivElement;
        homepage.style.display = "block";
        newUserPage.style.display = "none";
        alert("Account Created Successfully");
    }
}

function existingUserPage(): void {
    let signin = document.getElementById('existingUserPage') as HTMLDivElement;
    let signup = document.getElementById('newUserPage') as HTMLDivElement;
    signup.style.display = "none";
    signin.style.display = "block";

}

function checkExistUserEmail(paramExitUserEmail: string): void {
    let ExistUserMail = (document.getElementById(paramExitUserEmail) as HTMLInputElement).value;
    let ExistUserMailMessage = document.getElementById(paramExitUserEmail + "Message") as HTMLSpanElement;
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

function checkExistUserPassword(paramExistUserPassword: string): void {
    let ExistUserPassword = (document.getElementById(paramExistUserPassword) as HTMLInputElement).value;
    let ExistUserPasswordMessage = document.getElementById(paramExistUserPassword + "Message") as HTMLSpanElement;
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
async function SignIn() {
    var noExistingUserIdChecker: boolean = false;
    const user = await fetchUser();

    for (let i = 0; i < user.length; i++) {
        if (user[i].userEmail == CurrentUserEmail && user[i].userPassword == CurrentUserPassword) {
            CurrentUserName = user[i].userName
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
}
function DashBoard() {
    let homepage = document.getElementById('homePage') as HTMLDivElement;
    let newUserPage = document.getElementById('newUserPage') as HTMLDivElement;
    let ExistUser = document.getElementById('existingUserPage') as HTMLDivElement;
    let DashBoard = document.getElementById('dashBoard') as HTMLDivElement;
   
    homepage.style.display = "none";
    newUserPage.style.display = "none";
    ExistUser.style.display = "none";
    DashBoard.style.display = "block";
    HomeMenu();
}

function HomeMenu() {
    let DashBoard = document.getElementById('dashBoard') as HTMLDivElement;
    let HomeMenu = document.getElementById('HomeButton') as HTMLDivElement;
    let TopupMenu = document.getElementById('TopupButton') as HTMLDivElement;
    let medicineMenu = document.getElementById('MedicineButton') as HTMLDivElement;
    let MedicineButtonAdd = document.getElementById('MedicineButtonAdd') as HTMLDivElement;
    let CancelMenu = document.getElementById('cancelButton') as HTMLDivElement;
    let PurchaseMenu = document.getElementById('PurchaseButton') as HTMLDivElement;
    let CountMenu = document.getElementById('CountButton') as HTMLDivElement;

    CountMenu.style.display = "none";
    PurchaseMenu.style.display = "none";
    CancelMenu.style.display = "none";
    MedicineButtonAdd.style.display = "none";
    medicineMenu.style.display = "none";
    TopupMenu.style.display = "none";
    DashBoard.style.display = "block";
    HomeMenu.style.display = "block";
    let user = document.getElementById('CurrentUserName') as HTMLSpanElement;
    user.textContent = CurrentUserName;

}



 async function ShowBalance() {
    let DashBoard = document.getElementById('dashBoard') as HTMLDivElement;
    let HomeMenu = document.getElementById('HomeButton') as HTMLDivElement;
    let MedicineMenu = document.getElementById('MedicineButton') as HTMLDivElement;
    let TopupMenu = document.getElementById('TopupButton') as HTMLDivElement;
    let ShowBalanceMenu = document.getElementById('ShowBalnceButton') as HTMLDivElement;
    let OrderMenu = document.getElementById('OrderButton') as HTMLDivElement;
    let MedicineButtonAdd = document.getElementById('MedicineButtonAdd') as HTMLDivElement;
    let CancelMenu = document.getElementById('cancelButton') as HTMLDivElement;
    let PurchaseMenu = document.getElementById('PurchaseButton') as HTMLDivElement;
    let CountMenu = document.getElementById('CountButton') as HTMLDivElement;

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

      const UserArrayList = await fetchUser();
    for (let i = 0; i < UserArrayList.length; i++) {
        if (UserArrayList[i].userEmail == CurrentUserEmail) {

            var currentbalance = document.getElementById('balance') as HTMLSpanElement;
            currentbalance.textContent = (UserArrayList[i].walletBalance).toString();
        }
    }
}

function RechargeAmount() {


    let DashBoard = document.getElementById('dashBoard') as HTMLDivElement;
    let HomeMenu = document.getElementById('HomeButton') as HTMLDivElement;
    let MedicineMenu = document.getElementById('MedicineButton') as HTMLDivElement;
    let TopupMenu = document.getElementById('TopupButton') as HTMLDivElement;
    let ShowBalanceMenu = document.getElementById('ShowBalnceButton') as HTMLDivElement;
    let OrderMenu = document.getElementById('OrderButton') as HTMLDivElement;
    let MedicineButtonAdd = document.getElementById('MedicineButtonAdd') as HTMLDivElement;
    let CancelMenu = document.getElementById('cancelButton') as HTMLDivElement;
    let PurchaseMenu = document.getElementById('PurchaseButton') as HTMLDivElement;
    let CountMenu = document.getElementById('CountButton') as HTMLDivElement;

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
async function RechargeMessage() {
    const UserArrayList = await fetchUser();
    var rechargeAmount = parseInt((document.getElementById('RechargeAmount') as HTMLInputElement).value);
    for (let i = 0; i < UserArrayList.length; i++) {
        if (UserArrayList[i].userEmail == CurrentUserEmail) {

            if (rechargeAmount > 0) {
                UserArrayList[i].walletBalance+=rechargeAmount;
                alert(UserArrayList[i].walletBalance+ " Recharged");
                var content = document.getElementById('amountMessage') as HTMLSpanElement
                updateUser(UserArrayList[i].userID,UserArrayList[i])
                content.textContent = "Recharged Successfully";

            }
            else {
                alert("Unable to  Recharge");
            }


        }
    }

}

async function PurchaseItem() {
    let DashBoard = document.getElementById('dashBoard') as HTMLDivElement;
    let TopupMenu = document.getElementById('TopupButton') as HTMLDivElement;
    let OrderMenu = document.getElementById('OrderButton') as HTMLDivElement;
    let ShowBalanceMenu = document.getElementById('ShowBalnceButton') as HTMLDivElement;
    let HomeMenu = document.getElementById('HomeButton') as HTMLDivElement;
    let CancelMenu = document.getElementById('cancelButton') as HTMLDivElement;
    let MedicineMenu = document.getElementById('MedicineButton') as HTMLDivElement;
    let PurchaseMenu = document.getElementById('PurchaseButton') as HTMLDivElement;

    PurchaseMenu.style.display = "block";
    MedicineMenu.style.display = "none";
    CancelMenu.style.display = "none";
    HomeMenu.style.display = "none";
    ShowBalanceMenu.style.display = "none";
    DashBoard.style.display = "block";
    OrderMenu.style.display = "none";
    TopupMenu.style.display = "none";

    let table = document.querySelector('#medicineData1 tbody') as HTMLTableSectionElement;
    table.innerHTML = "";

    const Medicine = await fetchMedicine();
    Medicine.forEach(element => {

        const row = document.createElement("tr");
        row.innerHTML = `<td>${element.medicineName}</td><td>${element.medicineCount}</td><td>${element.medicinePrice}</td><td>${element.dateOfExpiry.toString().split('T')[0].split('-').reverse().join('/')}</td> <td>
            <button type="button" onclick="Order('${element.medicineID}')">Buy</button>
          </td>`;
        table.appendChild(row);
        //alert(element.MedicineID);
    });
}
let CurrentMedicineID :number ;

function Order(medicineID: number) {
    let CountMenu = document.getElementById('CountButton') as HTMLDivElement;
    CountMenu.style.display = "block";
    CurrentMedicineID = medicineID;

}

async function PlaceOrder() {
    var quantiy = parseInt((document.getElementById("Count") as HTMLInputElement).value);
    const Medicine = await fetchMedicine();
    const user = await fetchUser();
  
    Medicine.forEach(medicine => {
        if (medicine.medicineID == CurrentMedicineID) {
            if (medicine.medicineCount >= quantiy) {
                var totalprice = medicine.medicinePrice * quantiy;
                user.forEach(user => {
                    if ( user.walletBalance>= totalprice && user.userEmail==CurrentUser.userEmail) {
                        // if (medicine.dateOfExp > new Date()) {
                            user.walletBalance-=totalprice;
                            medicine.medicineCount -= quantiy;
    
                           // OrderList.push(new OrderDetails(CurrentUser.userEmail, medicine.medicineName, quantiy, totalprice, new Date(), "Purshaed"));
                            const order : OrderDetails =
                            {
                                orderID: undefined,
                                userEmail: user.userEmail,
                                medicineName: medicine.medicineName,
                                medicineCount: quantiy,
                                totalPrice: totalprice,
                                orderDate: new Date().toISOString(),
                                orderStatus: "Ordered"
                            }
                            updateUser(user.userID,user);
                            console.log(order);
                            addOrder(order);
                            updateMedicine(medicine.medicineID,medicine);
                             
                            alert("Order Placed Successfully");
                      
    
    
                    }
                });
               


            }
        }

    });
}

async function CancelOrder() {

    const OrderList = await fetchOrder();
    let DashBoard = document.getElementById('dashBoard') as HTMLDivElement;
    let TopupMenu = document.getElementById('TopupButton') as HTMLDivElement;
    let OrderMenu = document.getElementById('OrderButton') as HTMLDivElement;
    let ShowBalanceMenu = document.getElementById('ShowBalnceButton') as HTMLDivElement;
    let HomeMenu = document.getElementById('HomeButton') as HTMLDivElement;
    let CancelMenu = document.getElementById('cancelButton') as HTMLDivElement;
    let MedicineMenu = document.getElementById('MedicineButton') as HTMLDivElement;
    let PurchaseMenu = document.getElementById('PurchaseButton') as HTMLDivElement;
    let CountMenu = document.getElementById('CountButton') as HTMLDivElement;
    let conatiner =  document.getElementById('container') as HTMLDivElement;
    conatiner.style.display="none";
    CountMenu.style.display = "none";
    PurchaseMenu.style.display = "none";
    MedicineMenu.style.display = "none";
    CancelMenu.style.display = "block";
    HomeMenu.style.display = "none";
    ShowBalanceMenu.style.display = "none";
    DashBoard.style.display = "block";
    OrderMenu.style.display = "none";
    TopupMenu.style.display = "none";
    let table = document.querySelector("#OrderData1 tbody") as HTMLTableRowElement;
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
}



async function cancel(orderID: number) {
    const Medicine = await fetchMedicine();
    const OrderList = await fetchOrder();
    const UserArrayList = await fetchUser();

    OrderList.forEach(order => {
        if (order.orderID == orderID) {

           

            Medicine.forEach(medicine => {
                if (medicine.medicineName == order.medicineName) {
                    medicine.medicineCount += order.medicineCount;
                    UserArrayList.forEach(user => {
                        if (user.userEmail == CurrentUserEmail) {
                            order.orderStatus ="Cancelled"; 
                            user.walletBalance +=order.totalPrice;
                            updateUser(user.userID,user);
                             updateOrder(order.orderID,order);

                            alert("Cancelled Successfully");
                        }

                    });

                }


            });

        }

    });

    CancelOrder();
}

async function OrderHistory() {

    const OrderList = await fetchOrder();
    const UserArrayList = await fetchUser();
    let medicineMenu = document.getElementById('MedicineButton') as HTMLDivElement;
    medicineMenu.style.display="none";
    let DashBoard = document.getElementById('dashBoard') as HTMLDivElement;
    let TopupMenu = document.getElementById('TopupButton') as HTMLDivElement;
    let OrderMenu = document.getElementById('OrderButton') as HTMLDivElement;
    let ShowBalanceMenu = document.getElementById('ShowBalnceButton') as HTMLDivElement;
    let HomeMenu = document.getElementById('HomeButton') as HTMLDivElement;
    let CancelMenu = document.getElementById('cancelButton') as HTMLDivElement;
    let PurchaseMenu = document.getElementById('PurchaseButton') as HTMLDivElement;
    let CountMenu = document.getElementById('CountButton') as HTMLDivElement;

    CountMenu.style.display = "none";
    PurchaseMenu.style.display = "none";
    CancelMenu.style.display = "none";
    HomeMenu.style.display = "none";
    ShowBalanceMenu.style.display = "none";
    DashBoard.style.display = "block";
    OrderMenu.style.display = "block";
    TopupMenu.style.display = "none";
    let table = document.querySelector("#OrderData tbody") as HTMLTableRowElement;
    table.innerHTML = "";

    for (let i = 0; i < OrderList.length; i++) {
        if (OrderList[i].userEmail == CurrentUserEmail) {
            const row = document.createElement('tr');
            row.innerHTML = `<td>${OrderList[i].orderID}</td><td>${OrderList[i].medicineName}</td><td>${OrderList[i].medicineCount}</td><td>${OrderList[i].totalPrice}</td><td>${OrderList[i].orderDate.toString().split('T')[0].split('-').reverse().join('/')}</td><td>${OrderList[i].orderStatus}</td>`;
            table.appendChild(row);
        }
    }
    fetchOrder();

}





let editingId: number | null = null;
const form = document.getElementById("form") as HTMLFormElement;


var nameinp = (document.getElementById('medicineName') as HTMLInputElement);
var countinp = (document.getElementById('medicineCount') as HTMLInputElement);

var priceinp = (document.getElementById('medicinePrice') as HTMLInputElement);

var doeinp = (document.getElementById('medicineDateOfEp') as HTMLInputElement);



function Submit() {
   

    const name1 = nameinp.value.trim();
    const count1 = parseInt(countinp.value);
    const price1 = parseInt(priceinp.value);

    var date1= doeinp.value;


   
    if (editingId !== null) {
        const Medicine: MedicineDetails = {
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
        const Medicine: MedicineDetails = {
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



// document.addEventListener('DOMContentLoaded', function () {
//     const form = document.getElementById('contactForm') as HTMLFormElement;
//     renderContacts();
// });



async function renderContacts() {
    let homeMenu = document.getElementById('HomeButton') as HTMLDivElement;
   
    let TopupMenu = document.getElementById('TopupButton') as HTMLDivElement;
    let OrderMenu = document.getElementById('OrderButton') as HTMLDivElement;
    let ShowBalanceMenu = document.getElementById('ShowBalnceButton') as HTMLDivElement;
    let MedicineButtonAdd = document.getElementById('MedicineButtonAdd') as HTMLDivElement;
    let CancelMenu = document.getElementById('cancelButton') as HTMLDivElement;
    let PurchaseMenu = document.getElementById('PurchaseButton') as HTMLDivElement;
    let CountMenu = document.getElementById('CountButton') as HTMLDivElement;

    CountMenu.style.display = "none";
    PurchaseMenu.style.display = "none";
    CancelMenu.style.display = "none";
    MedicineButtonAdd.style.display = "none";
    ShowBalanceMenu.style.display = "none";
    OrderMenu.style.display = "none";
    TopupMenu.style.display = "none";
    homeMenu.style.display = "none";
  
    let medicineMenu = document.getElementById('MedicineButton') as HTMLDivElement;
    medicineMenu.style.display="block";
    try {
        const tableBody = document.getElementById('medicineTableBody') as HTMLTableSectionElement;
        const medicine = await fetchMedicine();
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
    } catch (error) {
        console.error('Error fetching contacts:', error);
    }
}

async function editMedicine(id: number) {
    let homeMenu = document.getElementById('HomeButton') as HTMLDivElement;
   
    let TopupMenu = document.getElementById('TopupButton') as HTMLDivElement;
    let OrderMenu = document.getElementById('OrderButton') as HTMLDivElement;
    let ShowBalanceMenu = document.getElementById('ShowBalnceButton') as HTMLDivElement;
    let MedicineButtonAdd = document.getElementById('MedicineButtonAdd') as HTMLDivElement;
    let CancelMenu = document.getElementById('cancelButton') as HTMLDivElement;
    let PurchaseMenu = document.getElementById('PurchaseButton') as HTMLDivElement;
    let CountMenu = document.getElementById('CountButton') as HTMLDivElement;
    CountMenu.style.display = "none";
    PurchaseMenu.style.display = "none";
    CancelMenu.style.display = "none";
    MedicineButtonAdd.style.display = "block";
    ShowBalanceMenu.style.display = "none";
    OrderMenu.style.display = "none";
    TopupMenu.style.display = "none";
    homeMenu.style.display = "none";

    let medicineMenu = document.getElementById('MedicineButton') as HTMLDivElement;
    medicineMenu.style.display="block";
    
    editingId = id;
    const medicine = await fetchMedicine();
    const med = medicine.find(medicine => medicine.medicineID == id);
    if (med!=null) {
        nameinp.value = med.medicineName;
        countinp.value = med.medicineCount.toString();
        priceinp.value =med.medicinePrice.toString();


        doeinp.value = med.dateOfExpiry.split('T')[0];
    }
}

function add()
{
    let homeMenu = document.getElementById('HomeButton') as HTMLDivElement;

    let TopupMenu = document.getElementById('TopupButton') as HTMLDivElement;
    let OrderMenu = document.getElementById('OrderButton') as HTMLDivElement;
    let ShowBalanceMenu = document.getElementById('ShowBalnceButton') as HTMLDivElement;
    let MedicineButtonAdd = document.getElementById('MedicineButtonAdd') as HTMLDivElement;
    let CancelMenu = document.getElementById('cancelButton') as HTMLDivElement;
    let PurchaseMenu = document.getElementById('PurchaseButton') as HTMLDivElement;
    let CountMenu = document.getElementById('CountButton') as HTMLDivElement;
    CountMenu.style.display = "none";
    PurchaseMenu.style.display = "none";
    CancelMenu.style.display = "none";
    MedicineButtonAdd.style.display = "block";
    ShowBalanceMenu.style.display = "none";
    OrderMenu.style.display = "none";
    TopupMenu.style.display = "none";
    homeMenu.style.display = "none";
  
    let medicineMenu = document.getElementById('MedicineButton') as HTMLDivElement;
    medicineMenu.style.display="block";
   
}


//Add
async function addUser(user: UserDetails): Promise<void> {
    const response = await fetch('http://localhost:5274/api/UserDetails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    });
    if (!response.ok) {
      throw new Error('Failed to add contact');
    }
    //renderContacts();
  }

  async function addMedicine(medicine: MedicineDetails): Promise<void> {
    const response = await fetch('http://localhost:5274/api/MedicineDetails', {
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
}

  async function addOrder(order: OrderDetails): Promise<void> {
    const response = await fetch('http://localhost:5274/api/OrderDetails', {
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
  }


  //Update

  async function updateMedicine(id: number, medicine: MedicineDetails): Promise<void> {
    const response = await fetch(`http://localhost:5274/api/MedicineDetails/${id}`, {
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
}

async function updateUser(id: number, user: UserDetails): Promise<void> {
    const response = await fetch(`http://localhost:5274/api/UserDetails/${id}`, {
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

async function updateOrder(id: number, order: OrderDetails): Promise<void> {
    const response = await fetch(`http://localhost:5274/api/OrderDetails/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(order)
    });
    if (!response.ok) {
        throw new Error('Failed to update contact');
    }
   // renderContacts();
}


//Delete
async function deleteMedicine(id: number): Promise<void> {
    const response = await fetch(`http://localhost:5274/api/MedicineDetails/${id}`, {
        method: 'DELETE'
    });
    if (!response.ok) {
        throw new Error('Failed to delete contact');
    }
    renderContacts();
}

//Fetch

async function fetchMedicine(): Promise<MedicineDetails[]> {
    const apiUrl = 'http://localhost:5274/api/MedicineDetails';
    const response = await fetch(apiUrl);
    if (!response.ok) {
        throw new Error('Failed to fetch contacts');
    }
    return await response.json();
   
}

async function fetchUser(): Promise<UserDetails[]> {
    const apiUrl = 'http://localhost:5274/api/UserDetails';
    const response = await fetch(apiUrl);
    if (!response.ok) {
        throw new Error('Failed to fetch contacts');
    }
    return await response.json();
}

async function fetchOrder(): Promise<OrderDetails[]> {
    const apiUrl = 'http://localhost:5274/api/OrderDetails';
    const response = await fetch(apiUrl);
    if (!response.ok) {
        throw new Error('Failed to fetch contacts');
    }
    return await response.json();
}

function SignOut()
{
 
    let homeMenu = document.getElementById('HomeButton') as HTMLDivElement;
 
    let TopupMenu = document.getElementById('TopupButton') as HTMLDivElement;
    let OrderMenu = document.getElementById('OrderButton') as HTMLDivElement;
    let ShowBalanceMenu = document.getElementById('ShowBalnceButton') as HTMLDivElement;
    let MedicineButtonAdd = document.getElementById('MedicineButtonAdd') as HTMLDivElement;
    let CancelMenu = document.getElementById('cancelButton') as HTMLDivElement;
    let PurchaseMenu = document.getElementById('PurchaseButton') as HTMLDivElement;
    let CountMenu = document.getElementById('CountButton') as HTMLDivElement;
    CountMenu.style.display = "none";
    PurchaseMenu.style.display = "none";
    CancelMenu.style.display = "none";
    MedicineButtonAdd.style.display = "none";
    ShowBalanceMenu.style.display = "none";
    OrderMenu.style.display = "none";
    TopupMenu.style.display = "none";
    homeMenu.style.display = "none";
    let medicineMenu = document.getElementById('MedicineButton') as HTMLDivElement;
    medicineMenu.style.display="none";
    let SignOutMenu = document.getElementById('homePage') as HTMLDivElement;
    SignOutMenu.style.display="block";
    let DashBoard = document.getElementById('dashBoard') as HTMLDivElement;
    DashBoard.style.display="none";



}