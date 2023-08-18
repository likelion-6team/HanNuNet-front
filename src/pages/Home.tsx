/** @jsxImportSource @emotion/react */

import RankCard from "../components/card/RankCard";
import { css } from "@emotion/react";
import Wrapper from "../components/Container/Wrapper";
import ColumnCard from "../components/card/ColumnCard";
import Header from "../components/Header/Header";
import SearchBar from "../components/searchBar/SearchBar";
import rank from "../data/rank.json";
import Footer from "../components/footer/Footer";
import ChatbotButton from "../components/chatbot/ChatbotButton";
import ChatbotModal from "../components/modal/ChatbotModal";
import GridContainer from "../components/Container/GridContainer";
import RankCardContainer from "../components/Container/RankCardContainer";
import useRandom from "../hooks/useRandom";

const rankText = css`
  font-size: 1.7rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  margin-top: 1rem;
`;

export default function Home() {
  const handleSearch = (searchTerm: string) => {
    console.log("검색:", searchTerm);
  };
  const { data } = useRandom();
  console.log(data);
  return (
    <>
      <Header />
      <Wrapper>
        <SearchBar onSearch={handleSearch} />
        <div css={rankText}>실시간 랭킹</div>
        <RankCardContainer>
          {rank.map(({ image, model, modelHp, modelLp, id }) => {
            return (
              <RankCard
                key={id}
                img={image}
                title={model}
                highestPrice={modelHp}
                lowestPrice={modelLp}
                url="https://web.joongna.com/product/125014218"
              />
            );
          })}
        </RankCardContainer>
        <div css={rankText}>인기 매물</div>
        <GridContainer>
          {data?.data?.map(
            ({ image, title, price, region, date, site, url }) => {
              return (
                <ColumnCard
                  title={title}
                  price={price}
                  shop={site}
                  url={url}
                  location={region}
                  img={image}
                  date={date}
                />
              );
            }
          )}
        </GridContainer>
      </Wrapper>
      <ChatbotButton />
      <ChatbotModal title="맞춤형 전자기기를 추천해드려요" />
      <Footer />
    </>
  );
}
