import ReactPaginate from "react-paginate";

interface IPropsPagination {
    pageCount: number;
    handlePageClick(event: { selected: number }): void;
    pageRangeDisplayed?: number;
}

export const ItemListPagination:React.FC<IPropsPagination> = ({pageCount, handlePageClick, pageRangeDisplayed = 5}) => {
    return <ReactPaginate
        breakLabel="..."
        nextLabel="→"
        onPageChange={handlePageClick}
        pageRangeDisplayed={pageRangeDisplayed}
        pageCount={pageCount}
        previousLabel="←"
        containerClassName="flex gap-2 mt-8 justify-center items-center"
        pageClassName="w-8 h-8 flex items-center justify-center bg-[rgba(55,65,81,0.2)] border border-gray-300 rounded-full text-white hover:bg-[rgba(75,85,99,0.3)] transition-colors"
        activeClassName="bg-[rgba(75,85,99,0.4)] border-gray-200"
        previousClassName="w-8 h-8 flex items-center justify-center bg-[rgba(55,65,81,0.2)] border border-gray-300 rounded-full text-white hover:bg-[rgba(75,85,99,0.3)] transition-colors"
        nextClassName="w-8 h-8 flex items-center justify-center bg-[rgba(55,65,81,0.2)] border border-gray-300 rounded-full text-white hover:bg-[rgba(75,85,99,0.3)] transition-colors"
        pageLinkClassName="w-full h-full flex items-center justify-center" // Расширяем кликабельную область
        activeLinkClassName="w-full h-full flex items-center justify-center" // Для активной страницы
        previousLinkClassName="w-full h-full flex items-center justify-center" // Для стрелки влево
        nextLinkClassName="w-full h-full flex items-center justify-center" // Для стрелки вправо
        renderOnZeroPageCount={null}
    />
}
