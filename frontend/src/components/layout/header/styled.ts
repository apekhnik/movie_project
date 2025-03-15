import styled from "styled-components";

export const StyledHeader = styled.header`
    color: white;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: 10;
    padding: 16px;
    background-color: rgba(0, 0, 0, 0.3); /* Полупрозрачный фон */
    backdrop-filter: blur(8px); /* Размытие фона */
`;
