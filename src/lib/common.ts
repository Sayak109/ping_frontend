export function formatTime(timestamp: string): string {
  const date: Date = new Date(timestamp);
  const now: Date = new Date();

  const isToday: boolean = date.toDateString() === now.toDateString();

  const yesterday: Date = new Date();
  yesterday.setDate(now.getDate() - 1);
  const isYesterday: boolean = date.toDateString() === yesterday.toDateString();

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };

  if (isToday) {
    return date.toLocaleTimeString([], timeOptions); // "7:54 PM"
  } else if (isYesterday) {
    return "Yesterday";
  } else if (now.getTime() - date.getTime() < 7 * 24 * 60 * 60 * 1000) {
    return date.toLocaleDateString([], { weekday: "short" }); // "Thu"
  } else {
    return date.toLocaleDateString([], {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  }
}

export function formatMessageTime(timestamp: string): string {
  const date: Date = new Date(timestamp);
  const now: Date = new Date();

  const isToday: boolean = date.toDateString() === now.toDateString();

  const yesterday: Date = new Date();
  yesterday.setDate(now.getDate() - 1);
  const isYesterday: boolean = date.toDateString() === yesterday.toDateString();

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };

  if (isToday) {
    return date.toLocaleTimeString([], timeOptions); // "8:04 PM"
  } else if (isYesterday) {
    return "Yesterday";
  } else if (now.getTime() - date.getTime() < 7 * 24 * 60 * 60 * 1000) {
    return date.toLocaleDateString([], { weekday: "short" }); // "Sat"
  } else {
    return date.toLocaleDateString([], {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }); // "06/09/2025"
  }
}
