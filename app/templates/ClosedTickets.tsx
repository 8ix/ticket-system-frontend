import React, { useState, useEffect, useCallback } from 'react';
import { Text, Spinner, Box } from '@chakra-ui/react';
import Table from '../components/Table';
import Pagination from '../components/Pagination';
import TicketModal from '../components/TicketModal';
import TicketService, { Ticket } from '../utils/TicketService';

type ClosedTicketsProps = {};

const ClosedTickets: React.FC<ClosedTicketsProps> = () => {
    const [tickets, setTickets] = useState<Ticket[] | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const perPage = 3;

    const ticketService = TicketService.getInstance();

    const fetchTickets = useCallback(async (isInitialLoad: boolean = false) => {
        if (isInitialLoad) {
            setIsLoading(true);
        } else {
            setIsRefreshing(true);
        }
        try {
            const response = await ticketService.getTickets('closed', currentPage, perPage);
            const newTickets = response.data;
            const newTotalPages = Math.floor(response.meta.total / perPage) + 1;
            
            if (JSON.stringify(newTickets) !== JSON.stringify(tickets)) {
                setTickets(newTickets);
            }
            if (newTotalPages !== totalPages) {
                setTotalPages(newTotalPages);
            }
        } catch (error) {
            console.error('Error fetching tickets:', error);
        } finally {
            setIsLoading(false);
            setIsRefreshing(false);
        }
    }, [currentPage, tickets, totalPages, ticketService]);

    useEffect(() => {
        fetchTickets(true);
        const interval = setInterval(() => fetchTickets(), 30000);
        return () => clearInterval(interval);
    }, [fetchTickets]);

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
    };

    const handleRowClick = (rowData: (string | number)[]) => {
        const ticketId = Number(rowData[0]);
        const ticket = tickets?.find(t => t.id === ticketId) || null;
        setSelectedTicket(ticket);
        setIsModalOpen(true);
    };

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <Box position="relative">
            {isRefreshing && (
                <Box position="absolute" top={2} right={2}>
                    <Spinner size="sm" />
                </Box>
            )}
            {tickets && tickets.length > 0 ? (
                <Table 
                    title="Closed Tickets"
                    headers={['Ticket ID', 'Subject', 'Status', 'Created At', 'Updated At', 'Assigned To']}
                    rows={tickets.map(ticket => [
                        ticket.id.toString(),
                        ticket.subject,
                        ticket.status ? 'Open' : 'Closed',
                        TicketService.formatDate(ticket.created_at),
                        TicketService.formatDate(ticket.updated_at),
                        ticket.user.name
                    ])}
                    onRowClick={handleRowClick}
                />
            ) : (
                <Text>No tickets found.</Text>
            )}
           
            <Pagination 
                onClickNext={() => handlePageChange(currentPage + 1)}
                onClickPrev={() => handlePageChange(currentPage - 1)}
                currentPage={currentPage}
                totalPages={totalPages}
            />

            <TicketModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                ticket={selectedTicket}
            />
        </Box>
    );
};

export default ClosedTickets;