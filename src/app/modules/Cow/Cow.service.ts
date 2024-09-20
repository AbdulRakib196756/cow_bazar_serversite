import { SortOrder } from "mongoose";

import { IgenericResponse } from "../../../interface/common";
import { IpaginationOption } from "../../../interface/Ipaginationoption";
import { cowsearchFeild } from "./cow.constant";
import { Icow, Icowfilters } from "./Cow.interface";
import { Cow } from "./Cow.model";
import { paginationhelpers } from "../../../helpers/paginationhelpers";

const createCow = async (payload: Icow): Promise<Icow> => {
  const data = await Cow.create(payload);

  return data;
};

const getsinglecow = async (id: string): Promise<Icow | null> => {
  const data = await Cow.findById(id).populate("seller");
  return data;
};

const getallcow = async (
  paginationdata: IpaginationOption,
  filterfeild: Icowfilters
): Promise<IgenericResponse<Icow[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationhelpers.calculatepagination(paginationdata);
  const { searchTerm, maxprice, minprice, ...filtersdata } = filterfeild;

  const andcondition = [];

  if (searchTerm) {
    andcondition.push({
      $or: cowsearchFeild.map((feild) => ({
        [feild]: {
          $regex: searchTerm,
          $options: "i",
        },
      })),
    });
  }

  if (Object.keys(filtersdata).length) {
    andcondition.push({
      $and: Object.entries(filtersdata).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  if (maxprice && minprice) {
    andcondition.push({
      price: { $gte: minprice, $lte: maxprice },
    });
  }

  const sortcondtion: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortcondtion[sortBy] = sortOrder;
  }

  const wherecondition = andcondition.length > 0 ? { $and: andcondition } : {};

  const result = await Cow.find(wherecondition)
    .sort(sortcondtion)
    .limit(limit)
    .skip(skip);

  const total = await Cow.countDocuments(wherecondition);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

export const cowservice = {
  createCow,
  getsinglecow,
  getallcow,
};
