/** @jsxImportSource @emotion/react */
import React from "react";
import Wrapper from "../components/Container/Wrapper";
import SearchResultBar from "../components/SearchResultsBar/SearchResultsBar";
import FilterModal from "../components/modal/FilterModal";
import { useSetRecoilState } from "recoil";
import { filterClicked } from "../recoil/atoms/filterClicked";
import rank from "../data/rank.json";
import RankCard from "../components/card/RankCard";
import SearchBar from "../components/searchBar/SearchBar";
import { css } from "@emotion/react";

export default function Search() {
  const setClicked = useSetRecoilState(filterClicked);

  const handleSearch = (searchTerm: string) => {
    console.log("검색:", searchTerm);
  };
  
  const customSearchBarStyles = {
    searchWrapper: css`
      width: 50rem;
    `,
    history: css`
      width: 50rem;
    `,
  };

  const topWrapper = css`
    display: grid;
    grid-template-columns: 2fr 4fr 1fr;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
  `;

  return (
    <Wrapper>
      <div onClick={() => setClicked((prev) => !prev)}>
        누르면 필터가 나옵니다
      </div>
      <div css={topWrapper}>
        <div>로고</div>
        <SearchBar
          onSearch={handleSearch}
          customStyles={customSearchBarStyles}
        />
        <div>필터</div>
      </div>
      <SearchResultBar result="234335" />
      {rank.map(({ image, model, modelHp, modelLp, id }) => {
        return (
          <RankCard
            key={id}
            img={image}
            title={model}
            highestPrice={modelHp}
            lowestPrice={modelLp}
            url=""
            css={{
              rankTest: css`
                width: 65rem;
                height: 30rem;
              `,
              imgEx: css`
                width: 30rem;
                height: 20rem;
                margin-left: 5rem;
                border: solid black;
                border-radius: none;
              `,
              texts: css`
                font-size: 1.5rem;
                line-height: 250%;
                margin-left: 3rem;
              `,
              product: css`
                font-size: 2.5rem;
              `,
            }}
          />
        );
      })}
      <FilterModal title="필터" />
    </Wrapper>
  );
}
