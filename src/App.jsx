import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import Accordion from 'react-bootstrap/Accordion';


function App() {
  const [data, setData] = useState([]);
  const [dates, setDates] = useState(data.map(() => new Date()));
  const [sortCriteria, setSortCriteria] = useState('friends');

  const handleDateChange = (date, index) => {
    const newDates = [...dates];
    newDates[index] = date;
    setDates(newDates);
  };

  const sortData = (data, criteria) => {
    return data.slice().sort((a, b) => {
      if (criteria === 'friends') {
        return a.twubric.friends - b.twubric.friends;
      } else if (criteria === 'influence') {
        return a.twubric.influence - b.twubric.influence;
      } else if (criteria === 'chirpiness') {
        return a.twubric.chirpiness - a.twubric.chirpiness;
      } else {
        return 0; // No sorting if criteria is invalid
      }
    });
  };

  const handleSort = (criteria) => {
    setSortCriteria(criteria);
    setData(sortData(data, criteria));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://gist.githubusercontent.com/pandemonia/21703a6a303e0487a73b2610c8db41ab/raw/82e3ef99cde5b6e313922a5ccce7f38e17f790ac/twubric.json`
        );
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleRemove = (index) => {
    const updatedData = [...data];
    updatedData.splice(index, 1);
    setData(updatedData);
  };

  return (
    <>
      <div className="flex flex-wrap justify-center gap-4">
        {data.length > 0 ? (
          data.map((item, index) => (
            <div key={index} className="w-full sm:w-1/2 lg:w-1/3">
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Sort</th>
                    <Accordion>
                    <Accordion.Item eventKey="0">
  <Accordion.Header className="bg-gray-200 p-4 font-bold cursor-pointer">
    Sort the Items
  </Accordion.Header>
  <Accordion.Body className="p-4">
    <button
      className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mr-2"
      onClick={() => handleSort('friends')}
    >
      Sort by Friends
    </button>
    <button
      className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-2"
      onClick={() => handleSort('influence')}
    >
      Sort by Influence
    </button>
    <button
      className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
      onClick={() => handleSort('chirpiness')}
    >
      Sort by Chirpiness
    </button>
  </Accordion.Body>
</Accordion.Item>

     
    </Accordion>
                    <th colSpan={2}>{item.username}</th>
                    <th>{item.twubric.total}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{item.twubric.friends}<br />friends</td>
                    <td>{item.twubric.influence}<br />influence</td>
                    <td>{item.twubric.chirpiness}<br />chirpiness</td>
                  </tr>
                  <tr>
                    <td colSpan={2}>
                      <DatePicker
                        selected={dates[index]}
                        onChange={(date) => handleDateChange(date, index)}
                        dateFormat="yyyy/MM/dd"
                        className="form-control"
                      />
                    </td>
                    <td>
                      <button
                        onClick={() => handleRemove(index)}
                        className="bg-red-500 text-white px-2 py-1 rounded"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </div>
          ))
        ) : (
          'Loading...'
        )}
      </div>

      <p>Prakash Choure</p>
      <p>prakashchoure2002@gmail.com</p>
    <a href='https://prakashchoure2002.github.io/portfolio/' className='bg-red-200'><p>Portfolio</p></a>
      
    </>
  );
}

export default App;
