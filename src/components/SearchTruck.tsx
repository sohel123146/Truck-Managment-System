import { useState, useEffect } from 'react';
import { Dropdown } from 'rsuite';
import 'rsuite/dist/rsuite.css';
import { useDebounce } from 'use-debounce';

const SearchTruck = ({ trucks, onFilteredResults }) => {
  const [searchCategory, setSearchCategory] = useState('Model');
  const [searchQuery, setSearchQuery] = useState('');
  const [value] = useDebounce(searchQuery, 1000);

  // Handle dropdown category change
  const handleCategoryChange = (eventKey) => {
    setSearchCategory(eventKey);
    setSearchQuery(''); // Reset search when the category changes
  };

  // Handle search input change
  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value); // Update searchQuery immediately on change
  };

  // Filter trucks based on debounced value
  useEffect(() => {
    const filteredTrucks = trucks.filter((truck) => {
      const query = value.toLowerCase();

      if (searchCategory === 'Model') {
        return truck.model.toLowerCase().includes(query);
      } else if (searchCategory === 'Location') {
        return truck.location.toLowerCase().includes(query);
      } else if (searchCategory === 'Capacity') {
        return truck.capacity.toLowerCase().includes(query);
      } else if (searchCategory === 'FuelLevel') {
        return truck.fuelLevel.toLowerCase().includes(query);
      } else if (searchCategory === 'LastMaintenance') {
        return truck.lastMaintenance.toLowerCase().includes(query);
      } else if (searchCategory === 'Status') {
        return truck.status.toLowerCase().includes(query);
      }
      return false;
    });

    // Pass the filtered results to the parent component
    onFilteredResults(filteredTrucks);
  }, [value, searchCategory, trucks, onFilteredResults]);

  return (
    <div className="search-container">
      <div className="dropdown">
        <Dropdown title={searchCategory} onSelect={handleCategoryChange}>
          <Dropdown.Item eventKey="Model">Model</Dropdown.Item>
          <Dropdown.Item eventKey="Status">Status</Dropdown.Item>
          <Dropdown.Item eventKey="Location">Location</Dropdown.Item>
          <Dropdown.Item eventKey="Capacity">Capacity</Dropdown.Item>
          <Dropdown.Item eventKey="FuelLevel">Fuel Level</Dropdown.Item>
          <Dropdown.Item eventKey="LastMaintenance">Last Maintenance</Dropdown.Item>
        </Dropdown>
      </div>
      <div className="search">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchInputChange}
          placeholder={`Search by ${searchCategory}`}
          className="search-input"
        />
      </div>
    </div>
  );
};

export default SearchTruck;
