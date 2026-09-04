import {
  Body,
  Button,
  CodeInline,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Section,
  Tailwind,
  Text,
} from "react-email";

const EmailAuth = (props: { code: string }) => {
  const { code } = props;
  return (
    <Html>
      <Head />
      <Preview>CCC HR Verification Code</Preview>
      <Tailwind>
        <Body className="bg-white m-auto pt-4 text-center">
          <Container className="max-w-xl mx-auto p-8 bg-slate-50 rounded-lg shadow-lg">
            <Heading className="text-3xl text-slate-950 font-semibold">
              Password Reset
            </Heading>

            <Section className="mb-6">
              <Text className="mb-6 text-slate-700">
                Copy and paste this temporary code to reset your password.
              </Text>

              <CodeInline
                className="p-4 self-center bg-white rounded-md
                text-slate-950 text-4xl tracking-widest font-mono"
              >
                {code}
              </CodeInline>
            </Section>

            <Text className="text-slate-700">Campus Coders Crew</Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default EmailAuth;
