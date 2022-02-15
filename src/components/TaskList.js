import React, { useState, useEffect } from "react";
import Task from "./Task.js";
import taskDataFakes from "../DataTest.js";



const TaskList = (props) => {
    const [activeItem, setActiveItem] = useState(-1);
    const [page, setPage] = useState(0);
    const [listSelect, setListSelect] = useState([]);
    const changePage = (p)=>{
        setPage(p);
    }
    const calcMaxPage = (perPage = 6) => {
        let taskAmount = props.data.length;
        let quotient = ~~(taskAmount / perPage);
        let plus = taskAmount % 6 > 0 ? 1 : 0;
        return quotient + plus;
    }
    const selectTask = (isSelected,taskTitle) =>{
        let arr = listSelect;            
        console.log(isSelected);
        if (isSelected){
            arr.push(taskTitle);
        }else{
            arr = arr.filter((e) => e !== taskTitle);
            // arr.indexOf(taskTitle) !== -1 && arr.splice(arr.indexOf(taskTitle), 1);
        }
        let setSelected = new Set(arr);
        console.log(setSelected);
        setListSelect([...setSelected]);
    }
    const clearSelectTask= ()=>{
        setListSelect([]);
    }
    const deleteSelectTask = () => {
        props.handleDeleteTask(listSelect);
        setListSelect([]);
    };
    useEffect(() => {

    }, []);
    return (
            <div className="AlignRight CusForm">
                Todo List
                <input onChange={(e) => props.handleSearch(e.target.value)} placeholder="Enter Post Title"/>
                <div className="sidebar-nav">
                    <div className="sidebar-nav-menu">
                    {
                        // (page+1)*6 <= taskData.length?
                        props.data.slice(page*6, (page+1)*6).map((item,ind) => (
                                <Task
                                    data={item}
                                    setActiveItem={setActiveItem}
                                    index={ind}
                                    key ={item.taskTitle}
                                    title = {item.taskTitle}
                                    isAddTask = {false}                                    
                                    activeItem={activeItem}
                                    handleAddTask={props.handleAddTask}
                                    handleUpdateTask={props.handleUpdateTask}
                                    handleDeleteTask={props.handleDeleteTask}
                                    selectTask = {selectTask}
                                    selectedItem = {listSelect}
                                />
                        ))
                    }
                    </div>
                </div>
                <div className="Pagination">
                    <button onClick={() => changePage(page-1)} disabled={page==0}>&laquo;</button>
                    {   calcMaxPage() == 0 ? (
                            <button disabled>0</button>
                        ):
                        (
                            [...Array(calcMaxPage()).keys()].map((val,ind)=>(
                                <button onClick={ () => changePage(val)} className={(page == val) ? "active":""} key ={ind}>{val}</button>
                            ))
                        )
                    }
                    <button onClick={ () => changePage(page+1)} disabled={page == calcMaxPage()-1}>&raquo;</button>
                </div>
                {
                    listSelect.length>0 ? (
                        <div className="ChoosingPanel">
                            <p>
                                Select <strong>{listSelect.length}</strong> tasks 
                            </p> 
                            <button type="button" onClick={ () => clearSelectTask()}>
                                done
                            </button>
                            <button type="button" onClick={ () => deleteSelectTask()}>
                                delete
                            </button>
                        </div>
                    ) :''
                }

            </div>
    );
};
export default TaskList;
