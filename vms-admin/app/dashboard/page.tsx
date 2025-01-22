"use client";

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Fetch } from '@supabase/supabase-js/dist/module/lib/types';


interface Employee {
  Name: string;
  Surname: string;
  user_email: string;
  job_type: string;
}

interface Task {
  task_descr: string;
}

interface Vehicle {
  brand: string;
  model: string;
  plate: string;
  fuel_volume: number;
  mileage: number;
}

interface Job {
  job_description: string;
  total_cost: number;
}

interface Fuel {
  plate: string;
  fuel_date: string;
  gas_station_name: string;
  fuel_cost: number;
}

// Initialize Supabase client
const supabase = createClient('https://tyymktgygplkqbqratoj.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR5eW1rdGd5Z3Bsa3FicXJhdG9qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDA2OTMxNDQsImV4cCI6MjAxNjI2OTE0NH0.2KjuXHZsrNFRjl4oiftQKVS0R-9shOTdXcVQCqKEQgE');

export default function DashboardMainPage() {
  const [drivers, setdrivers] = useState<Employee[]>([]);
  const [mechanics, setmechanics] = useState<Employee[]>([]);
  const [fuelers, setfuelers] = useState<Employee[]>([]);
  const [hoveredDriverTasks, setHoveredDriverTasks] = useState<Task[]>([]);
  const [hoveredDriverFinished, setHoveredDriverFinished] = useState<Task[]>([]);
  const [hoveredDriverVehicles, setHoveredDriverVehicles] = useState<Vehicle[]>([]);
  const [hoveredMechanicJobs, setHoveredMechanicJobs] = useState<Job[]>([]);
  const [hoveredFuelerInfo, setHoveredFuelerInfo] = useState<Fuel[]>([]);

  useEffect(() => {
    async function fetchEmployees() {
      const { data: driversData, error: driversError } = await supabase
        .from('employees')
        .select('Name, Surname, user_email, job_type')
        .eq('job_type', 'Driver');

      if (driversError) {
        console.error('Error fetching drivers:', driversError);
        return;
      }

      setdrivers(driversData);


      const { data: mechanicsData, error: mechanicsError } = await supabase
        .from('employees')
        .select('Name, Surname, user_email, job_type')
        .eq('job_type', 'Mechanic');

      if (mechanicsError) {
        console.error('Error fetching mechanics:', mechanicsError);
        return;
      }

      setmechanics(mechanicsData);

      const { data: fuelersData, error: fuelersError } = await supabase
        .from('employees')
        .select('Name, Surname, user_email, job_type')
        .eq('job_type', 'Fueler');

      if (fuelersError) {
        console.error('Error fetching fuelers:', fuelersError);
        return;
      }

      setfuelers(fuelersData);
    }

    fetchEmployees();
  }, []);

  const handleMouseEnter = async (driverEmail: string) => {
    const { data, error } = await supabase
      .from('tasks_temp')
      .select('task_descr')
      .match({user_email: driverEmail, completed: false}); // Assuming 'assigned_to' is the field relating tasks to employees

    if (error) {
      console.error('Error fetching tasks:', error);
    } else {
      console.log('Tasks fetched:', data);
      setHoveredDriverTasks(data);
    }


    const { data: FinishedTasks, error: FinishedTasksError } = await supabase
      .from('tasks_temp')
      .select('task_descr')
      .match({user_email: driverEmail, completed: true});

      if (FinishedTasksError) {
        console.error('Error fetching finished tasks:', FinishedTasksError)
      } else {
        console.log('Finished tasks fetched:');
        setHoveredDriverFinished(FinishedTasks);
      }

    const vehiclesResponse = await supabase
      .from('vehicles')
      .select('brand, model, plate, fuel_volume, mileage')
      .eq('user_email', driverEmail);

    if (vehiclesResponse.error) {
      console.error('Error fetching vehicles:', vehiclesResponse.error);
    } else {
      setHoveredDriverVehicles(vehiclesResponse.data);
    }


    const { data: FinishedJobs, error: FinishedJobsError } = await supabase
      .from('vehicles_info')
      .select('job_description, total_cost')
      .match({worker_email: driverEmail, car_active: true});

      if (FinishedJobsError) {
        console.error('Error fetching finished jobs:', FinishedJobsError)
      } else {
        console.log('Finished jobs fetched:');
        setHoveredMechanicJobs(FinishedJobs);
      }

    
    const {data: FuelInfo, error: FuelInfoError} = await supabase
      .from('fuel_information')
      .select('plate, fuel_date, gas_station_name, fuel_cost')
      .match({user_email: driverEmail});

    
    if (FuelInfoError) {
      console.error('Error fetching fuel info: ', FuelInfoError)
    } else {
      console.log('Fuel info fetched:');
      setHoveredFuelerInfo(FuelInfo);
    }

    
  };

  const handleMouseLeave = () => {
    setHoveredDriverTasks([]);
    setHoveredDriverVehicles([]);
    setHoveredDriverFinished([]);
    setHoveredMechanicJobs([]);
    setHoveredFuelerInfo([]);
  };

  return (


    <main className="drivers-list">
      
      <h1 className="h1">Drivers List</h1>
      <div className="driver-header">
        <div>Name</div>
        <div>Surname</div>
        <div>Email</div>
      </div>

      {drivers.map((driver, index) => (
        <div key={index} className="driver-item"
        onMouseEnter={() => handleMouseEnter(driver.user_email)}
          onMouseLeave={handleMouseLeave}>
          <div>{driver.Name}</div>
          <div>{driver.Surname}</div>
          <div>{driver.user_email}</div>
          <div className="driver-tasks">
            <strong><h2>Current tasks:</h2></strong>
            {hoveredDriverTasks.map((task, idx) => (
              <div key={idx}>{task.task_descr}</div>
            ))}
            <strong><h2>Finished tasks:</h2></strong>
            {hoveredDriverFinished.map((task, idx) => (
              <div key={idx}>{task.task_descr}</div>
            ))}
            <div className="driver-vehicles">
              <strong><h2>Vehicles:</h2></strong>
              {hoveredDriverVehicles.map((vehicle, idx) => (
                <div key={idx}>
                  {vehicle.brand} {vehicle.model} - <strong>{vehicle.plate}</strong> [VOLUME: {vehicle.fuel_volume} | MILEAGE: {vehicle.mileage}]
                </div>
              ))}
            </div>
          </div>
          
        </div>
      ))}

      <h1 className="h1">Mechanics List</h1>
      <div className="driver-header">
        <div>Name</div>
        <div>Surname</div>
        <div>Email</div>
      </div>

      {mechanics.map((mechanic, index) => (
        <div key={index} className="driver-item"
        onMouseEnter={() => handleMouseEnter(mechanic.user_email)}
          onMouseLeave={handleMouseLeave}>
          <div>{mechanic.Name}</div>
          <div>{mechanic.Surname}</div>
          <div>{mechanic.user_email}</div>

          <div className="driver-tasks">
            <strong><h2>Job finished:</h2></strong>
            {hoveredMechanicJobs.map((job, idx) => (
              <div key={idx}>{job.job_description} - {job.total_cost} KZT</div>
            ))}
          </div>

        </div>
      ))}


      <h1 className="h1">Fuelers List</h1>
      <div className="driver-header">
        <div>Name</div>
        <div>Surname</div>
        <div>Email</div>
      </div>

      {fuelers.map((fueler, index) => (
        <div key={index} className="driver-item"
        onMouseEnter={() => handleMouseEnter(fueler.user_email)}
          onMouseLeave={handleMouseLeave}>
          <div>{fueler.Name}</div>
          <div>{fueler.Surname}</div>
          <div>{fueler.user_email}</div>

          <div className="driver-tasks">
            <strong><h2>Fuel information:</h2></strong>
            {hoveredFuelerInfo.map((fuel, idx) => (
              <div key={idx}><em>{fuel.fuel_date}</em>: {fuel.gas_station_name} | <strong>{fuel.plate}</strong> -- {fuel.fuel_cost} KZT</div>
            ))}
          </div>

        </div>
      ))}


    </main>


  );
}


