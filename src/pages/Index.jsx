import React, { useState } from 'react';
import { Container, VStack, Text, Button, Input, Table, Thead, Tbody, Tr, Th, Td, Box } from "@chakra-ui/react";
import { useCSVReader } from 'react-papaparse';

const Index = () => {
  const [csvData, setCsvData] = useState([]);
  const { CSVReader } = useCSVReader();

  const handleUpload = (data) => {
    setCsvData(data);
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4} width="100%">
        <Text fontSize="2xl">Upload CSV File</Text>
        <CSVReader onUploadAccepted={(results) => handleUpload(results.data)}>
          {({ getRootProps, acceptedFile }) => (
            <>
              <Button {...getRootProps()} colorScheme="teal" size="lg">
                {acceptedFile ? acceptedFile.name : 'Click to upload CSV'}
              </Button>
            </>
          )}
        </CSVReader>
        {csvData.length > 0 && (
          <Box overflowX="auto" width="100%">
            <Table variant="simple">
              <Thead>
                <Tr>
                  {csvData[0].map((header, index) => (
                    <Th key={index}>{header}</Th>
                  ))}
                </Tr>
              </Thead>
              <Tbody>
                {csvData.slice(1).map((row, rowIndex) => (
                  <Tr key={rowIndex}>
                    {row.map((cell, cellIndex) => (
                      <Td key={cellIndex}>{cell}</Td>
                    ))}
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        )}
      </VStack>
    </Container>
  );
};

export default Index;