import PropTypes from 'prop-types';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';


const PieChartComponent = ({ categoryData, width, height, colors, showLegend, innerRadius, outerRadius }) => {
  return (
    <PieChart width={width} height={height}>
      <Pie
        data={categoryData}
        cx={width / 2}
        cy={height / 2}
        labelLine={true}
        innerRadius={innerRadius} 
        outerRadius={outerRadius} 
        fill="#8884d8"
        dataKey="value"
        label={({ value }) => `${value}`}
      >
        {
          categoryData.map((_, index) => <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />)
        }
      </Pie>
      <Tooltip />
      {showLegend && <Legend />}
    </PieChart>
  )
}

PieChartComponent.defaultProps = {
  showLegend: false,
  innerRadius: 0,
  outerRadius: 80,
};

PieChartComponent.propTypes = {
  categoryData: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
    })
  ).isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  colors: PropTypes.arrayOf(PropTypes.string).isRequired,
  showLegend: PropTypes.bool,
  innerRadius: PropTypes.number,
  outerRadius: PropTypes.number,
};




export default PieChartComponent;