import { SortOrder } from "mongoose";
import { IpaginationOption } from "../interface/Ipaginationoption";

type Ipaginationreturn = {
  page: number;
  limit: number;
  skip: number;
  sortBy: string;
  sortOrder: SortOrder;
};

const calculatepagination = (
  paginationdata: IpaginationOption
): Ipaginationreturn => {
  const page = paginationdata.page || 1;
  const limit = paginationdata.limit || 10;
  const skip = (page - 1) * limit;
  const sortBy = paginationdata.sortBy || "createdAt";
  const sortOrder = paginationdata.sortOrder || "desc";

  return {
    page,
    limit,
    skip,
    sortBy,
    sortOrder,
  };
};
export const paginationhelpers = {
  calculatepagination,
};
