import React, { useState } from "react";

// import filterIcon from "../../../assets/Tuning.svg";
// import downIcon from "../../../assets/Down.svg";
import {
  TableToolbar,
  TableToolbarContent,
  TableToolbarSearch,
  TableToolbarMenu,
  TableToolbarAction,
  Dropdown,
} from "carbon-components-react";
import { Button } from "carbon-components-react";
// import './Tool.scss'
import { Link } from "react-router-dom";
import "./Navbar.css";


const filterIcon ="filtericon" // temporary change asset file not available
const downIcon = "downIcon" // temporary change asset file not available
export default function Navbar(props) {
  const [toggleFilter, settoggleFilter] = useState(false);

  function handleDisplayToggle(e) {
    settoggleFilter(!toggleFilter);
    if (e.target.value !== undefined) {
      props.handleGroupValue(e.target.value);
    }
  }
  function handleOrderingValue(e) {
    settoggleFilter(!toggleFilter);
    if (e.target.value !== undefined) {
      props.handleOrderValue(e.target.value);
    }
  }
  function handleColoringValue(e) {
    // settoggleFilter(!toggleFilter);
    if (e.target.value !== undefined) {
      props.handleColorValue(e.target.value);
      
    }
  }
  function handleDateValue(e) {
    if (e.target.value !== undefined) {
      props.handleDateValue(e.target.value);
    }
  }
  const items = [
    {
      id: "option-0",
      text: "Red",
    },
    {
      id: "option-1",
      text: "Green",
    },
    {
      id: "option-2",
      text: "Blue",
    },
    {
      id: "option-3",
      text: "Black",
    },
    {
      id: "option-4",
      text: "Yellow",
    },
  ];
  return (
    <div >
      <div
        style={{
          marginBottom: "5px",
          marginTop:"-20px"
          
        }}>
        <TableToolbar
          style={{ zIndex: "0 ",  display:"flex"}}
          {...props}
          aria-label='data table toolbar'>
          <TableToolbarContent className="flex font-normal justify-between w-full px-10">
            {/* <TableToolbarSearch /> */}

            <div className='set-options'>
              <select
                value={props.selectedColor}
                onChange={handleColoringValue}
                className='nav-selector'
                name='grouping'
                id=''>
                <option value='red'>Red</option>
                <option value='green'>Green</option>
                <option value='blue'>Blue</option>
                <option value='black'>Black</option>
                <option value='yellow'>Yellow</option>
              </select>
              <select
                value={props.selectedDate}
                onChange={handleDateValue}
                className='nav-selector'
                name='grouping'
                id=''>
                <option value='01-12-2023'>01-12-2023</option>
                <option value='21-11-2023'>21-11-2023</option>
                <option value='23-11-2023'>23-11-2023</option>
                <option value='14-01-2023'>14-01-2023</option>
              </select>

              {/* <div>
                <div className='nav-disp-btn' onClick={handleDisplayToggle}>
                  <div className='nav-disp-icon nav-disp-filter'>
                    <img src={filterIcon} alt='icon' />
                  </div>
                  <div className='nav-disp-heading'>Display</div>
                  <div className='nav-disp-icon nav-disp-drop'>
                    <img src={downIcon} alt='icon' />
                  </div>
                </div>
                <div
                  className={
                    toggleFilter
                      ? "nav-disp-dropdown nav-disp-dropdown-show"
                      : "nav-disp-dropdown"
                  }>
                  <div className='nav-disp-filters'>
                    <div className='nav-dropdown-category'>Grouping</div>
                    <div className='nav-dropdown-selector'>
                      <select
                        value={props.groupValue}
                        onChange={handleDisplayToggle}
                        className='nav-selector'
                        name='grouping'
                        id=''>
                        <option value='status'>Status</option>
                        <option value='user'>User</option>
                        <option value='priority'>Priority</option>
                      </select>
                    </div>
                  </div>
                  <div className='nav-disp-filters'>
                    <div className='nav-dropdown-category'>Ordering</div>
                    <div className='nav-dropdown-selector'>
                      <select
                        value={props.orderValue}
                        onChange={handleOrderingValue}
                        className='nav-selector'
                        name='grouping'
                        id=''>
                        <option value='priority'>Priority</option>
                        <option value='title'>Title</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div> */}
            </div>

            {/* <Button>Primary Button</Button> */}
          </TableToolbarContent>
        </TableToolbar>
      </div>

      {/* <section className='nav'>
				<div className='nav-container'>
					<div>
						<div className='nav-disp-btn' onClick={handleDisplayToggle}>
							<div className='nav-disp-icon nav-disp-filter'>
								<img src={filterIcon} alt='icon' />
							</div>
							<div className='nav-disp-heading'>Display</div>
							<div className='nav-disp-icon nav-disp-drop'>
								<img src={downIcon} alt='icon' />
							</div>
						</div>
						<div
							className={
								toggleFilter
									? "nav-disp-dropdown nav-disp-dropdown-show"
									: "nav-disp-dropdown"
							}
						>
							<div className='nav-disp-filters'>
								<div className='nav-dropdown-category'>Grouping</div>
								<div className='nav-dropdown-selector'>
									<select
										value={props.groupValue}
										onChange={handleDisplayToggle}
										className='nav-selector'
										name='grouping'
										id=''
									>
										<option value='status'>Status</option>
										<option value='user'>User</option>
										<option value='priority'>Priority</option>
									</select>
								</div>
							</div>
							<div className='nav-disp-filters'>
								<div className='nav-dropdown-category'>Ordering</div>
								<div className='nav-dropdown-selector'>
									<select
										value={props.orderValue}
										onChange={handleOrderingValue}
										className='nav-selector'
										name='grouping'
										id=''
									>
										<option value='priority'>Priority</option>
										<option value='title'>Title</option>
									</select>
								</div>
							</div>
						</div>
					</div>
					<div className='nav-right-side'>
						<div className='nav-disp-filters'>
							<div className='nav-dropdown-category'>Track by Dates</div>
							<div className='nav-dropdown-selector'>
								<select
									value={props.selectedDate}
									onChange={handleDateValue}
									className='nav-selector'
									name='grouping'
									id=''
								>
									<option value='01-12-2023'>01-12-2023</option>
									<option value='21-11-2023'>21-11-2023</option>
									<option value='23-11-2023'>23-11-2023</option>
									<option value='14-01-2023'>14-01-2023</option>

								</select>
							</div>
						</div>
						<div className='nav-disp-filters'>
							<div className='nav-dropdown-category'>Sorting by Colors</div>
							<div className='nav-dropdown-selector'>
								<select
									value={props.selectedColor}
									onChange={handleColoringValue}
									className='nav-selector'
									name='grouping'
									id=''
								>
									<option value='red'>Red</option>
									<option value='green'>Green</option>
									<option value='blue'>Blue</option>
									<option value='black'>Black</option>
									<option value='yellow'>Yellow</option>
								</select>
							</div>
						</div>
					</div>
				</div>
			</section> */}
    </div>
  );
}
