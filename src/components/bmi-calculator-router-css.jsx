import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import "./BMICalculator.css";

// BMI 計算器主要元件
function BMICalculator() {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");

  const calculateBMI = () => {
    const heightMeters = height / 100;
    const bmiValue = weight / (heightMeters * heightMeters);
    const calculatedBMI = bmiValue.toFixed(2);
    let calculatedResultText = "";
    let calculatedWeightLoss = null;

    // 根據 BMI 數值判斷體重狀況
    if (bmiValue < 18.5) {
      calculatedResultText = "體重過輕";
    } else if (bmiValue >= 18.5 && bmiValue < 24) {
      calculatedResultText = "正常範圍";
    } else {
      const maxNormalWeight = 24 * heightMeters * heightMeters;
      const weightLossValue = parseFloat((weight - maxNormalWeight).toFixed(1));
      calculatedWeightLoss = weightLossValue.toFixed(1);

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

    return {
      bmi: calculatedBMI,
      resultText: calculatedResultText,
      weightLoss: calculatedWeightLoss,
    };
  };

  return (
    <Router>
      <div className="bmi-calculator">
        <Routes>
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
      <Link to="/result">查看結果</Link>
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
      <Link to="/">重新輸入</Link>
    </div>
  );
}

export default BMICalculator;
