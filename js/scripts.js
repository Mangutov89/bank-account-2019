function AccountBook() {
  this.accounts = [],
  this.currentId = 0
}

AccountBook.prototype.addAccount = function(account) {
  account.id = this.assignId();
  this.accounts.push(account);
}

AccountBook.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
}

AccountBook.prototype.findContact = function(id) {
  for (var i=0; i< this.accounts.length; i++) {
    if (this.accounts[i]) {
      if (this.accounts[i].id == id) {
        return this.accounts[i];
      }
    }
  };
  return false;
}

AccountBook.prototype.deleteContact = function(id) {
  for (var i=0; i< this.accounts.length; i++) {
    if (this.accounts[i]) {
      if (this.accounts[i].id == id) {
        delete this.accounts[i];
        return true;
      }
    }
  };
  return false;
}

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
  if(isNaN(deposit)) { // can also write it by converting to a string then (deposit === "NaN")
    this.withdraw(withdraw);
  } else if (isNaN(withdraw)) {
    this.deposit(deposit);
  }
};

var newAccounts = new AccountBook();

function displayAccountDetails(accountsToDisplay) {
  var accountsList = $("ul#accountList");
  var htmlForAccountInfo = "";
  accountsToDisplay.accounts.forEach(function(account) {
    htmlForAccountInfo += "<li id=" + account.id + ">" + account.name  + "</li>";
  });
  accountsList.html(htmlForAccountInfo);
};

function attachContactListeners() {
  $("accountName").on("click", function() {
    // console.log("The id of this <li> is " + this.id + ".");
    showContact(this.id);     // <--- This is new!
  });
}

function showContact(contactId) {
  var contact = newAccounts.findContact(contactId);
  $("#accountName").show();
  $(".name").html(account.name);
  $(".balance").html(account.total);
  var buttons = $("#buttons");
  buttons.empty();
  buttons.append("<button class='deleteButton' id=" + account.id + ">Delete</button>");
};


$(document).ready(function () {
  attachContactListeners();
  var account = new BankAccount('none', 0);
  $("#formRegister").submit(function (event) {
    event.preventDefault();
    let newName = $('#new-name').val();
    let initialDeposit = parseFloat($('#initialDeposit').val());
    $('#new-name').val("");
    $('#initialDeposit').val("");

    account = new BankAccount(newName, initialDeposit);
    $("#accountList").text(account.name);
    $("#result").text("$ " + account.total);

    newAccounts.addAccount(account);

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
