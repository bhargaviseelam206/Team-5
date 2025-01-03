import { createContext, useState } from "react";
import { food_list } from "../assets/assets"; // Assuming this is your food data
import axios from "axios"
// Create the context
export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {

  const [cartItems, setCartItems] = useState({});
  const url="http://localhost:4000"
  const [token,setToken]=useState("");
  //const [food_list,setFoodList]=useState([])

  // Function to add an item to the cart
  const addToCart = (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
  const [cartItems, setCartItems] = useState({}); // State for cart items

  // Function to add an item to the cart
  const addToCart = async (itemId) => {
    //console.log("Adding item to cart:", itemId);
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));

    // Uncomment this block if using backend API
    /*
    if (token) {
      await axios.post(url + "/api/cart/add", { itemId }, { headers: { token } });
main
    }
    */
  };

  // Function to remove an item from the cart
  const removeFromCart = (itemId) => {
    setCartItems((prev) => {
      const newCart = { ...prev };
      if (newCart[itemId] > 1) {
        newCart[itemId] -= 1;
      } else {
        delete newCart[itemId];
      }
      return newCart;
    });
  };

  // Function to calculate the total cart amount
 /* const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        const itemInfo = food_list.find((product) => product._id === parseInt(item));
        if (itemInfo) {
          totalAmount += itemInfo.price * cartItems[item];
        }
      }
    }
    return totalAmount;
  };*/
  const getTotalCartAmount = () => {
    let totalAmount = 0;
dev2
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);

  
    // Log cartItems and food_list for debugging
    //console.log('Cart Items:', cartItems);
    //console.log('Food List:', food_list);
  
    // Create a lookup map for food_list for better performance
    const foodMap = food_list.reduce((map, product) => {
      map[product._id] = product;
      return map;
    }, {});
  
    // Log the foodMap to see the mapping of item IDs to product details
    console.log('Food Map:', foodMap);
  
    // Iterate over cartItems and calculate the total
    for (const item in cartItems) {
      const quantity = cartItems[item];
      if (quantity > 0) {
        const itemId = parseInt(item); // Convert key to number if needed
        const itemInfo = foodMap[itemId];
  
        // Log each item being processed
        console.log(`Processing item ID: ${itemId}, Quantity: ${quantity}, Item Info:`, itemInfo);
  
 main
        if (itemInfo) {
          totalAmount += itemInfo.price * quantity;
        } else {
          console.warn(`No matching item found for ID: ${itemId}`);
        }
      }
    }
  
    // Log the calculated total amount
    console.log('Total Amount:', totalAmount);
  
    // Return the total amount
    return totalAmount;
  };
 dev2
  /*const fetchFoodList=async()=>{
    const response=await axios.get("/api/food/list");
    setFoodList(response.data.data)
  }*/
  useEffect(()=>{
    
      //async function loadData(){
        //await fetchFoodList();
      if(localStorage.getItem("token")){
        setToken(localStorage.getItem("token"));
      }
    
    //loadData();
    
  },[])

  
main

  // Context value to provide
  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
