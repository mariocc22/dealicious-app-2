import { NextResponse } from "next/server";
import connect from "@/utils/database";
import Restaurant from "@/models/restaurant";
import Campaign from "@/models/campaign";
import Spending from "@/models/spending";

export const GET = async (request) => {
  const url = new URL(request.url);
  const restaurantOwner = url.pathname.split("/")[5];

  try {
    await connect();

    const restaurant = await Restaurant.findOne(
      { userId: restaurantOwner },
      { _id: 1 }
    ).lean();

    if (!restaurant) {
      return new NextResponse(JSON.stringify({ data: null }), { status: 200 });
    }

    const restaurantId = restaurant._id;

    const campaigns = await Campaign.aggregate([
      {
        $match: { restaurantId: restaurantId },
      },
      {
        $lookup: {
          from: "spendings",
          let: { campaignId: "$_id" },
          pipeline: [
            { $match: { $expr: { $eq: ["$campaignId", "$$campaignId"] } } },
            {
              $group: {
                _id: null,
                totalBillAmount: { $sum: "$billamount" },
                count: { $sum: 1 },
              },
            },
          ],
          as: "spendings",
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          totalBillAmount: {
            $ifNull: [{ $sum: "$spendings.totalBillAmount" }, 0],
          },
          count: { $ifNull: [{ $sum: "$spendings.count" }, 0] },
        },
      },
    ]);

    const [totals] = await Campaign.aggregate([
      {
        $match: { restaurantId: restaurantId },
      },
      {
        $lookup: {
          from: "spendings",
          localField: "_id",
          foreignField: "campaignId",
          as: "spendings",
        },
      },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: { $sum: "$spendings.billamount" } },
          totalCustomers: { $sum: { $size: "$spendings" } },
        },
      },
    ]);

    const { totalRevenue, totalCustomers } = totals || {
      totalRevenue: 0,
      totalCustomers: 0,
    };

    return new NextResponse(
      JSON.stringify({ campaigns, totalRevenue, totalCustomers }),
      { status: 200 }
    );
  } catch (err) {
    console.log(err.message);
    return new NextResponse("Database Error", { status: 500 });
  }
};
