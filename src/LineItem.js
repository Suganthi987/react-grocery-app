

const LineItem =({id,item,handleCheck,handleDelete}) => {
    return (
        <li key = {id}>
                            <input 
                                type="checkbox"
                                onChange={()=>handleCheck(item.id)}
                                checked = {item.checked}
                            />
                            <label
                                style={(item.checked)?{textDecoration: 'line-through'}:null}
                                onDoubleClick={()=>handleCheck(item.id)}
                            >{item.item}</label>
                            <button onClick = {()=>handleDelete(item.id)}>Delete</button>
        </li>
    )
}

export default LineItem