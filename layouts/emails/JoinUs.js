import React from "react";
import {
  Html,
  Body,
  Head,
  Heading,
  Hr,
  Container,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";

const JoinUs = ({
  message,
  senderEmail
}) => {
  return (
    <Html>
      <Head />
      <Preview>Nova mensagem do seu site/portfolio</Preview>
      <Tailwind>
        <Body className="bg-gray-100 text-black">
          <Container>
            <Section className="bg-white borderBlack my-10 px-10 py-4 rounded-md">
              <Heading className="leading-tight">
                Mensagem do seu site/portfolio
              </Heading>
              <Text>{message}</Text>
              <Hr />
              <Text>O e-mail do remetente é: {senderEmail}</Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

export default JoinUs;
