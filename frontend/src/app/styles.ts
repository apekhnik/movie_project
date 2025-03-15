import styled from "styled-components";

export const StyledSearchBar = styled.div`
    height: 50px;
    width: 400px;
    position: absolute;
    top: 90%;
    left: calc(50% - 200px);
    
    input {
        width: 100%;
    }
`

export const StyledMoviesCards = styled.div`
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr)); /* grid-cols-1 */
  gap: 1rem 0.25rem; /* gap-y-4 (1rem = 16px), gap-x-1 (0.25rem = 4px) */
  justify-items: center; /* justify-items-center */
  align-items: center; /* items-center */

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, minmax(0, 1fr)); /* md:grid-cols-2 */
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(5, minmax(0, 1fr)); /* lg:grid-cols-5 */
  }
`;

export const StyledMoviesPageWrapper = styled.div`
    min-height: calc(100vh - 64px); /* Высота минус Header */
    /* p-4 */
    /* Компенсация высоты Header */
    padding: 64px 1rem 1rem;
    position: relative;
    z-index: 10;
    background: #1f2937; /* bg-gray-900 */
`;
export const StyledDetailPageWrapper = styled.div`
  min-height: calc(100vh - 64px); /* Высота минус Header */
  padding: 1rem; /* p-4 */
  padding-top: 64px; /* Компенсация высоты Header */
  position: relative;
  z-index: 10;
  background: #1f2937; /* bg-gray-900 */
  color: white; /* text-white */
`;

// Стили для контейнера контента
export const StyledDetailPageContainer = styled.div`
  max-width: 1280px; /* container */
  margin-left: auto;
  margin-right: auto;
`;

// Стили для заголовка
export const StyledDetailPageTitle = styled.h1`
  font-size: 1.875rem; /* text-3xl */
  font-weight: 700; /* font-bold */
  margin-bottom: 1rem; /* mb-4 */
`;

// Стили для изображения
export const StyledDetailPageImage = styled.img`
  width: 100%; /* w-full */
  height: auto; /* h-auto */
  border-radius: 0.375rem; /* rounded */
  @media (min-width: 768px) {
    width: 33.333333%; /* md:w-1/3 */
  }
`;

// Стили для flex-контейнера
export const StyledDetailPageFlexContainer = styled.div`
  display: flex;
  flex-direction: column; /* flex-col */
  gap: 1.5rem; /* gap-6 */
  @media (min-width: 768px) {
    flex-direction: row; /* md:flex-row */
  }
`;

// Стили для текстового блока
export const StyledDetailPageTextBlock = styled.div`
  flex: 1; /* flex-1 */
`;

// Стили для описания
export const StyledDetailPageDescription = styled.p`
  color: #9ca3af; /* text-gray-600 */
  margin-bottom: 1rem; /* mb-4 */
`;

// Стили для метаданных
export const StyledDetailPageMeta = styled.p`
  font-size: 0.875rem; /* text-sm */
  color: #6b7280; /* text-gray-500 */
  margin-bottom: 0.25rem; /* Отступ между метаданными */
`;

// Стили для ошибки
export const StyledDetailPageError = styled.p`
  color: #dc2626; /* text-red-600 */
`;

