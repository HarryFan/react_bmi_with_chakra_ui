import { ChakraProvider, Center } from '@chakra-ui/react'; // 引入 ChakraProvider 和 Center 元件
import BMICalculator from './components/bmi-calculator'; // 引入 BMICalculator 元件
import BMICalculatorRouter from './components/bmi-calculator-router-css'; // 引入 BMICalculator 元件 router css範例

function App() {
  return (
    <Center  w="100vw">
      <div className="container">
        <ChakraProvider>
          <p>用 ChakraUI 裝飾的 BMI 元件</p>
          <BMICalculator />
         <p>--------------------------------------------------------</p>
          <p>用 css 、 router 做的 BMI 元件</p>
          <BMICalculatorRouter />
        </ChakraProvider>
      </div>
    </Center>
  );
}
export default App; // 導出 App 函數
