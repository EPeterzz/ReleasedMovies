'use client'

import StyledFont from "./components/StyledFont";
import StyledColumn from "./components/StyledColumn";
import StyledGrid from "./components/StyledGrid";
import { useEffect, useState } from "react";
import { fetchNowPlayingMovies } from "@/lib/apiClient";
import styled from "styled-components";

export default function MoviePage() {
  const [movies, setMovies] = useState<any[]>([]); // 영화 데이터를 저장할 상태 변수
  const [error, setError] = useState<string | null>(null); // 오류 상태 변수 추가
  const imageBaseUrl = 'https://image.tmdb.org/t/p/w500'; // 이미지 URL 기본 경로

  const MovieContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
    width: 100%;
  `;

  const MovieTitle = styled.div`
    color: #fff;
    font-weight: bold;
    margin-top: 10px;
    font-size: 20px;
  `;

  useEffect(() => {
    async function loadMovies() {
      try {
        const moviewData = await fetchNowPlayingMovies();
        setMovies(moviewData);
        setError(null); // 성공 시 오류 상태 초기화
        console.log(moviewData);
      } catch (error) {
        console.error(error);
        setError('영화 데이터를 불러오는 데 실패했습니다.'); // 오류 상태 업데이트
      }
    }
    loadMovies();
  }, []);

  return (
    <StyledColumn $width="100%" $alignitems="center" $justifycontent="center" $gap="1rem">
      <StyledFont $color="white" $font="1.5rem">
        상영중인 영화
      </StyledFont>
      {error && <div style={{ color: 'red' }}>{error}</div>} {/* 오류 메시지 표시 */}
      <StyledGrid $columns="1fr 1fr 1fr" $gap="10px">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <MovieContainer key={movie.id}>
              <img src={`${imageBaseUrl}/${movie.poster_path}`} width="50%" />
              <MovieTitle>{movie.original_title}</MovieTitle>
            </MovieContainer>
          ))
        ) : (
          <div>영화를 불러오는 중입니다...</div> // 영화가 없을 때 로딩 표시
        )}
      </StyledGrid>
    </StyledColumn>
  );
}