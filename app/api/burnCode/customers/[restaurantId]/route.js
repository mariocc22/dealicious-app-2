import { NextResponse } from "next/server";
import connect from "@/utils/database";
import Restaurant from "@/models/restaurant";
import Burncode from "@/models/burncode";

// GET CODES FROM THE OWNER SIDE
export const GET = async (request) => {
  const url = new URL(request.url);
  const restaurantId = url.pathname.split("/")[4];

  try {
    await connect();

    const restaurant = await Restaurant.findOne({
      _id: restaurantId,
      burned: false,
    }).lean();

    if (!restaurant) {
      return new NextResponse(JSON.stringify({ data: null }), { status: 200 });
    }

    const burncodes = await Burncode.find({
      restaurantId: restaurantId,
    })
      .select({
        username: 1,
        campaignname: 1,
        offer: 1,
        burned: 1,
      })
      .lean();

    const response = {
      burncodes,
    };
    console.log(response);
    return new NextResponse(JSON.stringify(response, null, 2), { status: 200 });
  } catch (err) {
    console.log(err.message);
    return new NextResponse("Database Error", { status: 500 });
  }
};

// POST CODES TO THE OWNER SIDE
export const POST = async (req) => {
  try {
    await connect();
    const burnCode = await req.json();

    const newBurnCode = new Burncode({
      username: burnCode.username || "",
      campaignname: burnCode.campaignname || "",
      offer: burnCode.offer || "",
      burned: false,
      restaurantId: burnCode.restaurantId
        ? new mongoose.Types.ObjectId(burnCode.restaurantId)
        : undefined,
      campaignId: burnCode.campaignId
        ? new mongoose.Types.ObjectId(burnCode.campaignId)
        : undefined,
    });

    await newBurnCode.save();

    return new NextResponse(200, { message: "Code created successfully" });
  } catch (error) {
    return new NextResponse(500, {
      message: "Error creating campaign, check the inputs",
    });
  }
};
