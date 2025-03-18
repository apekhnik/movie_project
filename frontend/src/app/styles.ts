import styled from "styled-components";
import Link from "next/link";

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
    height: 100vh;
    padding: 80px 1rem 1rem;
    position: relative;
    z-index: 10;
    background: #1f2937; /* bg-gray-900 */
`;
export const StyledDetailPageWrapper = styled.div`
  height: 100vh; /* Высота минус Header */
  padding: 1rem; /* p-4 */
  padding-top: 64px; /* Компенсация высоты Header */
  position: relative;
  z-index: 10;
  background: #1f2937; /* bg-gray-900 */
  color: white; /* text-white */
`;

export const StyledLoaderContainer = styled(StyledMoviesPageWrapper)`
    display: flex;
    align-items: center;
    justify-content: center;
`

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

export const StyledPagination = styled.div`
  display: flex;
  gap: 0.5rem; /* gap-2 */
  margin-top: 1rem; /* mt-16 */
  justify-content: center;
  align-items: center;
`;

export const PaginationItem = styled.a`
  width: 2rem; /* Размер кружочка */
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.1); /* Полупрозрачный фон */
  border: 1px solid #d1d5db; /* Светлый бордер (gray-300) */
  border-radius: 50%; /* Круглая форма */
  color: white;
  font-size: 0.875rem; /* text-sm */
  transition: background 0.3s ease-in-out;

  &:hover {
    background: rgba(255, 255, 255, 0.2); /* Чуть ярче при наведении */
  }
`;

export const ActivePaginationItem = styled(PaginationItem)`
  background: rgba(255, 255, 255, 0.3); /* Более яркий фон для активной страницы */
  border-color: #f3f4f6; /* gray-200 */
`;

export const ArrowButton = styled.a`
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid #d1d5db;
  border-radius: 50%;
  color: white;
  font-size: 1rem;
  transition: background 0.3s ease-in-out;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

export const BreakLabel = styled.span`
  color: white;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
`;



export const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: calc(100vh);
    padding-top: 64px;
    background: #1f2937; /* Фон в стиле изображения */
`;

export const ContentWrapper = styled.div`
  display: flex;
  width: 100%;
    height: 90%;
  max-width: 900px; /* Ограничим максимальную ширину */
  background: #2d3748; /* Тёмный фон формы */
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export const LeftPanel = styled.div`
  flex: 1;
  min-height: 500px; /* Зарезервируем место для будущего слайдера */
  background: #4a3c7a; /* Фиолетовый фон левой панели */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 2rem;
  color: white;
`;

export const Logo = styled.div`
  font-size: 2rem;
  font-weight: bold;
  letter-spacing: 2px;
`;

export const Slogan = styled.div`
  font-size: 1.25rem;
  opacity: 0.8;
`;

export const RightPanel = styled.div`
  flex: 1;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  color: white;
`;

export const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

export const SubText = styled.p`
  font-size: 0.9rem;
  color: #a0aec0;
  margin-bottom: 1rem;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 0.5rem;
  background: #4a5568;
  border: none;
  border-radius: 0.5rem;
  color: white;
  font-size: 1rem;

  &::placeholder {
    color: #a0aec0;
    opacity: 0.7;
  }

  &:focus {
    outline: none;
    background: #4a5568;
  }
`;

export const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

export const Checkbox = styled.input`
  accent-color: #a0aec0;
`;

export const CheckboxLabel = styled.label`
  font-size: 0.9rem;
  color: #a0aec0;
`;

export const Button = styled.button`
  width: 100%;
  padding: 0.75rem;
  background: #6b46c1; /* Фиолетовая кнопка */
  border: none;
  border-radius: 0.5rem;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: #5a36a4;
  }
`;

export const SocialLogin = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
`;

export const SocialButton = styled.button`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
  padding: 0.5rem 3rem;
  border: 1px solid #6b46c1;
  border-radius: 0.5rem;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: #4a5568;
  }

  img {
    width: 20px;
    height: 20px;
    margin-right: 0.5rem;
  }
`;

export const BackLink = styled(Link)`
  display: inline-block;
  margin-top: 1rem;
  color: #a0aec0;
  text-decoration: none;
  font-size: 0.9rem;

  &:hover {
    text-decoration: underline;
  }
`;


export const LoginLeftPanel = styled.div`
    flex: 1;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    color: white;
  `;

export const LoginRightPanel = styled.div`
    flex: 1;
    min-height: 500px;
    background: #4a3c7a;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 2rem;
    color: white;
  `;

export const StyledLoader = styled.div`
  display: inline-flex;
  gap: 10px;

  :before,
  :after {
    content: "";
    height: 20px;
    aspect-ratio: 1;
    border-radius: 50%;
    background:
        linear-gradient(#222 0 0) top/100% 40% no-repeat,
        radial-gradient(farthest-side,#000 95%,#0000) 50%/8px 8px no-repeat
        #fff;
    animation: l7 1.5s infinite alternate ease-in;

    @keyframes l7 {
      0%,
      70% {background-size:100% 40%,8px 8px}
      85% {background-size:100% 120%,8px 8px}
      100% {background-size:100% 40%,8px 8px}
    }
  }
`
