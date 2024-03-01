import React, { useState ,useEffect} from "react";
import axios from "axios";
import './Admin.css';

function Admin() {
    const [EmployeeDetails, setEmployeeDetails] = useState([]);
    const [, setsalarydetails] = useState("");
    useEffect(() => {
        get_employee_details();
    }, []);
    const get_employee_details = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/all_employee_details_Read`);
            console.log(response.data);
            setEmployeeDetails(response.data);
        }
        catch (error) {
            console.log(error);
        }
    };
    const get_salary_details = async () => {
        try {
            const salary_details = await axios.get(`http://localhost:3001/all_salary_details_Read`);
            console.log(salary_details.data);
            setsalarydetails(salary_details.data);
        }
        catch (error) {
            console.log(error);
        }
    }
    const deleteEmployee = async (employeeCode) => {
        try {
            await axios.delete(`http://localhost:3001/delete_employee/${employeeCode}`);
            // After deleting, update the state to reflect the changes
            setEmployeeDetails(EmployeeDetails.filter(employee => employee[0] !== employeeCode));
            console.log("data deleted")
        }
        catch (error) {
            console.log(error);
        }
    };
    return (
        <>
            <div>
                <button onClick={get_employee_details}>All Employee details</button>
                <button onClick={get_salary_details}>All Employee Salary details</button>
            </div>
            <h2>My Customers</h2>

            <table id="myTable">
                <thead>
                    <tr className="header">
                        <th>Employee code</th>
                        <th>Name</th>
                        <th>Update</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {EmployeeDetails.map((employee, index) => (
                        <tr key={index}>
                            <td>{employee[0]}</td>
                            <td>{employee[1]}</td>
                            <td><button>Update</button></td>
                            <td><button onClick={() => deleteEmployee(employee[0])}>Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}
export default Admin;