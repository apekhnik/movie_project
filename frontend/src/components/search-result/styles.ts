// components/SearchResult/styles.ts
import styled from "styled-components";

export const SearchResultContainer = styled.div`
    z-index: 10;
    width: 900px;
    height: 220px;
    overflow-x: auto;
    overflow-y: hidden;
    display: flex;
    gap: 20px;
    padding: 10px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    white-space: nowrap;
    -webkit-overflow-scrolling: touch;
    position: absolute;
    top: -200px;
    &::-webkit-scrollbar {
        height: 8px;
    }
    &::-webkit-scrollbar-thumb {
        background-color: #ccc;
        border-radius: 4px;
    }
`;

export const SearchResultItem = styled.div`
    width: 200px;
    height: 200px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 10px;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    transition: transform 0.2s ease;
    flex-shrink: 0;

    &:hover {
        transform: scale(1.05);
    }
`;

export const SearchResultImage = styled.img`
    width: 180px;
    height: 120px;
    object-fit: cover;
    border-radius: 4px;
`;

export const SearchResultInfo = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    overflow: hidden;
`;

export const SearchResultTitle = styled.h3`
    font-size: 14px;
    margin: 0;
    color: #333;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

export const SearchResultText = styled.p`
    font-size: 12px;
    color: #666;
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;
