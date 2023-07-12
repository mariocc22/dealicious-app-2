"use client";
import Link from "next/link";
import { useEffect } from "react";
import Header from "@/app/components/Header/Header";
import SubHeader from "@/app/components/Header/SubHeader";

import ChartCard from "@/app/components/ChartCard";
import MainGrid from "@/app/components/MainGrid";
import DoughnutChart from "../../../../../components/Chart/DoughnutChart";
import LineChart from "../../../../../components/Chart/LineChart";
import BarChart from "../../../../../components/Chart/BarChart";
import ChartCardTitle from "../../../../../components/Chart/ChartCardTitle";
import { Box } from "@mui/material";

import { usePathname } from "next/navigation";


// user context
import { useStore } from "@/lib/context/user_context/store";

const Page = async () => {
  const { restaurantOwnerId, restaurantId , setRestaurantOwner, setRestaurantId} = useStore();
  const pathname = usePathname();
  const URLrestaurantOwnerId = pathname.split("/")[4];
  const URLrestaurantId = pathname.split("/")[5];

  console.log("This is the restaurantOwnerId 2: ", restaurantOwnerId);
  console.log("This is the restaurantId: ", restaurantId);

  // ! check if this is needed any more after set up of up state at dashboard/page.jsx
  useEffect(() => {
    const setRestaurantOwnerFromParam =  () => {
      setRestaurantOwner(URLrestaurantOwnerId);
    };
    setRestaurantOwnerFromParam();
  }, [URLrestaurantOwnerId]);

  useEffect(() => {
    const setRestaurantIdFromParam =  () => {
      setRestaurantId(URLrestaurantId);
    };
    setRestaurantIdFromParam();
  }, [URLrestaurantId]);

  console.log("This is the URLrestaurantOwnerId: ", URLrestaurantOwnerId);
  console.log("This is the URLrestaurantId: ", URLrestaurantId);
  console.log("This is the restaurantOwnerId: ", restaurantOwnerId);

  console.log("This is the restaurantId: ", restaurantId);

  // const spendingsData = await fetchInsightsOverview(
  //   restaurantOwnerId,
  //   restaurantId
  // );
  // console.log(spendingsData);

  return (
    <>
      <Header props={"Insights"} />
      {/* CHANGE THIS COMPONENT TO DROWDOWN WITH ALL CAMPAIGN AND PINNED CAMPAIGN ON TOP */}
      <SubHeader props={"Campaing Data Overview(All)"} />
      <SubHeader
        props={"ADD THE CARDS AND MAKE THE FETCH IN THE CARD, NOT HERE!"}
      />

      {/*====== SET GRID ======*/}
      <MainGrid>
      <ChartCard gridColumn={"span 1"}>
          <ChartCardTitle text={"Number of:"} pinStatus={""}></ChartCardTitle>
          <DoughnutChart></DoughnutChart>
          
          
        </ChartCard>
        <ChartCard gridColumn={"span 1"}>
          
          <LineChart></LineChart>
          
          
        </ChartCard>
        <ChartCard gridColumn={"span 1"}>
          
          <BarChart></BarChart>
          
          
        </ChartCard>
        <ChartCard gridColumn={"span 2"}>
          averageBillSize
          {/* {spendingsData.averageBillSize} */}
        </ChartCard>
        <ChartCard gridColumn={"span 1"}>
          to
          {/* {spendingsData.totalRevenue} */}
        </ChartCard>
        <ChartCard gridColumn={"span 1"}>
          nonSuperCustomers
          {/* {spendingsData.customerCount.nonSuperCustomers} */}
          <br />
          superCustomers
          {/* {spendingsData.customerCount.superCustomers} */}
        </ChartCard>

        <ChartCard gridColumn={"span 1"}>
          foodQualityCount
          {/* {spendingsData.opportunities.foodQualityCount} */}
          <br />
          foodQuantityCount
          {/* {spendingsData.opportunities.foodQuantityCount} */}
          <br />
          placeCount
          {/* {spendingsData.opportunities.placeCount} <br /> */}
          serviceCount
          {/* {spendingsData.opportunities.serviceCount} */}
          <br />
        </ChartCard>

        <ChartCard gridColumn={"span 2"}>
          nonSuperCustomers
          {/* {spendingsData.customerSpendings.nonSuperCustomers} */}
          <br />
          superCustomers
          {/* {spendingsData.customerSpendings.superCustomers} */}
        </ChartCard>
        {/* {spendingsData.topCampaigns.map((item) => (
          <ChartCard gridColumn={"span 1"}>{item.campaignName}</ChartCard>
        ))} */}
      </MainGrid>
     
     
    </>
  );
};

export default Page;
