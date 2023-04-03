import { ChakraProvider, Center } from '@chakra-ui/react'; // 引入 ChakraProvider 和 Center 元件
import BMICalculator from './components/bmi-calculator'; // 引入 BMICalculator 元件

function App() {
  return (
    // 使用 Center 元件使 BMICalculator 在頁面上置中
    <Center h="100vh" w="100vw">
      {/* 將 ChakraProvider 元件包裹 BMICalculator 元件，以便在 BMICalculator 中使用 Chakra UI 的元件 */}
      <ChakraProvider>
        <BMICalculator />
      </ChakraProvider>
    </Center>
  );
}

export default App; // 導出 App 函數
