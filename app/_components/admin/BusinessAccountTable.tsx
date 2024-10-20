import { useState } from "react";

const BusinessAccountTable = () => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const ITEMS_PER_PAGE = 5;
    const businessAccounts = [
        { id: 1, name: 'ABC Corp', email: 'contact@abccorp.com', status: 'Active' },
        { id: 2, name: 'XYZ Ltd', email: 'info@xyzltd.com', status: 'Inactive' },
        { id: 3, name: '123 Industries', email: 'info@123ind.com', status: 'Active' },
        { id: 4, name: 'XYZ Co', email: 'contact@xyzco.com', status: 'Inactive' },
    ];
    const totalBusinessPages = Math.ceil(businessAccounts.length / ITEMS_PER_PAGE);

    const handlePageChange = (newPage:number) => {
        setCurrentPage(newPage);
    };

    const displayedBusinessAccounts = businessAccounts.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );
    return (<div className="bg-white rounded-lg shadow-md p-4">
        <h2 className="text-2xl font-semibold mb-4">Business Accounts</h2>

        {/* Scrollable Business Accounts Table using DaisyUI */}
        <div className="overflow-x-auto" style={{ maxHeight: '400px' }}>
            <table className="table w-full">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {displayedBusinessAccounts.map((account) => (
                        <tr key={account.id} className="hover">
                            <td>{account.name}</td>
                            <td>{account.email}</td>
                            <td>{account.status}</td>
                            <td>
                                <button className="btn btn-primary btn-sm mr-2">Edit</button>
                                <button className="btn btn-error btn-sm">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

        <button
            className="mt-4 btn btn-pink"
            onClick={() => {
                // Logic to add a business account
            }}
        >
            Add Business Account
        </button>

        {/* Pagination */}
        <div className="mt-4 flex justify-center">
            {Array.from({ length: totalBusinessPages }, (_, index) => (
                <button
                    key={index}
                    className={`btn ${currentPage === index + 1 ? 'btn-active' : ''} btn-sm mx-1`}
                    onClick={() => handlePageChange(index + 1)}
                >
                    {index + 1}
                </button>
            ))}
        </div>
    </div>)
}

export default BusinessAccountTable;