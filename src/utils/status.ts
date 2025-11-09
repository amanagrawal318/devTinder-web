export const getTimeDifference = (date: Date): string => {
  console.log("last seen date", date);
  const now = new Date();
  const diffInMs = now.getTime() - new Date(date).getTime();
  const diffInSeconds = Math.floor(diffInMs / 1000);

  if (diffInSeconds < 120) {
    return "🟢 Active now";
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `Last seen ${diffInMinutes} m ago`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `Last seen ${diffInHours} h ago`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    return `Last seen ${diffInDays} d ago`;
  }

  const diffInWeeks = Math.floor(diffInDays / 7);
  if (diffInWeeks < 4) {
    return `Last seen ${diffInWeeks} w ago`;
  }

  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return `Last seen ${diffInMonths} mo ago`;
  }

  const diffInYears = Math.floor(diffInDays / 365);
  return `Last seen ${diffInYears} y ago`;
};
