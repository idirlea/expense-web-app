import PropTypes from 'prop-types';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';


const PieChartComponent = ({ categoryData, width, height, colors }) => {
  return (
    <PieChart width={width} height={height}>
      <Pie
        data={categoryData}
        cx={width / 2}
        cy={height / 2}
        labelLine={false}
        outerRadius={80}
        fill="#8884d8"
        dataKey="value"
        label={({ value }) => `${value}`}
      >
        {
          categoryData.map((_, index) => <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />)
        }
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  )
}

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
};




export default PieChartComponent;