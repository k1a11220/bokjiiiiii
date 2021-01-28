import React from "react";
import ResultCard from "./ResultCard";

const ResultList = (results) => {
  return (
    <section className="result-container">
      <div>
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

// 살펴볼만한 서비스를 가져왔습니다.
