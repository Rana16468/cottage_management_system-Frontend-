const TimeCalculation = () => {
  var date = new Date();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var year = date.getFullYear();
  const dateFormat = new Date(year, month - 1, day, 0, 0, 0, 0); // Months are zero-indexed

  // Format the date string using the ISO 8601 format with milliseconds and UTC offset
  const formattedDate = dateFormat.toISOString();

  return formattedDate;
};

export default TimeCalculation;
