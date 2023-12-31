import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
  defaults,
} from "chart.js";
// import ChartDataLabels from "chartjs-plugin-datalabels";
import { fetchCustomerCampaignUsageByTime } from "../../../lib/fetching/insights/data";
// import date-fns locale:
import { de } from "date-fns/locale";
import Loader from "@/app/components/Loader";
import "chartjs-adapter-date-fns";
import { enUS } from "date-fns/locale";
import { useStore } from "@/lib/context/user_context/store";
import { useEffect, useState, useMemo } from "react";
import { Line } from "react-chartjs-2";
import { useTheme, Button } from "@mui/material";
import { fetchAllCampaigns } from "@/lib/fetching/campaigns/data";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
  // ChartDataLabels
);

function LineChart() {
  const { restaurantOwnerId } = useStore();
  // const [data, setData] = useState([]);
  // const [dataArray, setDataArray] = useState([]);
  const [period, setPeriod] = useState("day");
  // const [dateByCampaign, setDateByCampaign] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [labelDataSet1, setLabelDataSet1] = useState();
  const [labelDataSet2, setLabelDataSet2] = useState();
  const [dailyDataSet1, setDailyDataSet1] = useState([]);
  const [dailyDataSet2, setDailyDataSet2] = useState([]);
  const [weeklyDataSet1, setWeeklyDataSet1] = useState([]);
  const [weeklyDataSet2, setWeeklyDataSet2] = useState([]);
  const [monthlyDataSet1, setMonthlyDataSet1] = useState([]);
  const [monthlyDataSet2, setMonthlyDataSet2] = useState([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     setIsLoading(true);
  //     try {
  //       const result = await fetchAllCampaigns(restaurantOwnerId);
  //       const filteredResult =
  //       // result.campaigns
  //       result.campaigns.filter(
  //         (e) =>
  //           Date.parse(e.startDate) < Date.now() &&
  //           Date.parse(e.endDate) > Date.now()
  //       );
  //       setDataArray(filteredResult || []);
  //     } catch (error) {
  //       console.error("fetching data:", error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };
  //   fetchData();
  // }, [restaurantOwnerId]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const result = await fetchCustomerCampaignUsageByTime(
          restaurantOwnerId
        );
        console.log(result);
        // setData(result);
        setLabelDataSet1(result.data[0].campaignName);
        setLabelDataSet2(result.data[1].campaignName);
        setDailyDataSet1(result.data[0].usage.day);
        setDailyDataSet2(result.data[1].usage.day);
        setWeeklyDataSet1(result.data[0].usage.week);
        setWeeklyDataSet2(result.data[1].usage.week);
        setMonthlyDataSet1(result.data[0].usage.month);
        setMonthlyDataSet2(result.data[1].usage.month);
      } catch (error) {
        console.error("fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [restaurantOwnerId]);

  // const a = () => {
  //   for (const element in data) {
  //     data[element].forEach((element) => {
  //       let a = {
  //         name: element.campaignName,
  //         daily: element.usage.day,
  //         weekly: element.usage.week,
  //         monthly: element.usage.month,
  //       };
  //       return a;
  //     });

  //   }

  // };

  // useEffect(() => {
  //   const fetchData =  () => {
  //     const result =  formatData(data);
  //     setDateByCampaign(result);
  //   };
  //   fetchData();
  // }, [data]);

  // function formatData(data) {
  //   for (const element in data) {
  //     data[element].forEach((element) => {
  //       let a = {
  //         name: element.campaignName,
  //         daily: element.usage.day,
  //         weekly: element.usage.week,
  //         monthly: element.usage.month,
  //       };
  //       return a;
  //     });
  //   }
  // }

  // useMemo(() => {
  //   for (const element in data) {
  //     data[element].forEach((element) => {
  //       let a = {
  //         name: element.campaignName,
  //         daily: element.usage.day,
  //         weekly: element.usage.week,
  //         monthly: element.usage.month,
  //       };
  //       setDateByCampaign(a);
  //     });
  //   }

  // }, [data]);

  //! experiment with get each spending collection and then get the date from each spending collection > with that date, check how many of them are on the same day

  // const dateByCampaign = [];
  // for (const element in data) {
  //   data[element].forEach((element) => {

  //     dateByCampaign.push(element.campaignRedeemDate);

  //   });
  // }

  const theme = useTheme();

  // ! how to dynamically change the amount of datasets base on the highest amount of redeem? > now let statically set to 3 datasets
  // const labels = [
  //   "January",
  //   "February",
  //   "March",
  //   "April",
  //   "May",
  //   "June",
  //   "July",
  // ];
  defaults.font.family = theme.typography.fontFamily;
  defaults.font.size = theme.typography.fontSize;

  // if (data != []){

  //   const dailyDataSet1 =data.data[0].usage.day
  // }else {
  //   const dailyDataSet1 =undefined
  // }

  // const dailyDataSet1 = data ? data.data[0].usage.day : undefined ;
  // const dailyDataSet2 =data ? data.data[1].usage.day : undefined

  // let dailyDataSet1 = undefined
  // data ? dailyDataSet1 = undefined : dailyDataSet1 = data.data[0].usage.day;;

  // let dailyDataSet1 = [
  //   { x: Date.parse("2023-01-02 00:00:00 GMT+0700"), y: 52 },
  //   { x: Date.parse("2023-01-08 00:00:00 GMT+0700 "), y: 63 },
  //   { x: Date.parse("2023-01-16 00:00:00 GMT+0700 "), y: 85 },
  //   { x: Date.parse("2023-01-23 00:00:00 GMT+0700 "), y: 36 },
  //   { x: Date.parse("2023-01-30 00:00:00 GMT+0700 "), y: 90 },
  //   { x: Date.parse("2023-02-02 00:00:00 GMT+0700 "), y: 63 },
  //   { x: Date.parse("2023-02-08 00:00:00 GMT+0700 "), y: 88 },
  //   { x: Date.parse("2023-02-16 00:00:00 GMT+0700 "), y: 25 },
  //   { x: Date.parse("2023-02-23 00:00:00 GMT+0700 "), y: 77 },
  //   { x: Date.parse("2023-02-27 00:00:00 GMT+0700 "), y: 52 },
  //   { x: Date.parse("2023-03-02 00:00:00 GMT+0700 "), y: 95 },
  //   { x: Date.parse("2023-03-08 00:00:00 GMT+0700 "), y: 62 },
  //   { x: Date.parse("2023-03-16 00:00:00 GMT+0700 "), y: 82 },
  //   { x: Date.parse("2023-03-23 00:00:00 GMT+0700 "), y: 48 },
  //   { x: Date.parse("2023-03-30 00:00:00 GMT+0700 "), y: 15 },
  // ];

  //! ********* 2nd dataset *********
  // let dailyDataSet2 = undefined
  // data ? dailyDataSet2 = undefined : dailyDataSet2 = data.data[1].usage.day;
  //! ********* 2nd dataset *********
  // let dailyDataSet2 = [
  //   { x: Date.parse("2023-01-08 00:00:00 GMT+0700 "), y: 45 },
  //   { x: Date.parse("2023-01-12 00:00:00 GMT+0700 "), y: 95 },
  //   { x: Date.parse("2023-01-18 00:00:00 GMT+0700 "), y: 52 },
  //   { x: Date.parse("2023-01-26 00:00:00 GMT+0700 "), y: 60 },
  //   { x: Date.parse("2023-01-29 00:00:00 GMT+0700 "), y: 70 },
  //   { x: Date.parse("2023-02-01 00:00:00 GMT+0700 "), y: 67 },
  //   { x: Date.parse("2023-02-04 00:00:00 GMT+0700 "), y: 84 },
  //   { x: Date.parse("2023-02-15 00:00:00 GMT+0700 "), y: 89 },
  //   { x: Date.parse("2023-02-21 00:00:00 GMT+0700 "), y: 74 },
  //   { x: Date.parse("2023-02-28 00:00:00 GMT+0700 "), y: 79 },
  //   { x: Date.parse("2023-03-03 00:00:00 GMT+0700 "), y: 79 },
  //   { x: Date.parse("2023-03-09 00:00:00 GMT+0700 "), y: 18 },
  //   { x: Date.parse("2023-03-12 00:00:00 GMT+0700 "), y: 73 },
  //   { x: Date.parse("2023-03-29 00:00:00 GMT+0700 "), y: 36 },
  //   { x: Date.parse("2023-03-30 00:00:00 GMT+0700 "), y: 89 },
  // ];

  //! ********* weekly dataset *********
  // let weeklyDataSet1 = undefined;
  // data ? weeklyDataSet1 = undefined : weeklyDataSet1 = data.data[0].usage.week;
  // let weeklyDataSet2 = undefined
  // data ? weeklyDataSet2 = undefined : weeklyDataSet2 = data.data[1].usage.week;
  //! ********* weekly dataset *********

  // let weeklyDataSet1 = [
  //   { x: Date.parse("2023-01-01 00:00:00 GMT+0700"), y: 212 },
  //   { x: Date.parse("2023-01-07 00:00:00 GMT+0700 "), y: 492 },
  //   { x: Date.parse("2023-01-14 00:00:00 GMT+0700 "), y: 194 },
  //   { x: Date.parse("2023-01-21 00:00:00 GMT+0700 "), y: 414 },
  //   { x: Date.parse("2023-01-28 00:00:00 GMT+0700 "), y: 286 },
  //   { x: Date.parse("2023-02-01 00:00:00 GMT+0700 "), y: 339 },
  //   { x: Date.parse("2023-02-07 00:00:00 GMT+0700 "), y: 494 },
  //   { x: Date.parse("2023-02-14 00:00:00 GMT+0700 "), y: 968 },
  //   { x: Date.parse("2023-02-21 00:00:00 GMT+0700 "), y: 373 },
  //   { x: Date.parse("2023-02-28 00:00:00 GMT+0700 "), y: 879 },
  //   { x: Date.parse("2023-03-01 00:00:00 GMT+0700 "), y: 383 },
  //   { x: Date.parse("2023-03-07 00:00:00 GMT+0700 "), y: 176 },
  //   { x: Date.parse("2023-03-14 00:00:00 GMT+0700 "), y: 781 },
  //   { x: Date.parse("2023-03-21 00:00:00 GMT+0700 "), y: 347 },
  //   { x: Date.parse("2023-03-28 00:00:00 GMT+0700 "), y: 790 },
  // ];
  // let weeklyDataSet2 = [
  //   { x: Date.parse("2023-01-01 00:00:00 GMT+0700 "), y: 969 },
  //   { x: Date.parse("2023-01-07 00:00:00 GMT+0700 "), y: 208 },
  //   { x: Date.parse("2023-01-14 00:00:00 GMT+0700 "), y: 128 },
  //   { x: Date.parse("2023-01-21 00:00:00 GMT+0700 "), y: 787 },
  //   { x: Date.parse("2023-01-28 00:00:00 GMT+0700 "), y: 790 },
  //   { x: Date.parse("2023-02-01 00:00:00 GMT+0700 "), y: 375 },
  //   { x: Date.parse("2023-02-07 00:00:00 GMT+0700 "), y: 424 },
  //   { x: Date.parse("2023-02-14 00:00:00 GMT+0700 "), y: 621 },
  //   { x: Date.parse("2023-02-21 00:00:00 GMT+0700 "), y: 924 },
  //   { x: Date.parse("2023-02-28 00:00:00 GMT+0700 "), y: 675 },
  //   { x: Date.parse("2023-03-01 00:00:00 GMT+0700 "), y: 118 },
  //   { x: Date.parse("2023-03-07 00:00:00 GMT+0700 "), y: 778 },
  //   { x: Date.parse("2023-03-14 00:00:00 GMT+0700 "), y: 549 },
  //   { x: Date.parse("2023-03-21 00:00:00 GMT+0700 "), y: 319 },
  //   { x: Date.parse("2023-03-28 00:00:00 GMT+0700 "), y: 486 },
  // ];

  //! ********* monthly dataset *********
  // let monthlyDataSet1 = undefined
  // data ? monthlyDataSet1 = undefined : monthlyDataSet1 = data.data[0].usage.month;
  // let monthlyDataSet2 = undefined
  // data ? monthlyDataSet2 = undefined : monthlyDataSet2 = data.data[1].usage.month;
  //! ********* monthly dataset *********

  // let monthlyDataSet1 = [
  //   { x: Date.parse("2023-01-01 00:00:00 GMT+0700 "), y: 1361 },
  //   { x: Date.parse("2023-02-01 00:00:00 GMT+0700 "), y: 8040 },
  //   { x: Date.parse("2023-03-01 00:00:00 GMT+0700 "), y: 1836 },
  //   { x: Date.parse("2023-04-01 00:00:00 GMT+0700 "), y: 4317 },
  //   { x: Date.parse("2023-05-01 00:00:00 GMT+0700 "), y: 6377 },
  //   { x: Date.parse("2023-06-01 00:00:00 GMT+0700 "), y: 7604 },
  // ];
  // const monthlyDataSet2 = [
  //   { x: Date.parse("2023-01-01 00:00:00 GMT+0700 "), y: 8587 },
  //   { x: Date.parse("2023-02-01 00:00:00 GMT+0700 "), y: 4131 },
  //   { x: Date.parse("2023-03-01 00:00:00 GMT+0700 "), y: 3327 },
  //   { x: Date.parse("2023-04-01 00:00:00 GMT+0700 "), y: 5722 },
  //   { x: Date.parse("2023-05-01 00:00:00 GMT+0700 "), y: 1850 },
  //   { x: Date.parse("2023-06-01 00:00:00 GMT+0700 "), y: 7992 },
  // ];

  let showDataset1 = [];
  let showDataset2 = [];

  switch (period) {
    case "day":
      showDataset1 = dailyDataSet1;
      showDataset2 = dailyDataSet2;
      break;
    case "week":
      showDataset1 = weeklyDataSet1;
      showDataset2 = weeklyDataSet2;
      break;
    case "month":
      showDataset1 = monthlyDataSet1;
      showDataset2 = monthlyDataSet2;

      break;
    default:
      showDataset1 = dailyDataSet1;
      showDataset2 = dailyDataSet2;
  }

  const lineChartData = {
    // labels,
    datasets: [
      {
        label: labelDataSet1,
        data: showDataset1,
        // label: nameDataSet1,
        // data: dailyDataSet1,
        borderColor: theme.palette.primary[80],
        backgroundColor: theme.palette.primary[80],
      },
      {
        label: labelDataSet2,
        data: showDataset2,
        // label: nameDataSet2,
        // data: dailyDataSet2,
        borderColor: theme.palette.primary[100],
        backgroundColor: theme.palette.primary[100],
        yAsis: "y",
        xAsis: "x",
      },
    ],
  };
  console.log("period", period);
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    // pointStyle: true,
    pointStyle: true,
    elements: {
      line: {
        tension: 0.5,
      },
      point: {
        hitRadius: 20,
      },
    },
    scales: {
      y: {
        ticks: {
          callback: function (val, index) {
            // Hide every 5th tick label
            return index % 3 === 0 ? this.getLabelForValue(val) : "";
          },

          color: theme.palette.background.alt,
        },
        border: {
          color: theme.palette.background.alt,
        },
        beginAtZero: true,
        display: true,

        grid: {
          display: false,
        },
      },
      x: {
        ticks: {
          callback: function (val, index) {
            // Hide every 5th tick label
            return index % 5 === 0
              ? this.getLabelForValue(val).split(",")[0]
              : "";
          },
          color: theme.palette.background.alt,
        },
        border: {
          color: theme.palette.background.alt,
        },
        type: "time",
        time: {
          unit: period,
          // unit: `'${period}'`,
          // displayFormats: {
          //   millisecond: "MMM DD",
          //   second: "MMM DD",
          //   minute: "MMM DD",
          //   hour: "MMM DD",
          //   day: "MMM DD",
          //   week: "MMM DD",
          //   month: "MMM DD",
          //   quarter: "MMM DD",
          //   year: "MMM DD",
          // },
        },
        grid: {
          display: false,
        },
        adapters: {
          date: {
            locale: enUS,
          },
        },
        display: true,
      },
    },

    plugins: {
      // tooltip: {
      //   callbacks: {
      //     label: function (context) {

      //       let label = context.dataset.label || '';

      //       if (context.parsed.y !== null) {
      //           label += "tessssst"
      //       }
      //       if (context.parsed.x !== null) {
      //           label += "xxxxxx"
      //       }
      //       console.log(label);
      //       return label;
      //     },
      //   },
      // },
      // datalabels: {
      //   display: false,

      // },
      //  !EXPERIMENT WITH GENERATING LEGEND AS SEPARATE HTML COMPONENT
      // htmlLegend: {
      //   // ID of the container to put the legend in
      //   containerID: 'legend-container',
      // },
      legend: {
        display: true,
        position: "bottom",
        align: "start",

        labels: {
          color: theme.palette.background.alt,
          usePointStyle: true,
          pointStyle: "rectRounded",
        },
      },
    },
  };

  return isLoading ? (
    <Loader />
  ) : (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(1,1fr)",
        gridTemplateRows: "repeat(2,auto)",
        alignItems: "end",
        justifyItems: "flex-end",
        width: "100%",
        height: "100%",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          gridColumn: "1/-1",
          // gridRow: "1/-1",
        }}
      >
        <Line
          options={options}
          // config={config}
          data={lineChartData}
          style={{
            width: "100%",
            minHeight: "250px",
          }}
        />
      </div>
      {/* BUTTON DAILY, WEEKLY */}
      <div
        style={{
          // gridColumn: "1/-1",
          // position: "absolute",
          // bottom: "-.25rem",
          display: "inline-block",
          textAlign: "right",
          // width: "60%",
        }}
      >
        <Button
          onClick={() => setPeriod("day")}
          variant="text"
          sx={{
            color:
              period == "day"
                ? theme.palette.background.alt
                : theme.palette.neutral[60],
            typography: "body1",
          }}
        >
          Daily
        </Button>
        <Button
          onClick={() => setPeriod("week")}
          variant="text"
          sx={{
            color:
              period == "week"
                ? theme.palette.background.alt
                : theme.palette.neutral[60],
            typography: "body1",
          }}
        >
          Weekly
        </Button>
        <Button
          onClick={() => setPeriod("month")}
          variant="text"
          sx={{
            color:
              period == "month"
                ? theme.palette.background.alt
                : theme.palette.neutral[60],
            typography: "body1",
          }}
        >
          Monthly
        </Button>
        {/* <Button
          onClick={() => setPeriod("year")}
          variant="text"
          sx={{
            color:
              period == "year"
                ? theme.palette.background.alt
                : theme.palette.neutral[60],
            typography: "body1",
          }}
        >
          Yearly
        </Button> */}
      </div>
      <div id="legend-container"></div>
    </div>
  );
}

export default LineChart;
