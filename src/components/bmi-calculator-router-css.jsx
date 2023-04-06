import { useState } from "react"; // 引入 useState 元件
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"; // 引入 Router、Routes、Route、Link 元件
import { useNavigate, useLocation } from "react-router-dom"; // 引入 useNavigate、useLocation 元件
import "./BMICalculator.css"; // 引入 CSS 檔案

// BMI 計算器主要元件
function BMICalculator() {
  const [height, setHeight] = useState(""); // 身高
  const [weight, setWeight] = useState(""); // 體重

  // 計算 BMI
  const calculateBMI = () => {
    const heightMeters = height / 100; // 轉換成公尺
    const bmiValue = weight / (heightMeters * heightMeters); // 計算 BMI 數值
    const calculatedBMI = bmiValue.toFixed(2);// 計算 BMI 數值
    let calculatedResultText = ""; // 體重狀況
    let calculatedWeightLoss = null; // 減重數值

    // 根據 BMI 數值判斷體重狀況
    if (bmiValue < 18.5) {
      calculatedResultText = "體重過輕";
    } else if (bmiValue >= 18.5 && bmiValue < 24) {
      calculatedResultText = "正常範圍";
    } else {
      const maxNormalWeight = 24 * heightMeters * heightMeters; // 正常體重上限
      const weightLossValue = parseFloat((weight - maxNormalWeight).toFixed(1)); // 減重數值
      calculatedWeightLoss = weightLossValue.toFixed(1); // 減重數值

      // 根據 BMI 數值判斷體重狀況
      if (bmiValue >= 24 && bmiValue < 27) {
        calculatedResultText = `過重，您需要減掉約 ${weightLossValue} 公斤才能回到正常範圍`;
      } else if (bmiValue >= 27 && bmiValue < 30) {
        calculatedResultText = `輕度肥胖，您需要減掉約 ${weightLossValue} 公斤才能回到正常範圍`;
      } else if (bmiValue >= 30 && bmiValue < 35) {
        calculatedResultText = `中度肥胖，您需要減掉約 ${weightLossValue} 公斤才能回到正常範圍`;
      } else {
        calculatedResultText = `重度肥胖，您需要減掉約 ${weightLossValue} 公斤才能回到正常範圍`;
      }
    }

    // 回傳計算結果
    return {
      bmi: calculatedBMI, // BMI 數值
      resultText: calculatedResultText,  // 體重狀況
      weightLoss: calculatedWeightLoss, // 減重數值
    };
  };

  return (
    // 使用 Router 包住整個元件
    <Router>
      <div className="bmi-calculator">{/* 使用 Routes 元件包住所有路由 */}
        <Routes>{/* 使用 Route 元件設定路由 */}
          <Route path="/result" element={<ResultPage />} />
          <Route
            path="/"
            element={
              <InputPage
                height={height}
                setHeight={setHeight}
                weight={weight}
                setWeight={setWeight}
                calculateBMI={calculateBMI}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

// 輸入頁面元件
function InputPage({ height, setHeight, weight, setWeight, calculateBMI }) {
  const navigate = useNavigate();
  const handleClick = () => {
    const result = calculateBMI();
    navigate("/result", {
      state: result,
    });
  };

  return (
    <div>
      <h1>BMI 計算器 BMI with Router</h1>
      <div className="input-form">
        <div>
          <label htmlFor="height">身高（公分）：</label>
          <input
            type="number"
            id="height"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="weight">體重（公斤）：</label>
          <input
            type="number"
            id="weight"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
        </div>
        <button onClick={handleClick}>計算 BMI</button>
      </div>
      <Link to="/result">查看結果</Link> {/* 使用 Link 元件設定連結 */}
    </div>
  );
}

// 結果頁面元件
function ResultPage() {
  const location = useLocation();
  const { bmi, resultText, weightLoss } = location.state || {};

  return (
    <div>
      <h1>BMI 計算結果</h1>
      {bmi && (
        <div className="result-container">
          <p>BMI 指數：{bmi}</p>
          <p>{resultText}</p>
          {weightLoss && <p>需要減重 {weightLoss} 公斤</p>}
        </div>
      )}
      <Link to="/" className="button">重新輸入</Link> {/* 使用 Link 元件設定連結 */}
    </div>
  );
}

export default BMICalculator;
