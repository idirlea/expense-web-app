import PropTypes from "prop-types";

import { useEffect, useState } from "react";
import { format } from 'date-fns';

import { get } from "../service";
import { groupTransactionsByDate, sortTransactions } from "../utils";

import TransactionItem from "./TransactionItem";

const TransactionsList = ({ query }) => {
  const [groupedTransactions, setGroupedTransactions] = useState([]);

  useEffect(() => {
    document.title = 'Transactions'; 
  
    get(`transactions/?${query}&populate=*&sort[0]=date:desc`).then(data => {
      let transactions = groupTransactionsByDate(data || []);
      const sortedTransactions = sortTransactions(transactions);
      setGroupedTransactions(sortedTransactions);
    }).catch(error => {
      console.error(error);
    });
  }, [ query ]);

  return (
    <div className="transactions-list">
      {Object.entries(groupedTransactions).map(([date, transactions]) => (
        <div key={date}>
          <h2 className="transaction__group-date">{format(new Date(date), 'dd-MM-yyyy')}</h2>
          <div className="widget">
            {transactions.map(item => (
              <TransactionItem key={item.id} transaction={item} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

TransactionsList.defaultProps = {
  query: ''
};

TransactionsList.propTypes = {
  query: PropTypes.string,
};

export default TransactionsList;
