/** @jsxImportSource @emotion/react */
import React, { useEffect } from "react";
import Wrapper from "../components/Container/Wrapper";
import SearchResultBar from "../components/SearchResultsBar/SearchResultsBar";
import FilterModal from "../components/modal/FilterModal";
import { useParams } from "react-router-dom";
import { useSearch } from "../hooks/useSearch";
import ColumnCard from "../components/card/ColumnCard";
import SearchHeader from "../components/Header/SearchHeader";
import GridContainer from "../components/Container/GridContainer";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
import SearchMainCard from "../components/card/SearchMainCard";
import EmptyCard from "../components/card/EmptyCard";
import {  useRecoilValue, useSetRecoilState } from "recoil";
import { avaragePrice, maxRange, minRange } from "../recoil/atoms/filtering";

export default function Search() {
  const { stuff } = useParams();
  const { data, isLoading, isError } = useSearch(stuff!);
  const rangeMinValue = useRecoilValue(minRange);
  const rangeMaxValue = useRecoilValue(maxRange);
  const setAvaragePrice = useSetRecoilState(avaragePrice);
  // const setMaxFilterDefaultValue = useSetRecoilState(maxFilterDefault);
  // const setTempData = useSetRecoilState(tempData);
  // useReset();

  useEffect(() => {
    let avarageScope = data?.data?.filter(
      (i) => i.price <= rangeMaxValue && i.price >= rangeMinValue
    );
    if (avarageScope) {
      const avarageValue = Math.floor(
        avarageScope?.reduce((a, c) => a + c.price, 0) / avarageScope.length
      );
      setAvaragePrice(avarageValue || 0);
    }
  }, [data?.data, rangeMaxValue, rangeMinValue, setAvaragePrice]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <p>Error loading data.</p>;
  }
  return (
    <Wrapper>
      <SearchHeader />
      {data?.filter_code === "0" ? null : (
        <SearchResultBar result={data?.data ? data.data.length : 0} />
      )}

      {data?.filter_code === "0" ? (
        <EmptyCard />
      ) : (
        <SearchMainCard
          newImage={data?.new[0].new_img}
          newProduct={data?.new[0].new}
          averagePrice={data?.new[0].mean}
          lowestPrice={data?.new[0].min}
        />
      )}

      {/*     {data.filter_code === "0" ? ( 
        <EmptyCard />
      ) : 
          {data.new &&
          data.new.map((d: any, index: number) => (
        <SearchMainCard
          key={index}
          newImage={d.new_img}
          newProduct={d.new}
          averagePrice={d.mean}
          lowestPrice={d.min}
        />)
        )}}   */}

      <GridContainer>
        {data &&
          data.data?.map((d: any, index: number) => (
            <ColumnCard
              key={index}
              title={d.title}
              price={d.price}
              shop={d.site}
              url={d.url}
              location={d.region}
              img={d.image}
              date={d.date}
            />
          ))}
      </GridContainer>

      <FilterModal title="필터" />
    </Wrapper>
  );
}
