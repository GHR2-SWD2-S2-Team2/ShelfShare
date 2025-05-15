import React, { useState } from "react";
import ZeroOrders from "./ZeroOrders";
import { useGetOrdersQuery } from "../../app/features/ordersApi";
import Pagination from "./Pagination";
import OrderRowSkeleton from "./OrderRowSkeleton";
import OrderRow from "./OrderRow";

const OrdersHistory = ({ limit = 5 }) => {
  const [page, setPage] = useState(1);

  const { data, isLoading, isFetching, isError } = useGetOrdersQuery({
    filters: {
      page,
      limit,
    },
    token: localStorage.getItem("userToken"),
  });

  if (isLoading || isFetching)
    return (
      <>
        <OrderRowSkeleton />
        <OrderRowSkeleton />
        <OrderRowSkeleton />
        <OrderRowSkeleton />
        <OrderRowSkeleton />
        <Pagination
          page={page}
          totalPages={data?.totalPages || 1}
          onChange={(_, newPage) => {
            setPage(newPage);
          }}
        />
      </>
    );
  if (isError)
    return (
      <div className="text-red-500">
        Error loading orders. Please try again later.
      </div>
    );
  if (!data?.orders?.length) return <ZeroOrders />;

  return (
    <>
      <div className="mx-auto w-full">
        <ul className="space-y-4 w-full">
          {data?.orders?.map((order) => (
            <OrderRow key={order._id} order={order} isForAdmin={false} />
          ))}
        </ul>
      </div>

      <Pagination
        page={page}
        totalPages={data?.totalPages || 1}
        onChange={(_, newPage) => {
          setPage(newPage);
        }}
      />
    </>
  );
};

export default OrdersHistory;
