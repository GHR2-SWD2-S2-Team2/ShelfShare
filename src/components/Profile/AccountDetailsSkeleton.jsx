import { Skeleton } from "@mui/material";
import React from "react";

const AccountDetailsSkeleton = () => {
  return (
    <div className="flex flex-col md:flex-row items-center gap-4">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4">
          <Skeleton
            variant="rectangular"
            width={40}
            height={10}
            className="rounded-md"
          />
          <Skeleton
            variant="rectangular"
            width={250}
            height={40}
            className="rounded-md"
          />
        </div>
        <div className="flex flex-col gap-4">
          <Skeleton
            variant="rectangular"
            width={40}
            height={10}
            className="rounded-md"
          />
          <Skeleton
            variant="rectangular"
            width={250}
            height={40}
            className="rounded-md"
          />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4">
          <Skeleton
            variant="rectangular"
            width={40}
            height={10}
            className="rounded-md"
          />
          <Skeleton
            variant="rectangular"
            width={250}
            height={40}
            className="rounded-md"
          />
        </div>
        <div className="flex flex-col gap-4">
          <Skeleton
            variant="rectangular"
            width={40}
            height={10}
            className="rounded-md"
          />
          <Skeleton
            variant="rectangular"
            width={250}
            height={40}
            className="rounded-md"
          />
        </div>
      </div>
    </div>
  );
};

export default AccountDetailsSkeleton;
