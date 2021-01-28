import React, { useState } from "react";
import ResultCard from "./ResultCard";

const ResultList = (results, isLoaded) => {
  const [loaded, setIsLoaded] = useState(false);
  console.log(results);
  return (
    <section className="result-container">
      <div>
        <h2 className="js-result">
          {loaded
            ? "살펴볼만한 복지를 가져왔습니다."
            : "원하는 조건을 검색하세요."}
        </h2>
        {results.results.map((post) => {
          return (
            <ResultCard
              key={post.children[0].value} // key는 inqNum 고유번호로 지정함.
              title={post.children[6].value}
              ministry={post.children[1].value}
              details={post.children[3].value}
            />
          );
        })}
      </div>
    </section>
  );
};

export default ResultList;
