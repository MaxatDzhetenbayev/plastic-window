import { Box, Container, Typography } from "@mui/material";
import React, { useEffect } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import { ContainerHeading } from "@/shared/components";
export const OurVideoReviews = () => {
  const urls = ["EZXmPE_Aohw", "8HpyJ2QS604", "dL6oCYoWmLk"];

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
        {urls?.map((item) => (
          <SwiperSlide key={item.id}>
            <Box
              sx={{
                width: "100%",
                height: "90%",
              }}
            >
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${item}`}
              />
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Container>
  );
};
