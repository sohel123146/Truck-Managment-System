import { useState, useMemo, useCallback } from 'react';
import Trucks from './Trucks';
import BasicModal from './BasicModal';
import FIlteringTrucks from './FilteringTrucks';
import SearchTruck from './SearchTruck';
import TrucksData from "../trucks.json";

const AddTruck = () => {
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedTruck, setSelectedTruck] = useState(null);
  const [truckStatus, setTruckStatus] = useState('All Status'); //for active , Maintenance , Out Of Service
  const [filteredResults, setFilteredResults] = useState([]); //for category and search results

  const [trucks, setTrucks] = useState(TrucksData);

  // Function to add a new truck
  const addTruck = useCallback((newTruck) => {
    setTrucks([...trucks, newTruck]);
  }, []);

  // funtion to upldate the truck
  const updateTruck = useCallback((updatedTruck) => {
    setTrucks(
      trucks.map((truck) =>
        truck.truckId === updatedTruck.truckId ? updatedTruck : truck
      )
    );
  }, [trucks]);


  //function to open the modal with selected truck to pre-fill the form
  const handleEdit = useCallback((truck) => {
    setSelectedTruck(truck);
    setIsEditing(true);
    setShowModal(true);
  },[]);

  //this fucntion for Active , Maintenance , Out Of Service
  const handleFilterChange = useCallback((status) => {
    setTruckStatus(status);
  },[]);

  //this function for category and search results the results stored in filteredTrucks array
  const handleSearchResults = useCallback((filteredTrucks) => {
    setFilteredResults(filteredTrucks);
  }, [])


  const handleOpenModel = useCallback(() => {
    setShowModal(true)
    setIsEditing(false)
    setSelectedTruck(null)
  }, [])


// Apply status filter first
const trucksFilteredByStatus = useMemo(() => {
  return truckStatus === 'All Status'
    ? trucks
    : trucks.filter((truck) => {
      return truck.status === truckStatus;
    });
}, [trucks, truckStatus]);

// Apply search filter on top of the status filter
const trucksToDisplay = useMemo(() => {
  const trucksToFilter = trucksFilteredByStatus;

  if (filteredResults.length > 0) {
    // Search results should be filtered within the trucksFilteredByStatus
    return trucksToFilter.filter((truck) => 
      filteredResults.some(filteredTruck => filteredTruck.truckId === truck.truckId)
    );
  }

  return trucksToFilter; // Return only trucks filtered by status if no search results
}, [filteredResults, trucksFilteredByStatus]);



  return (
    <>
      <div className="filtering-options">
        <div onClick={handleOpenModel} className="truck-add-btn">
          + Add New Truck
        </div>

        <FIlteringTrucks
          truckStatus={truckStatus}
          handleFilterChange={handleFilterChange}
        />
        <SearchTruck trucks={trucks} onFilteredResults={handleSearchResults} />
      </div>

      {showModal && (
        <BasicModal
          open={showModal}
          setShowModal={setShowModal}
          addTruck={addTruck}
          isEditing={isEditing}
          selectedTruck={selectedTruck}
          updateTruck={updateTruck}
        />
      )}

      <div className="truck-cards-container">
        {trucksToDisplay.length === 0 ? (
          <p>No trucks found.</p>
        ) : (
          trucksToDisplay.map((truckItem) => (
            <Trucks
              key={truckItem.truckId}
              {...truckItem}
              onEditClick={() => handleEdit(truckItem)}
            />
          ))
        )}
      </div>
    </>
  );
};

export default AddTruck;
