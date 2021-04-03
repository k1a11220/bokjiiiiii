import React, { useState } from "react";
import axios from "axios";
import XMLParser from "react-xml-parser";
import { useForm } from "react-hook-form";
import { CircularProgress } from "@material-ui/core";
import "../styles.css";
import ResultList from "../components/ResultList";

const Home = () => {
  async function parseStr(dataSet) {
    const dataArr = new XMLParser().parseFromString(dataSet).children;
    resultCount = dataArr.length; // 검색된 데이터의 수를 구한다. (dataArr length 에서 5개 값이 빠짐)
    if (resultCount < 6) {
      alert("검색결과가 없습니다."); // 검색결과가 없을경우 알람표시
      setPrint(false);
      setLoaded(false);
    }
    setState((preState) => {
      return {
        ...preState,
        results: dataArr.slice(resultNumber, resultCount - resultNumber - 2),
      };
    });
    setLoaded(false);
    setPrint(true);
    // console.log(state.results); //state.result == servs
  }

  async function getAPI() {
    await axios({
      method: "get",
      url: `https://cors-anywhere.herokuapp.com/https://www.bokjiro.go.kr/openapi/rest/gvmtWelSvc?crtiKey=${API_KEY}&callTp=L&pageNum=1&numOfRows=100&lifeArray=${LIFE_VALUE}&charTrgterArray=${CHAR_VALUE}&trgterIndvdlArray=${INDVD_VALUE}&desireArray=${DESIRE_VALUE}`,
    }).then(function (response) {
      const dataSet = response.data;
      console.log(dataSet);
      parseStr(dataSet);
    });
  }

  const API_KEY =
    "qt%2BHSez0GjoTYvzN9D49cDlbHcVmSSxlKAUmIrLEqtHhnJBf6URyeHVJYuTIP13Hm148dCo3U7qu0QeSF%2FXoZw%3D%3D";

  let LIFE_VALUE = "";
  let CHAR_VALUE = "";
  let INDVD_VALUE = "";
  let DESIRE_VALUE = "";
  let resultCount = [];
  let resultNumber = 4; //최상위 3개의 데이터는 필요없기 떄문에 제외한다.

  const [state, setState] = useState({
    results: [],
  }); //api 데이터를 담는 hooks

  const [loaded, setLoaded] = useState(false);
  const [print, setPrint] = useState(false);

  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    LIFE_VALUE = data.lifeArr;
    CHAR_VALUE = data.charArr;
    INDVD_VALUE = data.indvdArr;
    DESIRE_VALUE = data.desireArr;
    setLoaded(true);
    getAPI();
  };
  console.log(state.results);
  return (
    <div className="wrapper">
      <>
        <header>
          <h1>BBOKJI</h1>
          <h2>나만을 위한 복지검색</h2>
        </header>

        <form className="select-wrapper" onSubmit={handleSubmit(onSubmit)}>
          <div className="select-container">
            <ul className="select-area">
              <li className="option-container">
                <h2 className="option-title">생애주기</h2>
                <select name="lifeArr" ref={register} className="js-life">
                  <option value="none">선택하세요</option>
                  <option value="001">영유아</option>
                  <option value="002">아동</option>
                  <option value="003">청소년</option>
                  <option value="004">청년</option>
                  <option value="005">중장년</option>
                  <option value="006">노년</option>
                </select>
              </li>

              <li className="option-container">
                <h2 className="option-title">대상특성</h2>
                <select name="charArr" ref={register} className="js-char">
                  <option value="none">선택하세요</option>
                  <option value="001">해당없음</option>
                  <option value="002">여성</option>
                  <option value="003">임산부</option>
                  <option value="004">장애</option>
                  <option value="005">국가유동자등 보훈대상자</option>
                  <option value="006">실업자</option>
                </select>
              </li>

              <li className="option-container">
                <h2 className="option-title">가구유형</h2>
                <select name="indvdArr" ref={register} className="js-indvd">
                  <option value="none">선택하세요</option>
                  <option value="001">해당없음</option>
                  <option value="002">한부모</option>
                  <option value="003">다문화</option>
                  <option value="004">조손</option>
                  <option value="005">새터민</option>
                  <option value="006">소년소녀가장</option>
                  <option value="007">독거노인</option>
                </select>
              </li>

              <li className="option-container">
                <h2 className="option-title">욕구</h2>
                <select name="desireArr" ref={register} className="js-desire">
                  <option value="none">선택하세요</option>
                  <option value="0000000">안전</option>
                  <option value="1000000">건강</option>
                  <option value="2000000">일상생활유지</option>
                  <option value="3000000">가족관계</option>
                  <option value="4000000">사회적 관계</option>
                  <option value="500000">경제</option>
                  <option value="6000000">교육</option>
                  <option value="7000000">고용</option>
                  <option value="8000000">생활환경</option>
                  <option value="9000000">법률 및 권익보장</option>
                  <option value="A000000">기타</option>
                </select>
              </li>
            </ul>
          </div>
          <div className="search-container">
            <input className="submitBtn" type="submit" value="결과보기" />
            <input className="resetBtn" type="reset" value="초기화" />
          </div>
        </form>
        <div className="js-result">
          <h2>
            {print === true
              ? "지원 가능한 서비스를 살펴보세요."
              : "서비스를 조회해보세요."}
          </h2>
        </div>

        {loaded === true ? (
          <>
            <br />
            <br />
            <br />
            <CircularProgress
              className="spinner"
              getdata={toString(state.getdata)}
            />
            <br />
            <br />
          </>
        ) : null}

        <ResultList results={state.results} />
      </>
      <footer>
        <br />
        <br />
        <br />
        <h4>&copy; 2021 공사단</h4>
        <br />
        <br />
        <br />
      </footer>
    </div>
  );
};

export default Home;
