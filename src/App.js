import Header from "./Header";
import Footer from "./Footer";
import AddItem from "./AddItem";
import Content from "./Content";
import {useState,useEffect} from 'react';
import Search from "./Search";
import apiRequest from "./apiRequest";

  function App() {
    const API_URL = "http://localhost:3500/items";
    const [items,setItems] = useState([]);

    const [newItem,setNewItem] =useState('')
    
    const [search,setSearch] = useState('')

    useEffect (() => {
      
      const fetchItems = async () =>{
        try {
          const response = await fetch(API_URL);
          const listItems = await response.json();
          console.log(listItems);
          setItems(listItems);

        }catch(err){
          console.log(err.stack);

        }
      }

      (async () => await fetchItems())();

    },[]);

    const setAndSaveItems = (newItems) =>{
      setItems(newItems);
      // localStorage.setItem('shoppinglist',JSON.stringify(newItem));
    }

    const addItem = async (item) => {
      const id = items.length ? items[items.length -1].id +1 : 1;
      const myNewItem = {id,checked:false, item};
      const listItems=[...items,myNewItem];
      setAndSaveItems(listItems);

      const postOptions = {
        method : "POST",
        headers : {
          'Content-Type':'application/json'},
          body : JSON.stringify(myNewItem)
        }
        const result = await apiRequest(API_URL,postOptions);

        }
      

    const handleCheck = async (id) =>{
      const listItems = items.map((item) => item.id === id?{...item, checked : !item.checked} : item);
      setAndSaveItems(listItems);

      const myItem = listItems.filter((item)=>item.id === id);
      const updateOptions = {
        method : "PATCH",
        headers :{
          "Content-Type" : "application/json"},
          body : JSON.stringify({checked:myItem[0].checked})
        };
        const reqUrl =`${API_URL}/${id}`;
        const result = await apiRequest(reqUrl,updateOptions);
      }

  const handleDelete = async (id) =>{
      const listItems = items.filter((item)=>item.id !== id);
     setAndSaveItems(listItems);

     const deleteOptions = {
      method : "DELETE"};
      const reqUrl =`${API_URL}/${id}`;
      const result = await apiRequest(reqUrl,deleteOptions);

     }
  

  const handleSubmit =(e) =>{
    e.preventDefault();
    if(!newItem) return;
    addItem(newItem);
    setNewItem('');

  }


  return (
    <div className="App">
      <Header title="Grocery List" 
      />
      
      <AddItem 
      newItem={newItem}
      setNewItem={setNewItem}
      handleSubmit = {handleSubmit}
      />
      <Search 
        search = {search}
        setSearch={setSearch}
      />
      <Content items= {items.filter(item => ((item.item).toLowerCase().includes(search.toLowerCase())))}
               handleCheck={handleCheck}
               handleDelete={handleDelete} 
      />
      <Footer length = {items.length}
      />
      
    </div>
  );
}

export default App;
