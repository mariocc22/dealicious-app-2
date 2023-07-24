"use client";

import SCRestaurantCard from "../../../../components/SuperCustomer/SCRestaurantCard";
import SCHeader from "../../../../components/Header/SCHeader";
import SCFooter from "../../../../components/Footer/SCFooter";
import PointsEarned from "../../../../components/SuperCustomer/PointsEarned";
import Share from "../../../../components/SuperCustomer/Share";
import CampaignCard from "@/app/components/SuperCustomer/CampaignCard";
import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Loader from "@/app/components/Loader";

const Page = ({ params }) => {
  const { superCustomerId, restaurantId } = params;
  const [restaurantData, setRestaurantData] = useState({});

  useEffect(() => {
    const fetchRestaurants = async (superCustomerId, restaurantId) => {
      const res = await fetch(
        `/api/superCustomer/singleRestaurant/${superCustomerId}/${restaurantId}`,
        {
          cache: "no-store",
        }
      );

      if (!res.ok) throw new Error("Something went wrong...");

      const data = await res.json();
      setRestaurantData(data);
    };
    fetchRestaurants(superCustomerId, restaurantId);
  }, [superCustomerId, restaurantId]);

  return (
    <>
      <SCHeader />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          m: "2rem",
          p: 0,

          "@media screen and (min-width:800px)": {
            display: "flex",
            flexDirection: "row",
          },
        }}
      >
        <SCRestaurantCard {...restaurantData.restaurant} />
        <PointsEarned props={restaurantData.points}></PointsEarned>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          m: "2rem",
          p: 0,
          gap: "1rem",

          "@media screen and (min-width:800px)": {
            display: "grid",
            gridTemplateColumns: "1fr 2fr",
            height: '551px',
          },
        }}
      >
        <Share
          sx={{
            // maxWidth:'324px',
            maxHeight:'551px',
            p:'64px 26px',

            "@media screen and (min-width:800px)": {
              // height:'551px',
            },
          }}
          superCustomerId={superCustomerId}
          restaurantId={restaurantId}
          restaurantData={restaurantData.restaurant}
        />
        <Box
          sx={{
            p: "1rem",
            borderRadius: "10px",
            boxShadow: 10,
            maxWidth: "auto",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            // maxWidth:'324px',
            maxHeight:'551px',
          }}
        >
          <Typography 
            sx={{
              p: '0 2rem',
            }}
            variant="h3">
            Ongoing campaigns, exclusively for you
          </Typography>
          <Box
            sx={{
              display: "grid",
              m: "0 1rem",
              p: '1rem',
              gap: "1rem",
              overflow: 'auto',
              "@media screen and (min-width:800px)": {
                gridTemplateColumns: "1fr 1fr",
              },
            }}
          >
            {!restaurantData.campaigns ? (
              <Loader />
              // <Typography>Loading...</Typography>
              
            ) : (
              restaurantData.campaigns.map((item, index) => (
                <CampaignCard
                  sx={
                    {
                      // flexGrow: '1',
                      // flexShrink: '1',
                      // flexBasis: '100%',
                      // flex: '1 0 40%',
                    }
                  }
                  key={index}
                  props={item}
                />
              ))
            )}
          </Box>
        </Box>
      </Box>
      <SCFooter />
    </>
  );
};

export default Page;
