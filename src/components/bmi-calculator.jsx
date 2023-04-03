import { useState } from 'react';
import { Box, Center, Flex, Heading, Stack, Text, Input, Button } from '@chakra-ui/react';

function BMICalculator() {
const [height, setHeight] = useState(''); // 儲存身高
const [weight, setWeight] = useState(''); // 儲存體重
const [bmi, setBMI] = useState(null); // 儲存計算結果BMI指數
const [resultText, setResultText] = useState(''); // 儲存BMI指數的結果描述文字

const calculateBMI = () => {
const heightMeters = height / 100; // 轉換身高單位為公尺
const bmiValue = weight / (heightMeters * heightMeters); // 計算BMI指數
setBMI(bmiValue.toFixed(2)); // 設定BMI指數儲存值

if (bmiValue < 18.5) { setResultText('體重過輕'); } else if (bmiValue>= 18.5 && bmiValue < 24) { setResultText('正常範圍'); }
    else if (bmiValue>= 24 && bmiValue < 27) { setResultText('過重'); } else if (bmiValue>= 27 && bmiValue < 30) {
        setResultText('輕度肥胖'); } else if (bmiValue>= 30 && bmiValue < 35) { setResultText('中度肥胖'); } else {
          setResultText('重度肥胖'); } }; return ( <Box w="100%" maxW="480px" mx="auto" p={4}>
          <Center mb={8}>
            <Heading size="lg">BMI 計算器</Heading>
          </Center>
          <Flex justify="center">
            <Stack spacing={4} w="100%">
              <Input placeholder="身高（公分）" value={height} onChange={(e)=> setHeight(e.target.value)} />
              <Input placeholder="體重（公斤）" value={weight} onChange={(e)=> setWeight(e.target.value)} />
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