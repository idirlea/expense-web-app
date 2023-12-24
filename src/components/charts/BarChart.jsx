import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  LabelList
} from 'recharts';

import PropTypes from 'prop-types';

const renderCustomContent = (props) => {
  const { x, y, width, name, value } = props;
  const user = JSON.parse(localStorage.getItem('user') || {})
  const { currency } = user || {}

  return (
    <g>
        <text 
          x={x + width / 2} 
          y={y * 1.1} 
          fill="#fff" 
          fontSize={'0.8rem'}
          textAnchor="middle" 
          dy={18}>
          {name} - {value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} {currency.symbol}
        </text>
    </g>
  );
          
}

const SimpleBarChart = ({ width, height, hideXLabel, hideYLabel, legendLabels, labelY, layout, data }) => {
  const renderColorfulLegendText = (value, entry) => {
    const { color } = entry;
    
    return <span style={{ color }}>{legendLabels[value]}</span>;
  }
  
  return layout !== 'vertical' ? (
    <BarChart
      width={width}
      height={height}
      data={data}
      layout={layout}
      margin={{
        top: 5, right: 30, left: 20, bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="2 2" />
      <XAxis hide={hideXLabel} dataKey="name" />
      <YAxis hide={hideYLabel} label={labelY} />
      <Tooltip />
      <Legend formatter={renderColorfulLegendText} />
      <Bar dataKey="value" maxBarSize={45} fill="#8884d8">
        <LabelList dataKey="value" position="top" />
      </Bar>
    </BarChart>
  ) : (
  <BarChart 
    width={width}
    height={height}
    data={data}
    layout={layout}
    margin={{top: 5, right: 30, left: 20, bottom: 5}}
  >
    <CartesianGrid strokeDasharray="3 3"/>
    <XAxis hide={hideXLabel} type="number"/>
    <YAxis hide={hideYLabel} dataKey="name" type="category"/>
    <Tooltip/>
    <Legend />
    <Bar dataKey="value" maxBarSize={45} fill="#8884d8">
        <LabelList dataKey="value" position="top" content={renderCustomContent} />
      </Bar>
  </BarChart>
  )
};

SimpleBarChart.defaultProps = {
  width: 500,
  height: 300,
  hideYLabel: false,
  hideXLabel: false,
  layout: 'horizontal',
}

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
  hideXLabel: PropTypes.bool,
  labelY: PropTypes.string,
  legendLabels: PropTypes.object,
  layout: PropTypes.string,
};

export default SimpleBarChart;