import PropTypes from 'prop-types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const TransactionLineChart = ({ data }) => (
  <LineChart
    width={500}
    height={300}
    data={data}
    margin={{
      top: 5, right: 30, left: 20, bottom: 5,
    }}
  >
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="date" />
    <YAxis />
    <Tooltip />
    <Legend />
    <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
  </LineChart>
);

TransactionLineChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default TransactionLineChart;
