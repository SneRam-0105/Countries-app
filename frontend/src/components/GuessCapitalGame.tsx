import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Country } from "../types/country";
import {
  Typography,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Box,
} from "@mui/material";

const GuessCapitalGame: React.FC = () => {
  const countries = useSelector(
    (state: RootState) => state.countries.countries
  ) as Country[];
  const [currentQuestion, setCurrentQuestion] = useState<Country | null>(null);
  const [options, setOptions] = useState<string[]>([]);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (countries.length > 0) {
      generateQuestion();
    }
  }, [countries]);

  const generateQuestion = () => {
    const randomCountry =
      countries[Math.floor(Math.random() * countries.length)];
    const incorrectCapitals = countries
      .filter((c) => c.capital !== randomCountry.capital)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3)
      .map((c) => c.capital);

    const allOptions = [randomCountry.capital, ...incorrectCapitals].sort(
      () => 0.5 - Math.random()
    );

    setCurrentQuestion(randomCountry);
    setOptions(allOptions);
  };

  const handleAnswer = (selectedCapital: string) => {
    if (currentQuestion && selectedCapital === currentQuestion.capital) {
      setScore(score + 1);
    }
    generateQuestion();
  };

  if (!currentQuestion) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Typography variant="h6">Loading...</Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Grid container spacing={3} justifyContent="flex-end">
        <Grid item xs={12} md={5}>
          <Card elevation={0} sx={{ p: 2, boxShadow: "none", m: 0 }}>
            <CardContent>
              <Typography variant="h4" color="Violet" gutterBottom>
                World Explorer!
              </Typography>
              <Typography variant="body1" fontStyle={"italic"} paragraph>
                "The world is a book, and those who do not travel read only one
                page." - Saint Augustine
              </Typography>
              <Typography variant="body1" paragraph>
                Explore the diverse cultures and fascinating facts about
                countries around the globe.
              </Typography>
            </CardContent>
          </Card>
          <Card elevation={0} sx={{ p: 2, boxShadow: "none", m: 0 }}>
            <CardContent>
              {/* <Typography
                variant="h5"
                color="Violet"
                fontWeight={"Bold"}
                gutterBottom
              >
                About this Site
              </Typography>
              <Typography variant="body2" fontWeight={"Bold"} paragraph>
                This site helps you learn more about the world’s countries. Test
                your knowledge with our quiz!
              </Typography> */}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={7}>
          <Card elevation={3} sx={{ p: 1, textAlign: "center" }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Guess the Capital
              </Typography>
              <img
                src={currentQuestion.flags.png}
                alt={currentQuestion.name.common}
                width="120"
                style={{ marginBottom: "1rem" }}
              />
              <Typography variant="h6" gutterBottom>
                {currentQuestion.name.common}
              </Typography>
              <Box display="flex" flexDirection="column" gap={1}>
                {options.map((option) => (
                  <Button
                    key={option}
                    variant="contained"
                    onClick={() => handleAnswer(option)}
                    fullWidth
                    sx={{ py: 1.5, fontSize: "1rem" }}
                  >
                    {option}
                  </Button>
                ))}
              </Box>
              <Typography
                variant="subtitle1"
                sx={{ mt: 2, fontWeight: "bold" }}
              >
                Score: {score}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default GuessCapitalGame;
