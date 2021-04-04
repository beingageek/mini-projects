var myYearlySpending = {};
var cardList = [];
var yearsToRun = 10;

function setNewCard(cardName, milesOrPointsPercentage, welcomeBonus, annualFee, annualSpending) {
    var newCard = {};
    newCard.cardName = cardName;
    newCard.milesOrPointsPercentage = milesOrPointsPercentage;
    newCard.welcomeBonus = welcomeBonus;
    newCard.annualFee = annualFee;
    newCard.annualSpending = annualSpending;
    newCard.yearlyBenefit = [];
    newCard.annualPointsEarned = getTotalPointsEarned(milesOrPointsPercentage, annualSpending)/100 - newCard.annualFee;
    return newCard;
}

function setCategoryValues(travel, dining, gas, groceries, others) {
    var newCat = {};
    newCat.travel = travel;
    newCat.dining = dining;
    newCat.gas = gas;
    newCat.groceries = groceries;
    newCat.others = others;
    return newCat;
}

function setCategoryValuesAll(val) {
    return setCategoryValues(val, val, val, val, val);
}

function setExtraBenefits(yearNum, value) {
    var newBen = {};
    newBen.yearNum = yearNum;
    newBen.value = value;
    return newBen;
}

function getTotalPointsEarned(points, spending) {
    return (points.travel*spending.travel + points.dining*spending.dining + points.gas*spending.gas + 
        points.groceries*spending.groceries + points.others*spending.others);
}

function createMyYearlySpending() {
    myYearlySpending = setCategoryValues(3000, 1440, 200, 6000, 5300);	
}

function updateSpending() {
    var travelVal = document.getElementsByName("travel")[0].value;
    var diningVal = document.getElementsByName("dining")[0].value;
    var gasVal = document.getElementsByName("gas")[0].value;
    var groceriesVal = document.getElementsByName("groceries")[0].value;
    var otherVal = document.getElementsByName("others")[0].value;
    myYearlySpending = setCategoryValues(travelVal, diningVal, gasVal, groceriesVal, otherVal);
    document.getElementById("spending_form").style.display = "none";
}

function addCardToList(newCard) {
    var existingIndex = null;
    if (cardList.length != 0) {
        for (i=0; i<cardList.length; i++) {
            if (newCard.cardName== cardList[i].cardName) {
                existingIndex = i;
                break;
            }
        }
    }    
    if (existingIndex != null)
        cardList.splice(existingIndex, 1);
    cardList.push(newCard);
}

function addCards() {
    // createMyYearlySpending();
    var points = setCategoryValuesAll(1.5);
    var capOneQuicksilver = setNewCard("Quicksilver® from Capital One®", points, 150.0, 0.0, myYearlySpending);
    addCardToList(capOneQuicksilver);

    points = setCategoryValuesAll(1.5);
    var capOneQuicksilver2 = setNewCard("Quicksilver® from Capital One® \$200", points, 200.0, 0.0, myYearlySpending);
    addCardToList(capOneQuicksilver2);
    
    points = setCategoryValuesAll(2.0);
    var capOneVenture = setNewCard("Venture® from Capital One® - travel redeem", points, 500, 95, myYearlySpending);
    var ben = setExtraBenefits(1, 95);
    capOneVenture.yearlyBenefit.push(ben);
    addCardToList(capOneVenture);
    
    points = setCategoryValuesAll(1.25);
    var capOneVentureOne = setNewCard("VentureOne® from Capital One®", points, 200, 0, myYearlySpending);
    addCardToList(capOneVentureOne);
    
    points = setCategoryValues(1.0, 4.0, 1.0, 2.0, 1.0)
    var capOneSavor = setNewCard("Savor® Rewards from Capital One®", points, 500, 95, myYearlySpending);
    capOneSavor.yearlyBenefit.push(ben);
    addCardToList(capOneSavor);
    
    points = setCategoryValues(1.0, 3.0, 1.0, 2.0, 1.0)
    var capOneSavorOne = setNewCard("SavorOne Rewards from Capital One®", points, 150, 0, myYearlySpending);
    addCardToList(capOneSavorOne);
    
    points = setCategoryValues(3.0, 2.0, 3.0, 1.0, 1.0)
    var citiThankYouPremier = setNewCard("Citi ThankYou® Premier Card - redeem for airfare 1.25", points, 600, 95, myYearlySpending);
    addCardToList(citiThankYouPremier);
    
    /*
    points = setCategoryValuesAll(2.1);
    var barclayPlus = setNewCard("Barclaycard Arrival® Plus World Elite Mastercard® - airfare", points, 600, 89, myYearlySpending);
    addCardToList(barclayPlus);
    */

    /*
    points = setCategoryValuesAll(1.05);
    var barclayPlusCash = setNewCard("Barclaycard Arrival® Plus World Elite Mastercard® - cash redeem", points, 300, 89, myYearlySpending);
    addCardToList(barclayPlusCash);
    */
    
    /*
    points = setCategoryValuesAll(2.0);
    var barclayPremier = setNewCard("Barclays Arrival® Premier World Elite Mastercard® - airfare", points, 0, 150, myYearlySpending);
    for (i=0; i<10; i++) {
        var beni = setExtraBenefits((i+1), 150);
        if (i==0)
            beni.value = beni.value + 150;
//			if (i == 0 || i == 4 || i == 9)
//				beni.value = beni.value + 100;
        barclayPremier.yearlyBenefit.push(beni);
    }
    addCardToList(barclayPremier);
    */
    
    /*
    points = setCategoryValuesAll(1.0);
    var barclayPremierCash = setNewCard("Barclays Arrival® Premier World Elite Mastercard® - cash redeem", points, 0, 150, myYearlySpending);
    for (i=0; i<10; i++) {
        var beni = setExtraBenefits((i+1), 75);
        if (i==0)
            beni.value = beni.value + 150;
//			if (i == 0 || i == 4 || i == 9)
//				beni.value = beni.value + 100;
        barclayPremierCash.yearlyBenefit.push(beni);
    }
    addCardToList(barclayPremierCash);
    */

    points = setCategoryValues(2, 2, 1, 1, 1);
    var chasePreferred = setNewCard("Chase Sapphire Preferred® credit card", points, 500, 95, myYearlySpending);
    ben = setExtraBenefits(1, 95);
    chasePreferred.yearlyBenefit.push(ben);
    addCardToList(chasePreferred);

    points = setCategoryValues(2.5, 2.5, 1.25, 1.25, 1.25);
    var chasePreferredTravel = setNewCard("Chase Sapphire Preferred® credit card - travel redeem", points, 625, 95, myYearlySpending);
    ben = setExtraBenefits(1, 95);
    chasePreferredTravel.yearlyBenefit.push(ben);
    addCardToList(chasePreferredTravel);

    /*
    points = setCategoryValues(3, 3, 1, 1, 1);
    var chaseReserved = setNewCard("Chase Sapphire Reserve®", points, 500, 150, myYearlySpending);
    addCardToList(chaseReserved);
    */

    /*
    points = setCategoryValues(4.5, 4.5, 1.5, 1.5, 1.5);
    var chaseReservedTravel = setNewCard("Chase Sapphire Reserve® - travel redeem", points, 750, 150, myYearlySpending);
    addCardToList(chaseReservedTravel);
    */

    points = setCategoryValuesAll(1.65);
    var boaTravel = setNewCard("Bank of America® Travel Rewards Credit Card", points, 250, 0, myYearlySpending);
    addCardToList(boaTravel);

    /*
    points = setCategoryValuesAll(2);
    var boaTravel = setNewCard("Paypal Mastercard®", points, 0, 0, myYearlySpending);
    addCardToList(boaTravel);
    */

    /*
    points = setCategoryValues(5, 1, 1, 1, 1);
    var amexPlatinum = setNewCard("Amex The Platinum Card®", points, 600, 550, myYearlySpending);
    addCardToList(amexPlatinum);
    */

    /*
    points = setCategoryValues(3, 4, 1, 1.5, 1)
    var uberVisa = setNewCard("Uber Visa Card", points, 100, 0, myYearlySpending);
    addCardToList(uberVisa);
    */

    /*
    points = setCategoryValues(3, 4, 1, 1, 1)
    var uberVisaAdj = setNewCard("Uber Visa Card - without online", points, 100, 0, myYearlySpending);
    addCardToList(uberVisaAdj);
    */

    /*
    points = setCategoryValues(3, 4, 1, 1.5, 1)
    var uberVisaSub = setNewCard("Uber Visa Card - with yearly subscription", points, 100, -50, myYearlySpending);
    addCardToList(uberVisaSub);
    */

    /*
    points = setCategoryValues(3, 4, 1, 4, 1)
    var amexgoldcard = setNewCard("Amex New Gold Card", points, 500, 150, myYearlySpending);
    addCardToList(amexgoldcard);
    */

    // setCategoryValues(travel, dining, gas, groceries, others)
    points = setCategoryValues(3, 3, 4, 1, 1)
    // setNewCard(cardName, milesOrPointsPercentage, welcomeBonus, annualFee, annualSpending)
    var costcoCard = setNewCard("Costco Anywhere Visa® Card by Citi", points, 0, 0, myYearlySpending);
    addCardToList(costcoCard);

    // setCategoryValues(travel, dining, gas, groceries, others)
    points = setCategoryValues(2, 2, 1.5, 1.5, 1.5)
    // setNewCard(cardName, milesOrPointsPercentage, welcomeBonus, annualFee, annualSpending)
    var boaPremium = setNewCard("Bank of America® Premium Rewards® Credit Card", points, 0, 95, myYearlySpending);
    addCardToList(boaPremium);
}

function printCardList() {
    console.log("Card List:");
    var content = "Card List:<br><table class='pure-table pure-table-striped'><tr><th>Card Name</th><th>Annual Benefits rate</th></tr><tr>";
    for (i=0; i<cardList.length; i++) {
        var oneCard = cardList[i];
        console.log(oneCard.cardName + ", annual benefit=" + oneCard.annualPointsEarned);
        content += "<td>" + oneCard.cardName + ", </td><td>" + oneCard.annualPointsEarned + "</td></tr>";
    }
    // console.log(JSON.stringify(cardList));
    content += "</table><br>";
    document.getElementById("card_list").innerHTML = content;
}

function clearCardListOutput() {
    document.getElementById("card_list").innerHTML = "<br>";
}

function printCardBenefits() {
    var benMap = getAnnualCardBenefits();
    var content = "";
    for (var [key, value] of benMap) {
        // console.log("Benefits for " + key);
        content += "Benefits for <b>" + key + "</b><br>";
        // console.log("Earning by year:");
        content += "Earning by year:<br>";
        // console.log(printEarnings(value));
        content += printEarningsForHtml(value) + "<br>";
        console.log("");
    }
    document.getElementById("card_benefits").innerHTML = content;
}

function clearCardBenefitOutput() {
    document.getElementById("card_benefits").innerHTML = "";
}

function printEarnings(earnings) {
    var yearStr = "", earnStr = "";
    for (i=0; i<earnings.length; i++) {
        yearStr += formatString((i+1)+"");
        earnStr += formatString(earnings[i].toFixed(2)); 
    }
    return yearStr + "\n" + earnStr;
}

function printEarningsForHtml(earnings) {
    var yearStr = "<tr>", earnStr = "<tr>";
    for (i=0; i<earnings.length; i++) {
        yearStr += "<td>" + (i+1) + "</td>";
        earnStr += "<td>" + earnings[i].toFixed(2) + "</td>"; 
    }
    yearStr += "</tr>";
    earnStr += "</tr>";
    return ("<table class='pure-table pure-table-striped'>" + yearStr + earnStr + "</table>");
}

function formatString(str) {
    return ("        " + str).slice(-8);
}

function getAnnualCardBenefits() {
    var benMap = new Map();
    if (cardList.length == 0) {
        console.log("No cards added");
        return benMap;
    }
    for (k=0; k<cardList.length; k++) {
        card = cardList[k];
        var benList = [];
        for (j=1; j<=yearsToRun; j++) {
            var totalEarned = j*card.annualPointsEarned + card.welcomeBonus;
//				for (YearlyBenefit ben : card.yearlyBenefits) {
//					if (i == ben.yearNum)
//						totalEarned = totalEarned + ben.value;
//				}
            var extra = getYearlyBen(card, j);
            var benefitForYear = (totalEarned+extra);
            benList.push(benefitForYear);
        }
        benMap.set(card.cardName, benList);
        // console.log("k=" + k + ", benMap.size=" + benMap.size);
    }
    return benMap;
}

function getYearlyBen(card, year) {
    var value = 0;
    for (i=0; i<card.yearlyBenefit.length; i++) {
        var ben = card.yearlyBenefit[i];
        if (ben.yearNum <= year)
            value += ben.value;
    }
    return value;
}

function openSpendingForm() {
    document.getElementById("spending_form").style.display = "inline-block";
}
