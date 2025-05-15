import { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import {
  Box,
  CheckCircle,
  ChevronDown,
  Clock,
  CreditCard,
  XCircle,
} from "lucide-react";
// import StarRate from "./StarRate";

const statusIcons = {
  pending: <Clock className="text-amber-500" size={18} />,
  paid: <CheckCircle className="text-green-500" size={18} />,
  failed: <XCircle className="text-red-500" size={18} />,
};

const OrderRow = ({ order, isForAdmin }) => {
  const [isOpened, setIsOpened] = useState(false);
  const toggleOpen = () => setIsOpened((prev) => !prev);

  return (
    <motion.li
      className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all mb-4 "
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div
        onClick={toggleOpen}
        className="p-5 cursor-pointer flex flex-col gap-4"
      >
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Box className="text-primary" size={24} />
            <h3 className="text-lg font-semibold text-gray-800">
              Order #{order._id.slice(-10)}
            </h3>
          </div>
          <ChevronDown
            className={`transition-transform ${isOpened ? "rotate-180" : ""}`}
          />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <OrderDetail label="Date">
            {new Date(order.createdAt).toLocaleDateString()}
          </OrderDetail>
          <OrderDetail label="Total">
            <span className="text-primary font-medium">
              {order.totalAmount.toFixed(2)} EGP
            </span>
          </OrderDetail>
          <OrderDetail label="Payment">
            <div className="flex items-center gap-2 capitalize">
              {statusIcons[order.paymentStatus]}
              {order.paymentStatus}
            </div>
          </OrderDetail>
          <OrderDetail label="Items">
            {order.books.reduce((acc, item) => acc + item.qty, 0)}
          </OrderDetail>
        </div>

        {isForAdmin && (
          <div className="bg-indigo-50 p-4 rounded-lg">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <OrderDetail label="Customer">{order.user.name}</OrderDetail>
              <OrderDetail label="Contact">
                <p>{order.user.email}</p>
                <p>{order.user.phone}</p>
              </OrderDetail>
            </div>
          </div>
        )}
      </div>

      <AnimatePresence>
        {isOpened && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="px-6 pb-6 pt-2 border-t border-gray-100"
          >
            <div className="space-y-6">
              <h4 className="font-medium flex items-center gap-2">
                <CreditCard size={18} />
                Order Details
              </h4>

              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500 mb-1">Shipping Address</p>
                <p className="font-medium">{order.user.address}</p>
              </div>

              {/* Products List */}
              <div>
                <p className="font-semibold mb-3">Products</p>
                <div className="space-y-3">
                  {order.books.map((item) => (
                    <motion.div
                      key={item._id}
                      className="flex items-center gap-4 p-3 bg-white rounded-lg border border-gray-100 hover:border-primary transition-colors"
                      whileHover={{ x: 5 }}
                    >
                      <img
                        src={item.book.image}
                        alt={item.book.title}
                        className="w-16 h-24 sm:h-22 object-cover rounded-lg"
                      />
                      <div className="flex-1 flex flex-col gap-1 sm:gap-2">
                        <div className="flex items-center gap-2">
                          <p className="font-medium">{item.book.title}</p>
                        </div>
                        <p className="text-sm text-gray-500">
                          Quantity: {item.qty}
                        </p>
                        {/* {!isForAdmin &&
                          (item.book.userRating ||
                            order.paymentStatus === "paid") && (
                            // <StarRate
                            //   bookId={item.book._id}
                            //   userRating={item.book.userRating}
                            // />
                          )} */}
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">
                          {item.book.price.toFixed(2)} /each
                        </p>
                        <p className="font-medium">
                          {(item.book.price * item.qty).toFixed(2)} EGP
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Transaction ID */}
              <div className="flex justify-end pt-4 border-t border-gray-100">
                <div className="text-right">
                  <p className="text-sm text-gray-500">Transaction ID</p>
                  <p className="font-mono text-sm break-all">
                    {order.stripeSessionId}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.li>
  );
};

const OrderDetail = ({ label, children }) => (
  <div>
    <p className="text-gray-500">{label}</p>
    <div className="font-medium">{children}</div>
  </div>
);

export default OrderRow;
