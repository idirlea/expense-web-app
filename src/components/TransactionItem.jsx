
import PropTypes from 'prop-types';
import { convertToDate } from '../utils';

import '../styles/TransactionItem.css';

const TransactionItem = ({ transaction }) => {
  const { attributes: currency } = transaction?.currency?.data || {};

  return (
    <div className="transaction">
      <div className="transaction__category">
        <span className="transaction__title">{transaction.description}</span>
        <span className="transaction__date">{convertToDate(transaction.date)}</span>
      </div>
      <div>
        <span className="transaction__amount">{transaction.amount}</span>
        <span className="transaction__currency">{currency.symbol}</span>
      </div>
    
  </div>
  );
};

TransactionItem.propTypes = {
  transaction: PropTypes.shape({
    id: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
    currency: PropTypes.shape({
      data: PropTypes.shape({
        attributes: PropTypes.shape({
          symbol: PropTypes.string.isRequired,
        }).isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
}

export default TransactionItem;
