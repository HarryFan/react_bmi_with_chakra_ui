import { ChakraProvider, Center } from '@chakra-ui/react';
import BMICalculator from './components/bmi-calculator';

function App() {
return (
<Center h="100vh" w="100vw">
  <ChakraProvider>
    <BMICalculator />
  </ChakraProvider>
</Center>
);
}

export default App;