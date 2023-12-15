import { format } from "date-fns";

const months = {
  0: 'January',
  1: 'February',
  2: 'March',
  3: 'April',
  4: 'May',
  5: 'June',
  6: 'July',
  7: 'August',
  8: 'September',
  9: 'October',
  10: 'November',
  11: 'December',
};

export const convertToDate = (dateString) => {
  const date = new Date(dateString);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (isSameDate(date, today)) {
    return 'Today';
  } else if (isSameDate(date, yesterday)) {
    return 'Yesterday';
  } else {
    const day = date.getDate();
    const month = date.getMonth();

    const formattedDate = `${day < 10 ? '0' + day : day} ${months[month]}`;
    return formattedDate;
  }
};

export const isSameDate = (date1, date2) => {
  return (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  );
};



export const groupTransactionsByDate = (data) => {
  const groupedTransactions = data.reduce((acc, transaction) => {
    const date = format(new Date(transaction.date), 'yyyy-MM-dd');

    if (!acc[date]) {
      acc[date] = [];
    }

    acc[date].push(transaction);
    return acc;
  }, {});

  return groupedTransactions;
}

export const sortTransactions = (obj, direction = 'DESC') => {
  const sorted = {}
  Object.keys(obj).sort((a, b) => {
    if (direction === 'DESC') {
      return new Date(b) - new Date(a);
    } else {
      return new Date(a) - new Date(b);
    }
  }).forEach(key => sorted[key] = obj[key]);

  return sorted;
}

export const getTotalByDay = (transactions) => {
  const groupedTransactions = groupTransactionsByDate(transactions);

  return Object.entries(groupedTransactions).reduce((acc, [date, transactions]) => {
    const total = transactions.reduce((acc, transaction) => {
      return acc + transaction.amount;
    }, 0);

    acc[date] = total;
    return acc;
  }, {});
};

export const getTotalByCategory = (transactions) => {
  return transactions.reduce((acc, transaction) => {
    const { category, amount } = transaction;
    const { attributes: { name } } = category.data || {};
    if (!acc[name]) {
      acc[name] = 0;
    }

    acc[name] += amount;
    return acc;
  }, {});
}

