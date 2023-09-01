/* Your Code Here */
function createEmployeeRecord(recordInfo){
    const recordObj = {
        firstName: recordInfo[0],
        familyName: recordInfo[1],
        title: recordInfo[2],
        payPerHour: recordInfo[3],
        timeInEvents: [],
        timeOutEvents: []
    };
    return recordObj;
}
function createEmployeeRecords(recordsArray){
    const recordsObj = [];
    for(const record of recordsArray){
        recordsObj.push(createEmployeeRecord(record))
    }
    return recordsObj;
}
function createTimeInEvent(date){
    const dateSplit = date.split(" ")
    this.timeInEvents.push({
        type:"TimeIn",
        hour: Number(dateSplit[1]),
        date: dateSplit[0]
    })
    return this;
}
function createTimeOutEvent(date){
    const dateSplit = date.split(" ")
    this.timeOutEvents.push({
        type:"TimeOut",
        hour: Number(dateSplit[1]),
        date: dateSplit[0]
    })
    return this;
}
function hoursWorkedOnDate(date){
    const timeInIndex = this.timeInEvents.findIndex(event => event.date === date);
    const timeOutIndex = this.timeOutEvents.findIndex(event => event.date === date);
    return (this.timeOutEvents[timeOutIndex].hour - this.timeInEvents[timeInIndex].hour)/100
}
function wagesEarnedOnDate(date){
    return hoursWorkedOnDate.call(this,date) * this.payPerHour
}
function findEmployeeByFirstName(srcArray,firstName){
    const recordIndex = srcArray.findIndex(record => record.firstName === firstName)
    return srcArray[recordIndex]
}
function calculatePayroll(recordsArray){
    let total = 0;
    for(const record of recordsArray){
        total += allWagesFor.call(record);
    }
    return total;
}
/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

