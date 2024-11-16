# n8n Nodes for Apaleo

This repository provides custom nodes for [n8n](https://n8n.io), enabling integration with Apaleo, a property management platform tailored for the hospitality industry. Use these nodes to automate workflows that interact with Apaleo's data and services.

To contribute and make this custom node available to the community, create it as an npm package and publish it to the npm registry.

## Prerequisites

Ensure the following tools are installed on your development machine:

- `git`
- [Node.js](https://nodejs.org/) (version 18 or higher)
- [npm](https://www.npmjs.com/) (recommended package manager)

### Install n8n globally

```bash
npm install n8n -g
```

**Recommended:** Follow the [n8n development environment setup guide](https://docs.n8n.io/) for optimal configuration.

## Installation 

### 1. Clone the Repository

Clone this repository to your local machine to use these custom nodes:

```bash
git clone https://github.com/hidN87/n8n-nodes-apaleo.git
cd n8n-nodes-apaleo
```

### 2. Install Dependencies

Install the required dependencies using npm:

```bash
npm install
```

### 3. Link the Module to n8n

Make this package accessible as a custom module in n8n:

```bash
npm link
```

Then, link it within your n8n installation:

```bash
cd /path/to/n8n
npm link n8n-nodes-apaleo
```

This will make `n8n-nodes-apaleo` available as a module for use within n8n.

### 4. Restart n8n

After linking the custom nodes, restart n8n to load the newly added Apaleo nodes:

```bash
n8n start
```

## Setup

### Get Apaleo API Credentials

1. Log in to your [Apaleo Developer account](https://developer.apaleo.com) to create and retrieve your API keys.

### Add Credentials to n8n

1. Go to **Settings** > **Credentials** in the n8n dashboard
2. Click **New** and select **Apaleo API**
3. Enter your Apaleo API credentials and save them

## Implemented Endpoints

The following Apaleo endpoints are currently supported:

### Booking

- **POST** `/booking/v1/bookings`  
  Creates a booking for one or more reservations.

- **GET** `/booking/v1/bookings`  
   Retrieve a list of bookings.

- **GET** `/booking/v1/bookings/{id}`  
  Retrieves a specific booking.

- **PATCH** `/booking/v1/bookings/{id}`  
  Allows modification of certain booking properties.

### Reservation

- **GET** `/booking/v1/reservations`  
  Returns a list of all reservations.

- **GET** `/booking/v1/reservations/{id}`  
  Retrieves a specific reservation.

- **PATCH** `/booking/v1/reservations/{id}`  
  Allows modification of certain reservation properties.

### Reservation Actions

- **PUT** `/booking/v1/reservation-actions/{id}/assign-unit`  
  Assign unit to reservation.

## Usage

After setting up the credentials, you can add Apaleo nodes to your workflows by selecting **Apaleo** in the node selection menu. Configure each node by choosing the relevant actions and fields provided by Apaleo.

### Example Use Case

**Automate Booking Management:**  
Create workflows that automatically retrieve and manage bookings, cancellations, and customer data from Apaleo. Integrate this data with other applications such as CRMs, email systems, and more.

## Development and Testing

### 1. Modify Example Nodes

Modify or replace the example nodes located in the `/nodes` and `/credentials` folders according to your needs.

### 2. Update `package.json`

Update the `package.json` file with your package details.

### 3. Lint the Code

Run the following command to check for errors:

```bash
npm run lint
```

To automatically fix errors, use:

```bash
npm run lintfix
```

### 4. Test Locally

Test your node locally to ensure everything works as expected. For more information, refer to the [documentation on running nodes locally](https://docs.n8n.io/nodes/creating-nodes/testing/).

## Support

If you encounter any issues or have feature requests, please open an issue in this repository.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
