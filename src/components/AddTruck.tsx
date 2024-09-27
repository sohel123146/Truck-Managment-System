import { useState, useMemo, useCallback } from 'react';
import Trucks from './Trucks';
import BasicModal from './BasicModal';
import FIlteringTrucks from './FilteringTrucks';
import SearchTruck from './SearchTruck';

const AddTruck = () => {
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedTruck, setSelectedTruck] = useState(null);
  const [truckStatus, setTruckStatus] = useState('All Status'); //for active , Maintenance , Out Of Service
  const [filteredResults, setFilteredResults] = useState([]); //for category and search results

  const [trucks, setTrucks] = useState([
    {
      truckId: 1,
      model: 'Volvo FH16',
      status: 'Active',
      location: 'New York',
      capacity: '20 tons',
      fuelLevel: '75%',
      lastMaintenance: '2024-08-10',
    },
    {
      truckId: 2,
      model: 'Scania R500',
      status: 'Maintenance',
      location: 'Los Angeles',
      capacity: '18 tons',
      fuelLevel: '40%',
      lastMaintenance: '2024-09-05',
    },
    {
      truckId: 3,
      model: 'Mercedes-Benz Actros',
      status: 'Out Of Service',
      location: 'Chicago',
      capacity: '22 tons',
      fuelLevel: '15%',
      lastMaintenance: '2024-07-22',
    },
    {
      truckId: 4,
      model: 'DAF XF',
      status: 'Active',
      location: 'Dallas',
      capacity: '25 tons',
      fuelLevel: '60%',
      lastMaintenance: '2024-08-18',
    },
    {
      truckId: 5,
      model: 'MAN TGX',
      status: 'Maintenance',
      location: 'Houston',
      capacity: '30 tons',
      fuelLevel: '85%',
      lastMaintenance: '2024-09-10',
    },
    {
      truckId: 6,
      model: 'Benz 2024',
      status: 'Out Of Service',
      location: 'Texas',
      capacity: '60 tons',
      fuelLevel: '85%',
      lastMaintenance: '2023-09-10',
    },
    {
      truckId: 7,
      model: 'Ford F-150',
      status: 'Active',
      location: 'Los Angeles, CA',
      capacity: '10000 lbs',
      fuelLevel: '80%',
      lastMaintenance: '2024-06-15',
    },
    {
      truckId: 8,
      model: 'Chevrolet Silverado',
      status: 'Maintenance',
      location: 'Houston, TX',
      capacity: '9500 lbs',
      fuelLevel: '60%',
      lastMaintenance: '2024-07-22',
    },
    {
      truckId: 9,
      model: 'Ram 1500',
      status: 'Active',
      location: 'Chicago, IL',
      capacity: '9800 lbs',
      fuelLevel: '45%',
      lastMaintenance: '2024-05-30',
    },
    {
      truckId: 10,
      model: 'Toyota Tundra',
      status: 'Out Of Service',
      location: 'Miami, FL',
      capacity: '8500 lbs',
      fuelLevel: 'Full',
      lastMaintenance: '2024-04-20',
    },
    {
      truckId: 11,
      model: "GMC Sierra 1500",
      status: "Active",
      location: "Phoenix, AZ",
      capacity: "9000 lbs",
      fuelLevel: "25%",
      lastMaintenance: "2024-06-05"
    },
    {
      truckId: 12,
      model: "Nissan Titan",
      status: "Maintenance",
      location: "New York, NY",
      capacity: "9400 lbs",
      fuelLevel: "70%",
      lastMaintenance: "2024-08-10"
    },
    {
      truckId: 13,
      model: "Honda Ridgeline",
      status: "Out Of Service",
      location: "San Francisco, CA",
      capacity: "7500 lbs",
      fuelLevel: "50%",
      lastMaintenance: "2024-07-18"
    },
    {
      truckId: 14,
      model: "Isuzu NPR",
      status: "Active",
      location: "Las Vegas, NV",
      capacity: "12000 lbs",
      fuelLevel: "65%",
      lastMaintenance: "2024-08-01"
    },
    {
      truckId: 15,
      model: "Mack Anthem",
      status: "Maintenance",
      location: "Denver, CO",
      capacity: "30 tons",
      fuelLevel: "35%",
      lastMaintenance: "2024-07-28"
    }
  ]);

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

  //thos fucntion for Active , Maintenance , Out Of Service
  const handleFilterChange = useCallback((status) => {
    setTruckStatus(status);
  },[]);

  //this fucntion for category and search results the results stored in filteredTrucks array
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
        return truck.status === truckStatus
      });
  }, [trucks, truckStatus])

  // this function is a combination of search filter feature and status filter feature.
  const trucksToDisplay =
    filteredResults.length > 0 ? filteredResults : trucksFilteredByStatus;

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
