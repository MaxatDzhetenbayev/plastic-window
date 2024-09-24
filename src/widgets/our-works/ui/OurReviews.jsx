import { Box, Container, Typography } from "@mui/material";
import React, { useEffect } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import { ContainerHeading } from "@/shared/components";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/shared/api";
import { backgroundFileUrl } from "@/shared/constants";

export const OurReviews = () => {
  const { data, isLoading } = useQuery({
    queryKey: "reviews",
    queryFn: async () => {
      try {
        const response = await api.get("user-reviews", {
          withCredentials: true,
        });
        return response.data;
      } catch (error) {
        console.log("Error detail: " + error);
      }
      return [];
    },
  });


  if (isLoading) {
    return <Box>Loading</Box>
  }

  if (!data) {
    return <Box>Нет данных</Box>
  }


  return (
    <Container sx={{ padding: "30px 0px" }}>
      <ContainerHeading title="Отзывы и наши работы" />
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        loop={true}
        modules={[Pagination]}
        style={{
          height: 500,
          width: "100%",
          marginTop: 40,
        }}
      >
        {data?.map((item) => (
          <SwiperSlide key={item.id}>
            <Box
              sx={{
                width: "100%",
                height: "100%",
                backgroundImage: `url("${backgroundFileUrl}${item.image}")`,
                display: "flex",
                alignItems: "flex-end",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <Box
                sx={{
                  bgcolor: `rgba(0,0,0,0.5)`,
                  width: "100%",
                  height: "25%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography variant="h6" sx={{ color: "white" }}>
                  {item.review}
                </Typography>
              </Box>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Container>
  );
};
