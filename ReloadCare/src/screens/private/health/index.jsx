import React, { useState, useEffect } from "react";
import {
  Container,
  CardContainer,
  Card,
  IconContainer,
  TitleContainer,
  Title,
  Text,
  ScrollViewContainer,
} from "./styles";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../../../api/api";
import Icon from "react-native-vector-icons/EvilIcons";
import ButtonComponent from "./../../../components/form/button";

const Health = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState({});
  const [isCardExpanded1, setIsCardExpanded1] = useState(true);
  const [isCardExpanded2, setIsCardExpanded2] = useState(false);
  const [isCardExpanded3, setIsCardExpanded3] = useState(false);
  const [isCardExpanded4, setIsCardExpanded4] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = await AsyncStorage.getItem("userId");
        const token = await AsyncStorage.getItem("token");

        if (userId && token) {
          api
            .get(`usuarios/${userId}`, {
              headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
              },
            })
            .then((response) => {
              setUser((prevUser) => {
                return { ...prevUser, ...response.data };
              });
            })
            .catch((error) => {
              console.error("Error fetching user data:", error);
            });
        }
      } catch (error) {
        console.error("Error reading AsyncStorage:", error);
      }
    };

    fetchData();
  }, []);

  const handleToggleCard1 = () => {
    setIsCardExpanded1(!isCardExpanded1);
  };

  const handleToggleCard2 = () => {
    setIsCardExpanded2(!isCardExpanded2);
  };

  const handleToggleCard3 = () => {
    setIsCardExpanded3(!isCardExpanded3);
  };

  const handleToggleCard4 = () => {
    setIsCardExpanded4(!isCardExpanded4);
  };

  const goToHealthForms = () => {
    navigation.navigate("Saude");
  };

  return (
    <Container>
      <Title style={{ marginBottom: 20 }}>Meu registro de saúde</Title>

      <TitleContainer
        style={{ justifyContent: "none", marginLeft: 20, marginBottom: 20 }}
      >
        <Icon
          name={"user"}
          size={40}
          style={{ marginLeft: 0 }}
          color="#66b567"
        />
        <Text
          style={{ fontSize: 18, fontWeight: 500, color: "#000", opacity: 0.5 }}
        >
          {user.nome}, {user.age}
        </Text>
      </TitleContainer>

      <ScrollViewContainer>
        <CardContainer>
          {user.healthRegisters && user.healthRegisters.length > 0 && (
            <>
              <Card
                style={{
                  width: "100%",
                  backgroundColor: "#66b567",
                  flex: 1,
                }}
              >
                <TitleContainer>
                  <Text
                    style={{ fontSize: 20, fontWeight: 500, color: "white" }}
                  >
                    Saúde
                  </Text>
                  <Icon
                    name={isCardExpanded1 ? "chevron-up" : "chevron-down"}
                    size={30}
                    style={{ marginLeft: 10 }}
                    color="#fff"
                    onPress={handleToggleCard1}
                  />
                </TitleContainer>

                {isCardExpanded1 && (
                  <Text
                    style={{
                      fontSize: 16,
                      marginTop: 20,
                      fontWeight: 40,
                      color: "white",
                      opacity: 0.7,
                    }}
                  >
                    {user.healthRegisters[0].health}
                  </Text>
                )}
              </Card>
              <Card
                style={{
                  width: "100%",
                  backgroundColor: "#66b567",
                  flex: 1,
                }}
              >
                <TitleContainer>
                  <Text
                    style={{ fontSize: 20, fontWeight: 500, color: "white" }}
                  >
                    Saúde Mental
                  </Text>
                  <Icon
                    name={isCardExpanded2 ? "chevron-up" : "chevron-down"}
                    size={30}
                    style={{ marginLeft: 10 }}
                    color="#fff"
                    onPress={handleToggleCard2}
                  />
                </TitleContainer>

                {isCardExpanded2 && (
                  <Text
                    style={{
                      fontSize: 16,
                      marginTop: 20,
                      fontWeight: 40,
                      color: "white",
                      opacity: 0.7,
                    }}
                  >
                    {user.healthRegisters[0].mentalHealth}
                  </Text>
                )}
              </Card>
              <Card
                style={{
                  width: "100%",
                  backgroundColor: "#66b567",
                  flex: 1,
                }}
              >
                <TitleContainer>
                  <Text
                    style={{ fontSize: 20, fontWeight: 500, color: "white" }}
                  >
                    Substâncias e Frequência
                  </Text>
                  <Icon
                    name={isCardExpanded3 ? "chevron-up" : "chevron-down"}
                    size={30}
                    style={{ marginLeft: 10 }}
                    color="#fff"
                    onPress={handleToggleCard3}
                  />
                </TitleContainer>

                {isCardExpanded3 && (
                  <Text
                    style={{
                      fontSize: 16,
                      marginTop: 20,
                      fontWeight: 40,
                      color: "white",
                      opacity: 0.7,
                    }}
                  >
                    {user.healthRegisters[0].substances}, {" "}
                    {user.healthRegisters[0].substanceFrequencies}.
                  </Text>
                )}
              </Card>
              <Card
                style={{
                  width: "100%",
                  backgroundColor: "#66b567",
                  flex: 1,
                }}
              >
                <TitleContainer>
                  <Text
                    style={{ fontSize: 20, fontWeight: 500, color: "white" }}
                  >
                    Minhas Metas
                  </Text>
                  <Icon
                    name={isCardExpanded4 ? "chevron-up" : "chevron-down"}
                    size={30}
                    style={{ marginLeft: 10 }}
                    color="#fff"
                    onPress={handleToggleCard4}
                  />
                </TitleContainer>

                {isCardExpanded4 && (
                  <Text
                    style={{
                      fontSize: 16,
                      marginTop: 20,
                      fontWeight: 40,
                      color: "white",
                      opacity: 0.7,
                    }}
                  >
                    {user.healthRegisters[0].goals}
                  </Text>
                )}
              </Card>
            </>
          )}
        </CardContainer>
        <ButtonComponent
          onPress={goToHealthForms}
          style={{ width: "50%", alignSelf: "center", marginTop: 20 }}
        >
          Nova Avaliação
        </ButtonComponent>
      </ScrollViewContainer>
    </Container>
  );
};

export default Health;
