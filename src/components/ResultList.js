import React from "react";
import ResultCard from "./ResultCard";

const ResultList = (results) => {
  let data = [];
  if (results.data) {
    data = results.data.children || [];
  }
  console.log(results.results);
  return (
    <section className="result-container">
      <div>
        <h2 className="js-result">살펴볼만한 복지를 가져왔습니다.</h2>
        {results.results.map((post) => {
          return (
            <ResultCard
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
