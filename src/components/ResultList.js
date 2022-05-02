import React from "react";
import ResultCard from "./ResultCard";

const ResultList = (results) => {
  return (
    <section className="result-container">
      <div>
        {results.results.map((post) => {
          return (
            <ResultCard
              key={post.children.find((child) => child.name === "inqNum").value} // key는 inqNum 고유번호로 지정함.
              title={
                post.children.find((child) => child.name === "servNm").value
              }
              ministry={
                post.children.find((child) => child.name === "jurMnofNm").value
              }
              details={
                post.children.find((child) => child.name === "servDgst").value
              }
              link={
                post.children.find((child) => child.name === "servDtlLink")
                  .value
              }
            />
          );
        })}
      </div>
    </section>
  );
};

export default ResultList;

// 살펴볼만한 서비스를 가져왔습니다.
