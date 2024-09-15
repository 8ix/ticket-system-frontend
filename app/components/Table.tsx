import React from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, TableCaption, Box } from '@chakra-ui/react';

type TableProps = {
    title: string;
    headers: string[];
    rows: (string | number)[][];
    onRowClick?: (rowData: (string | number)[]) => void;
};

const CustomTable: React.FC<TableProps> = ({ title, headers, rows, onRowClick }) => {
    return (
        <Box overflowX="auto">
            <Table variant="simple">
                <TableCaption>{title}</TableCaption>
                <Thead>
                    <Tr>
                        {headers.map((header, index) => (
                            <Th key={index}>{header}</Th>
                        ))}
                    </Tr>
                </Thead>
                <Tbody>
                    {rows.map((row, rowIndex) => (
                        <Tr 
                            key={rowIndex} 
                            onClick={() => {
                                console.log('Row clicked in Table component:', row);
                                if (onRowClick) onRowClick(row);
                            }}
                            _hover={{ bg: "gray.100", cursor: "pointer" }}
                        >
                            {row.map((cell, cellIndex) => (
                                <Td key={cellIndex}>{cell}</Td>
                            ))}
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </Box>
    );
};

export default CustomTable;