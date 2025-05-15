// import Title from "../components/ui/Title";
import AccountDetails from "./AccountDetails";
import OrdersHistory from "./OrdersHistory";

const Profile = () => {
  return (
    <div
      className="flex flex-col items-center p-4 md:p-6 gap-6 min-h-screen mt-25"
      style={{ minHeight: "calc(100vh - 80px)" }}
    >
      <div className="flex flex-col items-center gap-4">
        {/* <Title title="Account Details" color="var(--color-primary)" /> */}
        <AccountDetails />
      </div>
      <div
        className="mt-10 container lg:px-50 flex flex-col items-center gap-4"
        id="orders"
      >
        {/* <Title title="Orders History" color="var(--color-primary)" /> */}
        <OrdersHistory />
      </div>
    </div>
  );
};

export default Profile;
