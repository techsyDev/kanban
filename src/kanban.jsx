import React, { useEffect, useState, useRef } from 'react'
import data from './data.json'
import Toolbar from './Toolbar';
// import { FaCircle } from "react-icons/fa6";

// const width = window.innerWidth;
// const height = window.innerHeight;
const colorCodes = {
  green: "#4aba7e",
  red: "#ea789a",
  black: "#ea789a",
  yellow: "#f2ac66",
  blue: "#f2ac66",
};
const Kanban = () => {
  const [isFormated, setIsFormated] = useState(false)
  const [isWidthCalculated, setIsWidthCalculated] = useState(false)
  const [isLoading, setisLoading] = useState(false)
  const [formatedData, setformatedData] = useState({})
  const [formatedDataLabel, setFormatedDataLabel] = useState([])


  useEffect(() => {
    if (!isFormated) {
      formatData('listLabel')
    }
    isFormated && getContainerWidth()
  }, [isFormated])
  useEffect(() => {
    isWidthCalculated && getSizeOfNode()
  }, [isWidthCalculated])


  useEffect(() => {
    window.addEventListener('resize', handleResize);
    window.addEventListener('reload', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('reload', handleResize);
    };
  }, []);



  const formatData = (property) => {
    setisLoading(true)
    const uniqueLabels = [...new Set(data.tickets.map(ticket => ticket[property]))];

    const organizedTickets = {};
    uniqueLabels.forEach(label => {
      organizedTickets[label] = data.tickets.filter(ticket => ticket[property] === label);
    });

    setFormatedDataLabel(uniqueLabels)
    setformatedData(organizedTickets)
    setisLoading(false)
    setIsFormated(true)
  }
  // highestColNodeSize state
  // sorted records

  // employee 11
  //  rtest 9   
  //customer 22


  // compare highest node size with the data tickets length if it is greater then update state

  // 1 node width should be perfect and justified as per container
  // 2 reduce space vertically between nodes
  // 3 window and height of screen add event listener for resizing (Done)
  // 4  text hide if column is greater than 4 or highest node is greater than 12

  // Getting window size in state
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [divHeight, setDivHeight] = useState(window.innerHeight)

  // Getting size of node
  const divRef = useRef(null);
  const [nodeSize, setNodeSize] = useState(0)
  const [containerWidth, setContainerWidth] = useState(0)


  const getContainerWidth = () => {
    let width = 100 / formatedDataLabel.length;  //100 vw / no of column width
    width = width - 2; // minus horizontal padding 
    width = width * windowWidth / 100;  // node width / screen total vw to convert into px
    setContainerWidth(width)
    setIsWidthCalculated(true)
  }

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
    setDivHeight(window.innerHeight)
    getContainerWidth()
  };
  const getSizeOfNode = () => {
    // Get an array of the lengths of all arrays
    const arrayLengths = Object.values(formatedData).map((arr) => arr.length);
    // Find the maximum length
    const maxLength = Math.max(...arrayLengths);
    const area = Number(divHeight - 112) * containerWidth / 100
    const node = Math.floor(area / maxLength)
    setNodeSize(Number(node))
  }


  // const findDivisors = (number) => {
  //   const divisors = [];

  //   for (let i = 1; i <= number; i++) {
  //     if (number % i === 0) {
  //       divisors.push(i);
  //     }
  //   }
  //   return divisors;
  // }

  // const calculateAverage = (arr) => {
  //   const sum = arr.reduce((total, currentValue) => total + currentValue, 0);
  //   let average = sum / arr.length;
  //   average = average.toFixed(2)
  //   return average;
  // }

  // const findSecondLargest = (arr) => {
  //   // Sort the array in descending order
  //   const sortedArray = arr.sort((a, b) => b - a);

  //   let secondLargest = sortedArray[1];

  //   // If the second largest is 1, return the largest number
  //   if (secondLargest === 1) {
  //     secondLargest = sortedArray[0];
  //   }
  //   return secondLargest;
  // }

  // const calculateNodeWidth = (noOfNodes, containerWidth) => {
  //   let arr = findDivisors(noOfNodes)
  //   let secondLargest = findSecondLargest(arr)
  //   // console.log(secondLargest)
  //   let average = calculateAverage(arr)
  //   // console.log(average)

  //   let row = secondLargest;
  //   let nodeWidth = containerWidth / row + 2;
  //   return nodeWidth;
  // }


  // Filters
  const [filter, setFilter] = useState({
    color: "",
    date: "",
    status: "",
    priority: 0
  })

  console.log(filter)

  // Showcases

  const [containerIndex, setContainerIndex] = useState(0)
  const handleContainerIndexChange = (i) => {
    setContainerIndex(i)
  }
  const renderKanban = () => {
    return (
      <div className='space-x-2'
        style={{
          gridAutoFlow: 'column',
          display: 'grid',
          gridArea: 'auto / auto / auto / auto',
          gridColumn: formatedDataLabel.length
        }}>
        {formatedDataLabel.map((label, i) => {
          let width = 100 / formatedDataLabel.length;  //100 vw / no of column width
          width = width - 2; // minus horizontal padding 
          width = width * windowWidth / 100;
          return (
            <div key={i} className={`transition-all duration-1000 ${containerIndex === 0 ? "block" : containerIndex === i + 1 ? "block" : "hidden"}`}>
              <div ref={divRef}
                className={`h-[80vh] overflow-auto`}
                onClick={() => handleContainerIndexChange(i + 1)} >
                <ul className='flex h-full w-full transition-all duration-1000 flex-wrap-reverse content-start items-end justify-start bg-[#f1f2f7] '
                  style={{ width: `${containerIndex === 0 ? width + "px" : containerIndex === i + 1 ? "100%" : width + "px"}`, }}
                // style={{ display:'grid', gridAutoFlow: 'column dense', gridArea:'auto / auto / auto / auto',   gridColumn:formatedDataLabel.length}}
                >
                  {formatedData[label]
                    .filter(ticket => ticket.color.includes(filter.color))
                    .filter(ticket => ticket.date.includes(filter.date))
                    .filter(ticket => ticket.status.includes(filter.status))
                    .filter(ticket => filter.priority === 0 ? ticket : ticket.priority === Number(filter.priority))
                    .map((ticket, index) => (
                      formatedDataLabel.length < 4 || containerIndex === i + 1 ?
                        <li
                          className='flex items-center justify-center rounded-full'
                          style={{ width: nodeSize, height: nodeSize, overflow: "hidden", backgroundColor: colorCodes[ticket.color] }}
                          key={index}>
                          <p className='text-xs h-[15px] w-full overflow-hidden text-center'> {ticket.title} </p>
                        </li>
                        :
                        <li className='flex items-end justify-end  rounded-full'
                          style={{ width: nodeSize, height: nodeSize, overflow: "hidden", backgroundColor: colorCodes[ticket.color] }}
                          key={index}>
                        </li>
                    ))}
                </ul>
              </div>
              <p style={{ fontSize: '0.5rem' }}>{label}</p>
            </div>
          )
        })
        }
      </div >
    )
  }

  const renderKanbanContainer = () => {
    return (
      <div className='m-5 h-screen'
        style={{ width: "calc(100vw - 2.5rem)" }}
      >
        <Toolbar filter={filter} setFilter={setFilter} setIndex={setContainerIndex} />
        {renderKanban()}
      </div>
    )

  }
  return (
    <div className='overflow-hidden m-0 p-0 w-screen h-screen'
    >
      {isLoading ? <p>isLoading...</p> : renderKanbanContainer()}
    </div>
  )
}

export default Kanban