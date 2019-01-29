// function AccountBook() {
//   this.accounts = [],
//   this.currentId = 0
// }
//
// AccountBook.prototype.addContact = function(account) {
//   account.id = this.assignId();
//   this.accounts.push(account);
// }
//
// AccountBook.prototype.assignId = function() {
//   this.currentId += 1;
//   return this.currentId;
// }
//
// AccountBook.prototype.findContact = function(id) {
//   for (var i=0; i< this.accounts.length; i++) {
//     if (this.accounts[i]) {
//       if (this.accounts[i].id == id) {
//         return this.accounts[i];
//       }
//     }
//   };
//   return false;
// }
//
// AccountBook.prototype.deleteContact = function(id) {
//   for (var i=0; i< this.accounts.length; i++) {
//     if (this.accounts[i]) {
//       if (this.accounts[i].id == id) {
//         delete this.accounts[i];
//         return true;
//       }
//     }
//   };
//   return false;
// }

function BankAccount (name, initialDeposit) {
  this.name = name;
  this.total = initialDeposit;
}


BankAccount.prototype.deposit = function (newDeposit) {
  this.total += newDeposit;
};

BankAccount.prototype.withdraw = function (newWithdrawal) {
  this.total -= newWithdrawal;
};

BankAccount.prototype.depositWithdraw = function (deposit, withdraw) {

  if(isNaN(deposit)) { // can also write it this way (deposit !== NaN)
    this.withdraw(withdraw);
  } else if (isNaN(withdraw)) {
    this.deposit(deposit);
  }
};

$(document).ready(function () {
  var account = new BankAccount('none', 0);
  $("#formRegister").submit(function (event) {
    event.preventDefault();
    let newName = $('#new-name').val();
    let initialDeposit = parseFloat($('#initialDeposit').val());
    $('#new-name').val("");
    $('#initialDeposit').val("");

    account = new BankAccount(newName, initialDeposit);
    $("#accountName").text(account.name);
    $("#result").text("$ " + account.total);
  });


  $("#formDeposit").submit(function (event) {
    event.preventDefault();
    let deposit = parseFloat($('#deposit').val());
    let withdraw = parseFloat($('#withdrawal').val());
    $('#deposit').val("");
    $('#withdrawal').val("");
    account.depositWithdraw(deposit, withdraw);
    console.log(account);
    $("#accountName").text(account.name);
    $("#result").text("$ " + account.total);


  });
});
