import axios from 'axios';
import { TicketResponse, UserTicketsResponse, StatsResponse } from './TicketTypes';

export default class TicketService {
    private static instance: TicketService;
    private baseUrl: string;

    private constructor() {
        this.baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost/api';
    }

    public static getInstance(): TicketService {
        if (!TicketService.instance) {
            TicketService.instance = new TicketService();
        }
        return TicketService.instance;
    }

    public async getTickets(status: 'open' | 'closed', page: number, perPage: number): Promise<TicketResponse> {
        try {
            const response = await axios.get(`${this.baseUrl}/tickets/${status}`, {
                params: {
                    per_page: perPage,
                    page: page,
                },
            });
            return response.data;
        } catch (error) {
            console.error(`Error fetching ${status} tickets:`, error);
            throw error;
        }
    }

    public async getUserTickets(email: string, page: number, perPage: number): Promise<UserTicketsResponse> {
        try {
            const response = await axios.get(`${this.baseUrl}/users/${encodeURIComponent(email)}/tickets`, {
                params: {
                    per_page: perPage,
                    page: page,
                },
            });
            return response.data;
        } catch (error) {
            console.error(`Error fetching user tickets:`, error);
            throw error;
        }
    }

    public async getStats(): Promise<StatsResponse> {
        try {
            const response = await axios.get(`${this.baseUrl}/stats`);
            return response.data;
        } catch (error) {
            console.error('Error fetching stats:', error);
            throw error;
        }
    }

    public static formatDate(dateString: string): string {
        return new Date(dateString).toLocaleString();
    }
}