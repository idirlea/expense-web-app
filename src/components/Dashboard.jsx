import { useEffect, useState } from "react";

import { get } from "../service";
import { Link } from "react-router-dom";
import TransactionItem from "./TransactionItem";

import '../styles/Dashboard.css';
import { getTotalByCategory, getTotalByDay } from "../utils";
import SimpleBarChart from "./BarChart";
import { format } from "date-fns";
import PieChartComponent from "./PieChart";

const Dashboard = () => {
  const [latestTransactions, setLatestTransactions] = useState([]);
  const [data, setData] = useState([]);
  const [categoryTotals, setCategoryTotals] = useState({}); // [{ name: 'Food', value: 100 }, { name: 'Transport', value: 200 }
  const [screenSize] = useState({
    width: window.innerWidth, height: window.innerHeight 
  });

  useEffect(() => {
    document.title = 'Dashboard'; 
    
    get(`transactions/?populate=*&sort[0]=date:desc`).then(data => {
      const categTotals = getTotalByCategory(data)
      const dailyTotals = getTotalByDay(data);
      
      setLatestTransactions(data.slice(0, 3))
      setCategoryTotals(categTotals);

      let d = []
      Object.entries(dailyTotals).forEach(([date, total]) => {
        d.push({ name: format(new Date(date), 'dd-MM'), value: total });
      });
      setData(d);

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
        <PieChartComponent 
          categoryData={Object.entries(categoryTotals).map(([name, value]) => ({ name, value }))}
          width={screenSize.width * 0.8}
          height={screenSize.height * 0.42}
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
