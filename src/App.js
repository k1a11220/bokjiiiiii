import React, { useState } from "react";
import axios from "axios";
import XMLParser from "react-xml-parser";
import { useForm } from "react-hook-form";
import { CircularProgress } from "@material-ui/core";
import "./styles.css";
import ResultList from "./components/ResultList";

function App() {
  async function parseStr(dataSet) {
    const dataArr = new XMLParser().parseFromString(dataSet).children;
    resultCount = dataArr.length; // 검색된 데이터의 수를 구한다. (dataArr length 에서 5개 값이 빠짐)
    // console.log(dataArr);
    if (resultCount < 5) {
      alert("검색결과가 없습니다."); // 검색결과가 없을경우 알람표시
      setPrint(false);
      setLoaded(false);
    }
    setState((preState) => {
      return {
        ...preState,
        results: dataArr.slice(5, resultCount),
      };
    });
    setLoaded(false);
    setPrint(true);
    // console.log(state.results); //state.result == servs
  }

  async function getAPI() {
    await axios({
      method: "get",
      url: `https://cors-anywhere.herokuapp.com/http://apis.data.go.kr/B554287/NationalWelfareInformations/NationalWelfarelist?serviceKey=${API_KEY}&callTp=L&pageNo=1&numOfRows=10&lifeArray=${LIFE_VALUE}&charTrgterArray=${CHAR_VALUE}&desireArr=${DESIRE_VALUE}&srchKeyCode=001`,
    }).then(function (response) {
      const dataSet = response.data;
      parseStr(dataSet);
    });
  }

  const API_KEY =
    "qt%2BHSez0GjoTYvzN9D49cDlbHcVmSSxlKAUmIrLEqtHhnJBf6URyeHVJYuTIP13Hm148dCo3U7qu0QeSF%2FXoZw%3D%3D";

  let LIFE_VALUE = "";
  let CHAR_VALUE = "";
  // let INDVD_VALUE = "";
  let DESIRE_VALUE = "";
  let resultCount = [];
  // let resultNumber = 4; //최상위 3개의 데이터는 필요없기 떄문에 제외한다.

  const [state, setState] = useState({
    results: [],
  }); //api 데이터를 담는 hooks

  const [loaded, setLoaded] = useState(false);
  const [print, setPrint] = useState(false);

  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    LIFE_VALUE = data.lifeArr;
    CHAR_VALUE = data.charTrgterArray;
    // INDVD_VALUE = data.indvdArr;
    DESIRE_VALUE = data.desireArr;
    setLoaded(true);
    getAPI();
  };
  // console.log(state.results);
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
                  <option value="007">임신 · 출산</option>
                </select>
              </li>

              <li className="option-container">
                <h2 className="option-title">대상특성</h2>
                <select
                  name="charTrgterArray"
                  ref={register}
                  className="js-char"
                >
                  <option value="none">선택하세요</option>
                  <option value="001">해당없음</option>
                  <option value="002">장애인</option>
                  <option value="003">국가유공자 등 보훈대상</option>
                  <option value="004">의사상자</option>
                  <option value="005">신용불량자</option>
                  <option value="006">무주택자</option>
                  <option value="007">임산부</option>
                  <option value="008">난임.불임 부부</option>
                  <option value="009">독거노인</option>
                  <option value="010">노숙인</option>
                  <option value="011">여성</option>
                  <option value="012">저소득층</option>
                  <option value="013">취약계층</option>
                  <option value="014">실업자(취업희망자)</option>
                  <option value="015">취약계층</option>
                  <option value="016">장애인</option>
                  <option value="017">농어업인</option>
                  <option value="018">학생(초등)</option>
                  <option value="019">학생(중·고등학교)</option>
                  <option value="020">학생(대학생 이상)</option>
                  <option value="021">미취학</option>
                  <option value="022">한부모가구</option>
                  <option value="023">소년소녀가장가구</option>
                  <option value="024">다문화가구</option>
                </select>
              </li>

              {/* <li className="option-container">
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
              </li> */}

              <li className="option-container">
                <h2 className="option-title">목적</h2>
                <select name="desireArr" ref={register} className="js-desire">
                  <option value="none">선택하세요</option>
                  <option value="100">일자리</option>
                  <option value="110">주거</option>
                  <option value="120">일상생활</option>
                  <option value="130">신체건강 및 보건의료</option>
                  <option value="140">정신건강 및 심리정서</option>
                  <option value="150">보호 및 돌봄·요양</option>
                  <option value="160">보육 및 교육</option>
                  <option value="170">문화 및 여가</option>
                  <option value="180">안전 및 권익보장</option>
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
}

export default App;
