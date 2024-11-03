import { useEffect, useState } from "react";
import { UserAccountRowData, getUserAccountManagement } from "@/app/_services/adminService";
import { IPaginationResponse } from "@/app/_services/baseService";


const UserAccountTable = () => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [paginationResponse, setPaginationResponse] = useState<IPaginationResponse<UserAccountRowData>>();
    const [userAccounts, setUserAccounts] = useState<UserAccountRowData[]>([])
    const fetchUserAccount = async (): Promise<IPaginationResponse<UserAccountRowData> | undefined> => {
        try {
            const result = await getUserAccountManagement();
            if (result.status === 200 && result.data.success === true) {
                return result.data.content;
            } else {
                return undefined;
            }

        } catch (err) {
            console.error(err);
            return undefined;
        }
    }

    useEffect(() => {
        const fetch = async () => {
            const result = await fetchUserAccount();
            if (result) {
                setPaginationResponse(result);
                setUserAccounts(result.content);
            }
        }
        fetch();
    }, [paginationResponse?.page])
    return (
        <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-2xl font-semibold mb-4">User Accounts</h2>

            <div className="overflow-x-auto" style={{ maxHeight: '400px' }}>
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Username</th>
                            <th>Full Name</th>
                            <th>Email</th>
                            <th>Create Date</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userAccounts.map((account) => (
                            <tr key={account.id} className="hover">
                                <td>{account.id}</td>
                                <td>{account.username}</td>
                                <td>{account.fullName}</td>
                                <td>{account.email}</td>
                                <td>{new Date(account.createdDate).toLocaleDateString()}</td>
                                <td>
                                    {account.status === true ? (
                                        <span className="relative inline-block text-white font-semibold p-2">
                                            <span className="absolute inset-0 bg-gradient-to-r from-green-600 to-green-800 rounded-lg border-2 border-transparent bg-clip-border"></span>
                                            <span className="relative">Enabled</span>
                                        </span>
                                    ) : (
                                        <span className="relative inline-block text-white font-semibold p-2">
                                            <span className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-800 rounded-lg border-2 border-transparent bg-clip-border"></span>
                                            <span className="relative">Disabled</span>
                                        </span>
                                    )}
                                </td>
                                <td>
                                    <button className="btn btn-primary btn-sm mr-2">Edit</button>
                                    <button className="btn btn-error btn-sm">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className='mt-8 flex justify-center space-x-4'>
                <button
                    className={`btn ${paginationResponse?.firstPage ? 'btn-disabled' : ''}`}
                    onClick={() => { setCurrentPage(currentPage - 1) }}
                    disabled={paginationResponse?.firstPage}
                >
                    Previous
                </button>
                {Array.from({ length: Number(paginationResponse?.totalPage) }, (_, index) => (
                    <button
                        key={index}
                        className={`btn ${paginationResponse?.page === index + 1 ? 'btn-active' : ''}`}
                        onClick={() => { setCurrentPage(index) }}
                    >
                        {index + 1}
                    </button>
                ))}
                <button
                    className={`btn ${paginationResponse?.lastPage ? 'btn-disabled' : ''}`}
                    onClick={() => { setCurrentPage(currentPage + 1) }}
                    disabled={paginationResponse?.lastPage}
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default UserAccountTable;