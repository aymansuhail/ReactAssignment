import React, { useState, useEffect } from 'react';
import moment from 'moment';
import TitleCard from '../Cards/TitleCard';
import axios from 'axios';

const Leads = () => {
    const [customers, setCustomers] = useState([]);
    const [filteredCustomers, setFilteredCustomers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('date'); // Default sorting by date
    const [sortDirection, setSortDirection] = useState('asc'); // Default sorting direction ascending
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(20);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        customer_name: '',
        age: '',
        location: '',
        phone: ''
    });

    useEffect(() => {
        console.log('Fetching customers...');
        fetchCustomers();
    }, []);

    useEffect(() => {
        console.log('Customers:', customers);
        console.log('Is loading:', isLoading);
        console.log('Error:', error);
    }, [customers, isLoading, error]);

    const fetchCustomers = async () => {
        try {
            const response = await axios.get('http://localhost:3000/customers');
            setCustomers(response.data);
            setFilteredCustomers(response.data); // Initialize filteredCustomers with all customers
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching customers:', error);
            setError(error.message);
            setIsLoading(false);
        }
    };

    const deleteCustomer = async (customerId) => {
        try {
            const response = await axios.delete(`http://localhost:3000/customers/${customerId}`);
            console.log(response.data.message); // Log success message
            fetchCustomers(); // Fetch updated customer list after deletion
        } catch (error) {
            console.error('Error deleting customer:', error);
        }
    };

    const handleSearch = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        const filtered = customers.filter(customer => 
            customer.customer_name.toLowerCase().includes(query.toLowerCase()) ||
            customer.location.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredCustomers(filtered);
        setCurrentPage(1); // Reset current page when search query changes
    };

    const handleSort = (criteria) => {
        if (sortBy === criteria) {
            // Toggle sort direction if sorting by the same criteria
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            // If sorting by a new criteria, set it as the new sorting criteria and default to ascending direction
            setSortBy(criteria);
            setSortDirection('asc');
        }
    };

    // Function to compare dates for sorting
    const compareDates = (a, b) => {
        if (sortDirection === 'asc') {
            return moment(a.created_at).isBefore(b.created_at) ? -1 : 1;
        } else {
            return moment(a.created_at).isBefore(b.created_at) ? 1 : -1;
        }
    };

    // Function to compare times for sorting
    const compareTimes = (a, b) => {
        if (sortDirection === 'asc') {
            return moment(a.created_at).format('HH:mm:ss').localeCompare(moment(b.created_at).format('HH:mm:ss'));
        } else {
            return moment(b.created_at).format('HH:mm:ss').localeCompare(moment(a.created_at).format('HH:mm:ss'));
        }
    };

    // Pagination
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = filteredCustomers.slice(indexOfFirstRecord, indexOfLastRecord);

    // Calculate the starting serial number for the current page
    const startingSerialNumber = (currentPage - 1) * recordsPerPage;

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const addCustomer = async () => {
        // Implement your logic to send the form data to the backend for creating a new customer
        try {
            const response = await axios.post('http://localhost:3000/customers', formData);
            console.log('New customer added:', response.data);
            fetchCustomers(); // Fetch updated customer list after adding a new customer
            setShowForm(false); // Close the form after successful submission
            setFormData({ // Clear the form data
                customer_name: '',
                age: '',
                location: '',
                phone: ''
            });
        } catch (error) {
            console.error('Error adding customer:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    return (
        <TitleCard title="Customers" topMargin="mt-2" >
            <div className="overflow-x-auto w-full">
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Search by name or location"
                        value={searchQuery}
                        onChange={handleSearch}
                        className="px-2 py-1 border rounded  w-80"
                    />
                </div>
                <button className="btn btn-primary mb-4" onClick={() => setShowForm(true)}>Add Customer</button>
                {showForm && (
                    <dialog id="my_modal_1" className="modal" open>
                        <div className="modal-box p-8">
                            <h3 className="font-bold text-lg mb-4">Add New Customer</h3>
                            <div className="mb-4">
                                <input type="text" name="customer_name" value={formData.customer_name} onChange={handleInputChange} placeholder="Customer Name" className="form-control" />
                            </div>
                            <div className="mb-4">
                                <input type="number" name="age" value={formData.age} onChange={handleInputChange} placeholder="Age" className="form-control" />
                            </div>
                            <div className="mb-4">
                                <input type="text" name="location" value={formData.location} onChange={handleInputChange} placeholder="Location" className="form-control" />
                            </div>
                            <div className="mb-4">
                                <input type="text" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="Phone" className="form-control" />
                            </div>
                            <div className="flex justify-end">
                                <button onClick={addCustomer} className="btn btn-primary mr-2">Confirm</button>
                                <button onClick={() => setShowForm(false)} className="btn btn-secondary">Close</button>
                            </div>
                        </div>
                    </dialog>
                )}
                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    <>
                        <table className="table w-full">
                            <thead>
                                <tr>
                                    <th>Number</th>
                                    <th>Name</th>
                                    <th>Age</th>
                                    <th>Phone</th>
                                    <th>Location</th>
                                    <th>
                                        <button onClick={() => handleSort('date')} className="btn btn-link">Date</button>
                                    </th>
                                    <th>
                                        <button onClick={() => handleSort('time')} className="btn btn-link">Time</button>
                                    </th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentRecords
                                    .sort((a, b) => sortBy === 'date' ? compareDates(a, b) : compareTimes(a, b))
                                    .map((customer, index) => (
                                        <tr key={customer.sno}>
                                            <td>{startingSerialNumber + index + 1}</td>
                                            <td>{customer.customer_name}</td>
                                            <td>{customer.age}</td>
                                            <td>{customer.phone}</td>
                                            <td>{customer.location}</td>
                                            <td>{moment(customer.created_at).format('YYYY-MM-DD')}</td>
                                            <td>{moment(customer.created_at).format('HH:mm:ss')}</td>
                                            <td>
                                                <button onClick={() => deleteCustomer(customer.sno)} className="btn btn-square btn-ghost inline-flex items-center">
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                        <div className="join grid grid-cols-2">
                            <button className="join-item btn btn-outline" onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
                                Previous page
                            </button>
                            <button className="join-item btn btn-outline" onClick={() => paginate(currentPage + 1)} disabled={currentPage === Math.ceil(filteredCustomers.length / recordsPerPage)}>
                                Next
                            </button>
                        </div>
                    </>
                )}
            </div>
        </TitleCard>
    );
};




export default Leads;