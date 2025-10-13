import { createSlice } from "@reduxjs/toolkit";

const loadOrdersFromStorage = () => {
  try {
    const savedOrders = localStorage.getItem("orders");
    return savedOrders ? JSON.parse(savedOrders) : [];
  } catch (error) {
    console.error("Error loading orders:", error);
    return [];
  }
};

const saveOrdersToStorage = (orders) => {
  localStorage.setItem("orders", JSON.stringify(orders));
};

let orderCounter = 1;

export const orderSlice = createSlice({
  name: "orders",
  initialState: {
    items: loadOrdersFromStorage(),
  },
  reducers: {
    placeOrder: (state, action) => {
      const { cartItems, total } = action.payload;
      const newOrder = {
        id: `ORD${String(orderCounter).padStart(5, "0")}`,
        items: cartItems,
        total,
        date: new Date().toLocaleString(),
        status: "Pending Payment", // ✅ starts as pending
      };
      orderCounter++;
      state.items.push(newOrder);
      saveOrdersToStorage(state.items);
    },
    updateOrderStatus: (state, action) => {
      const { id, status } = action.payload;
      const order = state.items.find((o) => o.id === id);
      if (order) {
        order.status = status;
        saveOrdersToStorage(state.items);
      }
    },
    clearOrders: (state) => {
      state.items = [];
      saveOrdersToStorage(state.items);
    },
  },
});

export const { placeOrder, updateOrderStatus, clearOrders } = orderSlice.actions;
export default orderSlice.reducer;
