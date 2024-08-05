import '../styles.css';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

export default function ToDo() {
    const [note, setNote] = useState("");
    const [inputList, setInputList] = useState([]);
    const [editting, setEditting] = useState(0);
    const [editItem, setEditItem] = useState({});

    function update(event)
    {
        setNote(event.target.value);
    }

    function add()
    {
        if(note === "")
            return;

        if(editting)
        {
            setInputList(inputList.map((items) => {
                if(items.id === editItem.id)
                    return {...items, data:note};
                return items;
            }));
            setEditting(0);

        }
        else
        {
            const item = {id: new Date().getTime().toString(), data : note, uploadAt : new Date()};
            setInputList([...inputList, item]);
        }

        setNote("");
    }

    function remove(id) {
        let arr = inputList;
        arr = arr.filter((value) => value.id!==id);
        setInputList([...arr]);
    }

    function edit(id) {
        setEditting(1);
        const item = inputList.find((value) => value.id === id);
        setNote(item.data);
        setEditItem({...item});
    }

    return (
        <div className='body'>
            <input type='text' className='content' placeholder='Add an item' value={note} onChange={update}></input>
            {editting?<FontAwesomeIcon icon={faEdit} className='editIcon' onClick={add}/>:<button className='addIcon' onClick={add}>+</button>}
            
            <ul>
            
                {inputList.map((value) => {
                    return (
                            <li key={value.id}>
                            <input type='checkbox' className='checkbox'></input>
                            {value.data}
                            <FontAwesomeIcon icon={faTrash} className='button' onClick={() => remove(value.id)}/>
                            <FontAwesomeIcon icon={faEdit} className='button' onClick={() => edit(value.id)}/>
                            </li>
                    )
                })}
            </ul>
        </div>
    );
}