import { useState } from 'react';
import { Box, Center, Flex, Heading, Stack, Text, Input, Button } from '@chakra-ui/react';

function BMICalculator() {
  // 使用 useState 儲存輸入的身高、體重、計算出來的 BMI 和 BMI 結果文字
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBMI] = useState(null);
  const [resultText, setResultText] = useState('');
  const [weightLoss, setWeightLoss] = useState(null); // 新增一個 state 來儲存需要減掉的體重

  const calculateBMI = () => { // 定義計算 BMI 的函式
    const heightMeters = height / 100; // 把身高從公分換算成公尺
    const bmiValue = weight / (heightMeters * heightMeters); // 計算 BMI 值
    setBMI(bmiValue.toFixed(2)); // 將計算出的 BMI 值顯示到小數點後兩位

    // 根據 BMI 值判斷體重狀態並顯示相應文字
    if (bmiValue < 18.5) {
      setResultText('體重過輕');
      setWeightLoss(null); // 清除之前計算的需要減掉的體重
    } else if (bmiValue >= 18.5 && bmiValue < 24) {
      setResultText('正常範圍');
      setWeightLoss(null); // 清除之前計算的需要減掉的體重
    } else {
      const maxNormalWeight = 24 * heightMeters * heightMeters;
      const weightLossValue = parseFloat((weight - maxNormalWeight).toFixed(1));
      setWeightLoss(weightLossValue.toFixed(1));

      if (bmiValue >= 24 && bmiValue < 27) {
        setResultText(`過重，您需要減掉約 ${weightLossValue} 公斤才能回到正常範圍`);
      } else if (bmiValue >= 27 && bmiValue < 30) {
        setResultText(`輕度肥胖，您需要減掉約 ${weightLossValue} 公斤才能回到正常範圍`);
      } else if (bmiValue >= 30 && bmiValue < 35) {
        setResultText(`中度肥胖，您需要減掉約 ${weightLossValue} 公斤才能回到正常範圍`);
      } else {
        setResultText(`重度肥胖，您需要減掉約 ${weightLossValue} 公斤才能回到正常範圍`);
      }
    }
  };

  //返回渲染 BMI 計算器的 JSX
return (
  <Box w="100%" maxW="480px" mx="auto" p={4}>
  <Center mb={8}>
  <Heading size="lg">BMI 計算器</Heading>
  </Center>
  <Flex justify="center">
  <Stack spacing={4} w="100%">
  <Input
  placeholder="身高（公分）"
  value={height}
  onChange={(e) => setHeight(e.target.value)}
  />
  <Input
  placeholder="體重（公斤）"
  value={weight}
  onChange={(e) => setWeight(e.target.value)}
  />
  <Button colorScheme="teal" onClick={calculateBMI}>
  計算 BMI
  </Button>
  {bmi && (
  <Center flexDirection="column">
  <Text fontSize="xl" fontWeight="bold" mb={2}>
  BMI 指數：{bmi}
  </Text>
  <Text fontSize="lg">{resultText}</Text>
  </Center>
  )}
  </Stack>
  </Flex>
  </Box>
  );
  }
  
  export default BMICalculator;

