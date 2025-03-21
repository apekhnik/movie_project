import {useLanguageStore} from "@/lib/stores/languageStore";
import {useUiStore} from "@/lib/store";
import {useEffect, useState} from "react";
import {ContentType, Movie} from "@/types/types";
import {fetchAnimePages, fetchMoviesPages, fetchTvShowsPages} from "@/lib/api";
import { StyledLoaderContainer, StyledMoviesCards, StyledMoviesPageWrapper} from "@/app/styles";
import {MovieCard} from "@/components/common/movie-card/MovieCard";
import {ItemListPagination} from "@/components/layout/item-list-page/ItemListPagination";
import {Loader} from "@/components/Loader";

interface IPropsItemListPage {
    type: ContentType
}

export const ItemListPage: React.FC<IPropsItemListPage> = ({type}) => {
    const { language } = useLanguageStore();
    const {isLoading, setIsLoading} = useUiStore();
    const [movies, setMovies] = useState<Movie[]>([]);
    const [pageCount, setPageCount] = useState(10); // 100 фильмов / 10 = 10 страниц
    const [currentPage, setCurrentPage] = useState(0);
    let fetchFunction;


    switch (type) {
        case ContentType.MOVIE:
            fetchFunction = fetchMoviesPages;
            break;
        case ContentType.ANIME:
            fetchFunction = fetchAnimePages;
            break;
        case ContentType.TV:
            fetchFunction = fetchTvShowsPages;
            break;
        default:
            fetchFunction = fetchMoviesPages;
    }

    useEffect(() => {
        setIsLoading(true)
        fetchFunction(currentPage + 1, language)
            .then(setMovies)
            .then(() => setIsLoading(false))
            .catch(console.error);


    }, [currentPage, language]);

    const handlePageClick = (event: { selected: number }) => {
        setCurrentPage(event.selected);
    };


    return (
        isLoading ? (
                <StyledLoaderContainer>
                    <Loader/>
                </StyledLoaderContainer>
            ): (
            <div className="min-h-screen text-white relative overflow-hidden">
                <StyledMoviesPageWrapper>
                    <StyledMoviesCards>
                        {movies.map((movie) => (
                            <MovieCard
                                key={movie.id}
                                content={movie}
                                contentType={type}
                            />
                        ))}
                    </StyledMoviesCards>
                    <ItemListPagination
                        pageCount={pageCount}
                        handlePageClick={handlePageClick}
                    />
                </StyledMoviesPageWrapper>
            </div>
        )
    );
}
