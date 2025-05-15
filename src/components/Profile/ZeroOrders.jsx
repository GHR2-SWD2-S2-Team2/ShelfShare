import React from "react";

const ZeroOrders = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-20">
      <h2 className="text-2xl font-bold">No orders found</h2>
      <p className="text-gray-500">You have not placed any orders yet.</p>
    </div>
  );
};

export default ZeroOrders;
