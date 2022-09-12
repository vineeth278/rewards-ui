import './App.css';
import getData from "./data/data"
import {useEffect, useState} from "react";
import moment from 'moment'

function App() {
  const [dataItems, setDataItems] = useState([]);
  const [threeMonthsTotal, setThreeMonthsTotal] = useState({});
  console.log(getData());
  useEffect(() => {
    const data = getData();
    data.sort((a,b) => Date.parse(new Date(a.date)) - Date.parse(new Date(b.date)));
    const monthMap = {};
   
    data.forEach(el => {
      const currMonthName  = moment(el.date).format('MMMM');
      if(!monthMap[currMonthName]) {
        monthMap[currMonthName] = [];
      }
      monthMap[currMonthName].push(el);
      let reward = 0;
     if (el.amount_spent > 50 && el.amount_spent <= 100) {
      reward += (el.amount_spent - 50);
    } else if (el.amount_spent > 100) {
        reward += 50;
        reward += (el.amount_spent - 100) * 2;
    }
    el.reward_point = reward;
    })
    setThreeMonthsTotal(monthMap);
    setDataItems(data);
  }, []);
  
  return (
    <div>
<section>
    <div className="container">
  
        <div>
            <header>
                <h2>Rewards Points</h2>
            </header>
            <div>
                <div>
                    <table className="styled-table">
                        <thead>
                            <tr>
                            <th >
                                    <div >S.No</div>
                                </th>
                                 <th >
                                    <div >Date</div>
                                </th>
                                <th className="p-2 whitespace-nowrap">
                                    <div >Item Name</div>
                                </th>
                                <th className="p-2 whitespace-nowrap">
                                    <div >Amount Spent</div>
                                </th>
                                <th className="p-2 whitespace-nowrap">
                                    <div >Rewards Point</div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                        {dataItems.length>0 && dataItems.map((item, index) => {
                          return (
                             <tr>
                             <td >
                             <div >{index+1}</div>
                             </td>
                              <td >
                                 <div >{item.date}</div>
                             </td>
                             <td >
                                 <div >{item.item_name}</div>
                             </td>
                             <td >
                                 <div >${item.amount_spent}</div>
                             </td>
                             <td >
                                 <div >{item.reward_point}</div>
                             </td>
                         </tr>);
                          })}
                          {Object.keys(threeMonthsTotal).map((item, index) => {
                            if(index<3) {
                               return (
                              <tr>
                             <td >
                             </td>
                             <td >
                             </td>
                             <td >
                             </td>
                             <td >
                             </td>
                             <td >
                             <strong>
                                 <div className="shift-left">Total {item}
                                 <span className="text-green">{threeMonthsTotal[item].reduce((partialSum, a) => partialSum + a.reward_point, 0)}</span></div></strong>
                             </td>
                         </tr>)
                            }
                         ;
                          })}
                          <tr>
                             <td >
                             </td>
                             <td >
                             </td>
                             <td >
                             </td>
                             <td >
                             </td>
                             <td >
                             <strong>
                                 <div className="shift-left">Total 
                                 <span className="text-green">{dataItems.reduce((partialSum, a) => partialSum + a.reward_point, 0)}</span></div></strong>
                             </td>
                         </tr>
                        </tbody>
                    </table>
                    {/* <div className="grid justify-items-end">
                      <div>Total</div>
                    </div> */}
                </div>
            </div>
        </div>
    </div>
</section>
    </div>
  );
}

export default App;
