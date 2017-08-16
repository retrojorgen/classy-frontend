/**
 * Created by jorjacob on 07/03/17.
 */

/**
 * Checks if a dialog needs to be shown
 */
angular.module('Avisretur').factory('utilsService', ['_', '$filter', function (_, $filter)  {

    var monthsLookup = [
        'Januar', 'Februar', 'Mars', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Desember'
    ];

    var _getCurrentWeek = function(currentDate) {

        var currentWeek = $filter('date')(currentDate, 'ww');
        if(currentDate.getDay() === 0) {
            currentWeek -= 1;
            if(currentWeek <= 0) {
                currentWeek = 52 + currentWeek;
            }
        }

        return currentWeek;
    };

    getCurrentWeekString = function (currentDate) {
        var currentDate = currentDate || new Date();
        var currentWeek = _getCurrentWeek(currentDate);
        return currentDate.getFullYear() + currentWeek;
    };

    getWeekStringWithOffset = function (offset) {
        var currentDate = new Date();
        var currentWeek = _getCurrentWeek(currentDate);

        var newWeek = currentWeek - offset;
        var newYear = currentDate.getFullYear();

        if(newWeek < 1) {
            newWeek = 52 - newWeek;
            newYear -= 1;
        }
        if(newWeek > 52) {
            newWeek = newWeek - 52;
            newYear += 1;
        }
        if(newWeek < 10)
            newWeek = '0' + newWeek;
        return newYear + '' + newWeek;
    };

    getWeekStringsDiff = function (weekString1, weekString2) {
        var weekYear1 = {
            year: parseInt(weekString1.substring(0, 4)),
            week: parseInt(weekString1.substring(4, 6))
        };
        var weekYear2 = {
            year: parseInt(weekString2.substring(0, 4)),
            week: parseInt(weekString2.substring(4, 6))
        };



        var diff = 0;

        var yearDiff = weekYear2.year - weekYear1.year;

        // same year
         if(yearDiff == 0) {
             return weekYear2.week - weekYear1.week;
         }
         // in the past
         if(yearDiff < 0) {
            for (var x = 0; x < yearDiff*-1; x++) {
                if (x + 1 == yearDiff * -1) {
                    diff += 52 - weekYear2.week;
                } else {
                    diff += 52;
                }
            }
            diff += weekYear1.week-1;
         } else {
             for (var x = 0; x < yearDiff; x++) {
                 if (x + 1 == yearDiff) {
                     diff += weekYear2.week;
                 } else {
                     diff += 52;
                 }
             }
             diff += 52 - weekYear1.week;
         }

         return diff;
    };

    getWeekStringOffsetFromWeekString = function (weekString, offset) {
        var year = parseInt(weekString.toString()[0] + weekString.toString()[1] + weekString.toString()[2] + weekString.toString()[3]);
        var week = parseInt(weekString.toString()[4] + weekString.toString()[5]);
        var newWeek = week + offset;
        var newYear = year;

        if(newWeek > 52) {
            newWeek = newWeek - 52;
            newYear += 1;
        }
        if(newWeek < 1) {
            newWeek = 52 - newWeek;
            newYear -= 1;
        }
        if(newWeek < 10) {
            newWeek = '0' + newWeek;
        }
        return newYear + '' + newWeek;
    };


    /**
     * returns object of type
     * {
     *      201604: [],
     *      201605: []
     * }
     *
     * @returns {*}
     */
    getWeeksBackObj = function (numberOfWeeks) {
        var weeks = {};
        for (var x = 0; x++; x<numberOfWeeks) {
            weeks[getWeekStringWithOffset(x)] = [];
        }
        return weeks;
    };


    getDaysOffsetFromDate = function (currentDate, daysBack) {
        var currentDateOffset = currentDate.setDate(currentDate.getDate()+daysBack);
        return new Date(currentDateOffset);
    };

    getYYYYMMDD = function (fromDate) {
        var fullYear = fromDate.getFullYear();
        var month = (fromDate.getMonth() + 1);
        if(month < 10)
            month = '0' + month;
        var day = fromDate.getDate();
        if(day < 10)
            day = '0' + day;


        return fullYear + '-' + month + '-' + day;
    };

    /**
     * Returns array of current year and one year back
     * [
     *      "2017", "2016"
     * ]
     */
    getYearsArray = function () {
        var currentDate = new Date();

        return [
            {
                year: currentDate.getFullYear(),
                yearPretty: "År " + currentDate.getFullYear()
            }, {
                year: (currentDate.getFullYear()-1),
                yearPretty: "År " + (currentDate.getFullYear()-1)
            }
        ]
    };

    getMonthsByOffset = function (offset) {
        var currentDate = new Date();
        var currentMonth = currentDate.getMonth();
        var currentYear = currentDate.getFullYear();
        var months = [];
        for (var x = offset; x > 0; x--) {
            months.push({
                monthNumber: currentMonth,
                monthName: currentYear + ' ' + monthsLookup[currentMonth],
                yearName: currentYear
            });

            if(currentMonth == 0) {
                currentMonth = 11;
                currentYear--;
            } else {
                currentMonth--;
            }

        }
        return months;
    };


    /**
     * Returns array of weeks available in a year, including current week
     * [
     *      "1", "2", "3"
     * ]
     */

    getWeeksInYear = function (year) {
        var weekCount = 52;
        var weeksArray = [];
        var currentDate = new Date();
        var currentWeek = _getCurrentWeek(currentDate);
        if(year.year === currentDate.getFullYear())
            weekCount = currentWeek;

        for(var x = 1; x<=weekCount; x++) {
            weeksArray.push({
                week: x,
                weekPretty: "Uke " + x
            });
        }
        return weeksArray.reverse();
    };

    /**
     * returns array of type
     * [
     *  {
     *      SalesWeek: "201701",
     *      WeekPretty: "2017 Uke 1"
     *  }
     * ]
     *
     * @returns {*}
     */
    getWeeksBackArray = function (numberOfWeeks) {
        var weeks = [];
        var weekString = "";
        for (var x = 0; x < numberOfWeeks; x++) {
            weekString = getWeekStringWithOffset(x);
            weeks.push({
                SalesWeek: weekString,
                WeekPretty: String(weekString).substring(0,4) + " Uke " + Number(String(weekString).substring(4))
            });
        }
        return weeks;
    };

    getWeekDays = function () {
        return ["Mandag", "Tirsdag", "Onsdag", "Torsdag", "Fredag", "Lørdag", "Søndag"];
    };


    decodeWeekStringToDate = function () {

    };

    return {
        getCurrentWeekString: getCurrentWeekString,
        decodeWeekStringToDate: decodeWeekStringToDate,
        getWeekStringWithOffset: getWeekStringWithOffset,
        getWeeksBackArray: getWeeksBackArray,
        getYearsArray: getYearsArray,
        getWeeksInYear: getWeeksInYear,
        getWeekDays: getWeekDays,
        getMonthsByOffset: getMonthsByOffset,
        getDaysOffsetFromDate: getDaysOffsetFromDate,
        getYYYYMMDD: getYYYYMMDD,
        getWeekStringOffsetFromWeekString: getWeekStringOffsetFromWeekString,
        getWeekStringsDiff: getWeekStringsDiff
    };

}]);
