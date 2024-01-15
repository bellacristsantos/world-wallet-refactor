import React from 'react';
import { Container, Text, Box } from 'native-base';

export type Props = {
  label: string;
  description: string;
}


export function LocationInfo({ label, description }: Readonly<Props>) {
  return (
    <Container>
      <Box>
        <Text numberOfLines={1}>
          {label}
        </Text>
        <Text numberOfLines={1}>
          {description}
        </Text>
      </Box>
    </Container>
  );
}
