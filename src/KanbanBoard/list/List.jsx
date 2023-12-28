import React, { useState, useEffect } from "react";

import "./List.css";
import Card from "../card/Card";
let cardCount = 0;

export default function List(props) {
  const [totalCount, settotalCount] = useState(0);

  useEffect(() => {
    if (props.ticketDetails.length) {
      let temp = 0;

      props.ticketDetails.map((ticket, index) => {
        if (ticket.status === props.listTitle) {
          temp++;
        } else if (ticket.priority === props.listTitle) {
          temp++;
        } else if (ticket.userObj.name === props.listTitle) {
          temp++;
        }
      });
      settotalCount(temp);
    }
  }, [props.ticketDetails.length]);

  props.handleHighestNodeInCol(totalCount);
  return (
    <>
      <div className="list-container">
        <div className="list-header">
          <div 
          // className="list-header-left"
          >
         

            <div className="text-gray-500 font-semibold" style={{fontSize:"0.6rem"}}>
              {
                {
                  // priority: (
                  //   <>
                  //     {props.priorityList
                  //       ? props.priorityList.map((priorityProperty) =>
                  //           priorityProperty.priority === props.listTitle ? (
                  //             <>{priorityProperty.name}</>
                  //           ) : null
                  //         )
                  //       : null}
                  //   </>
                  // ),
                  status: <>{props.listTitle}</>,
                  user: <>{props.listTitle}</>,
                }[props.groupValue]
              }
            </div>
          </div>
          {/* <div className='list-header-right'>
						<div className='list-add-item'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								width='18'
								height='18'
								viewBox='0 0 24 24'
							>
								<path
									fill='currentColor'
									d='M12 4a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2h-6v6a1 1 0 1 1-2 0v-6H5a1 1 0 1 1 0-2h6V5a1 1 0 0 1 1-1z'
								/>
							</svg>
						</div>
						<div className='list-option-item'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								width='18'
								height='18'
								viewBox='0 0 20 20'
							>
								<path
									fill='currentColor'
									d='M10.001 7.8a2.2 2.2 0 1 0 0 4.402A2.2 2.2 0 0 0 10 7.8zm-7 0a2.2 2.2 0 1 0 0 4.402A2.2 2.2 0 0 0 3 7.8zm14 0a2.2 2.2 0 1 0 0 4.402A2.2 2.2 0 0 0 17 7.8z'
								/>
							</svg>
						</div>
					</div> */}
        </div>

        <div
          className={`list-card-items`
          // ${
          //   props.highestNodeInCol >= 100
          //     ? "overflow-scroll"
          //     : "overflow-hidden"
          // }`
        }
        >
          {props.ticketDetails.map((ticket) => {
            if (ticket.status === props.listTitle) {
              cardCount++;
              return (
                <Card
                  columns={props.statusList.length}
                  highestNodeInCol={props.highestNodeInCol}
                  cardDetails={ticket}
                  totalTickets={totalCount}
                />
              );
            } else if (ticket.priority === props.listTitle) {
              cardCount++;
              return (
                <Card
                  columns={props.statusList.length}
                  highestNodeInCol={props.highestNodeInCol}
                  cardDetails={ticket}
                  totalTickets={totalCount}
                />
              );
            } else if (ticket.userObj.name === props.listTitle) {
              cardCount++;
              return (
                <Card
                  columns={props.statusList.length}
                  highestNodeInCol={props.highestNodeInCol}
                  cardDetails={ticket}
                  totalTickets={totalCount}
                />
              );
            }
            return null;
          }, (cardCount = 0))}
        </div>
      </div>
    </>
  );
}
