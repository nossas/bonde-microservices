import styled from "styled-components";
import { Button } from 'bonde-styleguide'

export const Wrap = styled.div`
  @media(min-width: 768px) {
    width: 90%;
  }
  margin: 20px 0;
`

export const StyledButton = styled(Button)`
  padding: 0;
`