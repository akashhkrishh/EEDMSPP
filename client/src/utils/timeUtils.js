// src/utils/timeUtils.js

export const formatDateTime = (timestamp) => {
  const date = new Date(timestamp);

  // Format time with AM/PM, removing spaces
  const options = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
  let formattedTime = date.toLocaleTimeString('en-US', options);
  formattedTime = formattedTime.replace(/\s/g, ' '); // Remove any spaces

  // Format date as MM/DD/YYYY
  const formattedDate = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).replace(/(\d+)\/(\d+)\/(\d+)/, '$2/$1/$3');

  return {
    date: formattedDate,
    time: formattedTime,
  };
};
