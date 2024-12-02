# Shopping 4 US

A full-stack e-commerce application built with React and Tailwind CSS, featuring user authentication, shopping cart functionality, and administrative capabilities. The frontend interfaces with a Ruby on Rails backend and PostgreSQL database hosted on Railway.

## Features

### Public Access
- Browse complete product catalog with detailed product cards showing:
  - High-quality product images
  - Clear pricing
  - Brief product descriptions
  - "More Info" button for additional details
- Search functionality to filter products
- Responsive design for optimal viewing across devices

### Authenticated Users
- Enhanced product interaction:
  - Add items to cart with quantity selection
  - View detailed product information
  - Adjust quantities directly from product cards
- Complete shopping cart functionality:
  - Modify product quantities
  - Remove items
  - View item subtotals and cart total
  - Real-time tax calculation (9% rate)
- Streamlined checkout process
- Comprehensive order history:
  - Order number and date
  - Itemized list of purchases with quantities
  - Price breakdowns (subtotal, tax, total)
  - Individual order details view

### Administrative Features
- Dedicated admin interface with specialized navigation
- Product management:
  - View all products in an admin-specific layout
  - Edit existing products through a modal interface:
    - Update product name
    - Modify pricing
    - Edit product descriptions
    - Change supplier assignments
    - Update product images via URL
    - Delete products with confirmation
  - Create new products with a dedicated form including:
    - Product name
    - Price
    - Description
    - Supplier selection (dropdown)
    - Product image URL upload
- Data integrity maintenance:
  - Weekly automated database reset via cron job
  - Product archival system preserving order history
  - Supplier relationship management

## Technical Implementation

### Frontend (React + Tailwind CSS)
- Modern React implementation with functional components
- Responsive Tailwind CSS styling
- Component-based architecture
- Form validation and error handling
- Protected routes for authenticated users
- Modal-based admin interface
- Dynamic image loading system

### Backend (Ruby on Rails)
- RESTful API endpoints
- PostgreSQL database
- User authentication and role management
- Order processing system
- Weekly automated database maintenance
- Product archival system
- Supplier management

### Deployment
- Frontend and backend hosted on Railway
- Automated database backups
- Weekly maintenance cron jobs
- Image hosting integration

## Future Enhancements
- Inventory management system:
  - Stock tracking
  - Low inventory alerts
  - Maximum purchase quantity limitations
- Enhanced supplier management:
  - Add new suppliers through admin interface
  - Track product sources
  - Manage supplier relationships
  - Supplier performance metrics

## Local Development

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables:
   ```env
   REACT_APP_API_URL=your_backend_url
   ```
4. Start the development server: `npm run dev`
5. Connect to your Rails backend (see backend repository for setup instructions)

## Database Maintenance
The application includes a weekly cron job that archives product data while maintaining database integrity and order history. This functionality is implemented on the Rails backend and ensures that:
- New products added during the week are properly archived
- Order history remains intact for all purchased items
- Product data consistency is maintained
- Archived products remain accessible for order history viewing

## Backend Repository
[Link to Rails backend repository pending]

## License
This project is open source and available for use without restrictions.

## Contact
For questions or support, please contact the repository owner.