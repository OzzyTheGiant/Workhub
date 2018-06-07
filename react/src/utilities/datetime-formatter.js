function datetimeFormatter(timestamp) {
    let date  = new Date(timestamp);
    let hours = date.getHours();
    if (hours > 12) hours = "0" + (hours - 12)
    else if (hours === 0) hours = 12;
    else if (hours < 10 && hours > 0) hours = "0" + hours;
    return (date.getMonth() < 9 ? "0" : "") + date.getMonth() + "/" 
        + (date.getDate() < 10 ? "0" : "") + date.getDate() + "/" + date.getFullYear() + " "
        + hours + ":" + (date.getMinutes() < 10 ? "0" : "") + date.getMinutes() + (parseInt(hours, 10) > 11 ? " AM" : " PM");
}

export default datetimeFormatter;