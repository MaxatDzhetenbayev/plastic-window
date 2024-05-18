import { Box, Card, Container, Typography } from "@mui/material";
import React from "react";

const advantages = [
  {
    title: "Поддержка наших клиентов 24/7",
    content:
      "Наш менеджер всегда на связи. В любое время Вы сможете связаться с Нами, если у Вас возникли какие либо вопросы или пожелания в ходе работы с нами!",
  },
  {
    title: "Бесплатная консультация",
    content:
      "Составление проекта, помощь в выборе профильных систем, выезд инженера-проектировщика, консультация дизайнера, выезд менеджера.",
  },
  {
    title: "Долговечность конструкций",
    content:
      "Наши окна рассчитаны на эксплуатацию сроком до 60 лет. Благодаря своему уникальному составу наши окна относятся к классу морозостойких, и может выдерживать температуры от -60 до +75.",
  },
  {
    title: "Превосходная защита от шума",
    content:
      "Благодаря повышенной герметичности наших изделий, в Вашем доме будут тишина и спокойствие, даже если за окном оживленная магистраль или стройка!",
  },
  {
    title: "Эксклюзивный дизайн",
    content:
      "Составление проекта, помощь в выборе профильных систем, выезд инженера-проектировщика, консультация дизайнера, выезд менеджера.",
  },
  {
    title: "Гарантия безопасности",
    content:
      "С нашими надежными и проверенными годами партнерами мы гарантируем Вам безопасность. Противовзломная фурнитура нового поколения увеличивает время взлома с 5 до 10 минут.",
  },
];

export const OurAdvatages = () => {
  return (
    <Container>
      <Box sx={{ borderLeft: "5px solid #1976d2", paddingLeft: "10px" }}>
        <Typography sx={{ color: "#BBBBBB" }} variant="body1" content="body1">
          Плюсы наших окон
        </Typography>
        <Typography variant="h4" content="h2" sx={{ fontWeight: 600 }}>
          Плюсы наших окон
        </Typography>
      </Box>
      <Typography
        variant="body1"
        content="body1"
        sx={{ maxWidth: "700px", marginTop: "40px" }}
      >
        Всесторонняя защита от осадков, закаленное внешнее стекло, морозостойкие
        стеклопакеты. Да, этими качествами обладают все мансардные окна. Но есть
        вещи, на которые обращаем внимание только мы. Ряд преимуществ, которые
        не увеличивают цену и улучшают жизнь.
      </Typography>
      <Box
        sx={{
          marginTop: "40px",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          gap: "20px",
        }}
      >
        {advantages.map(({ title, content }) => (
          <Card sx={{ padding: "20px", flexBasis: "300px", flexGrow: 1 }}>
            <Typography variant="h5" content="h3" sx={{ fontWeight: 600 }}>
              {title}
            </Typography>
            <Typography
              sx={{ marginTop: "15px" }}
              variant="body1"
              content="body1"
            >
              {content}
            </Typography>
          </Card>
        ))}
      </Box>
    </Container>
  );
};
