'use client'

import { useState } from 'react'
import { Box, VStack, Select } from '@chakra-ui/react'
import OpenTickets from './templates/OpenTickets';
import ClosedTickets from './templates/ClosedTickets';
import Stats from './templates/Stats';
import Container from './components/Container';

export default function Home() {

  const [currentPage, setCurrentPage] = useState('open-tickets')

  const renderPage = () => {
    switch(currentPage) {
      case 'open-tickets':
        return <OpenTickets />
      case 'closed-tickets':
        return <ClosedTickets />
      case 'stats':
        return <Stats />
      default:
        return <OpenTickets />
    }
  }

  return (
    <Container>
      <Select onChange={(e) => setCurrentPage(e.target.value)} value={currentPage} m={8}>
        <option value="open-tickets">Open Tickets</option>
        <option value="closed-tickets">Closed Tickets</option>
        <option value="stats">Stats</option>
      </Select>
      <Box w="100%">
        {renderPage()}
      </Box>
    </Container>
  )
}