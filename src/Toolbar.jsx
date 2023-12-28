import React from 'react'

const Toolbar = ({ filter, setFilter, setIndex }) => {
    return (
        <div className='h-[11vh] w-full px-4 flex items-center justify-between'>
            <div className='gap-x-4 flex items-center'>
                <select className='bg-transparent ' name="color" id="color"
                    value={filter.color}
                    onChange={(e) => setFilter({ ...filter, color: e.target.value })}>
                    <option value="" selected>Select your color</option>
                    <option value="red">Red</option>
                    <option value="green">Green</option>
                    <option value="blue">Blue</option>
                    <option value="black">Black</option>
                    <option value="yellow">Yellow</option>
                </select>
                <select className='bg-transparent ' name="date" id="date"
                    value={filter.date}
                    onChange={(e) => setFilter({ ...filter, date: e.target.value })}>
                    <option value="" selected>Select your date</option>
                    <option value="01-12-2023">01-12-2023</option>
                    <option value="21-11-2023">21-11-2023</option>
                    <option value="23-11-2023">23-11-2023</option>
                    <option value="15-01-2023">15-01-2023</option>
                </select>
                <select className='bg-transparent ' name="status" id="status"
                    value={filter.status}
                    onChange={(e) => setFilter({ ...filter, status: e.target.value })}>
                    <option value="" selected>Select your status</option>
                    <option value="Todo">Todo</option>
                    <option value="In progress">In Progress</option>
                    <option value="done">Done</option>
                </select>
                <select className='bg-transparent ' name="priority" id="priority"
                    value={filter.priority}
                    onChange={(e) => setFilter({ ...filter, priority: e.target.value })}>
                    <option value="" selected>Select your priority</option>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                </select>
            </div>
            <div className='flex gap-x-2 items-center'>
                <button className='bg-slate-400 p-2 px-4' onClick={() => setIndex(0)}>Back</button>
                <button className='bg-slate-400 p-2' onClick={() => setFilter({
                    color: "",
                    date: "",
                    status: "",
                    priority: 0
                })}>Reset Filters</button>
            </div>
        </div>
    )
}

export default Toolbar