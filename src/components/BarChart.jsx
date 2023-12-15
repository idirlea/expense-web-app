import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend 
} from 'recharts';

import PropTypes from 'prop-types';

const SimpleBarChart = ({ width, height, hideYLabel, legendLabels, labelY, data }) => {
  const renderColorfulLegendText = (value, entry) => {
    const { color } = entry;
    
    return <span style={{ color }}>{legendLabels[value]}</span>;
  }
  
  return (
    <BarChart
      width={width}
      height={height}
      data={data}
      margin={{
        top: 5, right: 30, left: 20, bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="2 2" />
      <XAxis dataKey="name" />
      <YAxis hide={hideYLabel} label={labelY} />
      <Tooltip />
      <Legend formatter={renderColorfulLegendText} />
      <Bar dataKey="value"  maxBarSize={45} fill="#8884d8" />
    </BarChart>
  )
};

SimpleBarChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
    })
  ).isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  hideYLabel: PropTypes.bool,
  labelY: PropTypes.string,
  legendLabels: PropTypes.object,
};

export default SimpleBarChart;