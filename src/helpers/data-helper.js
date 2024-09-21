
//converting milli sec to sec to pass in the finhub api
export const convertDateToUnixTimestamp = (date) => {
    return Math.floor(date.getTime() / 1000)
}

//we convert back to Date in order to display it to the user
export const convertUnixTimestampToDate = (unixTimestamp) => {
    const milliSecs = unixTimestamp * 1000;
    return new Date(milliSecs).toLocaleDateString();
}

//we get the start date as an argument here and we calculate and return the end date
export const createDate = (date, days, weeks, months, years) => {
    let newDate = new Date(date);
    newDate.setDate(newDate.getDate() + days + 7 * weeks);
    newDate.setMonth(newDate.getMonth() + months);
    newDate.setFullYear(newDate.getFullYear() + years);

    return newDate;
}