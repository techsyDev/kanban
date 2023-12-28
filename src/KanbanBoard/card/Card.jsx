import React, { useState, useEffect } from "react";

import "./Card.scss";

const colorCodes = {
  green: "#4aba7e",
  red: "#ea789a",
  black: "#ea789a",
  yellow: "#f2ac66",
  blue: "#f2ac66",
};
export default function Card(props) {
  const { cardDetails, totalTickets, columns, highestNodeInCol } = props;

  const [hideText, setHideText] = useState(false);

  useEffect(() => {
    if (highestNodeInCol > 12 || columns > 3) {
      setHideText(true);
    } else {
      setHideText(false);
    }
  }, [highestNodeInCol]);

  const nodes =
    totalTickets <= highestNodeInCol ? highestNodeInCol : totalTickets;

  const style =
    nodes >= 100
      ? columns > 2
        ? "1.7rem"
        : "3rem"
      : nodes >= 50
      ? columns > 2
        ? "2rem"
        : "2.5rem"
      : nodes >= 20
      ? columns > 2
        ? "2.5rem"
        : "4.5rem"
      : nodes >= 10
      ? columns > 2
        ? "3.5rem"
        : "5rem"
      : "7.5rem";

  return (
    <>
      <div
	   onClick={()=>alert(props?.cardDetails?.title)}
        style={{
          background: `${colorCodes[props?.cardDetails?.color]}`,
          width: style,
          height: style,
          margin: "0.5%",
        }}
        className={` rounded-full  flex items-center text-center text-wrap text-xs p-2 ${
          props?.cardDetails?.isHide && "card-hidden "
        }`}
      >
        {totalTickets < 12 && !hideText ? (
          <div className="card-title">
            {props?.cardDetails?.title?.length > 15
              ? `${cardDetails?.title.slice(0, 15)}...`
              : cardDetails?.title}
          </div>
        ): <div></div> }
        {/* <p>{String(totalTickets%3)}</p> */}
        {/* <div className='card-tag'>
					{props.cardDetails.date}
					{
						{
							0: (
								<div className='card-tag-icon'>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										width='22'
										height='22'
										viewBox='0 0 1024 1024'
									>
										<path
											fill='currentColor'
											d='M112 476h160v72H112zm320 0h160v72H432zm320 0h160v72H752z'
										/>
									</svg>
								</div>
							),
							1: (
								<div className='card-tag-icon'>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										width='22'
										height='22'
										viewBox='0 0 48 48'
									>
										<g fill='currentColor'>
											<path
												fill-rule='evenodd'
												d='M35 6a3 3 0 0 0-3 3v30a3 3 0 0 0 3 3h4a3 3 0 0 0 3-3V9a3 3 0 0 0-3-3h-4Zm-1 3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v30a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1V9ZM19 21a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v18a3 3 0 0 1-3 3h-4a3 3 0 0 1-3-3V21Zm3-1a1 1 0 0 0-1 1v18a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1V21a1 1 0 0 0-1-1h-4Z'
												clip-rule='evenodd'
											/>
											<path d='M6 33a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3v-6Z' />
										</g>
									</svg>
								</div>
							),
							2: (
								<div className='card-tag-icon'>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										width='22'
										height='22'
										viewBox='0 0 48 48'
									>
										<g fill='currentColor'>
											<path d='M19 21a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v18a3 3 0 0 1-3 3h-4a3 3 0 0 1-3-3V21ZM6 33a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3v-6Z' />
											<path
												fill-rule='evenodd'
												d='M32 9a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v30a3 3 0 0 1-3 3h-4a3 3 0 0 1-3-3V9Zm3-1a1 1 0 0 0-1 1v30a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1h-4Z'
												clip-rule='evenodd'
											/>
										</g>
									</svg>
								</div>
							),
							3: (
								<div className='card-tag-icon'>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										width='22'
										height='22'
										viewBox='0 0 48 48'
									>
										<path
											fill='currentColor'
											d='M32 9a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v30a3 3 0 0 1-3 3h-4a3 3 0 0 1-3-3V9ZM19 21a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v18a3 3 0 0 1-3 3h-4a3 3 0 0 1-3-3V21ZM9 30a3 3 0 0 0-3 3v6a3 3 0 0 0 3 3h4a3 3 0 0 0 3-3v-6a3 3 0 0 0-3-3H9Z'
										/>
									</svg>
								</div>
							),
							4: (
								<div className='card-tag-icon'>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										width='22'
										height='22'
										viewBox='0 0 16 16'
									>
										<path
											fill='red'
											d='M5.96 4.457a2.075 2.075 0 1 1 4.08 0l-.856 4.56a1.205 1.205 0 0 1-2.368 0l-.855-4.56ZM9.5 12.5a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0Z'
										/>
									</svg>
								</div>
							),
						}[props.cardDetails.priority]
					}
				</div> */}
      </div>
    </>
  );
}
