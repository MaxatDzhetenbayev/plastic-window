import { Box, Button, Container, Typography } from '@mui/material'
import React, { useEffect, useLayoutEffect } from 'react'
import { getItemInfo, getWindowItems, getWindowModels } from '../api/windowInformationApi'
import { useNavigate, useParams } from 'react-router-dom'

export const WindowInformation = () => {

    const { model } = useParams()
    const navigate = useNavigate()


    const [windowModels, setWindowModels] = React.useState([])
    const [windowItems, setWindowItems] = React.useState([])
    const [itemInfo, setItemInfo] = React.useState(null)
    const [modelDescription, setModelDescription] = React.useState('')
    const [loading, setLoading] = React.useState(true)


    useEffect(() => {
        getWindowModels().then((data) => {
            setWindowModels(data)
        })
    }, [])

    useEffect(() => {
        setModelDescription(windowModels.find(({ id }) => id === model)?.description)
    }, [windowModels, model])

    useEffect(() => {
        getWindowItems(model).then((data) => {
            setWindowItems(data)
        })
    }, [model])

    useLayoutEffect(() => {
        setLoading(true)
        getItemInfo(windowItems[0]?.id).then((data) => {
            setItemInfo(data)
        })
        setLoading(false)
    }, [windowItems])


    const handleModelChoice = async (modelId) => {
        navigate(`/windows/${modelId}`)
    }

    const handleItemInfo = async (itemId) => {
        const item = await getItemInfo(itemId)
        setItemInfo(item)
    }

    return (
        <Container>
            <Typography variant='h2' sx={{ textAlign: "center", marginTop: "30px" }}>{String(`Пластиковые окна`).toLocaleUpperCase()}</Typography>
            <Box sx={{ display: "flex", justifyContent: "center", gap: "10px"}}>
                {
                    windowModels.map(({ id, model: modelName }) => (
                        <Button key={id} variant="contained" color={model === id ? "primary" : "inherit"} onClick={() => handleModelChoice(id)}>{modelName}</Button>
                    )
                    )
                }
            </Box>
            <Box sx={{ display: "flex", justifyContent: "center", gap: "10px", marginTop: "20px" }}>
                {
                    windowItems.map(({ id, title }) => (
                        <Button key={id} variant="outlined" color="primary" onClick={() => handleItemInfo(id)}>{title}</Button>
                    ))
                }
            </Box>
            {
                loading ? <Typography>Загрузка...</Typography>
                    : itemInfo ? (
                        <>
                            <Box sx={{marginTop: "50px" }}>
                                <Typography variant='h4' sx={{ fontWeight: "600", textAlign: "center" }}>{itemInfo.title}</Typography>
                                <Box sx={{ display: "flex", width: "100%", gap: "20px", marginTop: "20px" }}>
                                    <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
                                        <img src={itemInfo.image} alt="" style={{ width: "200px", aspectRatio: 1 / 1.3 }} />
                                        <Box >
                                            <Typography>Характиристики профиля</Typography>
                                            <Box sx={{ display: "flex", alignItems: "center", gap: "10px", justifyContent: "space-between" }}>
                                                <Typography>Теплоизоляция</Typography>
                                                <Box sx={{ display: "flex", gap: "3px" }}>
                                                    {
                                                        Array.from({ length: 18 }).fill(" ").map((item, index) => (
                                                            <Box key={index} sx={{ height: "20px", width: "8px", backgroundColor: () => index < itemInfo?.characteristic?.thernal ? "red" : "grey" }}></Box>
                                                        ))
                                                    }
                                                </Box>
                                            </Box>
                                            <Box sx={{ display: "flex", alignItems: "center", gap: "10px", justifyContent: "space-between" }}>
                                                <Typography>Шумоизоляция</Typography>
                                                <Box sx={{ display: "flex", gap: "3px" }}>
                                                    {
                                                        Array.from({ length: 18 }).fill(" ").map((item, index) => (
                                                            <Box key={index} sx={{ height: "20px", width: "8px", backgroundColor: () => index < itemInfo?.characteristic?.noise_insulation ? "red" : "grey" }}></Box>
                                                        ))
                                                    }
                                                </Box>
                                            </Box>
                                            <Box sx={{ display: "flex", alignItems: "center", gap: "10px", justifyContent: "space-between" }}>
                                                <Typography>Дизайн</Typography>
                                                <Box sx={{ display: "flex", gap: "3px" }}>
                                                    {
                                                        Array.from({ length: 18 }).fill(" ").map((item, index) => (
                                                            <Box key={index} sx={{ height: "20px", width: "8px", backgroundColor: () => index < itemInfo?.characteristic?.design ? "red" : "grey" }}></Box>
                                                        ))
                                                    }
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Box>
                                    <Box sx={{ flex: 2, display: "flex", flexDirection: "column" }}>
                                        <Box sx={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
                                            {
                                                itemInfo?.feauters?.map(({ id, description, title }) => (
                                                    <Box key={id} sx={{ flexBasis: "300px", flexGrow: 1, display: "flex", flexDirection: "column" }} >
                                                        <Typography variant="contained" color="primary">{title}</Typography>
                                                        <Typography variant="contained" >{description}</Typography>
                                                    </Box>
                                                ))
                                            }
                                        </Box>
                                        <Typography sx={{ mt: "30px" }}>Цена: {Number(itemInfo.price).toLocaleString()} Т</Typography>
                                        <Button sx={{ mt: "10px" }} variant='outlined'>Рассчитать размер</Button>
                                    </Box>
                                </Box>
                            </Box>
                            <Box sx={{ marginTop: "50px" }}>
                                <Typography sx={{ textAlign: "justify" }}>{modelDescription}</Typography>
                            </Box>
                        </>

                    ) : <Typography>Нет информаций</Typography>

            }


        </Container>
    )
}
