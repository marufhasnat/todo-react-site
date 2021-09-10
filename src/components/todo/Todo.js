import React, { useEffect, useState } from 'react';
import '../style.css';

// get the localStorage data back
const getLocalData = () => {
    const lists = localStorage.getItem("mytodoList");
    if(lists){
        return JSON.parse(lists);
    } else{
        return [];
    }
}

const Todo = () => {
    const [inputData, setInputData] = useState("");
    const [items, setItems] = useState(getLocalData());
    const [isEditItem, setIsEditItem] = useState("");
    const [toggleButton, setToggleButton] = useState(false);

    // add the items function
    const addItem = () => {
        if(!inputData){
            alert("Please Fill The Data First!")
        } else if(inputData && toggleButton) {
            setItems(
                items.map(item => {
                    if(item.id === isEditItem){
                        return { ...item, name: inputData }
                    }
                    return item;
                })
            );
            setInputData("");
            setIsEditItem(null);
            setToggleButton(false);
        } else{
            const myNewData = {
                id: new Date().getTime().toString(),
                name: inputData
            }
            setItems([...items, myNewData]);
            setInputData("");
        }
    }

    // edit the items
    const editItem = (id) => {
        const editedTodoList = items.find(item => item.id === id);

        setInputData(editedTodoList.name);
        setIsEditItem(id);
        setToggleButton(true);
    }

    // delete items section
    const deleteItem = (id) => {
        const remainingItems = items.filter(item => item.id !== id);
        setItems(remainingItems);
    }

    // remove all items
    const removeAll = () => {
        setItems([]);
    }

    // adding localStorage
    useEffect(() => {
        localStorage.setItem("mytodoList",JSON.stringify(items));
    },[items])

    return (
        <>
            <div className="main-div">
                <div className="child-div">
                    <figure>
                        <img src="./images/todo.svg" alt="logo" />
                        <figcaption>Add Your List Here 👇</figcaption>
                    </figure>
                    <div className="addItems">
                        <input type="text" placeholder="Add Item" className="form-control" value={inputData} 
                        onChange={(event) => setInputData(event.target.value)} />
                       {
                           toggleButton ?  <i className="far fa-edit add-btn" onClick={addItem}></i> :  <i className="fa fa-plus add-btn" onClick={addItem}></i> 
                       }
                    </div>
                    {/* show our items */}
                    <div className="showItems">
                        {
                            items.map((currentElement, index) => {
                                return(
                                    <div className="eachItem" key={index}>
                                        <h3>{currentElement.name}</h3>
                                        <div className="todo-btn">
                                            <i className="far fa-edit add-btn" onClick={() => editItem(currentElement.id)}></i>
                                            <i className="far fa-trash-alt add-btn" onClick={() => deleteItem(currentElement.id)}></i>
                                        </div>
                                    </div>
                                );
                            })
                        }
                    </div>
                    {/* remove all button */}
                    <div className="showItems">
                        <button className="btn effect04" data-sm-link-text="REMOVE ALL" onClick={removeAll}><span>CHECK LIST</span></button>
                    </div>
                </div>
            </div>   
        </>
    );
};

export default Todo;