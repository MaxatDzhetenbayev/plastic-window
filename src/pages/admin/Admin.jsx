import { api } from "@/shared/api";
import { Box, Typography } from "@mui/material";
import { BarChart, PieChart } from "@mui/x-charts";
import { useQuery } from "@tanstack/react-query";
import React from "react";

export const Admin = () => {

  const { data, isLoading } = useQuery({
    queryKey: ['statistics'],
    queryFn: async () => {

      const res = await api.get('user-requests/get/statistics', {
        withCredentials: true
      })
      return res.data
    }
  })

  const renderStatus = (status) => {
    switch (status) {
      case "pending":
        return "В обработке";
      case "preparing":
        return "Ожидание оплаты";
      case "paid":
        return "Оплачен";
      case "work":
        return "В работе";
      case "done":
        return "Завершен";
      default:
        return "В обработке";
    }
  };


  return (
    <Box>
      <Typography variant="h3">Админ панель - Статистика</Typography>

      {
        isLoading
          ? (<Box>Loading...</Box>)
          : (
            <Box sx={{ mt: 6 }}>
              <Box>
                <Typography variant="h4">Статусы</Typography>
                <Box>
                  <Box sx={{ display: "flex", gap: "40px", flexWrap: "wrap", mt: 2 }}>
                    {data.statusCounts.map(({ status, count }) => (
                      <Box sx={{ flexGrow: "1", borderRadius: "15px", padding: "40px", backgroundColor: "#3498db", color: "#fff", display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <Typography sx={{ fontSize: "24px" }}>{renderStatus(status)} </Typography>
                        <Typography sx={{ fontSize: "24px" }}>{count} </Typography>
                      </Box>
                    ))}
                  </Box>
                  <PieChart
                    series={[
                      {
                        data: [
                          { id: 0, value: 10, label: 'series A' },
                          { id: 1, value: 15, label: 'series B' },
                          { id: 2, value: 20, label: 'series C' },
                        ],
                      },
                    ]}
                    width={400}
                    height={200}
                  />
                </Box>
              </Box>
              <Box>
                <Typography variant="h4" sx={{ mt: 6 }}>Продажи</Typography>
                <BarChart
                  sx={{ mt: 6 }}
                  series={[
                    { data: data.dailySales.map((day) => day.count) },
                  ]}
                  height={290}
                  xAxis={[{ data: data.dailySales.map((day) => day.date), scaleType: 'band' }]}
                  margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
                />
              </Box>
            </Box>
          )
      }
    </Box>
  );
};
