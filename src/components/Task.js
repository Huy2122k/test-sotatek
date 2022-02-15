import React, { useState, useEffect } from "react";


const Task = (props) => {
    const [dueDate, setDueDate] = useState(props.data.dueDate);//new Date().toISOString().split('T')[0]);
    const [taskTitle, setTaskTitle] = useState(props.data.taskTitle);
    const [isSelected, setSelected] = useState(false);
    const [description, setDescription] = useState(props.data.description);
    const [priority, setPriority] = useState(props.data.priority);
    const handleSubmit = (event) => {
        event.preventDefault();
        let data = { 
            taskTitle: taskTitle,
            description: description,
            dueDate: dueDate,
            priority: priority,
        };
        if(props.isAddTask){
            props.handleAddTask(data);
        }else{
            props.handleUpdateTask(data, props.title);
        }
    }
    const handleSelectTask = (event) =>{
        setSelected(event.target.checked);
        props.selectTask(event.target.checked, props.data.taskTitle);
        // console.log(event.target.value);
    }
    const deleteTask = () => {
        props.handleDeleteTask([taskTitle]);
        props.setActiveItem(-1);
    }
    useEffect(() => {
        if(props.listSelect){
            setSelected(props.listSelect.includes(props.taskTitle));
        }
    }, []);
    const expanded = props.activeItem === props.index;
    const cls = "sidebar-nav-menu-item " + (expanded ? "item-active" : "");
    return (
        <div className={cls} >
            <div className="sidebar-nav-menu-item-head">
            { props.isAddTask?"": (<div className="sidebar-nav-menu-item-head-title">{taskTitle}</div>)}
            <div className="sidebar-nav-menu-item-head-help">
            {
                props.isAddTask ?"":(
                    <button
                        type="button"
                        className="btn-help"
                        onClick={() => props.setActiveItem(props.index)}
                    >
                        View more info
                    </button>
                )   
            }  
            </div>
            <div className="sidebar-nav-menu-item-head-icon">
                <i className="fa fa-caret-down" aria-hidden="true" />
            </div>
            {props.isAddTask? "" : (<input type="checkbox" value={isSelected} onChange ={handleSelectTask}/>)}
            </div>
            <div className="sidebar-nav-menu-item-body">
                <form onSubmit={handleSubmit}>
                    <input type="text" value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)} placeholder="Task title..." required/>
                    <textarea value = {description} onChange={(e) =>setDescription(e.target.value)}placeholder="About you" />
                    <input 
                        type="date" 
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        min = {new Date().toISOString().split('T')[0]}
                        />
                    <select value={priority} onChange ={(e)=> setPriority(e.target.value)}>
                        <option value="Normal">Normal</option>
                        <option value="Low">Low</option>
                        <option value="High">High</option>
                    </select>
                    {/* <button type="submit" onClick={handleSubmit}>Add</button> */}
                    <input type="submit" value={props.isAddTask? "Add Task":"Update Task"}/>
                </form>
                {props.isAddTask ? "": <button onClick={deleteTask}>delete</button>}

                {/* <DatePicker
                    selected={date}
                    onChange={date => setDate(date)}
                    minDate={new Date()}
                    maxDate={new Date("02-29-2050")}
                    placeholderText="Select a date to start"
                /> */}
            </div>
        </div>
    );
};
export default Task;
