import mongoose from "mongoose";
import { Cow } from "../Cow/Cow.model";
import { User } from "../User/user.model";
import { Iorder } from "./Order.interface";
import ApiError from "../../../error/apiError";
import httpStatus from "http-status";

const createOrder = async (payload: Iorder): Promise<Iorder | null> => {
  const { cow, buyer } = payload;

  // Fetch cow, buyer, and seller data
  const cowData = await Cow.findById(cow).lean();
  const buyerData = await User.findById(buyer).lean();
  const sellerData = await User.findById(cowData?.seller);

  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const cowPrice = cowData?.price;
    const buyerBudget = buyerData?.Budget;

    // Check if buyer has enough budget
    if (!cowPrice || !buyerBudget || cowPrice > buyerBudget) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Insufficient Balance");
    }

    // Update buyer's budget by deducting the cow's price
    const updatedBuyerBudget = buyerBudget - cowPrice;
    await User.findByIdAndUpdate(
      buyer,
      { Budget: updatedBuyerBudget },
      { session }
    );
    //update label
    await Cow.findByIdAndUpdate(cow, { label: "soldout" }, { session });
    // Update seller's income by adding the cow's price
    const updatedSellerIncome = (sellerData?.Income || 0) + cowPrice;
    await User.findByIdAndUpdate(
      cowData?.seller,
      { Income: updatedSellerIncome },
      { session }
    );

    // Commit the transaction
    await session.commitTransaction();
    session.endSession();

    return payload;
  } catch (error) {
    // Rollback transaction in case of error
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

export const orderservice = {
  createOrder,
};
