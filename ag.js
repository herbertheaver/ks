var now = new Date();
var rawtime = now.toString();
var localtime = now.toLocaleString();
var utctime = now.toGMTString();
var isotime = now.toISOString();           // ISOString is UTC
var isodate = isotime.substring(0, 10);    // ISOString is UTC
var isoHHMM = isotime.substring(11, 16);   // ISOString is UTC
var currentYear = new Date().getFullYear();
var revised = new Date(2017,  4, 2);       // Revision date, as 4-digit year, month 0-11, date

function pad(n) {
    return (n < 10) ? ("0" + n) : n;
}

//  This was snagged from https://stackoverflow.com/questions/4822852/how-to-get-the-day-of-week-and-the-month-of-the-year
//  Additional formats by RGS
//  When setting date variables, use either of these formats...
//      var my_date=new Date("October 12, 1988")  // but language may be an issue
//      var my_date=new Date(1988,9,27)           // month is 0-11 so 9 is October
(function() {
    var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

    var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];

    var mnthAbrv = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

    Date.prototype.getMonthName = function() {
        return months[ this.getMonth() ];
    };
    Date.prototype.getDayName = function() {
        return days[ this.getDay() ];
    };
	Date.prototype.printISOdate = function() {   // print local ISO date only - YYYY-MM-DD
	//  The pad function must be defined before this function
	f_DateAsNumber  = pad(this.getDate());          //  getDate    returns 1-31
	f_monthAsNumber = pad((this.getMonth()) + 1);   //  getMonth returns 0-11, but we need 01-12
	f_fullyear      = this.getFullYear();           //  get four-digit year
	return f_fullyear + "-" + f_monthAsNumber + "-" + f_DateAsNumber;
    };
	Date.prototype.print24hrTime = function() {     //  print local HH:mm only
	//  The pad function must be defined before this function
	f_HoursAsNumber   = pad(this.getHours());       //  getHours   returns 00-23
    f_MinutesAsNumber = pad(this.getMinutes());     //  getMinutes returns 00-59
	return f_HoursAsNumber + ":" + f_MinutesAsNumber + " local";
    };
	Date.prototype.printISOdateTime = function() {   // print local ISO date and time - YYYY-MM-DD HH:mm
	//  The pad function must be defined before this function
    f_MinutesAsNumber = pad(this.getMinutes());     //  getMinutes returns 00-59
	f_HoursAsNumber   = pad(this.getHours());       //  getHours   returns 00-23
	f_DateAsNumber  = pad(this.getDate());          //  getDate    returns 1-31
	f_monthAsNumber = pad((this.getMonth()) + 1);   //  getMonth returns 0-11, but we need 01-12
	f_fullyear      = this.getFullYear();           //  get four-digit year
	return f_fullyear + "-" + f_monthAsNumber + "-" + f_DateAsNumber + " " + f_HoursAsNumber + ":" + f_MinutesAsNumber + " local";
    };
	Date.prototype.print24hrTimeUTC = function() {     //  print UTC HH:mm only
	//  The pad function must be defined before this function
	f_HoursAsNumber   = pad(this.getUTCHours());    //  getHours   returns 00-23
    f_MinutesAsNumber = pad(this.getUTCMinutes());  //  getMinutes returns 00-59
	return f_HoursAsNumber + ":" + f_MinutesAsNumber + " UTC";
    };
	Date.prototype.printISOdateTimeUTC = function() {   // print UTC ISO date and time - YYYY-MM-DD HH:mm
	//  The pad function must be defined before this function
    f_MinutesAsNumber = pad(this.getUTCMinutes());     //  getMinutes returns 00-59
	f_HoursAsNumber   = pad(this.getUTCHours());       //  getHours   returns 00-23
	f_DateAsNumber  = pad(this.getUTCDate());          //  getDate    returns 1-31
	f_monthAsNumber = pad((this.getUTCMonth()) + 1);   //  getMonth returns 0-11, but we need 01-12
	f_fullyear      = this.getUTCFullYear();           //  get four-digit year
	return f_fullyear + "-" + f_monthAsNumber + "-" + f_DateAsNumber + " " + f_HoursAsNumber + ":" + f_MinutesAsNumber + " UTC";
    };
	Date.prototype.printFriendlyDate = function() {   // print local date and time - Day, d Month YYYY
	//  The pad function must be defined before this function
    f_DayAsName     = days[ this.getDay() ];
    f_MonthAsName   = months[ this.getMonth() ];
	f_DateAsNumber  = this.getDate();               //  getDate    returns 1-31
	f_fullyear      = this.getFullYear();           //  get four-digit year
	return f_DayAsName + ", " + f_DateAsNumber + " " + f_MonthAsName + " " + f_fullyear;
    };
	Date.prototype.printFriendlyShortDate = function() {   // print local date and time - d Mon YYYY
	//  The pad function must be defined before this function
    f_MonthAsAbrv   = mnthAbrv[ this.getMonth() ];
	f_DateAsNumber  = this.getDate();               //  getDate    returns 1-31
	f_fullyear      = this.getFullYear();           //  get four-digit year
	return f_DateAsNumber + " " + f_MonthAsAbrv + " " + f_fullyear;
    };
})();

var oneDay = 24*60*60*1000;  // hours*minutes*seconds*milliseconds
function days_from_now(d) {   // d must be a date variable
	//  this function assumes that the now variable has been set
	return Math.round(Math.abs((now.getTime() - d.getTime())/(oneDay)));
}

function WriteDaysTillX(d) {   // d must be a date variable
	//  this function assumes that the now variable has been set
	var f_dayCount = Math.trunc(Math.abs((now.getTime() - d.getTime())/(oneDay)));
	//return(f_dayCount);
	if (now.getTime() > d.getTime()) {
		if (f_dayCount > 1) {return(f_dayCount + " days ago");}
		else if (f_dayCount == 1) {return("yesterday");}
		else if (f_dayCount == 0) {return("today");}
        else {return("oops, not tracking correctly #1");}
	} else if (now.getTime() < d.getTime()) {
		if (f_dayCount > 1) {return(f_dayCount + " days from now");}
		else if (f_dayCount == 1) {return("tomorrow");}
		else if (f_dayCount == 0) {return("today");}
        else {return("oops, not tracking correctly #2");}
	} else {return("oops, not tracking correctly #3");}
	//  This is for testing
	//document.writeln("oops, not tracking correctly");
}
