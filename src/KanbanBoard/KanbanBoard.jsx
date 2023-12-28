import React, { useEffect, useState, useCallback, useMemo } from "react";

import "./index.css";
import * as dataSource from "./data.json";
import List from "./list/List";
import Navbar from "./navbar/Navbar";

function KanbanBoard() {
  const data = JSON.parse(JSON.stringify(dataSource));
  const [highestNodeInCol, setHighestNodeInCol] = useState(0)
 
  const statusList = [
    // "In progress",
  //   "In progress",
  //   "In progress",
  //   "In progress",
  //   "In progress",
  //   "In progress",
  //   "In progress",
  //   "In progress",
  //   "In progress",
  //   "In progress",
  //   "In progress",
  //   "In progress",
  //   "In progress",
  //   "In progress",
  //   "In progress",
  //   "In progress",
  //   "In progress",
    "In progress",
  //   "In progress",
     "Backlog", 
  "Todo",
   "Done",
   "Test", "Cancelled"
];
  const userList = [
    "Anoop sharma",
    "Yogesh",
    "Shankar Kumar",
    "Ramesh",
    "Suresh",
  ];
  const priorityList = [
    { name: "No priority", priority: 0 },
    { name: "Low", priority: 1 },
    { name: "Medium", priority: 2 },
    { name: "High", priority: 3 },
    { name: "Urgent", priority: 4 },
  ];

  const [groupValue, setgroupValue] = useState(
    getStateFromLocalStorage() || "status"
  );
  const [orderValue, setorderValue] = useState("title");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [ticketDetails, setticketDetails] = useState([]);

  const orderDataByValue = useCallback(
    async (cardsArry) => {
      if (orderValue === "priority") {
        cardsArry.sort((a, b) => b.priority - a.priority);
      } else if (orderValue === "title") {
        cardsArry.sort((a, b) => {
          const titleA = a.title.toLowerCase();
          const titleB = b.title.toLowerCase();

          if (titleA < titleB) {
            return -1;
          } else if (titleA > titleB) {
            return 1;
          } else {
            return 0;
          }
        });
      }
      await setticketDetails(cardsArry);
    },
    [orderValue, setticketDetails]
  );
  const orderDataByColor = (cardsArry) => {
    cardsArry.map((a) => {
      if (selectedColor !== a.color && selectedColor !== "") {
        a.isHide = true;
      }
    });

    setticketDetails(cardsArry);
  };
  const orderDataByDate = (cardsArry) => {
    cardsArry.map((a) => {
      if (selectedDate !== a.date && selectedDate !== "") {
        a.isHide = true;
      }
    });

    setticketDetails(cardsArry);
  };

  function saveStateToLocalStorage(state) {
    localStorage.setItem("groupValue", JSON.stringify(state));
  }

  const handleHighestNodeInCol=(val)=>{
    if(val>highestNodeInCol){
      setHighestNodeInCol(val)
    }
  }
  function getStateFromLocalStorage() {
    const storedState = localStorage.getItem("groupValue");
    if (storedState) {
      return JSON.parse(storedState);
    }
    return null;
  }

  useEffect(() => {
    saveStateToLocalStorage(groupValue);
    refactorData();
    async function refactorData() {
      let ticketArray = [];

      for (let i = 0; i < data.tickets.length; i++) {
        for (let j = 0; j < data.users.length; j++) {
          if (data.tickets[i].userId === data.users[j].id) {
            let ticketJson = {
              ...data.tickets[i],
              userObj: data.users[j],
            };
            ticketArray.push(ticketJson);
          }
        }
      }

      await setticketDetails(ticketArray);
      orderDataByValue(ticketArray);
      orderDataByColor(ticketArray);
      orderDataByDate(ticketArray);
    }
  }, [orderDataByValue, groupValue, selectedColor, selectedDate]);

  function handleGroupValue(value) {
    setgroupValue(value);
    console.log(value);
  }

  function handleOrderValue(value) {
    setorderValue(value);
    console.log(value);
  }
  function handleColorValue(value) {
    setSelectedColor(value);
  }
  function handleDateValue(value) {
    setSelectedColor("");
    setSelectedDate(value);
    console.log(value);
  }

  return (
    <div>
      <Navbar
        groupValue={groupValue}
        orderValue={orderValue}
        selectedColor={selectedColor}
        selectedDate={selectedDate}
        handleGroupValue={handleGroupValue}
        handleColorValue={handleColorValue}
        handleOrderValue={handleOrderValue}
        handleDateValue={handleDateValue}
      />
      <section className='k-board board-details w-[92vw] overflow-x-scroll'>
        <div className='board-details-list' >
          {
            {
              status: (
                <>
                  {statusList.map((listItem, index) => {
                    return (
                      <div
                      onClick={()=>alert(`Columns: ${statusList}`)}
                      key={`status${index}`} 
                       style={{width: `${statusList.length<=5? 100/statusList.length+"%":'25rem'}` }}>
                      <List         
                        groupValue='status'
                        orderValue={orderValue}
                        listTitle={listItem}
                        listIcon=''
                        highestNodeInCol={highestNodeInCol}
                        handleHighestNodeInCol={val=> handleHighestNodeInCol(val)}
                        statusList={statusList}
                        ticketDetails={ticketDetails}
                      />
                      </div>
                    );
                  })}
                </>
              ),
              user: (
                <>
                  {userList.map((listItem,index) => {
                    return (
                      <div 
                      key={`user${index}`} 
                      onClick={()=>alert(`Columns: ${statusList}`)}
                      style={{width: `${statusList.length<=5? 100/statusList.length+"%":'25rem'}` }}>
                      <List
                        groupValue='user'
                        orderValue={orderValue}
                        listTitle={listItem}
                        listIcon=''
                        highestNodeInCol={highestNodeInCol}
                        handleHighestNodeInCol={val=> handleHighestNodeInCol(val)}
                        userList={userList}
                        ticketDetails={ticketDetails}
                      />
                      </div>
                    );
                  })}
                </>
              ),
              priority: (
                <>
                  {priorityList.map((listItem,index) => {
                    return (
                      <div key={`priority${index}`} 
                      onClick={()=>alert(`Columns: ${statusList}`)}
                      style={{width: `${statusList.length<=5? 100/statusList.length+"%":'25rem'}` }}>

                      <List
                      key='priority' 
                      groupValue='priority'
                        orderValue={orderValue}
                        listTitle={listItem.priority}
                        listIcon=''  
                        highestNodeInCol={highestNodeInCol}
                        handleHighestNodeInCol={val=> handleHighestNodeInCol(val)}
                        priorityList={priorityList}
                        ticketDetails={ticketDetails}
                      />
                      </div>
                    );
                  })}
                </>
              ),
            }[groupValue]
          }
        </div>
      </section>
      {/* <DynamicTable /> */}
    </div>
  );
}

export default KanbanBoard;
