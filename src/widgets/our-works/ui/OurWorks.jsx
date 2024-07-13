import { Container } from '@mui/material'
import React, { useEffect } from 'react'

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import { getOurWorks } from '../api/OurWorksApi';
import { ContainerHeading } from '@/shared/components';

export const OurWorks = () => {


    const [data, setData] = React.useState([])

    useEffect(() => {
        getOurWorks().then((data) => {
            setData(data)
        })
    }, [])


    return (
        <Container sx={{padding: "30px 0px"}}>
            <ContainerHeading title="Наши работы"/>
            <Swiper
                slidesPerView={3}
                spaceBetween={30}
                pagination={{
                    clickable: true,
                }}
                modules={[Pagination]}
                style={{
                    height: 300,
                    width: '100%',
                    marginTop: 40
                }}
            >
                {
                    data?.map((item) => (
                        <SwiperSlide key={item.id}>
                            <img src={item.image} alt={item.title} style={{
                                width: '100%',
                                height: '100%'
                            
                            }}/>
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </Container>
    )
}
