import React, { useState, useEffect } from "react";


const Task = (props) => {
    const [dueDate, setDueDate] = useState(props.data.dueDate);//new Date().toISOString().split('T')[0]);
    const [taskTitle, setTaskTitle] = useState(props.data.taskTitle);
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
        props.selectTask(event.target.checked, props.data.taskTitle);
        // console.log(event.target.value);
    }
    const deleteTask = () => {
        props.handleDeleteTask([taskTitle]);
        props.setActiveItem(-1);
    }
    const handleDetailClick = () => {


        if(props.activeItem === props.index){
            props.setActiveItem(-1);
        }
        else{
            props.setActiveItem(props.index);
        }
    }
    useEffect(() => {

    }, []);
    const expanded = props.activeItem === props.index;
    const cls = "sidebar-nav-menu-item " + (expanded ? "item-active" : "");
    
    return (
        <div className={cls} >
            <div className="sidebar-nav-menu-item-head">
            {   props.isAddTask? "" : 
                    (
                        <label className="CheckBoxCus">
                            <input type="checkbox" 
                                checked={props.selectedItem.includes(props.title)} 
                                onChange ={handleSelectTask}/
                            >
                            <span className="checkmark"></span>
                        </label>
                    )
            }
            { props.isAddTask? "" : 
                ( <div className="sidebar-nav-menu-item-head-title"
                    style={{color:((priority =="Normal") ? "#1da1f2" :((priority == "High")? "#f27474" : "#a5dc86" ))}}
                    >
                        {taskTitle}
                    </div>
                )
            }
            <div className="sidebar-nav-menu-item-head-help">
            {
                props.isAddTask ? "":(
                    <button
                        type="button"
                        className="ButtonHoverAnim Detail"
                        onClick={handleDetailClick}
                    >
                        <span> Details </span>
                    </button>
                )   
            }
            {props.isAddTask ? "": <button className="ButtonHoverAnim Delete" onClick={deleteTask}><span> Remove </span></button>}
            </div>

            </div>
            <div className="sidebar-nav-menu-item-body">
                <form onSubmit={handleSubmit}>
                    <div className="InputGroup">
                        <span><b>Task Name </b>📃</span>
                        <br/>
                        <input className="InputCustom" type="text" value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)} placeholder="Task title..." required/>
                    </div>
                    <div className="InputGroup">
                        <span><b>Description </b>📝</span>
                        <textarea className="InputCustom" value = {description} onChange={(e) =>setDescription(e.target.value)}placeholder="About you" />
                    </div>
                    <div className="InputGroup">
                        <div className="InputGroup2">
                            <div className="InputGroup3" style={{width:"55%"}}>
                                <span><b>Due Date</b>📅</span>
                                <input 
                                    className="InputDate"
                                    type="date" 
                                    value={dueDate}
                                    onChange={(e) => setDueDate(e.target.value)}
                                    min = {new Date().toISOString().split('T')[0]}
                                />
                            </div>
                            <div className="InputGroup3" style={{width:"40%"}}>
                                <span><b>Priority </b>🔔</span>
                                <select className="InputSelect" value={priority} onChange ={(e)=> setPriority(e.target.value)}>
                                    <option value="Low">🟢 Low</option>
                                    <option value="Normal">🔵 Normal</option>
                                    <option value="High">🔴 High</option>
                                </select>
                            </div>
                        </div>

                    </div>
                    {/* <button type="submit" onClick={handleSubmit}>Add</button> */}
                    <div className="InputGroup">
                        <input className="BtnSubmit" type="submit" value={props.isAddTask? "Add Task":"Update Task"}/>
                    </div>
                </form>

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
