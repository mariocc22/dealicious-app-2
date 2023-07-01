import { NextResponse } from "next/server";
import connect from "@/utils/database";
import mongoose from "mongoose";
import SuperCustomer from "@/models/superCustomer";

export const GET = async (request) => {
  try {
    await connect();

    // get the collection of movies without a Schema
    const superCustomer = await mongoose.connection.db
      .collection("supercustomers")
      .find({})
      .toArray();

    return new NextResponse(JSON.stringify(superCustomer), { status: 200 });
  } catch (err) {
    console.log(err.message);
    return new NextResponse("Database Error", { status: 500 });
  }
};

export const POST = async (request) => {
  const superCustomerInfo = await request.json();
  
  try {
    await connect();

    const superCustomer = await mongoose.connection.db
      .collection("supercustomers")
      .findOne({ phone: superCustomerInfo.phone });

    if (superCustomer)
      throw new Error("Email already exists! Try another one. Please");

    const superCustomerNew = await new SuperCustomer({
      birthDate: superCustomerInfo.birthDate,
      phone: superCustomerInfo.phone,
      //restaurantId: superCustomerInfo.restaurantId,
      url: superCustomerInfo.url,
    });

    await superCustomerNew.save();
    return new NextResponse(JSON.stringify(superCustomerNew), { status: 200 });
  } catch (err) {
    console.log(err.message);
    return new NextResponse(err.message, { status: 500 });
  }
};