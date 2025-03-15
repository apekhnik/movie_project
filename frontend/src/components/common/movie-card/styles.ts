import styled from "styled-components";

export const StyledMovieCard = styled.div`
    position: relative;
    width: 250px;
    height: 300px;
    border-radius: 10px;
    overflow: hidden;
    transition: all 0.3s ease-in-out;

    &:hover {
        img {
            filter: brightness(50%);
        }

        div {
            bottom: 0;
            opacity: 1;
        }
    }
`;

export const StyledMovieCardImg = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: filter 0.3s ease-in-out;
`;

export const StyledMovieCardDescription = styled.div`
    position: absolute;
    bottom: -100%;
    left: 0;
    right: 0;
    padding: 10px;
    background: rgba(0, 0, 0, 0.85);
    color: white;
    opacity: 0;
    transition: bottom 0.3s ease-in-out, opacity 0.3s ease-in-out;
`;

export const StyledMovieCardTitle = styled.h2`
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 4px;
`;

export const StyledMovieCardText = styled.p`
    font-size: 0.75rem;
    color: #d1d5db;
    margin-bottom: 4px;
`;

export const StyledMovieCardButtonWrapper = styled.div`
    margin-top: 6px;
    display: flex;
    justify-content: center;
`;
