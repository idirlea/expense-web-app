import { useEffect, useState } from "react";
import { format, startOfMonth, endOfMonth, subMonths } from "date-fns";
import { Link } from "react-router-dom";
import qs from "qs";


import { get } from "../service";
import { getMonthsTotals, getTotalByCategory, getTotalByDay } from "../utils";

import SimpleBarChart from "./charts/BarChart";
import PieChartComponent from "./charts/PieChart";
import TransactionItem from "./TransactionItem";

import '../styles/Dashboard.css';

const Dashboard = () => {
  const [latestTransactions, setLatestTransactions] = useState([]);
  
  const [data, setData] = useState([]);
  
  const [categoryTotals, setCategoryTotals] = useState({}); 
  const [monthsTotals, setMonthsTotals] = useState({});
  
  const [screenSize] = useState({
    width: window.innerWidth, height: window.innerHeight 
  });

  useEffect(() => {
    document.title = 'Dashboard'; 

    const startOfThreeMonthsAgo = startOfMonth(subMonths(new Date(), 3));
    const endOfMonthDate = endOfMonth(new Date());
      
    const query = qs.stringify({
      filters: {
        date: {
          $gte: format(startOfThreeMonthsAgo, 'yyyy-MM-dd'),
          $lte: format(endOfMonthDate, 'yyyy-MM-dd'),
        },
      },
      pagination: {
        limit: 500
      },
      populate: '*',
      sort: ['date:desc'],
    });

    get(`transactions/?${query}`).then(data => {
      const categTotals = getTotalByCategory(data)
      const dailyTotals = getTotalByDay(data);
      const monthlyTotals = getMonthsTotals(data);
      
      setLatestTransactions(data.slice(0, 3));
      setCategoryTotals(categTotals);

      let d = []
      Object.entries(dailyTotals).forEach(([date, total]) => {
        d.push({ name: format(new Date(date), 'dd-MM'), value: total });
      });
      setData(d.slice(0, 10).reverse());

      let m = []
      Object.entries(monthlyTotals).forEach(([month, total]) => {
        m.push({ name: month, value: total });
      });

      setMonthsTotals(m)
      
    }).catch(error => {
      console.error(error);
    });

  }, []);

  return (
    <>
      <div className="widget">
        {latestTransactions.map(transaction => (
          <TransactionItem key={transaction.id} transaction={transaction} />
        ))}
        <div className="dashboard-transaction">
          <Link to="transaction-list">View more</Link>
        </div>
      </div>
      <div className="widget">
        <SimpleBarChart
          data={Object.values(monthsTotals)} 
          hideYLabel={true}
          hideXLabel={false}
          labelY="Total"
          legendLabels={{value: 'Total'}}
          width={screenSize.width * 0.8}
          height={screenSize.height * 0.3}
          layout="vertical"
        />
      </div>
      <div className="widget">
        <PieChartComponent 
          categoryData={Object.entries(categoryTotals).map(([name, value]) => ({ name, value }))}
          width={screenSize.width * 0.8}
          height={screenSize.height * 0.42}
          innerRadius={40} 
          outerRadius={80} 
          colors={["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#653CAD", "#AD653C", "#3CAD65", "#AD3C65", "#653CAD", "#AD653C"]}
        />
      </div>
      <div className="widget">
        <SimpleBarChart
          data={data} 
          hideYLabel={true}
          labelY="Total"
          legendLabels={{value: 'Total'}}
          width={screenSize.width * 0.8}
          height={screenSize.height * 0.3}
        />
      </div>
    </>
  );
};

export default Dashboard;
