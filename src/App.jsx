import { useState, useEffect } from 'react';
import './App.css';
import Table from './component/table';

function App() {
  const [data, setData] = useState([]);
  const perPage = 10;
  const [page, setPage] = useState(1);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const startIndex = (page - 1) * perPage;
  const lastIndex = startIndex + perPage;
  const totalPage = Math.ceil(filteredData.length / perPage);

  const fetchData = async () => {
    try {
      const url = "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(response.status);
      }
      const data = await response.json();
      setData(data);
      setFilteredData(data);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const filtered = data.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.role.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
    setPage(1); 
  }, [data, searchTerm]);

  const pageChange = (directionOrPageNumber) => {
    if (typeof directionOrPageNumber === "number") {
      setPage(directionOrPageNumber);
    } else if (directionOrPageNumber === "first page") {
      setPage(1);
    } else if (directionOrPageNumber === "previous page" && page > 1) {
      setPage((prev) => prev - 1);
    } else if (directionOrPageNumber === "next page" && page < totalPage) {
      setPage((prev) => prev + 1);
    } else if (directionOrPageNumber === "last page") {
      setPage(totalPage);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
    <form>
        <input 
          id="text" 
          type='text' 
          placeholder='Search by name, email or role'
          value={searchTerm}
          onChange={handleSearch}
        />
      </form>
     
      <Table
        data={filteredData}
        pageChange={pageChange}
        startIndex={startIndex}
        lastIndex={lastIndex}
        page={page}
        totalPage={totalPage}
        setData={setData}
        setFilteredData={setFilteredData}
      />
    </div>
  );
}

export default App;
