import './Vechile_Catalog.css'
import axios from 'axios'
import { useEffect, useState } from 'react'




const Vechile_Catalog = () => {

    let [data, setData] = useState([])
    let [dataForFilter, setDataForFilter] = useState([])

    let [country, setCountry] = useState('')
    let [companyName, setCompanyName] = useState('')
    let [ceo, setCeo] = useState('')
    let [location, setLocation] = useState('')
    let [showPopUp, setShowPopUp] = useState(false)


    useEffect(() => {
        axios.get('https://vpic.nhtsa.dot.gov/api/vehicles/GetAllManufacturers?format=json')
            .then((res) => {
                setData(res.data.Results)
                setDataForFilter(res.data.Results)
                console.log(res.data.Results)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])


    const handleSearch = (e) => {

        setData(dataForFilter.filter((item) => {
            if (item.Mfr_CommonName) {
                return item.Mfr_CommonName.toLowerCase().includes(e.target.value.toLowerCase())
            }
        })
        )
    }

    let type = []
    dataForFilter.map((item) => {
        if (item.VehicleTypes.length > 0) {
            type.push(item.VehicleTypes[0].Name)
        }
    })

    let uniqueType = [...new Set(type)]

    

    const handleFilter = (e) => {
        if (e.target.value == 'All') {
            setData(dataForFilter)
        }

        else {
            setData(dataForFilter.filter((item) => {
                if (item.VehicleTypes.length > 0) {
                    return item.VehicleTypes[0].Name.toLowerCase().includes(e.target.value.toLowerCase())
                }
            })
            )
        }
    }

    const handlePopUp = (key) => {
        setCompanyName(data[key].Mfr_Name)
        setCountry(data[key].Country)
        setCeo('Not Provided in API')
        setLocation('Not Provided in API')
        setShowPopUp(true)
    }




    

    return (
        <div>
            <h1 className='heading'>VECHILE MANUFACTURERS</h1>

            <label htmlFor="search" className='search-label'>Search</label>
            <input type="text" name="search" id="search" onChange={handleSearch} />

            <label htmlFor="filter" className='select-label'>Filter by Vechile Type</label>
            <select name="select" id="select" onChange={handleFilter}>
                <option value="All">All</option>
                <option value={uniqueType[0]}>{uniqueType[0]}</option>
                <option value={uniqueType[1]}>{uniqueType[1]}</option>
                <option value={uniqueType[2]}>{uniqueType[2]}</option>
                <option value={uniqueType[3]}>{uniqueType[3]}</option>
                <option value={uniqueType[4]}>{uniqueType[4]}</option>
                <option value={uniqueType[5]}>{uniqueType[5]}</option>
                <option value={uniqueType[6]}>{uniqueType[6]}</option>
                <option value={uniqueType[7]}>{uniqueType[7]}</option>

            </select>


            {showPopUp && 
            <div className='pop-up'>
                <p className='company-name'>{companyName}</p>
                <p className='ceo'>{ceo}</p>
                <p className='location'>{location}</p>
                <p className='country'>{country}</p>
                <button className='X' onClick={() => {setShowPopUp(false)}}>X</button>
            </div>
            }

            <table className='table'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Country</th>
                        <th>Type</th>
                    </tr>
                </thead>
                <tbody>
                        {data.map((item, key) => {
                            return (
                                <tr>
                                    <td key={item.key} onClick={() => {handlePopUp(key)}}>{item.Mfr_CommonName}</td>
                                    <td key={item.key} onClick={() => {handlePopUp(key)}}>{item.Country}</td>
                                    {(item.VehicleTypes.length > 0) ? <td key={item.key} onClick={() => {handlePopUp(key)}}>{item.VehicleTypes[0].Name}</td> : <td></td>}
                                </tr>
                            )
                        })}
                </tbody>
            </table>

            {showPopUp && 
            <div className='pop-up'>
                <p className='company-name'>{companyName}</p>
                <p className='ceo'>{ceo}</p>
                <p className='location'>{location}</p>
                <p className='country'>{country}</p>
                <button className='X' onClick={() => {setShowPopUp(false)}}>X</button>
            </div>
            }
        </div>
    )
}

export default Vechile_Catalog