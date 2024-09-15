import React, { useEffect, useState } from 'react';
import { Box, VStack, HStack, Text, Heading, Spinner } from '@chakra-ui/react';
import TicketService from '../utils/TicketService';
import { StatsResponse } from '../utils/TicketTypes';

const Stats: React.FC = () => {
    const [stats, setStats] = useState<StatsResponse['data'] | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const ticketService = TicketService.getInstance();

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await ticketService.getStats();
                setStats(response.data);
            } catch (error) {
                console.error('Error fetching stats:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchStats();
    }, []);

    if (isLoading) {
        return <Spinner />;
    }

    if (!stats) {
        return <Text>No stats available.</Text>;
    }

    return (
        <Box p={5}>
            <VStack spacing={6} align="stretch">
                <Heading size="xl">Ticket Stats</Heading>

                <Box borderWidth={1} borderRadius="lg" p={4}>
                    <Heading size="md" mb={2}>Overall Stats</Heading>
                    <HStack justify="space-between">
                        <Text>Total Tickets: {stats.total_tickets}</Text>
                        <Text>Unprocessed Tickets: {stats.unprocessed_tickets}</Text>
                    </HStack>
                </Box>

                <Box borderWidth={1} borderRadius="lg" p={4}>
                    <Heading size="md" mb={2}>User with Most Tickets</Heading>
                    <VStack align="start">
                        <Text>Name: {stats.user_with_most_tickets.name}</Text>
                        <Text>Email: {stats.user_with_most_tickets.email}</Text>
                        <Text>Ticket Count: {stats.user_with_most_tickets.ticket_count}</Text>
                    </VStack>
                </Box>

                <Box borderWidth={1} borderRadius="lg" p={4}>
                    <Heading size="md" mb={2}>Last Processed Ticket</Heading>
                    <VStack align="start">
                        <Text>ID: {stats.last_ticket_processed.id}</Text>
                        <Text>Subject: {stats.last_ticket_processed.subject}</Text>
                        <Text>Status: {stats.last_ticket_processed.status ? 'Open' : 'Closed'}</Text>
                        <Text>Processed by: {stats.last_ticket_processed.user.name}</Text>
                        <Text>Processed at: {new Date(stats.last_ticket_processed.updated_at).toLocaleString()}</Text>
                    </VStack>
                </Box>
            </VStack>
        </Box>
    );
};

export default Stats;