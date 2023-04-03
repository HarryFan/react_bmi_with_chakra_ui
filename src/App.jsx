import { ChakraProvider, Center } from '@chakra-ui/react';
import BMICalculator from './components/bmi-calculator';

function App() {
return (
// 置中顯示，h 代表高度，w 代表寬度
<Center h="100vh" w="100vw">
  <ChakraProvider>
    {/* 呼叫 BMI 計算器元件 */}
    <BMICalculator />
  </ChakraProvider>
</Center>
);
}