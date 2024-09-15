# Ticket Management System

This project is a Next.js-based ticket management system that allows users to view open and closed tickets, as well as user-specific ticket information.

## Setup Instructions

### Prerequisites

- Node.js (version compatible with React 18)
- npm (Node Package Manager)
- nvm (Node Version Manager) - optional but recommended

### Setting up the project

1. **Use the correct Node.js version:**
   If you're using nvm, simply run the following command in the project directory:
   ```
   nvm use
   ```
   This will use the Node.js version specified in the `.nvmrc` file.

2. **Install dependencies:**
   Run the following command to install all necessary dependencies:
   ```
   npm install
   ```

3. **Configure the API Backend Endpoint:**
   - Create a file named `local.env` in the root directory of the project.
   - Add the following line to the file, replacing the URL with your backend API endpoint:
     ```
     NEXT_API_URL="http://localhost/api"
     ```
   - If you don't set this, the project will default to using `http://localhost/api`.

4. **Start the development server:**
   - Ensure your backend API is running.
   - Run the following command to start the Next.js development server:
     ```
     npm run dev
     ```
   - The application will be available at `http://localhost:3000` by default.

   Note: If you need to change the default port, refer to the [Next.js CLI documentation](https://nextjs.org/docs/app/api-reference/cli/next#changing-the-default-port).

## How to Use

1. **Viewing Tickets:**
   - Use the dropdown menu to switch between viewing Open and Closed tickets.
   - The ticket list updates automatically every 10 seconds to reflect any changes.

2. **User-specific Tickets:**
   - Click on any ticket in the table to open a modal.
   - The modal displays all tickets assigned to the user associated with the clicked ticket.
   - Use the pagination controls in the modal to navigate through the user's tickets.

3. **Statistics:**
   - Select "Stats" from the dropdown menu to view overall ticket statistics.

## Note on Real-time Updates

The current implementation uses polling every 10 seconds to update ticket information. While this allows for quick demonstration of updates, in a production environment, a WebSocket implementation would be more efficient for real-time updates.

## Additional Information

For more details on Next.js and its features, please refer to the [Next.js documentation](https://nextjs.org/docs).